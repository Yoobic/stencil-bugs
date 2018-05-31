import { Injectable } from '@angular/core';
import { IConfigConstants } from '../../interfaces/config-constants/config-constants.interface';

@Injectable()
export class ConfigConstants {

    configMode?: string;
    configIsWeb?: boolean;
    configIsIonic2?: boolean;
    configPlatform?: string;
    server?: object;
    mappingServerUrl?: string;
    appVersion?: string = '6.0.15';
    appName?: string;
    appId?: string = 'common';
    appleStoreUrl?: string;
    playStoreUrl: string;
    webUrl?: string;
    configIsE2E?: boolean;
    intercomIdProd?: string;
    intercomIdDev?: string;

    pubnubPublishKey?: string = 'pub-c-5106c124-c556-4f17-b13f-ae70c85a8255';
    pubnubSubscribeKey?: string = 'sub-c-13775026-9db7-11e4-b533-02ee2ddab7fe';
    sentryClientKey?: string = '';
    onesignalAppId?: string = '57b295cc-8b22-46d4-adc3-232d733f1351';
    onesignalAppIds?: { [key: string]: string } = {
        //operations
        'com.ipelia.yoobicv3': '57b295cc-8b22-46d4-adc3-232d733f1351',
        'com.kering.yoobic': '0510ade5-2158-400e-b33f-751473b70594',
        //academy
        'com.ipelia.yooask': '2e814379-d96a-4eaf-9625-93665cdc30fc'
    };
    onesignalSafariWebId?: string = 'web.onesignal.auto.1b1338f0-ae7a-49c0-a5a1-0112be9b9bea';
    googleProjectNumber?: string = '962617592337';
    stripePublishableKey?: string = 'pk_test_7fsltxMMLhABfNjHrZqDToUn';
    stripePublishableKeyProd?: string = 'pk_live_W9g3jJsfY44QJjQVNkSrqckT';
    mapboxKey?: string = 'pk.eyJ1IjoieW9vYmljIiwiYSI6ImNpcTNxaGgwYzAwNjhodm5rdDRmM3JtMmwifQ.Ro3b2vKP5fMMd8ibPKy65A';
    aMapKey?: string = '206fa92104679ea432b9f73d424409250';

    codePushIOSProd?: string;
    codePushIOSStaging?: string;
    codePushAndroidProd?: string;
    codePushAndroidStaging?: string;

    setConfig(config?: IConfigConstants) {
        if (config) {
            Object.assign(this, config);
        }
    }

    getFullAppName() {
        return this.appName + '-' + this.configPlatform.toLowerCase().replace('ionic', 'mobile') + '-' + this.appVersion;
    }

    getLanscapeLogoDark(): string {
        let logoPath = '';
        switch (this.appName) {
            case 'yoobic':
                logoPath = './assets/logo/operations_landscape_dark.svg';
                return logoPath;
            case 'yooask':
                logoPath = './assets/logo/boost_landscape_dark.svg';
                return logoPath;
            case 'yooconnect':
                logoPath = './assets/logo/connect_landscape_dark.svg';
                return logoPath;
        }
    }

    getLogoSimple(): string {
        let logoPath = '';
        switch (this.appName) {
            case 'yoobic':
                logoPath = './assets/logo/operations_simple.svg';
                return logoPath;
            case 'yooask':
                logoPath = './assets/logo/boost_simple.svg';
                return logoPath;
            case 'yooconnect':
                logoPath = './assets/logo/connect_simple.svg';
                return logoPath;
        }
    }

}