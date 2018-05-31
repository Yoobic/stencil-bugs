import { Editable, MissionDescription, ChartDefinition, CHART_TYPES, Broker, Models, ModelExtended, TagGroup } from '@shared/data-core';
import { Translate } from '@shared/translate';
import { CellRenderer } from '@shared/data-form';
import { FormFieldType, Filters, IDatesRange, IFormField } from '@shared/interfaces';

import { BaseKpi } from './kpi.base';

import { merge, uniq, concat, keys as _keys, filter, find, countBy, map as map, compact, isNumber, sum, min, max, isArray } from 'lodash-es';

let conditions = { groupByLocation: 'groupBy=="LOCATION"', modeField: 'mode=="FIELD"' };

@ModelExtended({ baseClass: 'BaseKpi', extendedClass: 'CampaignsProgressKpi' })
export class CampaignsProgressKpi extends BaseKpi {

    // @Editable('CampaignsProgressKpi', { tab: 'GENERAL', tabIndex: 1, required: true, type: FormFieldType.autocomplete, values: KPI_TYPES, translate: true })
    // kpiType: string;

    @Editable('CampaignsProgressKpi', { tab: 'GENERAL', tabIndex: 1, required: true, type: FormFieldType.text })
    title: string;

    @Editable('CampaignsProgressKpi', { tab: 'GENERAL', tabIndex: 1, required: false, type: FormFieldType.textarea })
    description: string;

    @Editable('CampaignsProgressKpi', {
        tab: 'GENERAL', tabIndex: 1, type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', multiple: true, required: 'length("campaignTags") < 1' //,
        // filters: [
        //     [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        // ],
        // hiddenFields: ['archived']
    })
    campaigns: Array<MissionDescription>; //gridOptions: { allowQuery: false },

