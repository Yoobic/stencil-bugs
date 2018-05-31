import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';

import { CloudinaryPipe, Colors, CoreConfig, LocalForageService, Utils } from '@shared/common';
import { Broker, Requestor, ChartDefinition, Dashboard, DashboardCore, BaseKpi } from '@shared/data-core';
import { Filters, moment } from '@shared/interfaces';
import { CellRenderer } from '../../services/cell-renderer/cell-renderer.service';
import { DeltaRendererComponent } from '../../renderers/delta/delta-renderer.component';
import { Translate } from '@shared/translate';

import { CACHE_KEYS } from '../../interfaces/cache/cache.interface';

import { assign, cloneDeep, defaultsDeep, find, findIndex, forEach, isArray, isNumber, isObject, isString, keys, last, map as _map, max, merge, min, sortBy, sum, sumBy, pick } from 'lodash-es';

import * as uuid from 'uuid';

import { Observable, from, of, throwError } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';

export interface ChartCache {
    date: Date;
    data: any;
}

@Injectable()
export class Chart {
    public PDF_ROW_WIDTH = 1200;
    public PDF_ROW_HEIGHT = 800;

    protected palette0 = ['#3e4666', '#39a0ed', '#36f1cd', '#b0bcff', '#ffe377', '#EDB4CA'];
    protected palette1 = ['#877def', '#7ddf64', '#f76c6c', '#5bc0eb', '#fde74c', '#404e4d'];
    protected palette2 = ['#51E3C2', '#4A90E2', '#F9BB4E', '#F76C6C', '#1D977E', '#4ED2B8', '#54CBE1', '#6F87D5', '#C06ADC', '#645098'];
    protected palette3 = ['#7F8FA4', '#f76c6c', '#32d2b6', '#5bc0eb', '#fdef57', '#877def'];

    protected textStyle = { fontFamily: 'Lato', color: Colors.text, fontWeight: '300', fontSize: '13px', whiteSpace: 'normal', textShadow: false };
    protected lineColor = '#E1E8EE';
    protected gridLineColor = '#F4F8FC';
    protected decimalPipe: DecimalPipe;
    protected cloudinaryPipe: CloudinaryPipe;

    constructor(protected broker: Broker, protected dashboard: DashboardCore, protected rq: Requestor, protected translate: Translate, protected localForage: LocalForageService, protected coreConfig: CoreConfig, protected utils: Utils) {
        this.decimalPipe = new DecimalPipe(this.translate.getCurrentAngularLocale());
        this.cloudinaryPipe = new CloudinaryPipe(this.coreConfig, this.utils);
    }

    getFilenameSuffix(): string {
        return this.rq.getFilenameSuffix();
    }

    encodeChart(chart: ChartDefinition) {
        if (chart.aggregateOptions && !isString(chart.aggregateOptions)) {
            chart.aggregateOptions = <any>JSON.stringify(chart.aggregateOptions);
        }
        if (chart.kpiFormValues && chart.kpiFormValues.campaigns) {
            chart.kpiFormValues.campaigns = chart.kpiFormValues.campaigns.map(c => pick(c, ['title', '_id', 'scoring']));
        }
        if (chart.kpiFormValues && chart.kpiFormValues.missionscores) {
            if (chart.kpiFormValues.missionscores.selectedDescription) {
                chart.kpiFormValues.missionscores.selectedDescription = pick(chart.kpiFormValues.missionscores.selectedDescription, ['title', '_id', 'scoring']);
            }
            if (chart.kpiFormValues.missionscores.scores) {
                let score = chart.kpiFormValues.missionscores.scores;
                if (isArray(score) && (<any>score).length > 0) {
                    score = score[0];
                }
                chart.kpiFormValues.missionscores.scores = pick(score, ['title', 'isActive']);
            }

        }

    }

    decodeChart(chart: ChartDefinition) {
        if (chart.aggregateOptions && isString(chart.aggregateOptions)) {
            chart.aggregateOptions = <any>JSON.parse(<any>chart.aggregateOptions);
        }
        if ((<any>chart).aggregateData && isString((<any>chart).aggregateData)) {
            (<any>chart).aggregateData = <any>JSON.parse((<any>chart).aggregateData);
        }
        if (!chart._id) {
            chart._id = uuid.v4();
        }
    }

    encode(entity: Dashboard) {
        if (!entity) {
            return entity;
        }
        let newentity: Dashboard = cloneDeep(entity);
        forEach(newentity.tabs, tab => {
            if (tab && tab.items) {
                forEach(tab.items, item => {
                    if (item && item.definition) {
                        this.encodeChart(item.definition);
                    }
                });
            }
        });

        if (newentity.tabs && newentity.tabs.length > 0 && newentity.tabs[0].items && newentity.tabs[0].items.length > 0 && newentity.tabs[0].items[0].definition && newentity.tabs[0].items[0].definition.kpiType) {
            newentity.icon = this.getKpiIcon(newentity.tabs[0].items[0].definition.kpiType);
        }
        return newentity;
    }

    decode(entity: Dashboard) {
        forEach(entity.tabs, tab => {
            forEach(tab.items, item => {
                if (item && item.definition) {
                    this.decodeChart(item.definition);

                }
            });
        });
        return entity;
    }

    clone(cd: ChartDefinition) {
        let newCd = cloneDeep(cd);
        newCd._id = uuid.v4();
        return newCd;
    }

