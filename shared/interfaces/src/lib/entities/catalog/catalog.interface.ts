import { IEntity } from '../entity/entity.interface';

export class ICatalog extends IEntity {

    title: string;
    image: any;
    description: string;
    group: string;
}
