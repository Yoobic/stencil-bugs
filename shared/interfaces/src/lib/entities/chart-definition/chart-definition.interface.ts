import { IEntity } from '../entity/entity.interface';

export class IChartDefinition extends IEntity {
  _id?: string;
  showLabelsY?: boolean;
  maxX?: number;
  maxY?: number;
  unit?: string;
  splitSeriesInCharts?: boolean;
  legendValue?: string;
  showDelta?: boolean;
  showCumulate?: boolean;
  hideRegression?: boolean;
  useCluster?: boolean;
  microInfo?: string;
  hideAxis?: boolean;
  marginBottom?: number;
  legendVerticalAlign?: string;
  legendAlign?: string;
  legendWidth?: number;
  kpi?: boolean;
  kpiType?: string;
  kpiFormValues?: any; //CampaignsProgressKpi;
  kpiColumns?: any;
  gridState?: any;
  gridPivotMode?: boolean;
  gridFilters?: any;
  gridSorts?: any;
  chartLegendState?: {
    [name: string]: boolean
  };
  mapFilters?: any;
  useHighstock?: boolean;

  dateField?: string;

  colors?: {
    [name: string]: string
  };
  pointPadding?: number;
  numberPrecision?: number;
  allowPointSelect?: boolean;
  // filters?: Filters;
  aggregateOptions?: Array<any>;
  // mapTransform?: (retVal: Array<{ _id: string; serie?: string; value: number, color?: string }>, cd?: IChartDefinition, broker?: any, component?: any) => {};
  endDate?: Date | string;
  data?: any;

  collectionName?: string;
  // missionfields?: IMissionField;
  title: string;
  description?: string;
  showAs?: string;
  type?: string;
  palette?: string;
  groupByDate?: boolean;
  datetimeFormat?: string;
  timescale?: string;
  dateGrouping?: string;
  groupByTag?: boolean;
  groupByCampaign?: boolean;
  showLegend?: boolean;
  showValues?: boolean;
  colorByPoint?: boolean;
  stacked?: string;
  custom?: string;

}
