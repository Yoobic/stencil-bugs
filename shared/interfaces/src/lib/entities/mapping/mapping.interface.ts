import { IEntity } from '../entity/entity.interface';

export class IIMapping extends IEntity {
  context: string;

  type: string;
  document: any;
}

export class ITrialMapping extends IEntity {
  introduction;
  introductionvideo;
  campaigntype: string;
}
