export * from './kpi.base';

import {
    CampaignsDurationKpi
} from './kpi.campaigns-duration';
export * from './kpi.campaigns-duration';

import {
    CampaignsProgressKpi,
    CampaignsAuditProgressKpi,
    CampaignsConformityProgressKpi,
    CampaignsValidationProgressKpi,
    CampaignsConformityRelativeProgressKpi,
    CampaignsActivePOSKpi,
    CampaignsFreqencyPOSKpi,
    CampaignsCorrelationPOSKpi,
    CampaignsCorrelationDataKpi,
    CampaignsTransformationRateKpi
} from './kpi.campaigns-progress';
export * from './kpi.campaigns-progress';

import {
    CampaignsTemporalProgressKpi,
    CampaignsTemporalValidationKpi,
    CampaignsTemporalLearningCurveKpi,
    CampaignsTemporalPOSKpi,
    CampaignsTemporalUserKpi,
    PaymentsTemporalKpi
} from './kpi.campaigns-temporal';
export * from './kpi.campaigns-temporal';

import { CampaignsPivotTableKpi } from './kpi.campaigns-pivot';
export * from './kpi.campaigns-pivot';

import { CampaignsMapKpi } from './kpi.campaigns-map';
export * from './kpi.campaigns-map';

import { MissionDatasKpi, MissionPhotosKpi } from './kpi.missiondatas';
export * from './kpi.missiondatas';

import { ChartIOKpi } from './kpi.chartio';
export * from './kpi.chartio';

export const KPIS: Array<{ type: any, name: string; icon: string }> = [
    { type: CampaignsProgressKpi, name: 'CampaignsProgressKpi', icon: 'kpi/barpercentenergized.svg' },
    { type: CampaignsValidationProgressKpi, name: 'CampaignsValidationProgressKpi', icon: 'kpi/barpercentroyal.svg' },
    { type: CampaignsAuditProgressKpi, name: 'CampaignsAuditProgressKpi', icon: 'kpi/todo.svg' },
    { type: CampaignsConformityProgressKpi, name: 'CampaignsConformityProgressKpi', icon: 'kpi/barpercent.svg' },
    { type: CampaignsConformityRelativeProgressKpi, name: 'CampaignsConformityRelativeProgressKpi', icon: 'kpi/barpercentmulticolor.svg' },
    { type: CampaignsDurationKpi, name: 'CampaignsDurationKpi', icon: 'kpi/clock.svg' },
    { type: CampaignsTemporalProgressKpi, name: 'CampaignsTemporalProgressKpi', icon: 'kpi/lines.svg' },
    { type: CampaignsTemporalValidationKpi, name: 'CampaignsTemporalValidationKpi', icon: 'kpi/splineroyal.svg' },
    { type: CampaignsTemporalLearningCurveKpi, name: 'CampaignsTemporalLearningCurveKpi', icon: 'kpi/linesmulticolor.svg' },
    { type: CampaignsTemporalPOSKpi, name: 'CampaignsTemporalPOSKpi', icon: 'kpi/splines.svg' },
    { type: CampaignsTemporalUserKpi, name: 'CampaignsTemporalUserKpi', icon: 'kpi/userrank.svg' },
    { type: CampaignsActivePOSKpi, name: 'CampaignsActivePOSKpi', icon: 'kpi/barpercentdark.svg' },
    { type: CampaignsFreqencyPOSKpi, name: 'CampaignsFreqencyPOSKpi', icon: 'kpi/columnfrequency.svg' },
    { type: CampaignsCorrelationPOSKpi, name: 'CampaignsCorrelationPOSKpi', icon: 'kpi/scatter.svg' },
    { type: CampaignsCorrelationDataKpi, name: 'CampaignsCorrelationDataKpi', icon: 'kpi/datacorrelation.svg' },
    { type: CampaignsPivotTableKpi, name: 'CampaignsPivotTableKpi', icon: 'kpi/pivottable.svg' },
    { type: CampaignsMapKpi, name: 'CampaignsMapKpi', icon: 'kpi/map.svg' },
    { type: MissionDatasKpi, name: 'MissionDatasKpi', icon: 'kpi/piepresentation.svg' },
    { type: MissionPhotosKpi, name: 'MissionPhotosKpi', icon: 'kpi/photo.svg' },
    { type: PaymentsTemporalKpi, name: 'PaymentsTemporalKpi', icon: 'kpi/custom.svg' },
    { type: CampaignsTransformationRateKpi, name: 'CampaignsTransformationRateKpi', icon: 'kpi/calendar.svg' },
    { type: ChartIOKpi, name: 'ChartIOKpi', icon: 'kpi/custom.svg' }
];
