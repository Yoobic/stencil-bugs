import { IEntity } from '../entity/entity.interface';

export class ITenant extends IEntity {
    name: string;
    title: string;
    description: string;
    icon: any;
}