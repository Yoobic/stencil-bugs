import { IEntity } from '../entity/entity.interface';

export class ILocationType extends IEntity {
    name: string;
    group?: Array<any>;
    count?: number;
}
