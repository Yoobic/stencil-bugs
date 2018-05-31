import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';

@Injectable()
export class LocalStorage {
    public localStorage: any;

    constructor(protected coreConfig: CoreConfig) {

        if (!coreConfig.isUniversal()) {
            if (typeof localStorage === 'undefined') {
                throw new Error('Current browser does not support Local Storage');
            }
            this.localStorage = localStorage;
        } else {
            this.localStorage = {};
        }
    }

    public set(key: string, value: string): void {
        try {
            this.localStorage[key] = value;
        } catch (e) {

        }
    }

    public get(key: string): string {
        return this.localStorage[key] || false;
    }

    public setObject(key: string, value: any): void {
        this.localStorage[key] = JSON.stringify(value);
    }

    public getObject(key: string): any {
        if (this.localStorage[key]) {
            return JSON.parse(this.localStorage[key]);
        } else {
            return null;
        }
    }

    public remove(key: string): any {
        if (!this.coreConfig.isUniversal()) {
            this.localStorage.removeItem(key);
        } else {
            delete this.localStorage[key];
        }
    }

    public clear() {
        if (!this.coreConfig.isUniversal()) {
            this.localStorage.clear();
        } else {
            this.localStorage = {};
        }
    }
}
