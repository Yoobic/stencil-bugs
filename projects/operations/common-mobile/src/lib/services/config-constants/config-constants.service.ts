import { Injectable } from '@angular/core';
export interface IConfigConstants {
    configTarget?: string;
    configServer?: string;
    configMode?: string;
    configIsWeb?: boolean;
    configIsIonic2?: boolean;
    configPlatform?: string;
    appVersion?: string;
    appName?: string;
    pubnubPublishKey?: string;
    pubnubSubscribeKey?: string;
    sentryClientKey?: string;
    sentryReleaseName?: string;
    onesignalAppId?: string;
    onesignalSafariWebId?: string;
    googleProjectNumber?: string;
    stripePublishableKey?: string;
    stripePublishableKeyProd?: string;
    mapboxKey?: string;
    server?: {
        _id: string,
        name: string,
        url: string
    };
}

@Injectable()
export class ConfigConstantsBase implements IConfigConstants {
    public configIsIonic2 = true;
    public configIsWeb = false;
    public configPlatform = 'IONIC';
    public appName: string = 'yoobic';

}