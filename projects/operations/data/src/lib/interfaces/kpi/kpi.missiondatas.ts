import { ModelExtended, Model, Editable, Models, TagGroup, MissionDescription, ChartDefinition, CHART_TYPES } from '@shared/data-core';
import { Translate } from '@shared/translate';

import { FormFieldType, Filters, IDatesRange, IFormField } from '@shared/interfaces';
import { BaseKpi } from './kpi.base';

import { assign, isArray, isNaN, isNumber, sortBy, round } from 'lodash-es';

let conditions = {
    groupByLocationTags: 'groupBy=="LOCATIONTAGS"' //,
    //groupByLocation: 'groupBy=="LOCATION"'
};

@ModelExtended({ baseClass: 'BaseKpi', extendedClass: 'MissionDatasKpi' })
export class MissionDatasKpi extends BaseKpi {

    @Editable('MissionDatasKpi', { tab: 'GENERAL', tabIndex: 1, required: true, type: FormFieldType.text })
    title: string;

    @Editable('MissionDatasKpi', { tab: 'GENERAL', tabIndex: 1, required: false, type: FormFieldType.textarea })
    description: string;

    @Editable('MissionDatasKpi', { tab: 'GENERAL', title: 'FIELD', tabIndex: 1, type: FormFieldType.missionfield, required: 'length("missionscores.scores") < 1', fieldFilter: Models.isChartableAutoFieldNoPhoto })
    missionfields: { selectedDescription: MissionDescription, fields: IFormField };

    @Editable('MissionDatasKpi', { tab: 'GENERAL', title: 'SCORE', tabIndex: 1, type: FormFieldType.missionscore, required: 'length("missionfields.fields") < 1', fieldFilter: Models.isChartableAutoFieldNoPhoto })
    missionscores: { selectedDescription: MissionDescription, scores: any };

    @Editable('MissionDatasKpi', { tab: 'GENERAL', tabIndex: 1, type: FormFieldType.daterange })
    dates: IDatesRange;

    @Editable('MissionDatasKpi', { tabIndex: 1, tab: 'GENERAL', type: FormFieldType.checkbox, flex: 50 })
    ignoreRejected: boolean;

    @Editable('MissionDatasKpi', { tabIndex: 1, tab: 'GENERAL', type: FormFieldType.checkbox, flex: 50 })
    ignoreNA: boolean;

    @Editable('MissionDatasKpi', { tabIndex: 1, tab: 'GENERAL', type: FormFieldType.checkbox, flex: 50 })
    validatedOnly: boolean;

    @Editable('MissionDatasKpi', { tabIndex: 1, tab: 'GENERAL', title: 'AUDIT', type: FormFieldType.checkbox, flex: 50 })
    useAudit: boolean;