    @Editable('CampaignsProgressKpi', { tab: 'GENERAL', tabIndex: 1, type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', multiple: true, required: 'length("campaigns") < 1', tag: true })
    campaignTags: Array<string>;

    @Editable('CampaignsProgressKpi', { tab: 'GENERAL', tabIndex: 1, type: FormFieldType.autocomplete, collectionName: 'locations', multiple: true, required: false, tag: true })
    locationTags: Array<string>;

    @Editable('CampaignsProgressKpi', { tab: 'GENERAL', tabIndex: 1, type: FormFieldType.autocomplete, collectionName: 'user', multiple: true, required: false, tag: true })
    userTags: Array<string>;

    @Editable('CampaignsProgressKpi', { tab: 'GENERAL', tabIndex: 1, type: FormFieldType.daterange })
    dates: IDatesRange;

    @Editable('CampaignsProgressKpi', { tabIndex: 1, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox })
    ignoreRejected: boolean;

    @Editable('CampaignsProgressKpi', { tabIndex: 1, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox, visible: false })
    validatedOnly: boolean;

    @Editable('CampaignsProgressKpi', { tabIndex: 1, tab: 'GENERAL', title: 'BYVALIDITY', flex: 50, type: FormFieldType.checkbox })
    showValidationStatus: boolean;

    @Editable('CampaignsProgressKpi', { tabIndex: 1, tab: 'GENERAL', title: 'MISSIONTYPE', type: FormFieldType.autocomplete, values: ['mission', 'todo', 'service', 'poll'], translate: true, clearable: true })
    missionType: string;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', flex: 50, type: FormFieldType.checkbox })
    showValues: boolean;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', flex: 50, type: FormFieldType.checkbox })
    showLegend: boolean;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.checkbox, flex: 50, title: 'SHOWLEVELSLIDER' })
    showLevelSlider: boolean;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, flex: 100, values: ['chart', 'grid'], translate: true })
    showAs: string;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, flex: 50, values: ['normal', 'percent'], clearable: true })
    stacked: string;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', title: 'CHARTTYPE', type: FormFieldType.autocomplete, values: CHART_TYPES, flex: 50, translate: true, clearable: true })
    chartType: string;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.checkbox, flex: 50, title: 'LOCKED' })
    locked: boolean;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.checkbox, flex: 50, title: 'LOCKEDDATE' })
    lockedDate: boolean;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, values: ['LOCATIONTYPE', 'LOCATION', 'LOCATIONTAGS', 'GLOBAL', 'CAMPAIGN', 'MISSIONTITLE'], translate: true })
    groupBy: string;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', title: 'LEVEL1', type: FormFieldType.autocomplete, collectionName: 'tagGroups', mode: 'text', clearable: true, flex: 50 })
    tagGroup1: TagGroup;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', title: 'LEVEL2', type: FormFieldType.autocomplete, collectionName: 'tagGroups', mode: 'text', clearable: true, flex: 50 })
    tagGroup2: TagGroup;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', title: 'LEVEL3', type: FormFieldType.autocomplete, collectionName: 'tagGroups', mode: 'text', clearable: true, flex: 50 })
    tagGroup3: TagGroup;

    @Editable('CampaignsProgressKpi', { tabIndex: 2, tab: 'ADVANCED', title: 'LEVEL4', type: FormFieldType.autocomplete, collectionName: 'tagGroups', mode: 'text', clearable: true, flex: 50 })
    tagGroup4: TagGroup;

    @Editable('CampaignsProgressKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.autocomplete, collectionName: 'locations', multiple: true, required: false, condition: conditions.groupByLocation })
    locations: any;

    @Editable('CampaignsProgressKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.checkbox })
    useCreationDate: boolean;

    @Editable('CampaignsProgressKpi', { tab: 'ADVANCED', tabIndex: 2, title: 'UNVALIDATEREASON', type: FormFieldType.checkbox })
    useReasonKey: boolean;

    levelSlider: number;
    groupBySlider: string;
    showTimeSlider: boolean;
    groupByCampaign: boolean;
    mapTransform?: (retVal: Array<{ _id: string; serie?: string; value: number, color?: string }>, cd: ChartDefinition, broker: Broker, component: any) => {};

    public static getChartDefinition(kpi: CampaignsProgressKpi, cd: ChartDefinition, translate: Translate) {
        BaseKpi.getChartDefinition(kpi, cd, translate);
        merge(cd, {
            type: kpi.chartType || (kpi.groupBy === 'GLOBAL' || !kpi.groupBy ? 'pie' : 'bar'),
            stacked: kpi.stacked || 'percent',
            palette: 'palette2',
            showAs: kpi.showAs || 'chart',
            showValues: kpi.showValues,
            collectionName: 'missions'
        });
    }

    public static getInitialProject(kpi: CampaignsProgressKpi) {
        let aggregateOptions: Array<any> = []; //{ '$match': { 'status': { '$ne': 'archived' } } }
        if (kpi.validatedOnly) {
            aggregateOptions.push({ '$match': { 'validated': { '$eq': true } } });
        } else if (kpi.ignoreRejected) {
            aggregateOptions.push({ '$match': { 'validated': { '$ne': false } } });
        }
        if (kpi.showValidationStatus) {
            aggregateOptions.push({ '$project': { '_id': 1, 'status': { '$cond': [{ '$eq': ['$validated', true] }, 'validated', { '$cond': [{ '$eq': ['$validated', false] }, kpi.useReasonKey ? ({ '$ifNull': ['$unvalidatedReasonKey', 'other'] }) : 'rejected', { '$cond': [{ '$eq': ['$status', 'finished'] }, 'tobevalidated', 'available'] }] }] }, 'descriptionRef': 1, 'locationRef': 1, 'title': 1 } });
        } else {
            aggregateOptions.push({ '$project': { '_id': 1, 'status': { '$cond': [{ '$eq': ['$status', 'finished'] }, 'finished', 'available'] }, 'descriptionRef': 1, 'locationRef': 1, 'finishedDate': 1, 'title': 1 } });
        }
        return aggregateOptions;
    }

    public static getAggregate(kpi: CampaignsProgressKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let collectionName = 'missions';
        let filters: Filters = new Array(new Array());
        BaseKpi.setCampaignFilters(kpi.campaigns, kpi.campaignTags, filters, kpi.missionType);
        let aggregateOptions: Array<any> = this.getInitialProject(kpi);
        let dates = BaseKpi.getDates(kpi);
        BaseKpi.setDateFilters(filters, dates, kpi.useCreationDate ? '_ect' : 'finishedDate');
        BaseKpi.setLocationTagsFilters(filters, kpi.locationTags);
        BaseKpi.setUserTagsFilters(filters, kpi.userTags);
        return this.getAggregateGroupBy(collectionName, aggregateOptions, filters, kpi, translate, cloudinaryPipe);
    }

    public static getAggregateGroupBy(collectionName: string, aggregateOptions: Array<any>, filters: Filters, kpi: CampaignsProgressKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let tagGroupName = 'tagGroup' + kpi.levelSlider;
        if (kpi.groupBy === 'LOCATIONTAGS' && kpi[tagGroupName] && kpi[tagGroupName].tags && kpi[tagGroupName].tags.length > 0) {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$project': { '_id': 1, 'status': 1, 'tags': '$location.tags' } },
                { '$unwind': '$tags' },
                { '$match': { 'tags': { '$in': kpi[tagGroupName].tags } } },
                { '$group': { '_id': { 'tags': '$tags', 'status': '$status' }, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.tags', 'serie': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        } else if (kpi.groupBy === 'LOCATION') {
            if (kpi.locations && kpi.locations.length > 0) {
                filters[0].push({ field: 'locationRef', operator: { _id: 'inq' }, value: kpi.locations.map(c => c._id) });
            }
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$project': { '_id': 1, 'status': 1, 'title': '$location.title' } },
                { '$group': { '_id': { 'title': '$title', 'status': '$status' }, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.title', 'serie': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        } else if (kpi.groupBy === 'CAMPAIGN') {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'missiondescription', 'localField': 'descriptionRef', 'foreignField': '_id', 'as': 'missiondescription' } },
                { '$unwind': '$missiondescription' },
                { '$project': { '_id': 1, 'status': 1, 'title': '$missiondescription.title' } },
                { '$group': { '_id': { 'title': '$title', 'status': '$status' }, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.title', 'serie': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        } else if (kpi.groupBy === 'MISSIONTITLE') {
            aggregateOptions = aggregateOptions.concat([
                { '$project': { '_id': 1, 'status': 1, 'title': '$title' } },
                { '$group': { '_id': { 'title': '$title', 'status': '$status' }, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.title', 'serie': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        } else if (kpi.groupBy === 'LOCATIONTYPE') {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$lookup': { 'from': 'locationtypes', 'localField': 'location.typeRef', 'foreignField': '_id', 'as': 'locationType' } },
                { '$unwind': '$locationType' },
                { '$project': { '_id': 1, 'status': 1, 'type': '$locationType.name' } },
                { '$group': { '_id': { 'type': '$type', 'status': '$status' }, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.type', 'serie': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        } else {
            aggregateOptions = aggregateOptions.concat([
                { '$group': { '_id': { 'tags': '$tags', 'status': '$status' }, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        }

        let mapTransform = this.getMapTransform(kpi, translate);
        return { collectionName, aggregateOptions, filters, mapTransform };
    }

    public static getMapTransform(kpi: CampaignsProgressKpi, translate: Translate): any {
        let mapTransform = (retVal: Array<{ _id: string; serie?: string; value?: number, color?: string; index?: number; textColor?: string }>, cd: ChartDefinition, broker: Broker, component: any) => {
            retVal.map(r => {
                let color;
                if (r.serie) {
                    color = CellRenderer.getColor(r.serie);
                    if (color) {
                        r.color = color.value;
                        r.textColor = color.textValue;
                        r.index = color.index;
                    }
                    r.serie = translate.get(r.serie.toUpperCase());
                } else {
                    color = CellRenderer.getColor(r._id);
                    if (color) {
                        r.color = color.value;
                        r.textColor = color.textValue;
                        r.index = color.index;
                    }
                    r._id = translate.get(r._id.toUpperCase());
                }
            });
            return retVal;
        };
        return mapTransform;
    }

}

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsValidationProgressKpi' })
export class CampaignsValidationProgressKpi extends CampaignsProgressKpi {

    @Editable('CampaignsValidationProgressKpi', { tabIndex: 1, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox, visible: false })
    ignoreRejected: boolean;

    public static getInitialProject() {
        let aggregateOptions: Array<any> = [
            { '$match': { 'status': 'finished' } },
            { '$project': { '_id': 1, 'status': { '$cond': [{ '$gt': ['$validated', null] }, 'analyzed', { '$cond': [{ '$ne': ['$status', 'finished'] }, 'available', 'tobevalidated'] }] }, 'locationRef': 1, 'descriptionRef': 1, 'title': 1 } }
        ];
        return aggregateOptions;
    }
}

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsConformityProgressKpi' })
export class CampaignsConformityProgressKpi extends CampaignsProgressKpi {

    @Editable('CampaignsConformityProgressKpi', { tabIndex: 1, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox, visible: false })
    ignoreRejected: boolean;

    public static getInitialProject(kpi: CampaignsConformityProgressKpi) {
        let aggregateOptions: Array<any> = [
            { '$match': { 'status': 'finished', 'validated': { '$exists': true } } },
            { '$project': { '_id': 1, 'status': { '$cond': [{ '$eq': ['$validated', true] }, 'validated', { '$cond': [{ '$eq': ['$validated', false] }, kpi.useReasonKey ? ({ '$ifNull': ['$unvalidatedReasonKey', 'other'] }) : 'rejected', 'tobevalidated'] }] }, 'locationRef': 1, 'descriptionRef': 1, 'title': 1 } }
        ];
        return aggregateOptions;
    }
}

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsAuditProgressKpi' })
export class CampaignsAuditProgressKpi extends CampaignsProgressKpi {

    @Editable('CampaignsAuditProgressKpi', { tabIndex: 1, visible: false, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox })
    ignoreRejected: boolean;

    @Editable('CampaignsAuditProgressKpi', { tabIndex: 1, visible: false, tab: 'GENERAL', title: 'MISSIONTYPE', type: FormFieldType.autocomplete, values: ['mission', 'todo', 'service'], translate: true, clearable: true })
    missionType: string;

    @Editable('CampaignsAuditProgressKpi', { tabIndex: 1, tab: 'GENERAL', title: 'MODE', type: FormFieldType.autocomplete, values: ['satisfactory', 'unsatisfactory', 'nonapplicable'], translate: true, clearable: true })
    mode: string;

    @Editable('CampaignsAuditProgressKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.autocomplete, translate: true, values: ['sum', 'avg', 'min', 'max'] })
    accumulator: string;

    public static getInitialProject(kpi: CampaignsAuditProgressKpi) {
        kpi.mode = kpi.mode || 'satisfactory';
        let aggregateOptions: Array<any> = [
            { '$match': { 'status': 'finished' } },
            { '$lookup': { 'from': 'missiondatas', 'localField': '_id', 'foreignField': 'missionRef', 'as': 'data' } },
            { '$unwind': '$data' },
            { '$project': { '_id': 1, 'status': { '$literal': kpi.mode }, 'locationRef': 1, 'descriptionRef': 1, 'title': 1, 'count': '$data.' + kpi.mode + 'Count' } }
        ];
        return aggregateOptions;
    }

    public static getAggregateGroupBy(collectionName: string, aggregateOptions: Array<any>, filters: Filters, kpi: CampaignsAuditProgressKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let tagGroupName = 'tagGroup' + kpi.levelSlider;
        let value: any = {};
        value['$' + (kpi.accumulator || 'sum')] = '$count';

        if (kpi.groupBy === 'LOCATIONTAGS' && kpi[tagGroupName] && kpi[tagGroupName].tags && kpi[tagGroupName].tags.length > 0) {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$project': { '_id': 1, 'status': 1, 'tags': '$location.tags', 'count': 1 } },
                { '$unwind': '$tags' },
                { '$match': { 'tags': { '$in': kpi[tagGroupName].tags } } },
                { '$group': { '_id': { 'tags': '$tags', 'status': '$status' }, 'value': value, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.tags', 'serie': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        } else if (kpi.groupBy === 'LOCATION') {
            if (kpi.locations && kpi.locations.length > 0) {
                filters[0].push({ field: 'locationRef', operator: { _id: 'inq' }, value: kpi.locations.map(c => c._id) });
            }
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$project': { '_id': 1, 'status': 1, 'title': '$location.title', 'count': 1 } },
                { '$group': { '_id': { 'title': '$title', 'status': '$status' }, 'value': value, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.title', 'serie': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        } else if (kpi.groupBy === 'CAMPAIGN') {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'missiondescription', 'localField': 'descriptionRef', 'foreignField': '_id', 'as': 'missiondescription' } },
                { '$unwind': '$missiondescription' },
                { '$project': { '_id': 1, 'status': 1, 'title': '$missiondescription.title' } },
                { '$group': { '_id': { 'title': '$title', 'status': '$status' }, 'value': value, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.title', 'serie': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        } else if (kpi.groupBy === 'MISSIONTITLE') {
            aggregateOptions = aggregateOptions.concat([
                { '$project': { '_id': 1, 'status': 1, 'title': '$title', 'count': 1 } },
                { '$group': { '_id': { 'title': '$title', 'status': '$status' }, 'value': value, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.title', 'serie': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        } else if (kpi.groupBy === 'LOCATIONTYPE') {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$lookup': { 'from': 'locationtypes', 'localField': 'location.typeRef', 'foreignField': '_id', 'as': 'locationType' } },
                { '$unwind': '$locationType' },
                { '$project': { '_id': 1, 'status': 1, 'type': '$locationType.name', 'count': 1 } },
                { '$group': { '_id': { 'type': '$type', 'status': '$status' }, 'value': value, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.type', 'serie': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        } else {
            aggregateOptions = aggregateOptions.concat([
                { '$group': { '_id': { 'tags': '$tags', 'status': '$status' }, 'value': value, 'keys': { '$addToSet': '$_id' } } },
                { '$project': { '_id': '$_id.status', 'value': '$value', 'keys': '$keys' } },
                { '$sort': { '_id': 1 } }
            ]);
        }

        let mapTransform = this.getMapTransform(kpi, translate);
        return { collectionName, aggregateOptions, filters, mapTransform };
    }
}

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsConformityRelativeProgressKpi' })
export class CampaignsConformityRelativeProgressKpi extends CampaignsProgressKpi {
    @Editable('CampaignsConformityRelativeProgressKpi', { tabIndex: 1, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox, visible: false })
    ignoreRejected: boolean;

    public static getInitialProject(kpi: CampaignsConformityRelativeProgressKpi) {
        let aggregateOptions: Array<any> = [
            { '$project': { '_id': 1, 'validated': 1, 'status': { '$cond': [{ '$eq': ['$status', 'finished'] }, 'finished', 'available'] }, 'locationRef': 1, 'descriptionRef': 1, 'title': 1 } },
            { '$project': { '_id': 1, 'validation': { '$cond': [{ '$eq': ['$validated', true] }, 'validated', { '$cond': [{ '$eq': ['$validated', false] }, 'rejected', ''] }] }, 'status': 1, 'locationRef': 1, 'descriptionRef': 1, 'title': 1 } },
            { '$project': { '_id': 1, 'status': { 'status': '$status', 'validation': '$validation' }, 'locationRef': 1, 'descriptionRef': 1, 'title': 1 } }
        ];
        return aggregateOptions;
    }

    public static getChartDefinition(kpi: CampaignsProgressKpi, cd: ChartDefinition, translate: Translate) {
        BaseKpi.getChartDefinition(kpi, cd, translate);
        merge(cd, {
            type: kpi.chartType || 'bar',
            stacked: 'normal',
            palette: 'palette2',
            maxY: 100,
            legendValue: 'avg',
            unit: '%',
            showAs: kpi.showAs || 'chart',
            collectionName: 'missions'
        });
        cd.showLegend = false;
    }

    public static getProgress(data: { [key: string]: { validated?: number; rejected?: number; available?: number; finished?: number; } }, key: string) {
        let value = Math.round(100 * 100 * ((data[key].validated || 0) / ((data[key].validated || 0) + (data[key].rejected || 0))) * ((data[key].finished || 0) / ((data[key].finished || 0) + (data[key].available || 0)))) / 100;
        let color = BaseKpi.getColor(value);
        return { value, color };
    }

    public static getMapTransform(kpi: CampaignsProgressKpi, translate: Translate): any {
        let mapTransform = (retVal: Array<{ _id: { status: string; validation: string } | string; serie?: { status: string; validation: string }; value?: number; color?: string; keys: Array<string> }>, cd: ChartDefinition, broker: Broker, component: any) => {
            let data = <{ [key: string]: { validated?: number; rejected?: number; available?: number; finished?: number; keys?: Array<string> } }>{};
            retVal.map(r => {
                if (!r.serie) {
                    data['global'] = data['global'] || (<any>{ keys: [] });
                    if (r.keys) {
                        data['global'].keys = uniq(concat(data['global'].keys, r.keys));
                    }
                    if ((<any>r._id).status) {
                        data['global'][(<any>r._id).status] = r.value + (data['global'][(<any>r._id).status] || 0);
                    }
                    if ((<any>r._id).validation) {
                        data['global'][(<any>r._id).validation] = r.value + (data['global'][(<any>r._id).validation] || 0);
                    }
                } else {
                    data[(<string>r._id)] = data[(<string>r._id)] || (<any>{ keys: [] });
                    if (r.keys) {
                        data[(<string>r._id)].keys = uniq(concat(data[(<string>r._id)].keys, r.keys));
                    }
                    if ((<any>r.serie).status) {
                        data[(<string>r._id)][(<any>r.serie).status] = r.value + (data[(<string>r._id)][(<any>r.serie).status] || 0);
                    }
                    if ((<any>r.serie).validation) {
                        data[(<string>r._id)][(<any>r.serie).validation] = r.value + (data[(<string>r._id)][(<any>r.serie).validation] || 0);
                    }
                }
            });

            if (data['global']) {
                let progress = this.getProgress(data, 'global');
                return [{ _id: 'Total', value: progress.value, color: progress.color, keys: data['global'].keys }];
            } else {
                retVal = _keys(data).map(key => {
                    let progress = this.getProgress(data, key);
                    return <any>{ _id: key, serie: key, value: progress.value, color: progress.color, keys: data[key].keys };
                });
                return retVal;
            }
        };
        return mapTransform;
    }
}

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsActivePOSKpi' })
export class CampaignsActivePOSKpi extends CampaignsProgressKpi {
    @Editable('CampaignsActivePOSKpi', { tabIndex: 1, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox, visible: false })
    ignoreRejected: boolean;

    public static getChartDefinition(kpi: CampaignsProgressKpi, cd: ChartDefinition, translate: Translate) {
        super.getChartDefinition(kpi, cd, translate);
        cd.collectionName = 'locations';
    }

    public static getInitialProject(kpi: CampaignsProgressKpi) {
        let aggregateOptions: Array<any> = [
            { '$project': { '_id': '$locationRef', 'status': { '$cond': { 'if': { '$eq': ['$status', 'finished'] }, then: 'visited', else: 'notvisited' } }, 'locationRef': 1, 'finishedDate': 1 } },
            { '$group': { '_id': '$locationRef', 'status': { '$addToSet': '$status' } } },
            { '$project': { '_id': 1, 'locationRef': '$_id', 'status': { '$cond': [{ '$gt': [{ '$size': { '$setIntersection': [['visited'], '$status'] } }, 0] }, 'visited', 'notvisited'] } } }
        ];
        return aggregateOptions;
    }
}

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsFreqencyPOSKpi' })
export class CampaignsFreqencyPOSKpi extends CampaignsProgressKpi {

    @Editable('CampaignsFreqencyPOSKpi', { tabIndex: 1, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox, visible: false })
    ignoreRejected: boolean;

    @Editable('CampaignsFreqencyPOSKpi', { tabIndex: 2, tab: 'ADVANCED', flex: 50, type: FormFieldType.checkbox })
    ignoreUnvisited: boolean;

    @Editable('CampaignsFreqencyPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.select, visible: false, values: ['LOCATIONTYPE', 'LOCATION', 'LOCATIONTAGS', 'GLOBAL'], translate: true })
    groupBy: string;

    @Editable('CampaignsFreqencyPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, visible: false, collectionName: 'tagGroups', title: 'LEVEL1', flex: 50, mode: 'text', clearable: true })
    tagGroup1: TagGroup;

    @Editable('CampaignsFreqencyPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, visible: false, collectionName: 'tagGroups', title: 'LEVEL2', flex: 50, mode: 'text', clearable: true })
    tagGroup2: TagGroup;

    @Editable('CampaignsFreqencyPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, visible: false, collectionName: 'tagGroups', title: 'LEVEL3', flex: 50, mode: 'text', clearable: true })
    tagGroup3: TagGroup;

    @Editable('CampaignsFreqencyPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, visible: false, collectionName: 'tagGroups', title: 'LEVEL4', flex: 50, mode: 'text', clearable: true })
    tagGroup4: TagGroup;

    public static getChartDefinition(kpi: CampaignsFreqencyPOSKpi, cd: ChartDefinition, translate: Translate) {
        super.getChartDefinition(kpi, cd, translate);
        cd.type = kpi.chartType || 'column';
        cd.collectionName = 'locations';
        cd.stacked = null;
        cd.showLegend = false;
    }

    public static getInitialProject(kpi: CampaignsFreqencyPOSKpi) {
        let format = BaseKpi.getDateFormat('day');
        let aggregateOptions: Array<any> = [
            { '$project': { '_id': '$locationRef', 'status': { '$cond': { 'if': { '$eq': ['$status', 'finished'] }, then: 'visited', else: 'notvisited' } }, 'locationRef': 1, 'date': { '$dateToString': { 'format': format, 'date': '$finishedDate' } } } },
            { '$group': { '_id': { '_id': '$_id', 'status': '$status', 'locationRef': '$locationRef', 'date': '$date' } } },
            { '$project': { '_id': '$_id._id', 'status': '$_id.status', 'locationRef': '$_id.locationRef', 'date': '$_id.date' } }
        ];
        return aggregateOptions;
    }

    public static getAggregate(kpi: CampaignsFreqencyPOSKpi, translate: Translate, cloudinaryPipe?: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let collectionName = 'missions';
        let filters: Filters = new Array(new Array());
        BaseKpi.setCampaignFilters(kpi.campaigns, kpi.campaignTags, filters, kpi.missionType);
        let aggregateOptions: Array<any> = this.getInitialProject(kpi);
        let dates = BaseKpi.getDates(kpi);
        BaseKpi.setDateFilters(filters, dates, kpi.useCreationDate ? '_ect' : 'finishedDate');
        BaseKpi.setLocationTagsFilters(filters, kpi.locationTags);
        BaseKpi.setUserTagsFilters(filters, kpi.userTags);

        aggregateOptions = aggregateOptions.concat([
            { '$group': { '_id': { '_id': '$_id', 'status': '$status' }, 'count': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } },
            { '$group': { '_id': { 'status': '$_id.status', 'count': '$count' }, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id._id' } } },
            { '$project': { '_id': { '$cond': { 'if': { '$eq': ['$_id.status', 'visited'] }, then: '$_id.count', else: 0 } }, 'value': '$value', 'keys': '$keys' } },
            { '$sort': { '_id': 1 } }
        ]);

        let mapTransform = this.getMapTransform(kpi, translate);

        return { collectionName, aggregateOptions, filters, mapTransform };
    }

    public static getMapTransform(kpi: CampaignsFreqencyPOSKpi, translate: Translate, cloudinaryPipe?: any) {
        let mapTransform = (retVal: Array<{ _id: number; serie?: string; value: number; color?: string; keys?: Array<string> }>, cd: ChartDefinition, broker: Broker, component: any) => {
            let series: any = {};
            retVal.forEach(s => {
                let name;
                let color;
                if (s._id === 0) {
                    name = translate.get('NOTVISITED');
                    color = CellRenderer.getColor('notvisited');
                } else {
                    name = translate.get('VISITED') + ': ' + s._id;
                    color = CellRenderer.getColor('visited');
                }
                if (!series[name]) {
                    series[name] = { value: s.value, keys: s.keys, _id: name, color: color.value, textColor: color.textValue };
                } else {
                    series[name].value += s.value;
                    series[name].keys = uniq(concat(series[name].keys, s.keys));
                }
            });
            series = _keys(series).map(key => series[key]);
            if (kpi.ignoreUnvisited) {
                series = filter(series, (s: any) => s._id !== translate.get('NOTVISITED'));
            }

            let serieNotVisited = find(series, (s: any) => s._id === translate.get('NOTVISITED'));
            if (serieNotVisited) {
                series.forEach(s => {
                    if (s._id !== translate.get('NOTVISITED')) {
                        serieNotVisited.keys = serieNotVisited.keys.filter(k => s.keys.indexOf(k) < 0);
                    }
                });
                serieNotVisited.value = serieNotVisited.keys.length;
            }
            return series;
        };
        return mapTransform;
    }
}

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsCorrelationPOSKpi' })
export class CampaignsCorrelationPOSKpi extends CampaignsProgressKpi {

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 1, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox, visible: false })
    ignoreRejected: boolean;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', visible: false, flex: 50, type: FormFieldType.checkbox })
    showValues: boolean;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', visible: false, type: FormFieldType.checkbox, flex: 50, title: 'SHOWLEVELSLIDER' })
    showLevelSlider: boolean;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', visible: false, type: FormFieldType.autocomplete, flex: 50, values: ['chart', 'grid'], translate: true })
    showAs: string;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', visible: false, type: FormFieldType.autocomplete, flex: 50, values: ['normal', 'percent'], clearable: true })
    stacked: string;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', visible: false, title: 'CHARTTYPE', type: FormFieldType.autocomplete, values: CHART_TYPES, flex: 50, translate: true, clearable: true })
    chartType: string;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.select, visible: false, values: ['LOCATIONTYPE', 'LOCATION', 'LOCATIONTAGS', 'GLOBAL'], translate: true })
    groupBy: string;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, visible: false, collectionName: 'tagGroups', title: 'LEVEL1', flex: 50, mode: 'text', clearable: true })
    tagGroup1: TagGroup;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, visible: false, collectionName: 'tagGroups', title: 'LEVEL2', flex: 50, mode: 'text', clearable: true })
    tagGroup2: TagGroup;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, visible: false, collectionName: 'tagGroups', title: 'LEVEL3', flex: 50, mode: 'text', clearable: true })
    tagGroup3: TagGroup;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, visible: false, collectionName: 'tagGroups', title: 'LEVEL4', flex: 50, mode: 'text', clearable: true })
    tagGroup4: TagGroup;

    @Editable('CampaignsCorrelationPOSKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, values: ['CONFORMITY', 'RATING', 'SCORE', 'FIELD'], translate: true })
    mode: string;

    @Editable('CampaignsCorrelationPOSKpi', { tab: 'ADVANCED', title: 'FIELD', tabIndex: 2, flex: 70, type: FormFieldType.missionfield, condition: conditions.modeField, required: true, fieldFilter: Models.isNumberField })
    missionfields: { selectedDescription: MissionDescription, fields: IFormField };

    @Editable('CampaignsCorrelationPOSKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.autocomplete, translate: true, values: ['sum', 'avg', 'min', 'max'], flex: 30 })
    accumulator: string;

    @Editable('CampaignsCorrelationPOSKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.checkbox, flex: 50 })
    hideRegression: boolean;

    public static getChartDefinition(kpi: CampaignsCorrelationPOSKpi, cd: ChartDefinition, translate: Translate) {
        super.getChartDefinition(kpi, cd, translate);
        cd.type = 'scatter';
        cd.collectionName = 'locations';
        cd.stacked = null;
        cd.showLegend = false;
        if (kpi.mode === 'CONFORMITY') {
            cd.maxY = 100;
            cd.unit = '%';
        } else {
            cd.maxY = null;
            cd.unit = null;
        }
        cd.hideRegression = kpi.hideRegression;
    }

    public static getInitialProject(kpi: CampaignsCorrelationPOSKpi) {
        let aggregateOptions: Array<any> = [
            { '$match': { status: 'finished' } },
            {
                '$project': {
                    '_id': 1,
                    'status': { '$cond': { 'if': { '$eq': ['$status', 'finished'] }, then: 'visited', else: 'notvisited' } },
                    'validation': { '$cond': [{ '$eq': ['$validated', true] }, 'validated', { '$cond': [{ '$eq': ['$validated', false] }, 'rejected', ''] }] },
                    'score': '$score.value',
                    'rating': 1,
                    'locationRef': 1,
                    'title': 1
                }
            }
        ];
        return aggregateOptions;
    }

    public static getAggregate(kpi: CampaignsCorrelationPOSKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let collectionName = 'missions';
        let filters: Filters = new Array(new Array());
        BaseKpi.setCampaignFilters(kpi.campaigns, kpi.campaignTags, filters, kpi.missionType);
        let aggregateOptions: Array<any> = this.getInitialProject(kpi);
        let dates = BaseKpi.getDates(kpi);
        BaseKpi.setDateFilters(filters, dates, kpi.useCreationDate ? '_ect' : 'finishedDate');
        BaseKpi.setLocationTagsFilters(filters, kpi.locationTags);
        BaseKpi.setUserTagsFilters(filters, kpi.userTags);

        aggregateOptions = aggregateOptions.concat([
            { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
            { '$unwind': '$location' }
        ]);

        if (kpi.mode === 'RATING') {
            aggregateOptions = aggregateOptions.concat([
                { '$group': { '_id': '$location.title', 'keys': { '$addToSet': '$locationRef' }, 'status': { '$push': '$status' }, 'values': { '$push': '$rating' } } }
            ]);
        } else if (kpi.mode === 'SCORE') {
            aggregateOptions = aggregateOptions.concat([
                { '$group': { '_id': '$location.title', 'keys': { '$addToSet': '$locationRef' }, 'status': { '$push': '$status' }, 'values': { '$push': '$score' } } }
            ]);
        } else if (kpi.mode === 'FIELD') {
            let field = kpi.missionfields.fields;
            let name = field.name;
            if (name && name.endsWith('.value') === false) {
                name += '.value';
            }
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'missiondatas', 'localField': '_id', 'foreignField': 'missionRef', 'as': 'data' } },
                { '$unwind': '$data' }
            ]);
            aggregateOptions = aggregateOptions.concat([
                { '$group': { '_id': '$location.title', 'keys': { '$addToSet': '$locationRef' }, 'status': { '$push': '$status' }, 'values': { '$push': '$data.' + name } } }
            ]);

        } else {
            aggregateOptions = aggregateOptions.concat([
                { '$group': { '_id': '$location.title', 'keys': { '$addToSet': '$locationRef' }, 'status': { '$push': '$status' }, 'validation': { '$push': '$validation' } } }
            ]);
        }

        let mapTransform = this.getMapTransform(kpi, translate);

        return { collectionName, aggregateOptions, filters, mapTransform };
    }

    public static getMapTransform(kpi: CampaignsCorrelationPOSKpi, translate: Translate) {
        let mapTransform = (retVal: Array<{ _id: string; keys?: Array<string>; status?: Array<string>; validation?: Array<string>; values?: Array<number>; }>, cd: ChartDefinition, broker: Broker, component: any) => {
            let series: any = {};
            retVal.forEach(s => {
                let name = s._id;
                let color: string;
                let y = 0;
                let status: any = countBy(s.status);
                if (kpi.mode === 'CONFORMITY') {
                    let validation: any = countBy(s.validation);
                    y = Math.round(100 * (validation.validated || 0) / ((validation.validated || 0) + (validation.rejected || 0)));
                    y = isNaN(y) || y === Infinity ? 0 : y;
                    color = BaseKpi.getColor(y);
                } else {
                    y = this.accumulate(s.values, kpi.accumulator);
                }
                series[name] = { keys: s.keys, name: name, x: (status.visited || 0) + Math.random() * 0, y: y + Math.random() * 0, color: color };
            });
            series = _keys(series).map(key => series[key]);
            if (kpi.mode !== 'CONFORMITY') {
                let maxY: any = max(map(series, 'y'));
                series.forEach(s => {
                    s.color = BaseKpi.getColor(s.y / maxY * 100);
                });
            }
            return series;
        };
        return mapTransform;
    }

    protected static accumulate(inputValues: Array<any>, accumulator: string) {
        let values = compact(filter(inputValues, v => isNumber(v)));
        let value = 0;
        switch (accumulator) {
            case 'sum':
                value = sum(values);
                break;

            case 'min':
                value = min(values);
                break;

            case 'max':
                value = max(values);
                break;

            case 'avg':
            default:
                value = Math.round(sum(values) / values.length * 100) / 100;
                break;
        }
        value = isNaN(value) || value === Infinity ? 0 : value;
        return value;
    }
}

@ModelExtended({ baseClass: 'CampaignsCorrelationPOSKpi', extendedClass: 'CampaignsCorrelationDataKpi' })
export class CampaignsCorrelationDataKpi extends CampaignsCorrelationPOSKpi {

    @Editable('CampaignsCorrelationDataKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, visible: false, values: ['CONFORMITY', 'RATING', 'SCORE', 'FIELD'], translate: true })
    mode: string;

    @Editable('CampaignsCorrelationDataKpi', { tab: 'ADVANCED', title: 'XAXIS', tabIndex: 2, flex: 70, type: FormFieldType.missionfield, required: true, fieldFilter: Models.isNumberField })
    missionfields: { selectedDescription: MissionDescription, fields: IFormField };

    @Editable('CampaignsCorrelationDataKpi', { tab: 'ADVANCED', tabIndex: 2, flex: 30, type: FormFieldType.autocomplete, translate: true, values: ['sum', 'avg', 'min', 'max'] })
    accumulator: string;

    @Editable('CampaignsCorrelationDataKpi', { tab: 'ADVANCED', title: 'YAXIS', flex: 70, tabIndex: 2, type: FormFieldType.missionfield, required: true, fieldFilter: Models.isNumberField })
    missionfieldsY: { selectedDescription: MissionDescription, fields: IFormField };

    @Editable('CampaignsCorrelationDataKpi', { tab: 'ADVANCED', title: 'ACCUMULATOR', tabIndex: 2, flex: 30, type: FormFieldType.autocomplete, translate: true, values: ['sum', 'avg', 'min', 'max'] })
    accumulatorY: string;

    public static getChartDefinition(kpi: CampaignsCorrelationDataKpi, cd: ChartDefinition, translate: Translate) {
        super.getChartDefinition(kpi, cd, translate);
        cd.type = 'scatter';
        cd.collectionName = 'locations';
        cd.stacked = null;
        cd.showLegend = false;

        cd.maxY = null;
        cd.unit = null;
        cd.hideRegression = kpi.hideRegression;
    }

    public static getInitialProject(kpi: CampaignsCorrelationDataKpi) {
        let aggregateOptions: Array<any> = [
            {
                '$project': { '_id': 1, 'locationRef': 1 }
            }
        ];
        return aggregateOptions;
    }

    public static getAggregate(kpi: CampaignsCorrelationDataKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let collectionName = 'missions';
        let filters: Filters = new Array(new Array());
        BaseKpi.setCampaignFilters(kpi.campaigns, kpi.campaignTags, filters, kpi.missionType);
        let aggregateOptions: Array<any> = this.getInitialProject(kpi);
        let dates = BaseKpi.getDates(kpi);
        BaseKpi.setDateFilters(filters, dates, kpi.useCreationDate ? '_ect' : 'finishedDate');
        BaseKpi.setLocationTagsFilters(filters, kpi.locationTags);
        BaseKpi.setUserTagsFilters(filters, kpi.userTags);

        aggregateOptions = aggregateOptions.concat([
            { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
            { '$unwind': '$location' }
        ]);

        let fieldX = kpi.missionfields.fields;
        let nameX = fieldX.name;
        if (nameX && nameX.endsWith('.value') === false) {
            nameX += '.value';
        }

        let fieldY = kpi.missionfieldsY.fields;
        let nameY = fieldY.name;
        if (nameY && nameY.endsWith('.value') === false) {
            nameY += '.value';
        }

        aggregateOptions = aggregateOptions.concat([
            { '$lookup': { 'from': 'missiondatas', 'localField': '_id', 'foreignField': 'missionRef', 'as': 'data' } },
            { '$unwind': '$data' }
        ]);
        aggregateOptions = aggregateOptions.concat([
            { '$group': { '_id': '$location.title', 'keys': { '$addToSet': '$locationRef' }, 'valuesX': { '$push': '$data.' + nameX }, 'valuesY': { '$push': '$data.' + nameY } } }
        ]);

        let mapTransform = this.getMapTransform(kpi, translate);
        return { collectionName, aggregateOptions, filters, mapTransform };
    }

    public static getMapTransform(kpi: CampaignsCorrelationDataKpi, translate: Translate) {
        let mapTransform = (retVal: Array<{ _id: string; keys?: Array<string>; valuesX?: Array<number>; valuesY?: Array<number>; }>, cd: ChartDefinition, broker: Broker, component: any) => {
            let series: any = {};
            retVal.forEach(s => {
                let name = s._id;
                let x = this.accumulate(s.valuesX, kpi.accumulator);
                let y = this.accumulate(s.valuesY, kpi.accumulatorY);
                series[name] = { keys: s.keys, name, x, y };
            });

            series = _keys(series).map(key => series[key]);
            let maxY: any = max(map(series, 'y'));
            series.forEach(s => {
                s.color = BaseKpi.getColor(s.y / maxY * 100);
            });

            return series;
        };
        return mapTransform;
    }
}

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsTransformationRateKpi' })
export class CampaignsTransformationRateKpi extends CampaignsProgressKpi {

    @Editable('CampaignsTransformationRateKpi', {
        tab: 'GENERAL', tabIndex: 1, visible: false, type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', multiple: true, required: 'length("campaignTags") < 1' //,
        // filters: [
        //     [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        // ],
        // hiddenFields: ['archived']
    })
    campaigns: Array<MissionDescription>; //gridOptions: { allowQuery: false },

    @Editable('CampaignsTransformationRateKpi', { tab: 'GENERAL', tabIndex: 1, visible: false, type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', multiple: true, required: 'length("campaigns") < 1', tag: true })
    campaignTags: Array<string>;

    @Editable('CampaignsTransformationRateKpi', { tabIndex: 1, tab: 'GENERAL', visible: false, title: 'BYVALIDITY', flex: 50, type: FormFieldType.checkbox })
    showValidationStatus: boolean;

    @Editable('CampaignsTransformationRateKpi', { tab: 'GENERAL', title: 'DUEDATE', tabIndex: 1, type: FormFieldType.missionfield, required: true, fieldFilter: Models.isDateTimeField })
    duedatefield: { selectedDescription: MissionDescription, fields: IFormField };

    @Editable('CampaignsTransformationRateKpi', { tab: 'GENERAL', title: 'MARGINDAYS', tabIndex: 1, type: FormFieldType.number, required: false })
    marginDays: number;

    public static getInitialProject(kpi: CampaignsTransformationRateKpi) {
        let aggregateOptions: Array<any> = [];
        if (kpi.validatedOnly) {
            aggregateOptions.push({ '$match': { 'validated': { '$eq': true } } });
        } else if (kpi.ignoreRejected) {
            aggregateOptions.push({ '$match': { 'validated': { '$ne': false } } });
        }
        aggregateOptions.push({ '$lookup': { 'from': 'missiondatas', 'localField': '_id', 'foreignField': 'missionRef', 'as': 'data' } });
        aggregateOptions.push({ '$unwind': '$data' });

        return aggregateOptions;
    }

    public static getAggregate(kpi: CampaignsTransformationRateKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let collectionName = 'missions';
        let filters: Filters = new Array(new Array());
        let name;
        let field;
        if (kpi.duedatefield && kpi.duedatefield.fields) {
            field = kpi.duedatefield.fields;
            if (isArray(field) && (<any>field).length > 0) {
                field = field[0];
            }
            name = field.name;
            if (name && name.endsWith('.value') === false) {
                name += '.value';
            }
        }
        filters.forEach(f => {
            f.push({ field: 'descriptionRef', operator: { _id: 'inq' }, value: [kpi.duedatefield.selectedDescription] });
            //filter.push({ field: name, operator: { _id: 'exists' }, value: 1 });
        });

        //BaseKpi.setCampaignFilters(kpi.campaigns, kpi.campaignTags, filters);
        let aggregateOptions: Array<any> = this.getInitialProject(kpi);
        let dates = BaseKpi.getDates(kpi);

        if (dates.startDate || dates.endDate) {
            let matchDate: any = {};
            if (dates.startDate) {
                matchDate.$gte = dates.startDate;
            }
            if (dates.endDate) {
                matchDate.$lte = dates.endDate;
            }
            let match = {};
            match['data.' + name] = matchDate;
            aggregateOptions.push({ '$match': match });
        }

        aggregateOptions.push({ '$project': { '_id': 1, 'status': 1, 'descriptionRef': 1, 'locationRef': 1, 'finishedDate': { '$add': ['$finishedDate', - (kpi.marginDays >= 0 ? kpi.marginDays : 1) * 24 * 60 * 60000] }, 'duedate': '$data.' + name } });
        aggregateOptions.push({
            '$project': {
                '_id': 1,
                'status': {
                    '$cond': {
                        'if': {
                            '$and': [
                                { '$eq': ['$status', 'finished'] },
                                {
                                    '$lte': [
                                        { '$substr': ['$finishedDate', 0, 10] },
                                        { '$substr': ['$duedate', 0, 10] }
                                    ]
                                }
                            ]
                        },
                        'then': 'ontime',
                        'else': {
                            '$cond': {
                                'if': { '$eq': ['$status', 'finished'] },
                                'then': 'late',
                                'else': 'available'
                            }
                        }
                    }
                },
                'descriptionRef': 1, 'locationRef': 1, 'finishedDate': 1, 'duedate': 1
            }
        });

        //{ '$cond': [{ '$eq': ['$status', 'finished'] }, 'finished', 'available'] }
        //BaseKpi.setDateFilters(filters, dates, kpi.useCreationDate ? '_ect' : 'finishedDate');
        BaseKpi.setLocationTagsFilters(filters, kpi.locationTags);
        BaseKpi.setUserTagsFilters(filters, kpi.userTags);
        return this.getAggregateGroupBy(collectionName, aggregateOptions, filters, kpi, translate, cloudinaryPipe);
    }

}
