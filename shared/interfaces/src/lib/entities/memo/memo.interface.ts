import { IEntity } from '../entity/entity.interface';
import { IUser } from '../user/user.interface';

export class IMemo extends IEntity {
    title: string;
    description?: string;
    duedate?: Date;
    users?: Array<IUser>;
    isRecurring?: boolean;
}