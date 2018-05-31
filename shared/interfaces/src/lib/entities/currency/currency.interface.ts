import { IEntity } from '../entity/entity.interface';

export class ICurrency extends IEntity {
    currency: string;
    symbol: string;
    rate: number;
}
