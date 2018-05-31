import { Injectable } from '@angular/core';
import { ConfigConstantsBase } from '@operations/common-base';

//import { environment } from '../../../../../../environments/src/environment';

@Injectable()
export class ConfigConstants extends ConfigConstantsBase {
    public configIsIonic2 = true;
    public configIsWeb = false;
    //public configMode = environment.configMode;
    public configPlatform = 'IONIC';
    //public configIsE2E = environment.configIsE2E;
    //public server = environment.server;
    public codePushIOSProd = '8fV6Q1VHrlvQL8kRFuMA2XPdRdIjd3456407-bb1a-4af5-806b-3f40b7c8df62';
    public codePushIOSStaging = 'CqY0zsK-bQy7LUent1xTmBszLKn8d3456407-bb1a-4af5-806b-3f40b7c8df62';
    public codePushAndroidProd = 'nbLzk0kvR23s2MLlXXIQ6WS0fYlWd3456407-bb1a-4af5-806b-3f40b7c8df62';
    public codePushAndroidStaging = 'yyz0SQeBtkm9D5rNVX95zhA4yhM6d3456407-bb1a-4af5-806b-3f40b7c8df62';
    public webUrl = 'https://yoobic-mobile-debug.herokuapp.com';
    public sentryClientKey = 'https://5f2ef860a1b3413ba5f3488cc3672bff@sentry.io/1198742';
}