    @Editable('MissionDatasKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.autocomplete, collectionName: 'locations', multiple: true, required: false, tag: true })
    locationTags: Array<string>;

    @Editable('MissionDatasKpi', { tab: 'GENERAL', tabIndex: 1, type: FormFieldType.autocomplete, collectionName: 'user', multiple: true, required: false, tag: true })
    userTags: Array<string>;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, flex: 50, values: ['chart', 'grid'], translate: true })
    showAs: string;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.checkbox, flex: 50, title: 'SHOWLEVELSLIDER' })
    showLevelSlider: boolean;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, flex: 50, values: ['normal', 'percent'], clearable: true })
    stacked: string;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', title: 'CHARTTYPE', type: FormFieldType.autocomplete, values: CHART_TYPES, flex: 50, translate: true, clearable: true })
    chartType: string;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.checkbox, flex: 50, visible: false })
    groupByDate: boolean;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, values: ['DATE', 'LOCATIONTYPE', 'LOCATION', 'LOCATIONTAGS', 'GLOBAL'], translate: true })
    groupBy: string;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', title: 'LEVEL1', condition: conditions.groupByLocationTags, type: FormFieldType.autocomplete, collectionName: 'tagGroups', mode: 'text', clearable: true, flex: 50 })
    tagGroup1: TagGroup;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', title: 'LEVEL2', condition: conditions.groupByLocationTags, type: FormFieldType.autocomplete, collectionName: 'tagGroups', mode: 'text', clearable: true, flex: 50 })
    tagGroup2: TagGroup;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', title: 'LEVEL3', condition: conditions.groupByLocationTags, type: FormFieldType.autocomplete, collectionName: 'tagGroups', mode: 'text', clearable: true, flex: 50 })
    tagGroup3: TagGroup;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', title: 'LEVEL4', condition: conditions.groupByLocationTags, type: FormFieldType.autocomplete, collectionName: 'tagGroups', mode: 'text', clearable: true, flex: 50 })
    tagGroup4: TagGroup;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, collectionName: 'locations', multiple: true, required: false }) //, condition: conditions.groupByLocation
    locations: any;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', flex: 50, type: FormFieldType.checkbox })
    showValues: boolean;

    @Editable('MissionDatasKpi', { tabIndex: 2, tab: 'ADVANCED', flex: 50, type: FormFieldType.checkbox })
    showLegend: boolean;

    @Editable('MissionDatasKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.checkbox, flex: 100 })
    showDelta: boolean;

    @Editable('MissionDatasKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.autocomplete, translate: true, values: ['count', 'sum', 'avg', 'first', 'last', 'min', 'max'], flex: 100 })
    accumulator: string;

    groupBySlider: string;
    levelSlider: number;

    public static getChartDefinition(kpi: MissionDatasKpi, cd: ChartDefinition, translate: Translate) {
        BaseKpi.getChartDefinition(kpi, cd, translate);
        assign(cd, {
            showAs: kpi.showAs || 'chart',
            stacked: kpi.stacked,
            palette: cd.palette || 'palette0',
            collectionName: 'missions',
            colorByPoint: kpi.groupBy !== 'LOCATIONTAGS' && kpi.groupBy !== 'DATE',
            type: kpi.chartType || (kpi.groupByDate ? 'areaspline' : 'pie')
        });
        cd.title = translate.polyglot(cd.title);
        cd.groupByDate = kpi.groupByDate || kpi.groupBy === 'DATE';
        cd.groupByCampaign = cd.groupByDate;
        cd.showDelta = kpi.showDelta;
    }

    public static getAggregate(kpi: MissionDatasKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let collectionName = 'missiondatas';
        let filters: Filters = [
            []
        ];
        let name;
        let field;
        let score;
        if (kpi.missionfields && kpi.missionfields.fields) {
            field = kpi.missionfields.fields;
            if (isArray(field) && (<any>field).length > 0) {
                field = field[0];
            }
            name = field.name;
            if (name && name.endsWith('.value') === false) {
                name += '.value';
            }
            if (kpi.useAudit) {
                name += 'Type';
            }
        } else {
            score = kpi.missionscores.scores;
            if (isArray(score) && (<any>score).length > 0) {
                score = score[0];
            }
            if (score.isActive) {
                name = 'score.value';
            } else {
                name = 'extraScores.' + score.title + '.value';
            }
        }
        filters.forEach(filter => {
            filter.push({ field: 'missiondescriptionRef', operator: { _id: 'inq' }, value: [(kpi.missionfields || kpi.missionscores).selectedDescription] });
            filter.push({ field: name, operator: { _id: 'exists' }, value: 1 });
        });

        let dates = BaseKpi.getDates(kpi);
        let format = BaseKpi.getDateFormat(kpi.groupBySlider);
        BaseKpi.setDateFilters(filters, dates, 'date', false);
        BaseKpi.setLocationTagsFilters(filters, kpi.locationTags);
        BaseKpi.setUserTagsFilters(filters, kpi.userTags);

        let aggregateOptions: Array<any> = [];
        if (kpi.validatedOnly) {
            aggregateOptions.push({ '$match': { 'validated': { '$eq': true } } });
        } else if (kpi.ignoreRejected) {
            aggregateOptions.push({ '$match': { 'validated': { '$ne': false } } });
        }
        if (field && Models.isMultipleField(field)) {
            aggregateOptions.push({ '$unwind': '$' + name });
        }

        let isnumber = (field && field.type === FormFieldType.number) || score;
        let accumulator = '$' + (kpi.accumulator || 'sum');
        if (kpi.accumulator === 'count') {
            accumulator = '$sum';
            isnumber = false;
        }
        kpi.groupByDate = kpi.groupBy === 'DATE' || (!kpi.groupBy && kpi.groupByDate);

        let tagGroupName = 'tagGroup' + kpi.levelSlider;
        let value = {};
        if (kpi.locations && kpi.locations.length > 0) {
            filters[0].push({ field: 'locationRef', operator: { _id: 'inq' }, value: kpi.locations.map(c => c._id) });
        }
        if (kpi.groupByDate && isnumber) {
            value[accumulator] = '$' + name;
            aggregateOptions.push({
                '$group': { '_id': { 'date': { '$dateToString': { 'format': format, date: '$date' } }, 'title': { '$literal': field ? field.title : score.title } }, 'value': value, 'keys': { '$addToSet': '$missionRef' } }
            });
        } else if (kpi.groupByDate) {
            value[accumulator] = isnumber ? '$field' : 1;
            aggregateOptions = aggregateOptions.concat([
                { '$project': { 'field': '$' + name, 'missionRef': 1, 'date': 1 } },
                { '$group': { '_id': { 'date': { '$dateToString': { 'format': format, 'date': '$date' } }, 'title': kpi.accumulator === 'count' && field ? field.name : '$field' }, 'value': value, 'keys': { '$addToSet': '$missionRef' } } },
                { '$project': { '_id': '$_id', 'value': '$value', 'keys': '$keys' } }
                //{ $project: { 'serie': '$_id.title', '_id': '$_id.date', 'value': '$value', 'keys': '$keys' } }
            ]);
        } else if (kpi.groupBy === 'LOCATIONTAGS' && kpi[tagGroupName] && kpi[tagGroupName].tags && kpi[tagGroupName].tags.length > 0) {
            value[accumulator] = isnumber ? '$field' : 1;
            aggregateOptions = aggregateOptions.concat([
                { '$project': { 'field': '$' + name, 'missionRef': 1, 'locationRef': 1 } },
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$project': { '_id': 1, 'field': 1, 'missionRef': 1, 'locationRef': 1, 'tags': '$location.tags' } },
                { '$unwind': '$tags' },
                { '$match': { 'tags': { '$in': kpi[tagGroupName].tags } } },
                { '$group': { '_id': isnumber ? { 'tags': '$tags' } : { 'tags': '$tags', 'field': '$field' }, 'value': value, 'keys': { '$addToSet': '$missionRef' } } }, //, 'field': '$field'
                { '$project': { 'serie': isnumber ? { '$literal': field ? field.title : score.title } : { $ifNull: ['$_id.field', 'n/a'] }, '_id': '$_id.tags', 'value': '$value', 'keys': '$keys' } } //$ifNull: ['$_id.field', 'n/a']
            ]);
        } else if (kpi.groupBy === 'LOCATION') {
            value[accumulator] = isnumber ? '$field' : 1;
            if (kpi.locations && kpi.locations.length > 0) {
                filters[0].push({ field: 'locationRef', operator: { _id: 'inq' }, value: kpi.locations.map(c => c._id) });
            }
            aggregateOptions = aggregateOptions.concat([
                { '$project': { 'field': '$' + name, 'missionRef': 1, 'locationRef': 1 } },
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$project': { '_id': 1, 'field': 1, 'missionRef': 1, 'locationRef': 1, 'tags': '$location.title' } },
                { '$group': { '_id': isnumber ? { 'tags': '$tags' } : { 'tags': '$tags', 'field': '$field' }, 'value': value, 'keys': { '$addToSet': '$missionRef' } } }, //, 'field': '$field'
                { '$project': { 'serie': isnumber ? { '$literal': field ? field.title : score.title } : { $ifNull: ['$_id.field', 'n/a'] }, '_id': '$_id.tags', 'value': '$value', 'keys': '$keys' } } //$ifNull: ['$_id.field', 'n/a']
            ]);
        } else if (kpi.groupBy === 'LOCATIONTYPE') {
            value[accumulator] = isnumber ? '$field' : 1;
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$lookup': { 'from': 'locationtypes', 'localField': 'location.typeRef', 'foreignField': '_id', 'as': 'locationType' } },
                { '$unwind': '$locationType' },
                { '$project': { '_id': 1, 'field': 1, 'missionRef': 1, 'locationRef': 1, 'tags': '$locationType.name' } },
                { '$group': { '_id': isnumber ? { 'tags': '$tags' } : { 'tags': '$tags', 'field': '$field' }, 'value': value, 'keys': { '$addToSet': '$missionRef' } } }, //, 'field': '$field'
                { '$project': { 'serie': isnumber ? { '$literal': field ? field.title : score.title } : { $ifNull: ['$_id.field', 'n/a'] }, '_id': '$_id.tags', 'value': '$value', 'keys': '$keys' } } //$ifNull: ['$_id.field', 'n/a']
            ]);
        } else {
            value[accumulator] = isnumber ? '$field' : 1;
            aggregateOptions = aggregateOptions.concat([
                { '$project': { 'field': '$' + name, 'missionRef': 1 } },
                { '$group': { '_id': '$field', 'value': value, 'keys': { '$addToSet': '$missionRef' } } },
                { '$project': { 'serie': { '$literal': field ? field.title : score.title }, '_id': { $ifNull: ['$_id', 'n/a'] }, 'value': '$value', 'keys': '$keys' } }
            ]);
        }
        let mapTransform = this.getMapTransform(kpi, translate);
        return { collectionName, aggregateOptions, filters, mapTransform };
    }

    public static getMapTransform(kpi: MissionDatasKpi, translate: Translate): any {
        let mapTransform = (retVal: Array<{ _id: string; serie?: string; value?: number, color?: string; index?: number }>, cd: ChartDefinition, broker: any, component: any) => {
            retVal = retVal.filter(s => s._id !== 'n/a');
            if (kpi.ignoreNA) {
                retVal = retVal.filter(s => s.serie !== 'n/a');
            }
            retVal.forEach(s => {
                if (<any>s._id === true) {
                    s._id = translate.polyglot('TRUE');
                } else if (<any>s._id === false) {
                    s._id = translate.polyglot('FALSE');
                } else if (s._id) {
                    s._id = translate.polyglot(kpi.useAudit ? s._id.toUpperCase() : s._id);
                }
                if (s.serie) {
                    s.serie = translate.polyglot(kpi.useAudit ? s.serie.toUpperCase() : s.serie);
                }
                s.value = s.value - 0;
                if (isNaN(s.value) || !isNumber(s.value)) {
                    s.value = 0;
                }

                if (isNumber(s._id) && kpi.numberPrecision >= 0) {
                    s._id = <any>round(s._id, kpi.numberPrecision);
                }
                if (isNumber(s.value) && kpi.numberPrecision >= 0) {
                    s.value = <any>round(s.value, kpi.numberPrecision);
                }
            });
            retVal = sortBy(retVal, s => s.serie);
            return retVal;
        };

        return mapTransform;
    }
}