    saveDashboard(entity: Dashboard) {
        let newEntity = this.encode(entity);
        return this.broker.upsert('dashboards', newEntity).pipe(map(retVal => this.decode(retVal)));
    }

    deleteDashboard(id: string) {
        return this.broker.delete('dashboards', id);
    }

    getData(cd: ChartDefinition, component: any, forceRefresh = false, start = 0) {
        return this.getDataObservable(cd, component, forceRefresh, start).pipe(catchError(err => {
            return throwError('error');
        }));
    }

    getAggregateQuery(cd: ChartDefinition, collectionName: string, filters?: Filters, options?: Array<any>, forceRefresh = false) {
        return from(this.getDataFromCache(cd)).pipe(
            mergeMap(data => {
                return data && forceRefresh !== true ? of(data) : this.broker.aggregateQuery(collectionName, filters, options);
            }),
            mergeMap((data: any) => {
                return from(this.addDataToCache(cd, data));
            })
        );
    }

    getChartCache(id: string) {
        return this.localForage.get<ChartCache>(CACHE_KEYS.chart + '.' + id);
    }

    setChartCache(id: string, cache) {
        return this.localForage.set<ChartCache>(CACHE_KEYS.chart + '.' + id, cache);
    }

    clearChartCache(id: string) {
        return this.localForage.remove(CACHE_KEYS.chart + '.' + id);
    }

    getDataFromCache(cd: ChartDefinition) {
        if (cd._id) {
            return this.getChartCache(cd._id).then(cache => {
                if (cache) {
                    if (moment().diff(moment(cache.date), 'minutes') < 15) {
                        return cache.data;
                    }
                }
                return null;
            });
        }
        return Promise.resolve(null);
    }

    addDataToCache(cd: ChartDefinition, data) {
        if (cd._id) {
            return this.getChartCache(cd._id).then(cache => {
                cache = { date: moment().toDate(), data: cloneDeep(data) };
                return this.setChartCache(cd._id, cache);
            }).then(() => {
                return data;
            });
        } else {
            return Promise.resolve(data);
        }
    }

    getKpiData(cd: ChartDefinition, component, forceRefresh = false) {
        let type: any = this.getKpiClass(cd.kpiType);
        type.getChartDefinition(cd.kpiFormValues, cd, this.translate);
        if (cd && cd.kpiType === 'ChartIOKpi') {
            return of([]);
        }

        let aggregate = type.getAggregate(cd.kpiFormValues, this.translate, this.cloudinaryPipe);

        if (cd.kpiFormValues.pointPadding) {
            cd.pointPadding = cd.kpiFormValues.pointPadding;
        }
        if (cd.kpiFormValues.numberPrecision) {
            cd.numberPrecision = cd.kpiFormValues.numberPrecision;
        }
        if (aggregate.mapTransform && aggregate.mapTransformAsync) {
            return this.getAggregateQuery(cd, aggregate.collectionName, aggregate.filters, aggregate.aggregateOptions, forceRefresh).pipe(mergeMap(res => {
                return aggregate.mapTransform(res, cd, this.broker, component);
            }));
        } else {
            return this.getAggregateQuery(cd, aggregate.collectionName, aggregate.filters, aggregate.aggregateOptions, forceRefresh).pipe(map(res => {
                return aggregate.mapTransform ? aggregate.mapTransform(res, cd, this.broker, component) : res;
            }));
        }
    }

    getKpiClass(type: string): any {
        return null;
    }

    getKpiIcon(type: string) {
        return null;
    }

    getKpiIconByType(type: string) {
        return null;
    }

    getDataObservable(cd: ChartDefinition, component: any, forceRefresh = false, start = 0): Observable<any> {
        this.decodeChart(cd);
        if (cd.data) {
            return of(cd.data);
        } else if (cd.kpi) {
            return this.getKpiData(cd, component, forceRefresh);
        } else {
            if (cd.groupByDate) {
                this.dashboard.setTimescale(cd.filters, cd.timescale, cd.dateField || 'finishedDate', cd.endDate);
                let format = BaseKpi.getDateFormat(cd.dateGrouping);
                if (cd.aggregateOptions && cd.aggregateOptions.length > 0) {
                    return this.getAggregateQuery(cd, cd.collectionName, cd.filters, cd.aggregateOptions, forceRefresh).pipe(map(res => {
                        return cd.mapTransform ? cd.mapTransform(res, cd, this.broker, component) : res;
                    }));
                } else {
                    let aggregateOptions = [];
                    if (cd.groupByCampaign) {
                        aggregateOptions.push({ '$project': { '_id': 1, 'title': '$title', 'date': { '$dateToString': { 'format': format, 'date': '$' + (cd.dateField || 'finishedDate') } } } });
                        aggregateOptions.push({ '$group': { '_id': { 'date': '$date', 'title': '$title' }, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } });
                    } else {
                        let match: any = {};
                        match[cd.dateField || 'finishedDate'] = { '$type': 9 };
                        aggregateOptions.push({ '$match': match });
                        aggregateOptions.push({ '$group': { '_id': { '$dateToString': { 'format': format, 'date': '$' + (cd.dateField || 'finishedDate') } }, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } });
                    }
                    return this.getAggregateQuery(cd, cd.collectionName, cd.filters, aggregateOptions, forceRefresh);
                }
            } else {
                if ((cd.aggregateOptions && cd.aggregateOptions.length > 0) || (cd.filters && cd.filters.length > 0)) {
                    return this.getAggregateQuery(cd, cd.collectionName, cd.filters, cd.aggregateOptions, forceRefresh).pipe(
                        map(res => {
                            return cd.mapTransform ? cd.mapTransform(res, cd, this.broker, component) : res;
                        }));
                } else {
                    return of([]);
                }
            }
        }
    }

