import { IEntity } from '../entity/entity.interface';

export class IContact extends IEntity {
  location: any;
  locationRef: string;
  ownerRef?: string;
  owner?: any;

  _id: string;
  imageData: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  company: string;
  sendFinishedEmail: boolean;
  note: string;
}
