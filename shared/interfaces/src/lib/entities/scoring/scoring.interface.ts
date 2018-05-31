import { IEntity } from '../entity/entity.interface';

export class IScoring extends IEntity {
  title: string;
  description: string;
  initialValue: number;
  minValue: number;
  isActive: boolean;
  isPercentage: boolean;
  percentageBasis: number;
  // selectedFields: Array<IFormField>;
  category: any;
  categoryRef: string;
}
