import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';

export class ICampaignfilter extends IEntity {
  _id: string;

  userRef: string;
  user: IUser;
  campaignsRef: Array<string>;
}
