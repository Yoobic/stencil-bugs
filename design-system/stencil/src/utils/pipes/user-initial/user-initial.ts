import { Pipe } from '../base';
import { IUser } from '@shared/interfaces';

export class UserInitialPipe implements Pipe< IUser, string> {

    transform(user: IUser ): string {
        if (user) {
            let initials = '';
            if (typeof user !== 'undefined' && user) {
                if (user.firstName && user.lastName) {
                    initials += user.firstName.toString().substring(0, 1);
                    initials += user.lastName.toString().substring(0, 1);
                } else if (user.username) {
                    initials = user.username.toString().substring(0, 2);
                }
            }
            return initials;
        }
        return '';
    }

}
