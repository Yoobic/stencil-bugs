import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'useremail' })
export class UseremailPipe implements PipeTransform {
    constructor() {}

    transform(user: any, ...args: any[]): any {
        if (user) {
            let email = '';
            if (typeof user !== 'undefined' && user) {
                email = user.username || email;
                if (user.email) {
                    email = user.email;
                } else if (user._socialIdentity && user._socialIdentity.facebook && user._socialIdentity.facebook.email) {
                    email = user._socialIdentity.facebook.email;
                }
            }
            return email;
        }
        return '';
    }
}