@Model({ className: 'MissionPhotosKpi' })
export class MissionPhotosKpi extends BaseKpi {
    @Editable('MissionPhotosKpi', { tab: 'GENERAL', tabIndex: 1, required: true, type: FormFieldType.text })
    title: string;

    @Editable('MissionPhotosKpi', { tab: 'GENERAL', tabIndex: 1, required: false, type: FormFieldType.textarea })
    description: string;

    @Editable('MissionPhotosKpi', { tab: 'GENERAL', tabIndex: 1, type: FormFieldType.daterange })
    dates: IDatesRange;

    @Editable('MissionPhotosKpi', { tab: 'GENERAL', title: 'FIELD', tabIndex: 1, type: FormFieldType.missionfield, required: true, multiple: true, fieldFilter: Models.isPhotoOrMultiPhotosField })
    missionfields: { selectedDescription: MissionDescription, fields: IFormField };

    @Editable('MissionPhotosKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.autocomplete, collectionName: 'locations', multiple: true, required: false, tag: true })
    locationTags: Array<string>;

    showAs: string;

    public static getChartDefinition(kpi: MissionPhotosKpi, cd: ChartDefinition, translate: Translate) {
        BaseKpi.getChartDefinition(kpi, cd, translate);
        cd.collectionName = 'photos';
        cd.missionfields = kpi.missionfields;
        cd.showAs = 'carousel';
        kpi.showAs = 'carousel';
    }

    public static getAggregate(kpi: MissionPhotosKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let mapTransform = this.getMapTransform(kpi, translate);
        return { collectionName: 'photos', aggregateOptions: null, filters: null, mapTransform };
    }

    public static getMapTransform(kpi: MissionPhotosKpi, translate: Translate): any {
        let mapTransform = (retVal: Array<any>, cd: ChartDefinition, broker: any, component: any) => retVal;
        return mapTransform;
    }

}