    getChartConfig(cd: ChartDefinition, data): any {
        return this.getHCChartConfig(cd, data);
    }

    getGridConfig(cd: ChartDefinition, data): any {
        if (cd.kpiType === 'CampaignsPivotTableKpi') {
            return {
                columnDefs: cd.kpiColumns,
                rows: data
            };
        }
        let config = this.getHCChartConfig(cd, data);
        let columnDefs: Array<any> = [{ headerName: cd.groupByDate ? this.translate.get('DATE') : this.translate.get('CATEGORY'), field: 'key' }];
        if (cd.groupByDate) {
            columnDefs[0].comparator = (valueA, valueB, nodeA, nodeB, isInverted) => CellRenderer.dateComparator(valueA, valueB, nodeA, nodeB, isInverted);
        }
        let rows = new Map<string, Object>();

        config.series.forEach((s, i) => {
            if (s.name === 'Regression') {
                return;
            }
            columnDefs.push(<any>{ headerName: s.name, field: 'serie' + i, headerTooltip: s.name, minWidth: 40 });
            if (cd.type === 'scatter') {
                columnDefs.push(<any>{ headerName: s.name, field: 'seriex' + i, headerTooltip: s.name + ': x', minWidth: 40 });
            }
            if (cd.showDelta) {
                last(columnDefs).cellRenderer = DeltaRendererComponent.renderer;
            }
            forEach(s.data, (d: any, index) => {
                let key, value, x;
                if (isArray(d)) {
                    key = moment(d[0]).format('L');
                    value = d[1];
                } else if (isObject(d) && d.name) {
                    key = d.name;
                    value = d.y;
                    if (cd.type === 'scatter') {
                        x = d.x;
                    }
                } else if (isObject(d) && d.x) {
                    key = moment(d.x).format('L');
                    value = d.y;
                } else if (config.xAxis && (<any>config.xAxis).categories && (<any>config.xAxis).categories.length > 0) {
                    key = (<any>config.xAxis).categories[index];
                    value = d;
                }
                if (key) {
                    let row: any = rows.get(key) || { key: key };
                    row['serie' + i] = isNumber(value) ? (this.decimalPipe.transform(value, this.getNumberFormat(cd))) : (value && value.toString ? value.toString() : value);
                    if (cd.type === 'scatter') {
                        row['seriex' + i] = x;
                    }
                    rows.set(key, row);
                }
            });
        });
        return {
            columnDefs: columnDefs,
            rows: Array.from(rows.values())
        };
    }

    getMapConfig(cd: ChartDefinition, data: Array<any>) {
        return null;
    }

    getMicroConfig(cd: ChartDefinition, data: any) {
        let value;
        let delta;
        if (isArray(data)) {
            value = Math.round(data && data.length > 0 ? (<any>data)[0].value : 0);
        } else {
            value = data.value;
            delta = data.delta;
        }
        return {
            title: cd.title,
            value: value,
            delta: delta,
            info: cd.microInfo
        };
    }

    getCalendarData(dates: any = null, data: Array<any>): any {
        if (dates === null) {
            return {};
        }
        // need to get dates from the component
        let timeSpan = dates.amount - 1;
        let timeScale = dates.timescale;
        let outputData = [];
        let xAxis = [];
        if (data && data.length > 0) {
            let currentDate = moment(data[0]._id).toDate();
            let stopDate = moment(data[0]._id).add(<any>timeSpan, <any>timeScale).endOf(<any>timeScale).toDate();

            let weekNumber = 0;
            let dayToY = [0, 6, 5, 4, 3, 2, 1]; // Monday is 6
            while (currentDate <= stopDate) {
                let stringDate = moment(currentDate).format('YYYY-MM-DD');
                let retVal: any = {
                    _id: stringDate,
                    x: weekNumber,
                    y: dayToY[moment(currentDate).day()],
                    value: 0,
                    keys: null,
                    date: stringDate
                };
                let v: any = find(data, { '_id': stringDate });
                if (v) {
                    retVal.keys = v.keys;
                    retVal.value = v.value;
                }
                outputData.push(retVal);

                // Beginning of month
                if (moment(currentDate).date() === 1) {
                    xAxis.push(moment(currentDate).format('MMM'));
                }
                // End of month
                if (moment(currentDate).date() === moment(currentDate).daysInMonth()) {
                    weekNumber++; // skip one column
                    xAxis.push('');
                    weekNumber++; // start on a new column
                    // End of week
                } else {
                    if (retVal.y <= 0) { // end of week
                        weekNumber++;
                        xAxis.push('');
                    }
                }
                currentDate = moment(currentDate).add(1, 'd').toDate();
            }
        }
        return { data: outputData, xAxis };
    }

