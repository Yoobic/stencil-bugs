import { Pipe, PipeTransform } from '@angular/core';
import { Authentication } from '../../services/authentication/authentication.service';

@Pipe({ name: 'authorized' })
export class AuthorizedPipe implements PipeTransform {

    constructor(private authentication: Authentication) { }

    transform(value: Array<string>, ...args: any[]): any {
        value = [].concat(value);
        if (args && args.length > 0 && args[0] === true) {
            return !this.authentication.hasRoles(value) || this.authentication.isAdmin();
        } else {
            return this.authentication.hasRoles(value);
        }
    }
}
