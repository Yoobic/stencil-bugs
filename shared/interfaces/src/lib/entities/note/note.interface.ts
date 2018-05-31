import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';

export class INote extends IEntity {
  _id: string;
  notableRef: string;
  notableType: string;
  ownerRef: string;
  owner: IUser;

  imageData: string;
  text: string;
  group: Array<string>;

}
