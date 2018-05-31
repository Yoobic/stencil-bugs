import { IEntity } from '../entity/entity.interface';
import { IMissionDescription } from '../mission-description/mission-description.interface';

export class IAutorenewConfig extends IEntity {
  _id: string;
  descriptionTargetRef: string;
  descriptionSourceRef: string;

  title: string;
  prefix_title: string;
  priority?: number;
  descriptionSource: IMissionDescription;
  descriptionTarget: IMissionDescription;
  active: boolean;
}