    getCalendarConfig(cd: ChartDefinition, data: Array<any>): any {
        let config = this.setHCChartType(cd);
        let chartData = this.getCalendarData(cd.kpiFormValues.dates, data);
        config.chart.marginTop = -8;
        config.chart.marginLeft = 10;
        config.chart.marginBottom = 0;
        config.chart.spacing = [0, -2, 10, 0];
        config.legend = Object.assign(config.legend, {
            enabled: true,
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            symbolHeight: 100,
            itemMarginTop: 20
        });
        config.yAxis = <any>{
            visible: false,
            min: 0,
            max: 6,
            labels: {
                fontSize: '13px'
            }
        };
        config.xAxis = <any>{
            visible: true,
            categories: chartData.xAxis,
            opposite: true,
            lineWidth: 0,
            tickWidth: 0,
            min: 0,
            max: 17,
            labels: {
                align: 'center',
                autoRotation: false,
                y: 20,
                fontSize: '13px'
            }
        };
        config.plotOptions.series = Object.assign(config.plotOptions.series, {
            borderColor: '#FFFFFF',
            borderRadius: 6,
            borderWidth: 4,
            maxPointWidth: 15,
            pointWidth: 15
        });
        config.colorAxis = {
            min: 0,
            stops: [[0, '#f1f1f1'],
            [0.001, '#c6e6df'],
            [0.2, '#a9ded3'],
            [0.4, '#8cd6c8'],
            [0.6, '#6fcebc'],
            [0.8, '#44C3AA']]
        };
        config.tooltip.formatter = function () {
            return moment(this.point.date).format('MMM DD, YYYY dddd') + '<br><br>' + this.point.value + ' users';
        };
        config.series = [{ data: chartData.data }];
        return config;
    }

    getHCChartConfig(cd: ChartDefinition, data: any): Highcharts.Options {
        this.textStyle = { fontFamily: 'Lato', color: Colors.text, fontWeight: '300', fontSize: '13px', whiteSpace: 'normal', textShadow: false };
        let config = this.setHCChartType(cd);
        let originalData = data;
        if (!isArray(data)) {
            return;
        }
        if (cd.groupByDate && cd.type !== 'pie') {
            this.setHCUseDates(config);
            if (cd.groupByCampaign) {
                /* beautify ignore:start */
                let series = new Map<string, Highcharts.IndividualSeriesOptions>();
                /* beautify ignore:end */
                data.forEach((d: any) => {
                    let s: any = series.get(d._id.title) || { name: d._id.title, data: [] };
                    let date = BaseKpi.fixDates(cd, d._id.date);
                    s.data.push({ x: date, y: d.value, color: d.color, keys: d.keys });
                    series.set(d._id.title, s);
                });
                config.series = Array.from(series.values());
                config.series.forEach(s => s.data = sortBy(<any>s.data, (d: any) => d.x));
            } else {
                config.series = <any>[{
                    name: cd.title,
                    data: sortBy(data.map((d: any) => {
                        let date = BaseKpi.fixDates(cd, d._id);
                        return { x: date, y: d.value, color: d.color, keys: d.keys };
                    }), (d) => d.x)
                }];
            }
        } else if (cd.type === 'treemap') {
            //todo : handle serie
            if (isArray(data)) {
                config.series = <any>[{
                    layoutAlgorithm: 'squarified',
                    data: _map(data, (d: any) => ({ name: d._id, value: d.value, colorValue: d.value }))
                }];
            }

        } else if (cd.type === 'scatter') {
            //todo : handle serie
            config.series = <any>[{
                name: cd.title,
                data: data
            }];
            //add option to disable regression
            if (!cd.hideRegression) {
                this.addCorelationLine(<any>data, config);
            }
        } else {
            let series = new Map<string | number, Object>();
            let categories = new Set<string>();
            if (isArray(data) && data.length > 0 && ((<any>data[0]).serie || (<any>data[0]).serie === 0)) {
                forEach(data, (d: any) => {
                    let serie = series.get(d.serie) || {};
                    serie[d._id] = { y: d.value, keys: d.keys };
                    categories.add(d._id);
                    series.set(d.serie, serie);
                });
                config.xAxis = Object.assign(config.xAxis || {}, {
                    categories: sortBy(Array.from(categories.values()), x => x),
                    crosshair: true
                });
            } else {
                if (isArray(data)) {
                    data = (<Array<{ _id: string, y: number; keys?: Array<string> }>>data).reduce((acc, memo: any) => {
                        acc[memo._id] = { y: memo.value, keys: memo.keys };
                        return acc;
                    }, {});
                } else {
                    delete (<any>data).value;
                }
                config.xAxis = Object.assign(config.xAxis || {}, {
                    categories: _map(data, function (v, l: string) {
                        return l;
                    }),
                    crosshair: true
                });
                series.set(cd.title, data);
            }
            config.series = [];
            let width = 100 / series.size;
            series.forEach((serie: any, name) => {
                let index = config.series.length + 1;
                //fill in missing data
                if (config.xAxis && (<any>config.xAxis).categories) {
                    (<any>config.xAxis).categories.forEach(c => {
                        if (!serie[c]) {
                            serie[c] = null;
                        }
                    });
                }

                config.series.push(<any>{
                    name: name,
                    size: (width * 0.7).toString() + '%',
                    center: [(width * index - width / 2).toString() + '%', null],
                    data: cd.type === 'radar' ?
                        _map((<Array<string>>(<any>config.xAxis).categories), (c) => {
                            return serie[c];
                        }) :
                        sortBy(_map(<any>serie, (v, l) => {
                            return assign({ name: l }, v);
                        }), d => {
                            //we have to map to string because the object keys we re getting back are string
                            return (<any>config.xAxis).categories.map(x => x.toString()).indexOf(d.name);
                        })
                });
            });
        }
        config.series.forEach(s => {
            originalData.forEach(o => {
                if (s.name === o.serie || s.name === o._id) {
                    s.color = o.color;
                    s.index = s.index || 0;
                    s.index = -o.index;
                    s.legendIndex = o.index;
                }
                if (cd.colors) {
                    keys(cd.colors).forEach(k => {
                        if (s.name && s.name.toString() === k.toString()) {
                            s.color = cd.colors[k];
                        }
                    });
                }
                if (isArray(s.data)) {
                    (<[any]>s.data).forEach((d, i) => {
                        if (d && (d.name === o.serie || !o.serie && d.name === o._id) && !d.color) {
                            d.color = o.color;
                            d.index = d.index || 0;
                            d.index = -o.index;
                            d.legendIndex = o.index;
                        }
                        if (cd.colors) {
                            keys(cd.colors).forEach(k => {
                                if (d.name && d.name.toString() === k.toString()) {
                                    d.color = cd.colors[k];
                                }
                            });
                        }
                    });
                }
            });
            if (cd.showCumulate) {
                //let serieData = cloneDeep((<any>s.data));
                for (let i = 1; i < s.data.length; i++) {
                    (<any>s.data)[i].y += (<any>s.data[i - 1]).y || 0;
                }
            }
        });
        this.applyAreaSplineGradients(cd, config);
        this.applySubtitleSum(config);
        this.applyLegendState(config, cd);
        return config;
    }

