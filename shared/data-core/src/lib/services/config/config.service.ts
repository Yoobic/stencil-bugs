import { Injectable, Injector } from '@angular/core';
import { LocalStorage, ConfigConstants, CoreConfig } from '@shared/common';
import { Translate } from '@shared/translate';

@Injectable()
export class Config {
    private static PROD_URL = 'https://api3.yoobic.com/'; //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    //private static CHINA_PROD_URL = 'https://china.yoobic.com/'; //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    private static STAGING_URL = 'https://yoobic-loopback-staging-v3.herokuapp.com/';
    private static DEMO_URL = 'https://yoobic-loopback-demo.herokuapp.com/';
    private static DEV_URL = 'https://yoobic-loopback-dev-v3.herokuapp.com/';
    private static DEV1_URL = 'https://yoobic-loopback-dev1-v3.herokuapp.com/';
    private static LOCALHOST_URL = 'https://localhost:3000/';
    private static TESTPEN_URL = 'https://testpen.yoobic.com/';
    private static TRIAL_URL = 'https://yoobic-loopback-trial.herokuapp.com/';
    private static E2E_URL = 'https://yoobic-loopback-e2e.herokuapp.com/';

    private static IMAGE_URL = 'https://upload.yoobic.com/api/'; // 'https://images.yoobic.com/api/ImageContainers/cloudinary/upload'; //'https://192.168.1.88:3000/api/ImageContainers/cloudinary/upload'//'http://localhost:3000/api/ImageContainers/cloudinary/upload'; //

    private static MAPPING_PROD_URL = 'https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-production-v3/';
    private static MAPPING_DEMO = 'https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-demo/';
    private static MAPPING_STAGING_URL = 'https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-staging/';
    private static MAPPING_DEV_URL = 'https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-dev-v3/';
    private static MAPPING_DEV1_URL = 'https://etl.yoobic.com/flows/mapping/upload_loopback/yoobic-dev0/';

    private static ZAPIER_INSTAGRAM_PROD_URL = 'https://etl.yoobic.com/flows/zapier_instagram_start';
    protected translate: Translate;
    private server: string;
    private configServer;

    constructor(protected localStorage: LocalStorage, configConstants: ConfigConstants, protected coreConfig: CoreConfig, protected injector: Injector) {
        this.configServer = configConstants.server;
        this.translate = this.injector.get<Translate>(Translate);
    }

    public get servers() {
        let servers = [
            { _id: 'prod', name: 'Production', url: Config.PROD_URL },
            { _id: 'demo', name: 'Demo', url: Config.DEMO_URL },
            { _id: 'staging', name: 'Staging', url: Config.STAGING_URL },
            { _id: 'dev', name: 'Development', url: Config.DEV_URL },
            { _id: 'dev1', name: 'Development 1', url: Config.DEV1_URL },
            { _id: 'trial', name: 'Trial', url: Config.TRIAL_URL },
            { _id: 'e2e', name: 'E2E', url: Config.E2E_URL }

        ];
        if (!this.coreConfig.isUniversal() || location.hostname === 'localhost') {
            servers.push({ _id: 'localhost', name: 'Localhost', url: Config.LOCALHOST_URL });
            servers.push({ _id: 'testpen', name: 'Testpen', url: Config.TESTPEN_URL });
        }
        if (this.configServer) {
            servers = [this.configServer];
        }

        if (this.isTestpen) {
            servers = [{ _id: 'testpen', name: 'Testpen', url: Config.TESTPEN_URL }];
        }
        return servers;
    }

    public get serverUrl() {
        if (this.isTestpen) {
            return Config.TESTPEN_URL;
        }
        let defaultServer;
        if (this.server && this.server !== '') {
            defaultServer = this.server;
        } else {
            // if (this.translate.isCurrentLanguageChinese()) {
            //     defaultServer = Config.CHINA_PROD_URL;
            // } else {
            defaultServer = Config.PROD_URL; // this.mode === 'prod' ? Config.PROD_URL : Config.DEV_URL;}
            //}
        }
        let configServer = this.configServer && this.configServer.url ? this.configServer.url : undefined;
        this.server = this.localStorage.get('SERVER') || configServer || defaultServer;
        return this.server;
    }

    public get serverName() {
        let server = this.servers.filter(s => s.url === this.serverUrl);
        if (server && server.length === 1) {
            return server[0].name;
        }
        return this.translate.get('CUSTOM');
    }

    public set serverUrl(url) {
        this.localStorage.set('SERVER', url);
    }

    public get apiUrl() {
        return this.serverUrl + 'api/';
    }

    public get uploadUrl() {
        return (this.localStorage.get('SERVER_IMAGE') || Config.IMAGE_URL) + 'ImageContainers/cloudinary/upload';
    }

    public get uploadProxyUrl() {
        return (this.localStorage.get('SERVER_IMAGE') || Config.IMAGE_URL) + 'cloudinary/uploadProxyImage';
    }

    public get mappingUrl() {
        let url = this.serverUrl;

        let retVal: string;
        switch (url) {
            case Config.DEMO_URL:
                retVal = Config.MAPPING_DEMO;
                break;
            case Config.STAGING_URL:
                retVal = Config.MAPPING_STAGING_URL;
                break;
            case Config.DEV1_URL:
                retVal = Config.MAPPING_DEV1_URL;
                break;
            case Config.PROD_URL:
                retVal = Config.MAPPING_PROD_URL;
                break;
            case Config.DEV_URL:
            default:
                retVal = Config.MAPPING_DEV_URL;
                break;
        }
        return this.localStorage.get('SERVER_MAPPING') || retVal;
    }

    public get zapierInstagramUrl() {
        let url = this.serverUrl;
        switch (url) {
            case Config.PROD_URL:
                return Config.ZAPIER_INSTAGRAM_PROD_URL;
            default:
                return null;
        }
    }

    public get isTestpen() {
        return !this.coreConfig.isUniversal() && (location.hostname === 'testpen-dashboard.yoobic.com' || location.hostname === 'testpen-mobile.yoobic.com' || this.server === Config.TESTPEN_URL);
    }

    public get isE2E() {
        return this.serverUrl === Config.E2E_URL;
    }
}
