import { Injectable } from '@angular/core';
import { Requestor, Config } from '@shared/data-core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TwilioToken {

    constructor(private rq: Requestor, private config: Config) {
    }

    getToken$(): Observable<string> {
        return this.fetchToken$();
    }

    getToken(): Promise<string> {
        return this.fetchToken$().toPromise();
    }

    private fetchToken$(): any {
        return this.rq.get(this.config.apiUrl + 'Twilio/getToken').pipe(map(({TwilioConversationsToken}) => TwilioConversationsToken));
    }
}
