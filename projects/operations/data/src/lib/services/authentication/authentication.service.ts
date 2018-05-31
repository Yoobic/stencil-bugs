import { Injectable } from '@angular/core';

import { Authentication as AuthenticationBase } from '@shared/data-core';

import { Subscription } from '../../interfaces/subscription/subscription.interface';
import { UserTrial } from '../../interfaces/user-trial/user-trial.interface';

import { Observable } from 'rxjs';

@Injectable()
export class Authentication extends AuthenticationBase {

    signupTrial(userTrial: UserTrial): Observable<any> {
        return this.broker.create('usertrial', userTrial);
    }

    signupSubscription(subscription: Subscription): Observable<any> {
        return this.broker.create('subscription', subscription);
    }

}
