import { IEntity } from '../entity/entity.interface';

export class IUserTrial extends IEntity {
  _id?: string;
  status?: string;
  group?: string;
  country: string;

  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
  company: string;
  type: string;
  position: string;
  provisioned?: boolean;

}