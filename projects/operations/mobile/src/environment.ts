import { environment as environmentMobile} from './environment.mobile';

export const environment = Object.assign(environmentMobile, {
    webUrl: 'https://yoooperations-mobile-debug.herokuapp.com',
    production: false,
    configMode: 'dev',
    server: null,
    codePushIOS: 'CqY0zsK-bQy7LUent1xTmBszLKn8d3456407-bb1a-4af5-806b-3f40b7c8df62',
    codePushAndroid: 'yyz0SQeBtkm9D5rNVX95zhA4yhM6d3456407-bb1a-4af5-806b-3f40b7c8df62'
});