import { startCase } from 'lodash-es';
import { IUser, IEntity } from '@shared/interfaces';

export function getUserDisplayName(user: IUser): string {
    if (user) {
        let displayName = user.username;
        if (user.firstName && user.lastName) {
            displayName = startCase(user.firstName.toString().toLowerCase()) + ' ' + startCase(user.lastName.toString().toLowerCase());
        } else if (user.email) {
            displayName = user.email;
        }
        return displayName;
    }
    return '';
}

export function convertItem(value: any): IEntity {
    return {_id: value};
}