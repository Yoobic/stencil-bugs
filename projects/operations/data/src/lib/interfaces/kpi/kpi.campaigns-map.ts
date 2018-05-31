import { Model, Editable, MissionDescription, ChartDefinition } from '@shared/data-core';
import { Translate } from '@shared/translate';

import { CampaignsProgressKpi } from './kpi.campaigns-progress';
import { FormFieldType, Filters, IDatesRange } from '@shared/interfaces';
import { BaseKpi } from './kpi.base';

import { merge } from 'lodash-es';

@Model({ className: 'CampaignsMapKpi' })
export class CampaignsMapKpi extends CampaignsProgressKpi {

    @Editable('CampaignsMapKpi', { tab: 'GENERAL', tabIndex: 1, required: true, type: FormFieldType.text })
    title: string;

    @Editable('CampaignsMapKpi', {
        tab: 'GENERAL', tabIndex: 1, type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', multiple: true, required: 'length("campaignTags") < 1' //,
        // filters: [
        //     [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        // ],
        // hiddenFields: ['archived']
    })
    campaigns: Array<MissionDescription>; //gridOptions: { allowQuery: false },

    @Editable('CampaignsMapKpi', { tab: 'GENERAL', tabIndex: 1, type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', multiple: true, required: 'length("campaigns") < 1', tag: true })
    campaignTags: Array<string>;

    @Editable('CampaignsMapKpi', { tab: 'GENERAL', tabIndex: 1, type: FormFieldType.daterange })
    dates: IDatesRange;

    @Editable('CampaignsMapKpi', { tabIndex: 1, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox, visible: false })
    ignoreRejected: boolean;

    @Editable('CampaignsMapKpi', { tabIndex: 1, tab: 'GENERAL', flex: 50, type: FormFieldType.checkbox, visible: false })
    validatedOnly: boolean;

    @Editable('CampaignsMapKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.checkbox, title: 'CLUSTER', flex: 50 })
    useCluster: boolean;

    @Editable('CampaignsMapKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.checkbox, flex: 50 })
    hideLegend: boolean;

    @Editable('CampaignsMapKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.autocomplete, multiple: true, translate: true, values: ['finished', 'available'], handleUndefined: true, clearable: true })
    status: Array<string>;

    @Editable('CampaignsMapKpi', { tab: 'ADVANCED', tabIndex: 2, type: FormFieldType.autocomplete, collectionName: 'locations', multiple: true, required: false, tag: true })
    locationTags: Array<string>;

    public static getChartDefinition(kpi: CampaignsMapKpi, cd: ChartDefinition, translate: Translate) {
        BaseKpi.getChartDefinition(kpi, cd, translate);
        merge(cd, {
            showAs: 'map',
            collectionName: 'missions',
            useCluster: kpi.useCluster === false ? false : true
        });
        cd.showLegend = !kpi.hideLegend;
    }

    public static getAggregate(kpi: CampaignsMapKpi, translate: Translate, cloudinaryPipe: any): { collectionName: string; filters?: Filters; aggregateOptions?: Array<any>; mapTransform?: Function, mapTransformAsync?: boolean } {
        let collectionName = 'missions';
        let filters: Filters = new Array(new Array());
        BaseKpi.setCampaignFilters(kpi.campaigns, kpi.campaignTags, filters, kpi.missionType);

        let aggregateOptions: Array<any> = [];
        let dates = BaseKpi.getDates(kpi);
        BaseKpi.setDateFilters(filters, dates, kpi.useCreationDate ? '_ect' : 'finishedDate');
        BaseKpi.setLocationTagsFilters(filters, kpi.locationTags);
        BaseKpi.setUserTagsFilters(filters, kpi.userTags);
        if (kpi.validatedOnly) {
            aggregateOptions.push({ '$match': { 'validated': { '$eq': true } } });
        } else if (kpi.ignoreRejected) {
            aggregateOptions.push({ '$match': { 'validated': { '$ne': false } } });
        }
        let project: any = {
            '_id': 1,
            'title': 1,
            'address': 1,
            'validated': 1,
            '_geoloc': 1,
            'status': { '$cond': { 'if': { '$eq': ['$status', 'finished'] }, then: 'finished', else: 'available' } },
            'finishedDate': 1
        };
        aggregateOptions = aggregateOptions.concat([{ '$project': project }]);

        if (kpi.status && kpi.status.length > 0) {
            aggregateOptions.push({ '$match': { 'status': { '$in': kpi.status } } });
        }

        let mapTransform = this.getMapTransform(kpi, translate);
        return { collectionName, aggregateOptions, filters, mapTransform };
    }

    public static getMapTransform(kpi: CampaignsMapKpi, translate: Translate): any {
        let mapTransform = (retVal: Array<any>, cd: ChartDefinition, broker: any, component: any) => {
            return retVal;
        };
        return mapTransform;
    }
}
