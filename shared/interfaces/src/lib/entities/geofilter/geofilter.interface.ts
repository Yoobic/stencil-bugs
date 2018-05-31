import { IEntity } from '../entity/entity.interface';
import { ILocation} from '../location/location.interface';
import { ILocationType } from '../location-type/location-type.interface';
import { IUser } from '../user/user.interface';

export class IGeofilter extends IEntity {
  _tenantRef?: string;

  _id: string;
  username: string;
  user: IUser;
  userRef: string;
  locationsRef: Array<string>;
  locationtypesRef: Array<string>;

  locations: Array<ILocation>;
  locationtypes: Array<ILocationType>;
}

