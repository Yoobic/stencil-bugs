/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import { CoreConfig } from '@shared/common';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class LinksService {
    public data$: ReplaySubject<any> = new ReplaySubject<any>(1, 2000);

    constructor(private coreConfig: CoreConfig) { }
    handler(data) {
        if (data) {
            this.data$.next(data);
        }
    }

    onReadyOrResume(debug = false) {
        if (this.coreConfig.isCordova() && window.Branch) {
            // console.dir('BRANCHONREADYORRESUME CALLED');
            window.Branch.setDebug(debug);
            window.Branch.initSession(data => {
                // console.dir('BRANCH INITSESSION LISTENER');
                this.handler(data);
            });
        }
    }
}
