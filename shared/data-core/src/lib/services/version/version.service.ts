import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';

import { CoreConfig, ConfigConstants } from '@shared/common';

@Injectable()
export class Version {

    constructor(private config: Config, private coreConfig: CoreConfig, private configConstants: ConfigConstants) { }

    public get() {
        let retVal: string;
        let serverName = this.config.serverName.toUpperCase();
        if (serverName !== 'PRODUCTION') {
            retVal = this.configConstants.appVersion + ' - ' + serverName;
        } else {
            retVal = this.configConstants.appVersion;
        }
        if (this.coreConfig.isWKWebView()) {
            retVal += ' W';
        }
        return retVal;
    }

    isCurrentVersionHigherThan(version: string): boolean {
        let currentVersion = this.configConstants.appVersion;
        if (currentVersion === version) {
            return true;
        }

        let current = currentVersion.split('.');
        let required = version.split('.');
        let len = Math.min(current.length, required.length);

        // loop while the components are equal
        for (let i = 0; i < len; i++) {
            // A bigger than B
            if (parseInt(current[i], null) > parseInt(required[i], null)) {
                return true;
            }
            // B bigger than A
            if (parseInt(current[i], null) < parseInt(required[i], null)) {
                return false;
            }
        }
        // If one's a prefix of the other, the longer one is greater.
        if (current.length > required.length) {
            return true;
        }
        if (current.length < required.length) {
            return false;
        }
        // Otherwise they are the same.
        return true;
    }
}
