import { ICurrency } from '../../entities/currency/currency.interface';

export interface ISessionService {
    token: string;
    user: any;
    userId: string;
    currencies: Array<ICurrency>;
    groups: Array<string>;
    roles: Array<string>;
    tenantName?: string;
    tenantRef?: string;
}