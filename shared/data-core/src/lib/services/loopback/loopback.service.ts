import { Injectable } from '@angular/core';
import { Session } from '../session/session.service';
//require('yoobic-loopback-node-sdk/client/browserify.bundle');

@Injectable()
export class Loopback {
    private _client = (<any>window).loopbackClient;

    constructor(private session: Session) {
        if (this._client) {
            //this._client.setBaseUrl(this._config.apiUrl);
            this._client.setAccessToken(this.session.token);
        }
    }

    get client() {
        return this._client;
    }
}
