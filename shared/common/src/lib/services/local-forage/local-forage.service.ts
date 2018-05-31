import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
//https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/

import * as localForage from 'localforage';

//https://github.com/driftyco/ionic-storage
//Try to implement ionic-storage for cordova

@Injectable()
export class LocalForageService {
    constructor(private coreConfig: CoreConfig) {
        this.init().then(() => { }, (err) => { });
    }

    init(): Promise<void> {
        // localForage.config({
        //     driver: [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE]
        // });
        if (localForage.supports(localForage.WEBSQL) && !this.coreConfig.isIOS9()) { //!this.coreConfig.isFirefox() && !this.coreConfig.isIE()) {
            return localForage.setDriver.bind(localForage)(localForage.WEBSQL);
        }
        return Promise.resolve();
    }

    public set<T>(key: string, value: any): Promise<T> {
        return localForage.setItem.bind(localForage)(key, value);
    }

    public get<T>(key: string): Promise<T> {
        return localForage.getItem.bind(localForage)(key);
    }

    public remove(key: string) {
        return localForage.removeItem.bind(localForage)(key);
    }

    public clear() {
        return localForage.clear.bind(localForage)();
    }
}
