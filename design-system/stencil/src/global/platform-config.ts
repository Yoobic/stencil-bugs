import * as helpers from './platform-helpers';

export interface Platform {
    name: string;
    isMatch: () => boolean;
}

export const platformName: any = {
    cordova: 'cordova',
    electron: 'electron',
    firefox: 'firefox',
    ie: 'IE',
    ie11: 'IE11',
    landscape: 'landscape',
    portrait: 'portrait',
    ionic: 'ionic',
    universal: 'universal',
    ios: 'ios',
    ios9: 'ios9'
};

export const platforms: Platform[] = [
    {
        name: platformName.cordova,
        isMatch: () => helpers.isCordova()
    }, {
        name: platformName.firefox,
        isMatch: () => helpers.isFirefox()
    }, {
        name: platformName.electron,
        isMatch: () => helpers.isElectron()
    }, {
        name: platformName.ie,
        isMatch: () => helpers.isIE()
    }, {
        name: platformName.ie11,
        isMatch: () => helpers.isIE11()
    }, {
        name: platformName.ionic,
        isMatch: () => helpers.isIonic()
    }, {
        name: platformName.landscape,
        isMatch: () => helpers.isLandscape()
    }, {
        name: platformName.portrait,
        isMatch: () => helpers.isPortrait()
    }, {
        name: platformName.universal,
        isMatch: () => helpers.isUniversal()
    }, {
        name: platformName.ios,
        isMatch: () => helpers.isIOS()
    }, {
        name: platformName.ios9,
        isMatch: () => helpers.isIOS9()
    }
];