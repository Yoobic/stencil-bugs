import { Injectable } from '@angular/core';
import { ConfigConstantsBase } from '@operations/common-base';

//import { environment } from '../../../../../../environments/src/environment';


@Injectable()
export class ConfigConstants extends ConfigConstantsBase {
    public configIsIonic2 = false;
    public configIsWeb = true;
    // public configMode = environment.configMode;
    // public configIsE2E = environment.configIsE2E;
    public configPlatform = 'WEB';
    //public server = environment.server;
    public webUrl = 'https://yoobic-dashboard-debug.herokuapp.com';
    public sentryClientKey = 'https://50ba9121139746f897c8967a5cd72eb9@sentry.io/1198739';
}