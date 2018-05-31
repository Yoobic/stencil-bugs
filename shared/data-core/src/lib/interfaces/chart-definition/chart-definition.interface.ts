import { Model } from '../../decorators/model/model.decorator';
import { FormFieldType, IFormField, Filters, IChartDefinition } from '@shared/interfaces';

import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { MissionDescription } from '../mission-description/mission-description.interface';

export const CHART_TYPES = ['line', 'spline', 'area', 'areaspline', 'column', 'bar', 'radar', 'pie', 'doughnut', 'treemap'];
export const CHART_DATEGROUPINGBY = ['year', 'month', 'week', 'day', 'calendar'];
export const CHART_SHOW_AS = ['chart', 'grid', 'map', 'micro'];
export const CHART_DATETIMEFORMAT = ['d', 'dd', 'DD', 'w', 'MMM'];
export const CHART_TIMESCALE = ['last7days', 'lastweek', 'last30days', 'lastmonth', 'last90days', 'lastquarter', 'last365days', 'lastyear'];

let conditions = {
    showAsChart: 'showAs=="chart"',
    isMissionOrMissionData: 'collectionName=="missions" or collectionName=="missiondatas"',
    isMissionData: 'collectionName=="missiondatas"',
    isMission: 'collectionName=="missions"',
    groupByDate: 'groupByDate == 1'
};

export interface IMissionField {
    selectedDescription: MissionDescription;
    fields?: Array<IFormField> | IFormField;
}

export interface IMissionFields {
    selectedDescription: MissionDescription;
    fields?: Array<IFormField>;
}

export function onChartMissionFieldsChange(missionfields, fieldControls, data) {
    if (missionfields && missionfields.selectedDescription) {
        if (!fieldControls.title.value) {
            fieldControls.title.markAsTouched();
            fieldControls.title.setValue(missionfields.selectedDescription.title);
        }
    }
}

@Model({
    className: 'ChartDefinition',
    collectionName: 'chartdefinitions',
    fields: ['*'],
    include: []
})

export class ChartDefinition extends IChartDefinition {

    @Editable('ChartDefinition', { title: 'QUERYON', type: FormFieldType.autocomplete, translate: true, values: ['missions', 'missiondatas', 'custom'], clearable: false, required: true, autoselect: true })
    collectionName?: string;

    @Editable('ChartDefinition', {
        type: FormFieldType.missionfield,
        condition: conditions.isMissionData,
        title: 'CAMPAIGN',
        required: true,
        onChange: onChartMissionFieldsChange
    })
    missionfields?: IMissionField;

    @Editable('ChartDefinition', { required: true, type: FormFieldType.text })
    @Searchable('ChartDefinition') title: string;

    @Editable('ChartDefinition', { required: false, type: FormFieldType.textarea })
    @Searchable('ChartDefinition') description?: string;

    @Editable('ChartDefinition', { title: 'SHOWAS', type: FormFieldType.autocomplete, flex: 33, values: CHART_SHOW_AS })
    showAs?: string;

    @Editable('ChartDefinition', { type: FormFieldType.autocomplete, values: CHART_TYPES, flex: 33, condition: conditions.showAsChart, translate: true, clearable: false })
    type?: string;

    @Editable('ChartDefinition', { title: 'PALETTE', type: FormFieldType.autocomplete, flex: 34, condition: conditions.showAsChart, translate: true, values: ['palette0', 'palette1', 'palette2', 'palette3'], clearable: false, autoselect: true })
    palette?: string;

    @Editable('ChartDefinition', { type: FormFieldType.checkbox, flex: 34, condition: conditions.isMissionOrMissionData })
    groupByDate?: boolean;

    @Editable('ChartDefinition', { title: 'DATETIMEFORMAT', type: FormFieldType.autocomplete, flex: 33, tag: true, condition: conditions.groupByDate, values: CHART_DATETIMEFORMAT, clearable: true })
    datetimeFormat?: string;

    @Editable('ChartDefinition', { title: 'TIMESCALE', type: FormFieldType.autocomplete, flex: 33, condition: conditions.groupByDate, values: CHART_TIMESCALE })
    timescale?: string;

    @Editable('ChartDefinition', { title: 'GROUPBY', type: FormFieldType.autocomplete, translate: true, flex: 34, values: CHART_DATEGROUPINGBY, condition: conditions.groupByDate, clearable: false })
    dateGrouping?: string;

    @Editable('ChartDefinition', { type: FormFieldType.checkbox, flex: 33, condition: conditions.isMission })
    groupByTag?: boolean;

    @Editable('ChartDefinition', { type: FormFieldType.checkbox, flex: 33, condition: conditions.isMission })
    groupByCampaign?: boolean;

    @Editable('ChartDefinition', { flex: 33, type: FormFieldType.checkbox })
    showLegend?: boolean;

    @Editable('ChartDefinition', { flex: 33, type: FormFieldType.checkbox })
    showValues?: boolean;

    @Editable('ChartDefinition', { flex: 33, type: FormFieldType.checkbox })
    colorByPoint?: boolean;

    @Editable('ChartDefinition', { type: FormFieldType.autocomplete, flex: 34, values: ['normal', 'percent'], clearable: true })
    stacked?: string;

    @Editable('ChartDefinition', { required: false, type: FormFieldType.textarea })
    @Searchable('ChartDefinition') custom?: string;

    mapTransform?: (retVal: Array<{ _id: string; serie?: string; value: number, color?: string }>, cd?: ChartDefinition, broker?: any, component?: any) => {};
    filters?: Filters;
}
