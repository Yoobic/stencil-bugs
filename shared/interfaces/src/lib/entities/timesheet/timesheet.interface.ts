import { IEntity } from '../entity/entity.interface';
import { ILocation } from '../location/location.interface';
import { IUser } from '../user/user.interface';

export class ITimesheet extends IEntity {
  _id: string;
  locationRef: string;
  owner: IUser;
  ownerRef: string;

  // timer: ITimer;
  location: ILocation;
  assignment: string;
  recap: string;
  notes: string;
}