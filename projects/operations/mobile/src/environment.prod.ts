import { environment as environmentMobile} from './environment.mobile';

export const environment = Object.assign(environmentMobile, {
    webUrl: 'https://yoooperations-mobile.herokuapp.com',
    appleStoreUrl: 'https://itunes.apple.com/app/yoobic-team/id1184286350?mt=8',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.ipelia.yoobicv3',
    production: true,
    configMode: 'prod',
    server: null,
    codePushIOS: '8fV6Q1VHrlvQL8kRFuMA2XPdRdIjd3456407-bb1a-4af5-806b-3f40b7c8df62',
    codePushAndroid: 'nbLzk0kvR23s2MLlXXIQ6WS0fYlWd3456407-bb1a-4af5-806b-3f40b7c8df62'
});
