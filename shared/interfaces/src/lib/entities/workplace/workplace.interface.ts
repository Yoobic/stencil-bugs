import { IEntity } from '../entity/entity.interface';

export class IWorkplaceGroups extends IEntity {
  name: string;
  icon: string;
  cover: string;
  description: string;
}

export class IWorkplacePost extends IEntity {
  comments: string;
  workplaceGroups: any;
}