    isChartEmpty(config: Highcharts.Options) {
        if (!config.series || (config.series.length === 1 && (!config.series[0].data || config.series[0].data.length === 0))) {
            return true;
        }
        return false;
    }

    getChartEmptyImage(config: Highcharts.Options) {
        let emptyImage: string = './images/empty-states/speedometer.svg';
        if (config && config.chart && config.chart.type) {
            switch (config.chart.type) {
                case 'line':
                    emptyImage = '../kpi/lines.svg';
                    break;
                case 'spline':
                    emptyImage = '../kpi/splines.svg';
                    break;
                case 'area':
                    emptyImage = '../kpi/splineroyal.svg';
                    break;
                case 'areaspline':
                    emptyImage = '../kpi/splineroyal.svg';
                    break;
                case 'column':
                    emptyImage = '../kpi/column.svg';
                    break;
                case 'bar':
                    emptyImage = '../kpi/column.svg';
                    break;
                case 'radar':
                case 'treemap':
                case 'pie':
                case 'doughnut':
                default:
                    emptyImage = '../kpi/pie.svg';
                    break;
            }
        }
        return emptyImage;
    }

    getURL(svg, width, height, options?) {
        let type = 'image/png';
        let config = {
            filename: options ? options.filename : null,
            type: type,
            async: true,
            scale: 2,
            width: width * 2,
            height: height * 2,
            svg: svg
        };
        let exportUrl = 'https://export.highcharts.com/';
        return this.rq.postMultiPart(exportUrl, config).pipe(mergeMap(res => {
            let url = exportUrl + res;
            return this.rq.getBinaryContent(url);
        }), mergeMap(arrayBuffer => {
            let blob = new Blob([arrayBuffer], { type });
            return from(this.broker.upload(blob));
        }), map(url => {
            return url;
        }));
    }

    formatSVGs(svgs: Array<string>, maxHeight: number | string, pdfRowWidth: number = 1200) {
        svgs = [].concat(svgs);
        let svg;
        if (svgs.length === 1) {
            svg = svgs[0];
        } else {
            svg = '<svg height="' + maxHeight + '" width="' + pdfRowWidth + '" version="1.1" xmlns="http://www.w3.org/2000/svg">';
            svg += svgs.join('');
            svg += '</svg>';
        }
        return svg.replace(/visby/ig, 'Verdana').replace(/text-shadow/ig, 'ttext-shadow').replace(/class="highcharts-text-outline" fill="#000000" stroke="#000000" stroke-width="2px"/ig, 'class="highcharts-text-outline" fill="#7F8FA4" stroke="#7F8FA4" stroke-width="1px"');
    }

    exportAll(options, svgs: Array<string>, maxHeight, pdfRowWidth: number = 1200) {
        let svg = this.formatSVGs(svgs, maxHeight);
        options = merge({ 'type': 'image/png', 'url': 'https://export.highcharts.com/', 'printMaxWidth': 780, 'scale': 2, 'buttons': { 'contextButton': { 'className': 'highcharts-contextbutton', 'menuClassName': 'highcharts-contextmenu', 'symbol': 'menu', '_titleKey': 'contextButtonTitle', 'menuItems': [{ 'textKey': 'printChart' }, { 'separator': true }, { 'textKey': 'downloadPNG' }, { 'textKey': 'downloadJPEG' }, { 'textKey': 'downloadSVG' }, { 'textKey': 'downloadPDF' }] } }, 'libURL': 'https://code.highcharts.com/5.0.10/lib/' }, options);
        this.rq.postRaw('https://export.highcharts.com', {
            filename: options.filename || 'chart',
            type: options.type,
            scale: 1,
            width: pdfRowWidth,
            //height: this.PDF_ROW_HEIGHT,
            svg: svg
        }, true).subscribe((res) => {
            if (res && res.body) {
                this.rq.saveArrayBuffer(res.body, (options.filename || 'chart') + '.pdf');
            }
        });
    }

