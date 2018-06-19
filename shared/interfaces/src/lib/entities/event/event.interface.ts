import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';

export class IEvent extends IEntity {
    title: string;
    startDate?: Date;
    endDate?: Date;
    users?: Array<IUser>;
    reminderDate?: Date;
}