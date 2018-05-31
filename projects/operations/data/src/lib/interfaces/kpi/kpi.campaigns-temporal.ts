import { Editable, Broker, ModelExtended, ChartDefinition } from '@shared/data-core';
import { Translate } from '@shared/translate';

import { FormFieldType, Filters } from '@shared/interfaces';
import { CampaignsProgressKpi } from './kpi.campaigns-progress';
import { BaseKpi } from './kpi.base';

import { merge, isObject, uniq, concat, keys, compact, flatten, forEach } from 'lodash-es';

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsTemporalProgressKpi' })
export class CampaignsTemporalProgressKpi extends CampaignsProgressKpi {

    @Editable('CampaignsTemporalProgressKpi', { tab: 'ADVANCED', tabIndex: 2, flex: 50, type: FormFieldType.checkbox })
    ignoreRejected: boolean;

    @Editable('CampaignsTemporalProgressKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.checkbox, flex: 50 })
    showDelta: boolean;

    @Editable('CampaignsTemporalProgressKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.checkbox, flex: 50 })
    showCumulate: boolean;

    @Editable('CampaignsTemporalProgressKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.checkbox, flex: 50, title: 'SHOWTIMESLIDER' })
    showTimeSlider: boolean;

    @Editable('CampaignsTemporalProgressKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.checkbox, flex: 50, condition: 'groupBy=="GLOBAL"' })
    groupByCampaign: boolean;

    @Editable('CampaignsTemporalProgressKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.checkbox })
    splitSeriesInCharts: boolean;

    @Editable('CampaignsTemporalProgressKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, flex: 100, values: ['chart', 'grid', 'calendar'], translate: true })
    showAs: string;

    public static getChartDefinition(kpi: CampaignsTemporalProgressKpi, cd: ChartDefinition, translate: Translate) {
        BaseKpi.getChartDefinition(kpi, cd, translate);
        merge(cd, {
            type: kpi.chartType || (kpi.groupBy !== 'GLOBAL' ? 'column' : 'areaspline'),
            palette: cd.palette || 'palette0',
            groupByDate: true,
            showAs: kpi.showAs || 'chart',
            collectionName: 'missions'
        });

        cd.stacked = 'normal';
        cd.splitSeriesInCharts = kpi.splitSeriesInCharts; // kpi.groupBy !== 'GLOBAL';
        cd.showDelta = kpi.showDelta;
        cd.showCumulate = kpi.showCumulate;

        cd.dateGrouping = 'day';
        switch (kpi.groupBySlider.toString()) {
            case '1':
            case 'week':
                cd.dateGrouping = 'week';
                break;

            case '2':
            case 'month':
                cd.dateGrouping = 'month';
                cd.type = kpi.chartType || 'column';
                break;

            case '3':
            case 'quarter':
                cd.dateGrouping = 'quarter';
                cd.type = kpi.chartType || 'column';
                break;

            case '4':
            case 'year':
                cd.dateGrouping = 'year';
                cd.type = kpi.chartType || 'column';
                break;
        }

        if (kpi.groupBy !== 'GLOBAL') {
            cd.groupByCampaign = true;
        } else {
            cd.groupByCampaign = kpi.groupByCampaign;
        }
    }

    public static getInitialProject(kpi: CampaignsTemporalProgressKpi) {
        let format = BaseKpi.getDateFormat(kpi.groupBySlider);
        let project: any;
        let match: any;
        if (kpi.useCreationDate) {
            project = <any>{ '_id': 1, 'date': { '$dateToString': { 'format': format, 'date': '$_ect' } }, 'locationRef': 1, 'title': 1 };
            match = <any>{ '_ect': { '$type': 9 } };
        } else {
            project = <any>{ '_id': 1, 'date': { '$dateToString': { 'format': format, 'date': '$finishedDate' } }, 'locationRef': 1, 'title': 1 };
            match = <any>{ 'status': 'finished', 'finishedDate': { '$type': 9 } };
            if (kpi.validatedOnly) {
                match.validated = { '$eq': true };
            } else if (kpi.ignoreRejected) {
                match.validated = { '$ne': false };
            }
        }

        project.status = { '$cond': { 'if': { '$eq': ['$validated', true] }, then: 'validated', else: 'rejected' } };
        let aggregateOptions: Array<any> = [];
        if (match) {
            aggregateOptions.push({ '$match': match });
        }
        aggregateOptions.push({ '$project': project });

        return aggregateOptions;
    }

    public static getAggregate(kpi: CampaignsTemporalProgressKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let collectionName = 'missions';
        let filters: Filters = new Array(new Array());
        BaseKpi.setCampaignFilters(kpi.campaigns, kpi.campaignTags, filters, kpi.missionType);
        let aggregateOptions: Array<any> = this.getInitialProject(kpi);
        let dates = BaseKpi.getDates(kpi);
        BaseKpi.setDateFilters(filters, dates, kpi.useCreationDate ? '_ect' : 'finishedDate', false);
        BaseKpi.setLocationTagsFilters(filters, kpi.locationTags);
        BaseKpi.setUserTagsFilters(filters, kpi.userTags);

        let groupId;
        let tagGroupName = 'tagGroup' + kpi.levelSlider;
        if (kpi.groupBy === 'LOCATIONTAGS' && kpi[tagGroupName] && kpi[tagGroupName].tags && kpi[tagGroupName].tags.length > 0) {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$project': { '_id': 1, 'date': 1, 'tags': '$location.tags', 'status': 1 } },
                { '$unwind': '$tags' },
                { '$match': { 'tags': { '$in': kpi[tagGroupName].tags } } }
            ]);
            groupId = { 'date': '$date', 'title': '$tags' };
        } else if (kpi.groupBy === 'LOCATION') {
            if (kpi.locations && kpi.locations.length > 0) {
                filters[0].push({ field: 'locationRef', operator: { _id: 'inq' }, value: kpi.locations.map(c => c._id) });
            }
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' }
            ]);
            groupId = { 'date': '$date', title: '$location.title' };
        } else if (kpi.groupBy === 'LOCATIONTYPE') {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$lookup': { 'from': 'locationtypes', 'localField': 'location.typeRef', 'foreignField': '_id', 'as': 'locationType' } },
                { '$unwind': '$locationType' }
            ]);
            groupId = { 'date': '$date', title: '$locationType.name' };
        } else {//if (kpi.groupBy === 'GLOBAL') {
            if (kpi.groupBy === 'CAMPAIGN') {
                groupId = { 'date': '$date', title: '$title' };
            } else {
                groupId = '$date';
            }
        }

        if (this.isCustomGroupBy()) {
            if (kpi.groupBy === 'GLOBAL') {
                groupId = { 'date': '$date', 'status': '$status' };
            } else if (isObject(groupId)) {
                (<any>groupId).status = '$status';
            }
        }
        aggregateOptions.push({ '$group': { '_id': groupId, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } });
        aggregateOptions.push({ '$sort': { '_id': 1 } });
        let mapTransform = this.getMapTransform(kpi, translate);
        return { collectionName, aggregateOptions, filters, mapTransform };
    }

