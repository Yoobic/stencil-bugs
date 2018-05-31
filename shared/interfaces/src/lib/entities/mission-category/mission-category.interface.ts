import { IEntity } from '../entity/entity.interface';

export class IMissionCategory extends IEntity {
  _id?: string;

  title: string;
  background: any;
  group: string | Array<string>;

  description: string;
  type?: string;
  lessonsCount?: number;
}