    protected applyAreaSplineGradients(cd: ChartDefinition, config: Highcharts.Options) {
        if (config.chart && config.chart.type === 'areaspline') {
            let palette = this.getPalette(cd);
            config.series.forEach((s, i) => {
                (<any>s).fillColor = {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [[0, s.color || palette[i % (palette.length - 1)]], [1, 'rgba(255,255,255,0)']]
                };
            });
        }
    }

    protected applySubtitleSum(config: Highcharts.Options) {
        if (config.chart && config.chart.type === 'areaspline' && config.series.length === 1) {
            let subtitleSum = sumBy((<any>config.series[0].data), (d) => d[1]);
            if (subtitleSum) {
                config.subtitle = { text: subtitleSum.toLocaleString(), style: defaultsDeep({ fontSize: '18px', fontWeight: 300, color: Colors.text }, this.textStyle), align: 'right' };
            }
        }
    }

    protected applyLegendState(config: Highcharts.Options, cd: ChartDefinition) {
        if (cd.chartLegendState) {
            forEach(config.series, (s: any) => {
                if (s && s.name === false) {
                    s.visible = false;
                }
                if (isArray(s.data)) {
                    (<[any]>s.data).forEach((d, i) => {
                        if (d && cd.chartLegendState[d.name] === false) {
                            d.visible = false;
                        }
                    });
                }
            });
        }
    }

    protected addCorelationLine(data: Array<{ x: number; y: number }>, config: Highcharts.Options) {
        let n = data.length;
        let sx = sum(data.map(d => d.x));
        let sy = sum(data.map(d => d.y));
        let sxy = sum(data.map(d => d.x * d.y));
        let sx2 = sum(data.map(d => d.x * d.x));
        let a = (n * sxy - (sx) * (sy)) / (n * sx2 - sx * sx);
        let b = (sy - a * (sx)) / n;
        let minx = min(data.map(d => d.x));
        let maxx = max(data.map(d => d.x));

        config.series.push(<any>{
            type: 'line',
            name: 'Regression',
            color: Colors.dark,
            data: [[minx, a * minx + b], [maxx, a * maxx + b]],
            marker: { enabled: false },
            enableMouseTracking: false
        });
    }

    protected setHCChartType(cd: ChartDefinition): Highcharts.Options {
        let config: Highcharts.Options = this.getHCDefaultConfig(cd);
        switch (cd.type) {
            case 'line':
                config = merge(config, this.getHCDefaultLine(cd));
                break;
            case 'spline':
                config = merge(config, this.getHCDefaultSpline(cd));
                break;
            case 'area':
                config = merge(config, this.getHCDefaultArea(cd));
                break;
            case 'areaspline':
                config = merge(config, this.getHCDefaultAreaSpline(cd));
                break;
            case 'bar':
                config = merge(config, this.getHCDefaultBar(cd));
                break;
            case 'column':
                config = merge(config, this.getHCDefaultColumn(cd));
                break;
            case 'heatmap':
                config = merge(config, this.getHCDefaultHeatmap(cd));
                break;
            case 'doughnut':
                config = merge(config, this.getHCDefaultDoughnut(cd));
                break;
            case 'pie':
                config = merge(config, this.getHCDefaultPie(cd));
                break;
            case 'radar':
                config = merge(config, this.getHCDefaultRadar(cd));
                break;
            case 'treemap':
                config = merge(config, this.getHCDefaultTreemap(cd));
                break;
            case 'scatter':
                config = merge(config, this.getHCDefaultScatter(cd));
                break;
        }
        config.legend.enabled = cd.showLegend === true;
        if (cd.marginBottom) {
            config.chart.marginBottom = cd.marginBottom;
        }
        if (cd.legendVerticalAlign) {
            config.legend.verticalAlign = cd.legendVerticalAlign;
        }
        if (cd.legendAlign) {
            config.legend.align = cd.legendAlign;
        }
        if (cd.legendWidth) {
            config.legend.width = cd.legendWidth;
            config.legend.itemMarginBottom = 5;
        }
        // if (cd.hideAxis) {
        //     config.chart.marginTop = -5;
        //     config.chart.marginLeft = -5;
        //     config.chart.marginRight = -5;
        //     config.chart.marginBottom = -5;
        // }

        delete config.chart.margin;
        delete config.chart.marginTop;
        delete config.chart.marginLeft;
        delete config.chart.marginRight;
        delete config.chart.marginBottom;

        if (cd.showLabelsY === false && config.yAxis && (<any>config.yAxis).labels) {
            (<any>config.yAxis).labels.enabled = false;
        }
        //config.title.text = cd.title;
        return config;
    }

    protected setHCUseDates(config: Highcharts.Options) {
        config.xAxis = config.xAxis || {};
        config.chart.zoomType = 'x';
        config.chart.panning = true;
        config.chart.panKey = 'shift';
        //delete config.tooltip.formatter;
        (<any>config.xAxis).type = 'datetime';
    }

