import { IEntity } from '../entity/entity.interface';
import { IChartDefinition } from '../chart-definition/chart-definition.interface';

export class IDashboard extends IEntity {
  originalRef: string;
  creatorRef: string;
  icon?: string;
  title: string;
  description: string;

  tabs: Array<{ title: string, items: Array<{ col: number; row: number; sizex: number; sizey: number; definition: IChartDefinition }> }>;
}
