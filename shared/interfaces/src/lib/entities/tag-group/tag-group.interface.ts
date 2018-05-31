import { IEntity } from '../entity/entity.interface';

export class ITagGroup extends IEntity {
  title: string;
  tags: Array<string>;
  group: string | Array<string>;
}
