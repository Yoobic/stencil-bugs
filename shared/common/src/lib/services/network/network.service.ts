import { Injectable, OnDestroy } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
import { Network as NetworkNative } from '@ionic-native/network/ngx';
import { Subscription, Observable, Subject } from 'rxjs';

import { isUndefined } from 'lodash-es';

@Injectable()
export class Network implements OnDestroy {

    private _isOffline: boolean = false;
    private _isForcedOffline: boolean = false;
    private _onConnectSubscription: Subscription;
    private _onDisconnectSubscription: Subscription;
    private _supportedConnections = ['wifi', 'ethernet', '4g', '3g'];
    private _connectionChange = new Subject<boolean>();

    constructor(private coreConfig: CoreConfig, private networkNative: NetworkNative) {
        if (this.coreConfig.isCordova()) {
            let connection = this.networkNative.type;
            if (isUndefined(connection)) {
                this._isOffline = !navigator.onLine;
            } else {
                this._isOffline = this._supportedConnections.indexOf(connection) < 0;
            }
        } else if (this.coreConfig.isUniversal()) {
            this._isOffline = false;
        } else {
            this._isOffline = !navigator.onLine;
        }
        this.emit();

        if (this.coreConfig.isCordova()) {
            this._onConnectSubscription = <any>this.networkNative.onConnect().subscribe(() => {
                this._isOffline = false;
                this.emit();
            });
            this._onDisconnectSubscription = <any>this.networkNative.onDisconnect().subscribe(() => {
                this._isOffline = true;
                this.emit();
            });
        } else if (!this.coreConfig.isUniversal()) {
            window.addEventListener('online', () => {
                this._isOffline = false;
                this.emit();
            });
            window.addEventListener('offline', () => {
                this._isOffline = true;
                this.emit();
            });
        }
    }

    ngOnDestroy() {
        if (this._onConnectSubscription) {
            this._onConnectSubscription.unsubscribe();
        }

        if (this._onDisconnectSubscription) {
            this._onDisconnectSubscription.unsubscribe();
        }
    }

    get connectionChange$(): Observable<boolean> {
        return this._connectionChange.asObservable();
    }

    isOffline() {
        return this._isForcedOffline || this._isOffline;
    }

    isForcedOffline() {
        return this._isForcedOffline;
    }

    getConnection() {
        return this.networkNative.type;
    }

    emit() {
        this._connectionChange.next(this._isForcedOffline || this._isOffline);
    }

    forceOffline(offline: boolean, emit: boolean = true) {
        this._isForcedOffline = offline;
        if (emit) {
            this.emit();
        }
    }
}
