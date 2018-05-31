import { IEntity } from '../entity/entity.interface';

export class ITag extends IEntity {
  collectionName: string;

  tag: string;
}
