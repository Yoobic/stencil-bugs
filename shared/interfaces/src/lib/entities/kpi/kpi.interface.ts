import { IEntity } from '../entity/entity.interface';

export class IKpi extends IEntity {
  useCreationDate?: boolean;

  pointPadding: boolean;
  numberPrecision: number;
  // dates: IDatesRange;
}
