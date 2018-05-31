import { Injectable } from '@angular/core';
import { Authentication } from './authentication.service';
import { Session } from '../session/session.service';

import { Network } from '@shared/common';
import { Observable, of } from 'rxjs';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

@Injectable()
export class CurrentSessionResolver implements Resolve<any> {
    constructor(private authentication: Authentication, private network: Network) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Session> {
        if (this.network.isOffline()) {
            return of(null);
        }
        return this.authentication.getCurrentSession();
    }
}
