import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../interfaces/user/user.interface';

@Pipe({ name: 'username' })
export class UsernamePipe implements PipeTransform {
    constructor() {}

    transform(user: any, ...args: any[]): any {
        return User.getDisplayName(user);
    }
}