    protected getPalette(cd: ChartDefinition) {
        switch (cd.palette) {
            case 'palette1':
                return this.palette1;
            case 'palette2':
                return this.palette2;
            case 'palette3':
                return this.palette3;
            default:
                return this.palette0;
        }
    }

    protected getNumberFormat(cd: ChartDefinition) {
        if (cd.numberPrecision && cd.numberPrecision >= 1) {
            return '1.0-' + (Math.floor(cd.numberPrecision) || 0);
        }
        return '1.0-0';

    }

    protected getHCDefaultConfig(cd: ChartDefinition): Highcharts.Options {
        let chartService = this;
        return <any>{
            title: { text: cd.title, style: defaultsDeep({ fontSize: '14px', fontWeight: 400, color: Colors.text }, this.textStyle), align: 'right' },
            chart: {
                style: { fontFamily: 'Lato' },
                backgroundColor: null,
                resetZoomButton: {
                    theme: {
                        fill: 'white', stroke: Colors.text, style: this.textStyle
                    }
                }
            },
            xAxis: cd.type === 'radar' ? { labels: { style: defaultsDeep({ color: Colors.text }, this.textStyle) } } : {
                visible: !cd.hideAxis,
                lineWidth: cd.hideAxis ? 0 : 1, lineColor: this.lineColor, gridLineWidth: 0, //padding: 0,
                gridLineColor: this.gridLineColor, tickWidth: 0, labels: {
                    autoRotation: [-90],
                    padding: 10,
                    style: defaultsDeep({ color: Colors.text }, this.textStyle)
                },
                max: cd.maxX
            },
            yAxis: cd.type === 'radar' ? { labels: { style: defaultsDeep({ color: Colors.text }, this.textStyle) } } : {
                visible: !cd.hideAxis,
                title: '', lineWidth: cd.hideAxis ? 0 : 1, lineColor: this.lineColor,
                gridLineWidth: cd.hideAxis ? 0 : 1, gridLineColor: this.gridLineColor, //padding: 0,
                labels: { style: defaultsDeep({ color: Colors.text }, this.textStyle) }, endOnTick: false, maxPadding: 0.2,
                max: cd.maxY
            },
            colors: this.getPalette(cd),
            legend: {
                enabled: false, itemStyle: defaultsDeep({ fontSize: '14px', lineHeight: '14px', fontWeight: 400, color: Colors.text }, this.textStyle),
                labelFormatter: function () {
                    let retVal = '';

                    if (this.yData && this.yData.length > 0) {
                        let total = 0;
                        if (cd.showCumulate) {
                            total = <any>max(this.yData);
                        } else if (!cd.legendValue || cd.legendValue === 'sum') {
                            total = sum(this.yData);
                        } else if (cd.legendValue === 'avg') {
                            total = sum(this.yData) / this.yData.length;
                        } else if (cd.legendValue === 'min') {
                            total = <any>min(this.yData);
                        } else if (cd.legendValue === 'max') {
                            total = <any>max(this.yData);
                        }
                        retVal = this.name + ': ' + chartService.decimalPipe.transform(total, chartService.getNumberFormat(cd));
                    } else if (this.y) {
                        retVal = this.name + ': ' + chartService.decimalPipe.transform(this.y, chartService.getNumberFormat(cd));
                    } else {
                        retVal = this.name;
                    }
                    if (cd.unit) {
                        retVal += ' ' + cd.unit;
                    }
                    return retVal;
                }
            },
            plotOptions: {
                series: <any>{
                    turboThreshold: 0,
                    groupPadding: 0,
                    pointPadding: cd.pointPadding || (cd.colorByPoint ? 0 : 0.1),
                    stacking: cd.stacked,
                    allowPointSelect: cd.allowPointSelect || false,
                    marker: {
                        enabled: true,
                        states: { select: { fillColor: Colors.balanceddark } }
                    },
                    states: { select: { color: Colors.balanceddark } },
                    animation: !this.coreConfig.isWeb()
                }
            },
            credits: { enabled: false },
            exporting: { enabled: false },
            tooltip: {
                followTouchMove: false,
                style: defaultsDeep({}, this.textStyle),
                backgroundColor: Colors.stable,
                borderRadius: 0,
                shadow: false,
                borderColor: this.lineColor,
                useHTML: false,
                formatter: function () {
                    let name = (this.series ? this.series.name : '') || '';
                    if (name && name !== ' ') {
                        name += '<br/>';
                    }
                    let t = name + (this.x ? (cd.groupByDate ? moment(this.x).format('L') : this.x) + ': ' : this.key + ': ' || '') + chartService.decimalPipe.transform(this.y, chartService.getNumberFormat(cd));
                    if (cd.stacked === 'percent') {
                        t += '<br/>' + Math.round(this.percentage) + ' %';
                    } else if (cd.unit) {
                        t += ' ' + cd.unit;
                    }
                    if (cd.type === 'scatter') {
                        t += '<br/>' + this.point.name;
                    }
                    return t;
                }
            }
        };
    }

