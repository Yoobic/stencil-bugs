import { DecimalPipe } from '@angular/common';
import { Editable, MissionDescription, ChartDefinition, CHART_DATEGROUPINGBY, Broker, Models, ModelExtended, TagGroup } from '@shared/data-core';
import { Translate } from '@shared/translate';

import { BaseKpi } from './kpi.base';
import { CampaignsProgressKpi } from './kpi.campaigns-progress';
import { FormFieldType, Filters } from '@shared/interfaces';

import {
    CellRenderer, exists, ConformityProgressRendererComponent, ConformityRelativeProgressRendererComponent, DefaultRendererComponent, NumberRendererComponent,
    DatetimeRendererComponent, MissionStatusRendererComponent, MissionValidationRendererComponent, ProgressRendererComponent, ValidationProgressRendererComponent
} from '@shared/data-form';

import { Observable, Observer, of } from 'rxjs';
import { merge, isEqual, uniq, intersection, pull } from 'lodash-es';

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsPivotTableKpi' })
export class CampaignsPivotTableKpi extends CampaignsProgressKpi {

    @Editable('CampaignsPivotTableKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.select, visible: false, values: ['LOCATIONTYPE', 'LOCATION', 'LOCATIONTAGS', 'GLOBAL'], translate: true })
    groupBy: string;

    @Editable('CampaignsPivotTableKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.checkbox, title: 'INCLUDETAGS' })
    includeTags: boolean;

    @Editable('CampaignsPivotTableKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.checkbox, title: 'INCLUDEDATA' })
    includeData: boolean;

    @Editable('CampaignsPivotTableKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, collectionName: 'tagGroups', title: 'LEVEL1', flex: 50, mode: 'text', clearable: true })
    tagGroup1: TagGroup;

    @Editable('CampaignsPivotTableKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, collectionName: 'tagGroups', title: 'LEVEL2', flex: 50, mode: 'text', clearable: true })
    tagGroup2: TagGroup;

    @Editable('CampaignsPivotTableKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, collectionName: 'tagGroups', title: 'LEVEL3', flex: 50, mode: 'text', clearable: true })
    tagGroup3: TagGroup;

    @Editable('CampaignsPivotTableKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, collectionName: 'tagGroups', title: 'LEVEL4', flex: 50, mode: 'text', clearable: true })
    tagGroup4: TagGroup;

    @Editable('CampaignsPivotTableKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, multiple: true, translate: true, values: ['finished', 'available'], handleUndefined: true, flex: 50, clearable: true })
    status: Array<string>;

    @Editable('CampaignsPivotTableKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, title: 'GROUPBYDATE', translate: true, flex: 50, values: pull(CHART_DATEGROUPINGBY, 'calendar'), clearable: true })
    dateGrouping?: string;

    public static getChartDefinition(kpi: CampaignsPivotTableKpi, cd: ChartDefinition, translate: Translate) {
        BaseKpi.getChartDefinition(kpi, cd, translate);
        merge(cd, { showAs: 'grid', collectionName: 'missions' });

        cd.kpiColumns = [{
            headerName: translate.get('GROUP'),
            colId: 'group',
            cellRenderer: 'agGroupCellRenderer',
            showRowGroup: true,
            pinned: 'left'
        }, {
            headerName: translate.get('PROGRESS'),
            field: 'progress',
            minWidth: 100,
            cellClass: 'noexpand',
            cellRenderer: 'agGroupCellRenderer',
            showRowGroup: true,
            cellRendererParams: {
                checkbox: false,
                innerRenderer: (params) => ProgressRendererComponent.renderer(params, translate)
            },
            comparator: (valueA, valueB, nodeA, nodeB) => ProgressRendererComponent.comparator(valueA, valueB, nodeA, nodeB)
        }, {
            headerName: translate.get('VALIDATIONPROGRESS'),
            field: 'validationprogress',
            minWidth: 100,
            cellClass: 'noexpand',
            cellRenderer: 'agGroupCellRenderer',
            showRowGroup: true,
            cellRendererParams: {
                checkbox: false,
                innerRenderer: (params) => ValidationProgressRendererComponent.renderer(params, translate)
            },
            comparator: (valueA, valueB, nodeA, nodeB) => ValidationProgressRendererComponent.comparator(valueA, valueB, nodeA, nodeB)
        }, {
            headerName: translate.get('CONFORMITYPROGRESS'),
            field: 'conformityprogress',
            minWidth: 100,
            cellClass: 'noexpand',
            cellRenderer: 'agGroupCellRenderer',
            showRowGroup: true,
            cellRendererParams: {
                checkbox: false,
                innerRenderer: (params) => ConformityProgressRendererComponent.renderer(params, translate)
            },
            comparator: (valueA, valueB, nodeA, nodeB) => ConformityProgressRendererComponent.comparator(valueA, valueB, nodeA, nodeB)
        }, {
            headerName: translate.get('CONFORMITYRELATIVEPROGRESS'),
            field: 'conformityrelativeprogress',
            minWidth: 100,
            cellClass: 'noexpand',
            cellRenderer: 'agGroupCellRenderer',
            showRowGroup: true,
            cellRendererParams: {
                checkbox: false,
                innerRenderer: (params) => ConformityRelativeProgressRendererComponent.renderer(params, translate)
            },
            comparator: (valueA, valueB, nodeA, nodeB) => ConformityRelativeProgressRendererComponent.comparator(valueA, valueB, nodeA, nodeB)
        }, {
            headerName: translate.get('STATUS'),
            field: 'status',
            minWidth: 140,
            cellRenderer: (params) => {
                let value = DefaultRendererComponent.renderer(params);
                return MissionStatusRendererComponent.renderer(value, null, params, translate);
            },
            comparator: (valueA, valueB, nodeA, nodeB) => MissionStatusRendererComponent.comparator(valueA, valueB, nodeA, nodeB)
        }, {
            headerName: translate.get('VALIDITY'),
            field: 'validated',
            minWidth: 140,
            cellRenderer: (params) => {
                let value = DefaultRendererComponent.renderer(params);
                return MissionValidationRendererComponent.renderer(value, null, params, translate);
            },
            comparator: (valueA, valueB, nodeA, nodeB) => MissionValidationRendererComponent.comparator(valueA, valueB, nodeA, nodeB)
        },
        { headerName: translate.get('TITLE'), field: 'title', minWidth: 100 },
        { headerName: translate.get('ADDRESS'), field: 'address', minWidth: 100 },
        { headerName: translate.get('LOCATIONTYPE'), field: 'locationType', minWidth: 100 },
        { headerName: translate.get('LOCATIONID'), field: 'locationId', minWidth: 100 },
        { headerName: translate.get('LOCATIONTITLE'), field: 'locationTitle', minWidth: 100 },
        //{ headerName: translate.get('SCORE'), field: 'score', minWidth: 100 },
        {
            headerName: translate.get('FINISHEDDATE'),
            field: 'finishedDate',
            minWidth: 100,
            cellRenderer: (params) => {
                return DatetimeRendererComponent.renderer(params, BaseKpi.getDateFormatMoment(kpi.dateGrouping));
            }
        }, {
            headerName: translate.get('CREATIONDATE'),
            field: '_ect',
            minWidth: 100,
            cellRenderer: (params) => {
                return DatetimeRendererComponent.renderer(params, BaseKpi.getDateFormatMoment(kpi.dateGrouping));
            }
        },
        { headerName: translate.get('FINISHEDBY'), field: 'owner', minWidth: 100 },
        { headerName: translate.get('CREATEDBY'), field: 'creatorDisplayName', minWidth: 100 },
        { headerName: 'ID', field: '_id', minWidth: 100, hide: true }
        ];

        if (kpi.campaigns) {
            let decimalPipe = new DecimalPipe(translate.getCurrentAngularLocale());
            kpi.campaigns.forEach(c => {
                if (c.scoring) {
                    c.scoring.forEach(s => {
                        if (s.isActive !== true) {
                            cd.kpiColumns.push({
                                headerName: translate.polyglot(s.title),
                                field: 'extraScores.' + s.title + '.value',
                                minWidth: 100,
                                cellRenderer: (params) => {
                                    return NumberRendererComponent.renderer(params, null, params, translate, decimalPipe, kpi.numberPrecision);
                                }
                            });
                        } else {
                            cd.kpiColumns.push({
                                headerName: translate.polyglot(s.title),
                                field: 'score', minWidth: 100,
                                cellRenderer: (params) => {
                                    return NumberRendererComponent.renderer(params, null, params, translate, decimalPipe, kpi.numberPrecision);
                                }
                            });
                        }
                    });
                }
            });
        }
    }

    public static getInitialProject(kpi: CampaignsPivotTableKpi) {
        let aggregateOptions: Array<any> = [];
        if (kpi.validatedOnly) {
            aggregateOptions.push({ '$match': { 'validated': { '$eq': true } } });
        } else if (kpi.ignoreRejected) {
            aggregateOptions.push({ '$match': { 'validated': { '$ne': false } } });
        }
        return aggregateOptions;
    }

    public static getAggregate(kpi: CampaignsPivotTableKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let collectionName = 'missions';
        let filters: Filters = new Array(new Array());
        BaseKpi.setCampaignFilters(kpi.campaigns, kpi.campaignTags, filters, kpi.missionType);

        let aggregateOptions: Array<any> = this.getInitialProject(kpi);
        let dates = BaseKpi.getDates(kpi);
        BaseKpi.setDateFilters(filters, dates, kpi.useCreationDate ? '_ect' : 'finishedDate', isEqual(['finished'], kpi.status));
        BaseKpi.setLocationTagsFilters(filters, kpi.locationTags);
        BaseKpi.setUserTagsFilters(filters, kpi.userTags);

        let format: string;
        if (kpi.dateGrouping) {
            format = BaseKpi.getDateFormat(kpi.dateGrouping);
        }

        if (kpi.missionType !== 'poll') {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' }
            ]);
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locationtypes', 'localField': 'location.typeRef', 'foreignField': '_id', 'as': 'locationType' } },
                { '$unwind': '$locationType' }
            ]);
        }

        aggregateOptions = aggregateOptions.concat([
            { '$lookup': { 'from': 'user', 'localField': 'ownerRef', 'foreignField': '_id', 'as': 'owner' } }
        ]);

        let project: any = {
            '_id': 1,
            'title': 1,
            'address': 1,
            'validated': 1,
            'status': { '$cond': { 'if': { '$eq': ['$status', 'finished'] }, then: 'finished', else: 'available' } },
            'ownerDisplayName': 1,
            'creatorDisplayName': 1,
            'owner': { '$slice': ['$owner', 1] },
            'finishedDate': format ? { '$dateToString': { 'format': format, 'date': '$finishedDate' } } : 1,
            '_ect': 1,
            'score': '$score.value',
            'extraScores': 1,
            'locationId': '$location.clientid',
            'locationTitle': '$location.title',
            'locationType': '$locationType.name'
        };
        if (kpi.includeTags) {
            project.locationTags = '$location.tags';
        }
        aggregateOptions = aggregateOptions.concat([{ '$project': project }]);

        if (kpi.status && kpi.status.length > 0) {
            aggregateOptions.push({ '$match': { 'status': { '$in': kpi.status } } });
        }

        project = {
            '_id': 1,
            'title': 1,
            'address': 1,
            'validated': 1,
            'status': 1,
            'ownerDisplayName': 1,
            'creatorDisplayName': 1,
            'owner': { '$ifNull': ['$owner.username', 'ownerDisplayName'] },
            'finishedDate': 1,
            '_ect': 1,
            'score': 1,
            'extraScores': 1,
            'locationTitle': 1,
            'locationId': 1,
            'locationType': 1,
            'locationTags': 1
        };
        aggregateOptions = aggregateOptions.concat([{ '$project': project }]);

        if (kpi.includeData) {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'missiondatas', 'localField': '_id', 'foreignField': 'missionRef', 'as': 'data' } }
            ]);
        }
        let mapTransform = this.getMapTransform(kpi, translate, cloudinaryPipe);
        return { collectionName, aggregateOptions, filters, mapTransform, mapTransformAsync: true };
    }

    public static getMapTransform(kpi: CampaignsPivotTableKpi, translate: Translate, cloudinaryPipe?: any) {
        let mapTransform: any = (retVal: Array<{ _id: string; title: string; locationTags: Array<string>; status: string; ownerDisplayName: string; validated: any }>, cd: ChartDefinition, broker: Broker, component: any) => {
            return new Observable<any>((observer: Observer<any>) => {
                let obs: any = kpi.includeData && kpi.campaigns ?
                    broker.getAll('missiondescriptions', ['slides', 'scoring'], null, null, [
                        [{
                            field: '_id',
                            operator: { _id: 'inq' },
                            value: kpi.campaigns.map(c => c._id)
                        }]
                    ]) : of(null);

                obs.subscribe((slidesRet: any) => {
                    retVal.map(mission => {
                        if (mission.validated === true) {
                            mission.validated = 'validated';
                        } else if (mission.validated === false) {
                            mission.validated = 'rejected';
                        } else {
                            mission.validated = 'tobevalidated';
                        }
                        if (mission.status === 'available') {
                            delete mission.ownerDisplayName;
                        }
                        if (mission.status !== 'finished') {
                            delete mission.validated;
                            delete mission.ownerDisplayName;
                        }
                    });
                    for (let i = 1; i <= 5; i++) {
                        let columnName = 'tagGroup' + i;
                        if (kpi[columnName] && kpi[columnName].tags) {
                            let tags = uniq(kpi[columnName].tags);
                            retVal.map(mission => {
                                let tag = intersection(mission.locationTags, tags);
                                if (tag && tag.length > 0) {
                                    mission[columnName] = tag[0];
                                } else {
                                    mission[columnName] = translate.get('OTHER1');
                                }
                            });
                            cd.kpiColumns.push({ enableRowGroup: true, enablePivot: true, headerName: translate.get('LEVEL' + i), field: columnName, minWidth: 100, hide: true });
                        }
                    }

                    let fields = [];
                    if (slidesRet && slidesRet.data) {
                        slidesRet.data.map((campaign: MissionDescription) => {
                            campaign.slides.map(slide => {
                                slide.items.map(field => {
                                    if (field.type !== FormFieldType.information) {
                                        fields.push(field);
                                        let col = CellRenderer.getColumnDefinition(field, translate, null, null, component);
                                        //col.aggFunc = 'countValues';
                                        cd.kpiColumns.push(col);
                                    }
                                });
                            });
                        });
                    }

                    cd.kpiColumns.map(c => {
                        c.enableRowGroup = true;
                        c.enablePivot = true;
                        c.enableValue = true;
                        c.suppressSorting = false;
                    });

                    retVal.map((mission: any) => {
                        if (mission.data && mission.data.length > 0) {
                            fields.map(field => {
                                let fieldName = Models.getFieldName(field);
                                let data = mission.data[0];
                                if (data && data[fieldName] && exists(data[fieldName].value)) {
                                    mission[fieldName] = data[fieldName].value;
                                }
                            });
                        }
                        delete (<any>mission).data;
                    });

                    observer.next(retVal);
                    observer.complete();
                });
            });
        };
        return mapTransform;
    }
}