    public static isCustomGroupBy() {
        return false;
    }

    public static getMapTransform(kpi: CampaignsTemporalProgressKpi, translate: Translate) {
        let mapTransform = (retVal: Array<{ _id: string; serie?: string; value: number, color?: string }>, cd: ChartDefinition, broker: Broker, component: any) => {
            if (kpi.mapTransform) {
                return kpi.mapTransform(retVal, cd, broker, component);
            }
            return retVal;
        };
        return mapTransform;
    }
}

@ModelExtended({ baseClass: 'CampaignsTemporalProgressKpi', extendedClass: 'CampaignsTemporalValidationKpi' })
export class CampaignsTemporalValidationKpi extends CampaignsTemporalProgressKpi {
    public static getInitialProject(kpi: CampaignsTemporalProgressKpi) {
        let format = BaseKpi.getDateFormat(kpi.groupBySlider);
        let project = <any>{ '_id': 1, 'date': { '$dateToString': { 'format': format, 'date': '$validatedDate' } }, 'locationRef': 1, 'title': 1 };
        let match = <any>{ 'status': 'finished', 'validatedDate': { '$type': 9 } };
        let aggregateOptions: Array<any> = [
            { '$match': match },
            { '$project': project }
        ];
        return aggregateOptions;
    }
}

@ModelExtended({ baseClass: 'CampaignsTemporalProgressKpi', extendedClass: 'CampaignsTemporalPOSKpi' })
export class CampaignsTemporalPOSKpi extends CampaignsTemporalProgressKpi {