    protected getDataLabelFormatter(cd: ChartDefinition) {
        let chartService = this;
        return function () {
            if ((cd.stacked === 'percent' && this.percentage > 0) || (cd.stacked !== 'percent' && Math.abs(this.y) >= 0)) {
                let t = cd.stacked === 'percent' ? Math.round(this.percentage) + ' %' : chartService.decimalPipe.transform(this.y, chartService.getNumberFormat(cd));
                if (cd.unit && t) {
                    t += ' ' + cd.unit;
                }
                if (!t) {
                    t = '';
                }
                if (cd.showDelta && this.series && isArray(this.series.data)) {
                    let index = findIndex(this.series.data, (point: any) => point.x === this.x);
                    if (index > 0 && Math.abs(this.series.data[index - 1].y) > 0) {
                        let delta = Math.round(100 * (this.series.data[index].y - this.series.data[index - 1].y) / this.series.data[index - 1].y);
                        t += '<br/><g>(' + delta + '%)</g>'; //'<br/><g style="color:' + (delta > 0 ? Colors.balanced : Colors.assertive) + '"> ('
                    }
                }
                return t;
            }
            return '';
        };
    }

    protected useContrast(cd: ChartDefinition) {
        return Colors.isDarkTheme() ? false : cd && cd.type !== 'spline' && cd.type !== 'areaspline' && cd.type !== 'line' && cd.type !== 'area';
    }

    protected getDataLabels(cd: ChartDefinition) {
        return {
            enabled: cd.showValues !== false, useHTML: false, style: defaultsDeep({ color: this.useContrast(cd) ? 'contrast' : Colors.text }, this.textStyle),
            formatter: this.getDataLabelFormatter(cd)
        };
    }

    protected getHCDefaultLine(cd: ChartDefinition): Highcharts.Options {
        return {
            chart: { type: 'line', marginTop: 10 },
            plotOptions: {
                line: {
                    //connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    }

    protected getHCDefaultSpline(cd: ChartDefinition): Highcharts.Options {
        return {
            chart: { type: 'spline', marginTop: 10 },
            plotOptions: {
                spline: {
                    //connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                },
                series: {
                    marker: <any>{ enabled: true, fillOpacity: 0.5, fillColor: Colors.light, lineWidth: 2, lineColor: null }
                }
            }
        };
    }

    protected getHCDefaultArea(cd: ChartDefinition): Highcharts.Options {
        return {
            chart: { type: 'area', marginTop: 10 },
            plotOptions: {
                area: {
                    connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    }

    protected getHCDefaultAreaSpline(cd: ChartDefinition): Highcharts.Options {
        return {
            chart: { type: 'areaspline', marginTop: 30 },
            plotOptions: {
                areaspline: {
                    connectNulls: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    }

    protected getHCDefaultColumn(cd: ChartDefinition): Highcharts.Options {
        return {
            chart: { type: 'column', marginTop: 10, marginBottom: (cd.showLegend ? 30 : 30) },
            plotOptions: {
                column: {
                    borderRadius: 0, borderWidth: 0, colorByPoint: cd.colorByPoint, shadow: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    }

    protected getHCDefaultHeatmap(cd: ChartDefinition): Highcharts.Options {
        return {
            chart: { type: 'heatmap', marginTop: 10 }
        };
    }

    protected getHCDefaultBar(cd: ChartDefinition): Highcharts.Options {
        return {
            chart: { type: 'bar', marginTop: 10 },
            plotOptions: {
                bar: {
                    borderRadius: 0, borderWidth: 0, colorByPoint: cd.colorByPoint, shadow: false,
                    dataLabels: this.getDataLabels(cd)
                }
            }
        };
    }

    protected getHCDefaultPie(cd: ChartDefinition): Highcharts.Options {
        return {
            title: { style: { color: 'transparent' } },
            chart: { type: 'pie' },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    size: '90%',
                    borderWidth: 0,
                    //innerSize: '10%',
                    //minSize: 30,
                    dataLabels: {
                        enabled: cd.showValues !== false, useHTML: false, style: defaultsDeep({}, this.textStyle),
                        format: '{point.y:.0f} ({point.percentage:.0f} %)', //<b>{point.name}</b>:
                        distance: 5
                    },
                    showInLegend: true
                }
            }
        };
    }

    protected getHCDefaultDoughnut(cd: ChartDefinition): Highcharts.Options {
        return defaultsDeep({
            plotOptions: { pie: { startAngle: -90, endAngle: 90, center: ['50%', '75%'], innerSize: '90%' } }
        }, this.getHCDefaultPie(cd));
    }

    protected getHCDefaultRadar(cd: ChartDefinition): Highcharts.Options {
        return {
            chart: { polar: true, type: 'area' },
            pane: { size: '70%' },
            yAxis: <any>{ gridLineInterpolation: 'polygon', labels: { enabled: false }, lineWidth: 0 },
            xAxis: { tickmarkPlacement: 'on', lineWidth: 0 }
        };
    }

    protected getHCDefaultTreemap(cd: ChartDefinition): Highcharts.Options {
        return {
            chart: { type: 'treemap' },
            colorAxis: {
                minColor: Colors.light,
                maxColor: this.getPalette(cd)[0]
            }
        };
    }

    protected getHCDefaultScatter(cd: ChartDefinition): Highcharts.Options {
        return {
            chart: { type: 'scatter', zoomType: 'xy' },
            xAxis: { gridLineWidth: 1 },
            plotOptions: {
                series: { marker: <any>{ enabled: true, fillOpacity: 0.5 } }
            }
        };
    }

}
