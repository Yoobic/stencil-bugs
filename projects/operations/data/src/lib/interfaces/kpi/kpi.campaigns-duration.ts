import { Editable, ChartDefinition, Broker, ModelExtended } from '@shared/data-core';
import { Translate } from '@shared/translate';
import { FormFieldType, Filters } from '@shared/interfaces';
import { CampaignsProgressKpi } from './kpi.campaigns-progress';
import { BaseKpi } from './kpi.base';

import { merge, isNumber } from 'lodash-es';

@ModelExtended({ baseClass: 'CampaignsProgressKpi', extendedClass: 'CampaignsDurationKpi' })
export class CampaignsDurationKpi extends CampaignsProgressKpi {

    @Editable('CampaignsDurationKpi', { tab: 'GENERAL', tabIndex: 1, type: FormFieldType.autocomplete, translate: true, values: ['completion', 'validation'], required: true })
    mode: string;

    @Editable('CampaignsDurationKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.autocomplete, translate: true, values: ['sum', 'avg', 'min', 'max'] })
    accumulator: string;

    public static getChartDefinition(kpi: CampaignsDurationKpi, cd: ChartDefinition, translate: Translate) {
        BaseKpi.getChartDefinition(kpi, cd, translate);
        merge(cd, {
            type: kpi.chartType || (kpi.groupBy !== 'GLOBAL' ? 'column' : 'areaspline'),
            palette: cd.palette || 'palette0',
            groupByDate: kpi.groupBy === 'GLOBAL',
            showAs: kpi.showAs || 'chart',
            collectionName: 'missions',
            legendValue: kpi.accumulator || 'avg'
        });

        //cd.stacked = 'normal';
        //cd.dateGrouping = 'day';

        if (kpi.groupBy !== 'GLOBAL') {
            cd.groupByCampaign = true;
        } else {
            cd.groupByCampaign = kpi.groupByCampaign;
        }
    }

    public static getInitialProject(kpi: CampaignsDurationKpi) {
        let project: any;
        let match: any;
        if (kpi.mode === 'validation') {
            project = <any>{ '_id': 1, 'duration': { '$subtract': ['$validatedDate', '$finishedDate'] }, 'locationRef': 1, 'title': 1, 'finishedDate': 1 };
            match = <any>{ 'validatedDate': { '$type': 9 }, 'finishedDate': { '$type': 9 }, 'validated': { '$exists': true } };
        } else {
            project = <any>{ '_id': 1, 'duration': { '$subtract': ['$finishedDate', { '$ifNull': ['$validFrom', '$_ect'] }] }, 'locationRef': 1, 'title': 1, 'finishedDate': 1 };
            match = <any>{ 'finishedDate': { '$type': 9 } };
        }
        let aggregateOptions: Array<any> = [];
        aggregateOptions.push({ '$match': match });
        aggregateOptions.push({ '$project': project });
        return aggregateOptions;
    }

    public static getAggregate(kpi: CampaignsDurationKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
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
                { '$project': { '_id': 1, 'date': 1, 'tags': '$location.tags', 'duration': 1, 'finishedDate': 1 } },
                { '$unwind': '$tags' },
                { '$match': { 'tags': { '$in': kpi[tagGroupName].tags } } }
            ]);
            groupId = '$tags';
        } else if (kpi.groupBy === 'LOCATION') {
            if (kpi.locations && kpi.locations.length > 0) {
                filters[0].push({ field: 'locationRef', operator: { _id: 'inq' }, value: kpi.locations.map(c => c._id) });
            }
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' }
            ]);
            groupId = '$location.title';
        } else if (kpi.groupBy === 'LOCATIONTYPE') {
            aggregateOptions = aggregateOptions.concat([
                { '$lookup': { 'from': 'locations', 'localField': 'locationRef', 'foreignField': '_id', 'as': 'location' } },
                { '$unwind': '$location' },
                { '$lookup': { 'from': 'locationtypes', 'localField': 'location.typeRef', 'foreignField': '_id', 'as': 'locationType' } },
                { '$unwind': '$locationType' }
            ]);
            groupId = '$locationType.name';
        } else {//if (kpi.groupBy === 'GLOBAL') {
            if (kpi.groupBy === 'CAMPAIGN') {
                groupId = '$title';
            } else {
                groupId = { '$dateToString': { 'format': '%Y-%m', 'date': '$finishedDate' } };
            }
        }

        let f = { '$group': { '_id': groupId, 'value': {}, 'keys': { '$addToSet': '$_id' } } };
        f.$group.value['$' + (kpi.accumulator || 'sum')] = '$duration';
        aggregateOptions.push(f);
        aggregateOptions.push({ '$sort': { '_id': 1 } });
        let mapTransform = this.getMapTransform(kpi, translate);
        return { collectionName, aggregateOptions, filters, mapTransform };
    }

    public static getMapTransform(kpi: CampaignsDurationKpi, translate: Translate) {
        let mapTransform = (retVal: Array<{ _id: string; serie?: string; value: number, color?: string }>, cd: ChartDefinition, broker: Broker, component: any) => {
            retVal.forEach(s => {
                if (isNumber(s.value)) {
                    s.value = s.value / (1000 * 60 * 60 * 24);
                    s.serie = translate.get('DURATION');
                }
            });
            return retVal;
        };
        return mapTransform;
    }
}