    @Editable('CampaignsTemporalPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, flex: 100, values: ['chart', 'grid', 'calendar'], translate: true })
    showAs: string;

    public static getChartDefinition(kpi: CampaignsTemporalPOSKpi, cd: ChartDefinition, translate: Translate) {
        super.getChartDefinition(kpi, cd, translate);
        cd.collectionName = 'locations';
    }

    public static getInitialProject(kpi: CampaignsTemporalPOSKpi) {
        let format = BaseKpi.getDateFormat(kpi.groupBySlider);
        let aggregateOptions: Array<any> = [
            { '$match': { 'status': 'finished', 'finishedDate': { '$type': 9 } } },
            { '$project': { '_id': '$locationRef', 'status': 1, 'locationRef': 1, 'finishedDate': 1 } },
            { '$group': { '_id': { '_id': '$locationRef', 'date': { '$dateToString': { 'format': format, 'date': '$finishedDate' } } } } },
            { '$project': { '_id': '$_id._id', 'locationRef': '$_id._id', 'date': '$_id.date' } }
        ];
        return aggregateOptions;
    }
}

@ModelExtended({ baseClass: 'CampaignsTemporalProgressKpi', extendedClass: 'CampaignsTemporalUserKpi' })
export class CampaignsTemporalUserKpi extends CampaignsTemporalProgressKpi {
    @Editable('CampaignsTemporalUserKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, flex: 100, values: ['chart', 'grid', 'calendar'], translate: true })
    showAs: string;

    public static getChartDefinition(kpi: CampaignsTemporalUserKpi, cd: ChartDefinition, translate: Translate) {
        super.getChartDefinition(kpi, cd, translate);
        cd.collectionName = 'user';
    }

    public static getInitialProject(kpi: CampaignsTemporalUserKpi) {
        let format = BaseKpi.getDateFormat(kpi.groupBySlider);
        let aggregateOptions: Array<any> = [
            { '$match': { 'status': 'finished', 'finishedDate': { '$type': 9 } } },
            { '$project': { '_id': '$ownerRef', 'status': 1, 'ownerRef': 1, 'finishedDate': 1, 'title': 1 } },
            { '$group': { '_id': { '_id': '$ownerRef', 'date': { '$dateToString': { 'format': format, 'date': '$finishedDate' } } } } },
            { '$project': { '_id': '$_id._id', 'ownerRef': '$_id._id', 'date': '$_id.date' } }
        ];
        return aggregateOptions;
    }
}

@ModelExtended({ baseClass: 'CampaignsTemporalProgressKpi', extendedClass: 'CampaignsTemporalLearningCurveKpi' })
export class CampaignsTemporalLearningCurveKpi extends CampaignsTemporalProgressKpi {

    @Editable('CampaignsTemporalLearningCurveKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, flex: 100, values: ['chart', 'grid', 'calendar'], translate: true })
    showAs: string;

    @Editable('CampaignsTemporalLearningCurveKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.checkbox, flex: 50, visible: false })
    showCumulate: boolean;

    public static getChartDefinition(kpi: CampaignsTemporalLearningCurveKpi, cd: ChartDefinition, translate: Translate) {
        super.getChartDefinition(kpi, cd, translate);
        //cd.maxY = 100;
        cd.unit = '%';
        cd.type = 'column';
        cd.stacked = null;
        cd.legendValue = 'avg';
    }

    public static getInitialProject(kpi: CampaignsTemporalLearningCurveKpi) {
        let format = BaseKpi.getDateFormat(kpi.groupBySlider);
        let project = <any>{ '_id': 1, 'date': { '$dateToString': { 'format': format, 'date': '$finishedDate' } }, 'locationRef': 1, 'title': 1 };
        let match = <any>{ 'status': 'finished', 'finishedDate': { '$type': 9 } };

        match.validated = { '$in': [true, false] };
        project.status = { '$cond': { 'if': { '$eq': ['$validated', true] }, then: 'validated', else: 'rejected' } };

        let aggregateOptions: Array<any> = [
            { '$match': match },
            { '$project': project }
        ];
        return aggregateOptions;
    }

    public static isCustomGroupBy() {
        return true;
    }

    public static getProgress(data, key) {
        let value = 0;
        if (data[key].validated > 0 || data[key].rejected > 0) {
            value = Math.round(100 * 100 * (data[key].validated || 0) / ((data[key].validated || 0) + (data[key].rejected || 0))) / 100;
        }
        let color = BaseKpi.getColor(value);
        return { value, color };
    }

    public static getMapTransform(kpi: CampaignsProgressKpi, translate: Translate): any {
        let mapTransform = (retVal: Array<{ _id: { status: string; validation: string } | string; serie?: { status: string; validation: string } | string; value?: number, color?: string; keys: Array<string> }>, cd: ChartDefinition, broker: Broker, component: any) => {
            let data = <{ [key: string]: { validated?: number; rejected?: number; available?: number; finished?: number; keys: Array<string> } }>{};
            let hasSeries = false;

            retVal.map(r => {
                let date = (<any>r._id).date;
                let title = (<any>r._id).title;
                let status = (<any>r._id).status;
                data[date] = data[date] || (<any>{});

                if (!title) {
                    data[date][status] = r.value + (data[date][status] || 0);
                    if (r.keys) {
                        data[date].keys = uniq(concat(data[date].keys, r.keys));
                    }
                } else {
                    hasSeries = true;
                    data[date][title] = data[date][title] || {};
                    data[date][title][status] = r.value + (data[date][title][status] || 0);
                    if (r.keys) {
                        data[date][title].keys = uniq(concat(data[date][title].keys, r.keys));
                    }
                }
            });

            retVal = keys(data).map(date => {
                if (!hasSeries) {
                    let progress = this.getProgress(data, date);
                    return <any>{ _id: date, value: progress.value, color: progress.color, keys: data[date].keys };
                } else {
                    return keys(data[date]).map(key => {
                        let progress = this.getProgress(data[date], key);
                        return <any>{ _id: { date, title: key }, value: progress.value, color: progress.color, keys: data[date][key].keys };
                    });
                }
            });
            return compact(flatten(retVal));

        };
        return mapTransform;
    }
}

@ModelExtended({ baseClass: 'CampaignsTemporalProgressKpi', extendedClass: 'PaymentsTemporalKpi' })
export class PaymentsTemporalKpi extends CampaignsTemporalProgressKpi {

    paymentType: string;

    public static getChartDefinition(kpi: PaymentsTemporalKpi, cd: ChartDefinition, translate: Translate) {
        kpi.showTimeSlider = false;
        super.getChartDefinition(kpi, cd, translate);
        //cd.type = 'splinearea';
    }

    public static getInitialProject(kpi: PaymentsTemporalKpi) {
        kpi.groupBySlider = '2';
        let format = BaseKpi.getDateFormat(kpi.groupBySlider);
        let project = <any>{ '_id': 1, 'date': { '$dateToString': { 'format': format, 'date': '$transactionDate' } }, 'amount': 1 };
        let match = <any>{ 'transactionDate': { '$type': 9 } };
        if (kpi.paymentType) {
            match.type = kpi.paymentType;
        }
        let aggregateOptions: Array<any> = [
            { '$match': match },
            { '$project': project }
        ];
        return aggregateOptions;
    }

    public static getAggregate(kpi: PaymentsTemporalKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let collectionName = 'payments';
        let filters: Filters = new Array(new Array());
        let aggregateOptions: Array<any> = this.getInitialProject(kpi);
        let dates = BaseKpi.getDates(kpi);
        BaseKpi.setDateFilters(filters, dates, 'transactionDate', false);

        let groupId = '$date';

        aggregateOptions.push({ '$group': { '_id': groupId, 'value': { '$sum': '$amount' } } }); //, 'keys': { '$addToSet': '$_id' }
        aggregateOptions.push({ '$sort': { '_id': 1 } });
        let mapTransform = this.getMapTransform(kpi, translate);
        return { collectionName, aggregateOptions, filters, mapTransform };
    }

    public static getMapTransform(kpi: PaymentsTemporalKpi, translate: Translate) {
        let mapTransform = (retVal: Array<{ _id: string; serie?: string; value: number, color?: string }>, cd: ChartDefinition, broker: Broker, component: any) => {
            forEach(retVal, data => {
                if (kpi.paymentType !== 'pharmaone') {
                    data.value = -data.value;
                }
            });
            return retVal;
        };
        return mapTransform;
    }

}
