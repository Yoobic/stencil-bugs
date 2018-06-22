import { environment as environmentOperations} from '@operations/common-mobile';

export const environment = Object.assign(environmentOperations, {
    sentryClientKey: 'https://5f2ef860a1b3413ba5f3488cc3672bff@sentry.io/1198742',
    appId: 'com.ipelia.yoobicv3',
    configIsWeb: false,
    configIsIonic2: true,
    configPlatform: 'IONIC'
});
