import { Injectable } from '@angular/core';
import { ConfigConstants } from '../config-constants/config-constants.service';

@Injectable()
export class Log {
    private mode: string;

    constructor(configConstants: ConfigConstants) {
        this.mode = configConstants.configMode;
    }

    log(message?: any, ...optionalParams: any[]) {
        if (this.mode === 'dev') {
            window['console'].log(message, ...optionalParams);
        }
    }

    forceLog(message?: any, ...optionalParams: any[]) {
        window['console'].log(message, ...optionalParams);
    }

    error(message?: any, ...optionalParams: any[]) {
        if (this.mode === 'dev') {
            window['console'].error(message, ...optionalParams);
        }
    }

    alert(message: any) {
        window['alert'](message);
    }
}
