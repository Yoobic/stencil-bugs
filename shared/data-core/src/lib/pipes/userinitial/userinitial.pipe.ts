import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userinitial' })
export class UserinitialPipe implements PipeTransform {
    constructor() {}

    transform(user: any, ...args: any[]): any {
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
        return 'NA';
    }
}
