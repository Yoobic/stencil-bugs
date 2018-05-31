import { IEntity } from '../entity/entity.interface';

export class IProduct extends IEntity {
    title: string;
    reference: string;
    color: string;
    price: number;
    step: number;
    outofstock: boolean;
    image: any;
    description: string;
    shortdescription: string;
    tags?: Array<string>;
    catalogRef: string;
    catalog: any;
}
