import { IUser } from '../../entities/user/user.interface';

export interface IWebMenuEntry {
    logo?: string;
    items?: Array<{
        label: string;
        icon: string;
        iconSelected?: string;
        href?: string;
        name?: string
        handler?: Function;
        separator?: boolean;
        badge?: string;
    }>;
    user?: IUser;
}