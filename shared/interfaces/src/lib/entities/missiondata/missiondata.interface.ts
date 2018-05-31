import { IEntity } from '../entity/entity.interface';
import { IMissionDescription } from '../mission-description/mission-description.interface';
import { IUser } from '../user/user.interface';
import { ILocation } from '../location/location.interface';

export class IMissiondata extends IEntity {
  title?: string;
  tags: Array<string>;
  location?: ILocation;
  locationRef?: string;
  userDisplayname: string;
  userRef: string;
  _geoloc?: [number, number];
  _geolocSave: [number, number];
  nonapplicableCount?: number;
  satisfactoryCount?: number;
  unsatisfactoryCount?: number;

  missiondescription: IMissionDescription;
  mission: any;
  address: string;
  validated: boolean;
  missionRef: string;
  locationId: string;
  date: Date;
  user: IUser;
  rating: number;
  scoreValue: number;
  _id: string;
  _aclGroupsR: any;
  _aclGroupsW: any;

  score?: { value: number; total?: number; isPercentage?: boolean, title?: string };
}
