import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Authentication } from './authentication.service';
import { Requestor } from '../requestor/requestor.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private authentication: Authentication) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let retVal = false;
        if (this.authentication.isLoggedIn()) {
            if (next.data && next.data['roles']) {
                retVal = this.authentication.hasRoles(next.data['roles']) || this.authentication.isAdmin();
            } else {
                retVal = true;
            }
            if (next.data && next.data['excludedRoles'] && !this.authentication.isAdmin()) {
                retVal = retVal && !this.authentication.hasRoles(next.data['excludedRoles']);
            }
        } else {
            Requestor.unauthorizedEmitter.emit('not logged in');
        }
        return retVal;
    }
}

export interface CanComponentDeactivate {
    canDeactivate: (component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => boolean | Observable<boolean>;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return component && component.canDeactivate ? component.canDeactivate(component, route, state) : true;
    }
}
