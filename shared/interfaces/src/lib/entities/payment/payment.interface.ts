import { IEntity } from '../entity/entity.interface';

export class IPayment extends IEntity {
  _id?: string;
  // type: string;
  // userId: string;
  // details: string;
  type?: string;
  userId?: string;
  details?: string;
  title?: string;

  // amount: number;
  // transactionDate: Date;
  amount?: number;
  paypalEmail?: string;
  transactionDate?: Date;
}
