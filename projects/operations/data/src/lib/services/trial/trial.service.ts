import { Injectable } from '@angular/core';
import { Config, Requestor } from '@shared/data-core';
import { UserTrial } from '../../interfaces/user-trial/user-trial.interface';

import { Observable } from 'rxjs';

@Injectable()
export class Trial {
    constructor(private config: Config, private rq: Requestor) { }

    init(userTrial: UserTrial): Observable<any> {
        let url = this.config.apiUrl + 'usertrial/initialize';
        return this.rq.post(url, { userTrialId: userTrial._id });
    }

    validateToken(token: string): Observable<any> {
        let url = this.config.apiUrl + 'usertrial/validateToken';
        return this.rq.post(url, { token });
    }

    inviteUsers(users: Array<{ email: string; roles: Array<string> }>, group: string, sendPassword: boolean = false): Observable<any> {
        let url = this.config.apiUrl + 'usertrial/inviteUsers';
        return this.rq.post(url, { users, groups: [group], sendPassword });
    }

    sendInvite(userId: string) {
        let url = this.config.apiUrl + 'usertrial/sendInvite';
        return this.rq.post(url, { userId });
    }
}
