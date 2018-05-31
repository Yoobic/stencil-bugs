import { Injectable } from '@angular/core';
import { CoreConfig, Persistent } from '@shared/common';
import { TranslateService, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
export const AVAILABLE_LANGUAGES = [
    'en',
    'us',
    'fr',
    'de',
    'es',
    'nl',
    'pl',
    'it',
    'ru',
    'zhs',
    'zht',
    'pt',
    'kr',
    'ja',
    'ua',
    'he',
    'ar',
    'cz',
    'th',
    'tr',
    'bg',
    'el',
    'sl',
    'sk'
];

import { moment } from '@shared/interfaces';

@Injectable()
export class Translate {
    public static availablesLanguage: Array<string> = AVAILABLE_LANGUAGES;

    public static availablesLanguageAll: Array<string> = ['all'].concat(Translate.availablesLanguage);

    public static currentLanguage: string = '';

    public static loadExtraLanguage: (language) => Promise<any> = null;

    @Persistent('defaultLanguage') private defaultLanguage;

    private _languageChange = new Subject<string>();

    public static checkLanguage(language: string) {
        if (language === 'zh-Hant-HK' || language === 'zht') {
            language = 'zht';
        } else if (language === 'zh-Hans-GB' || language.startsWith('zh')) {
            language = 'zhs';
        } else {
            language = language.substring(0, 2);
        }
        if (Translate.availablesLanguage.indexOf(language) < 0) {
            language = 'en';
        }
        return language;
    }

    // public static loadFile(language: string) {
    //     language = Translate.checkLanguage(language);
    //     return System.import(/* webpackChunkName: "translate" */'../json/' + (language || 'en') + '.json').then(translations => {
    //         Translate[language] = translations;
    //         if (Translate.loadExtraLanguage) {
    //             return Translate.loadExtraLanguage(language);
    //         } else {
    //             return Promise.resolve({});
    //         }
    //     }).then(extras => {
    //         Translate[language] = Object.assign(Translate[language], extras || {});
    //         return Translate[language];
    //     });
    // }

    constructor(private ngTranslate: TranslateService, private coreConfig: CoreConfig) { }

    init(): Promise<void> {
        let browserLanguage = 'en';
        //this.ngTranslate.addLangs(AVAILABLE_LANGUAGES);
        if (!this.coreConfig.isUniversal()) {
            browserLanguage = (<any>window).navigator.userLanguage || window.navigator.language || 'en';
        }
        // if (this.coreConfig.isCordova() && !this.defaultLanguage) {
        //     return this.globalization.getPreferredLanguage().then(
        //         res => this.setLanguage(res.value),
        //         err => this.setLanguage(browserLanguage)
        //     );
        // } else {
        this.defaultLanguage = this.defaultLanguage || browserLanguage;
        return this.setLanguage(this.defaultLanguage);
        //        }
    }

    get languageChange$(): Observable<string> {
        return this._languageChange.asObservable();
    }

    setLanguage(language: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (language) {
                language = Translate.checkLanguage(language);
                this.defaultLanguage = language;
                this.ngTranslate.setDefaultLang(this.defaultLanguage);
                moment.locale(this.getLanguageFull(language, '-'));
                this._languageChange.next(language);
                Translate.currentLanguage = language;
                if (typeof window !== 'undefined' && window.document) {
                    if (this.isRtl(language)) {
                        window.document.dir = 'rtl';
                    } else {
                        window.document.dir = 'ltr';
                    }
                }
                this.ngTranslate.use(language).subscribe(() => {
                    resolve(language);
                });
            } else {
                resolve(null);
            }
        });
    }

    addDynamicLanguage(language: string, translations: Array<any>, isAdmin: boolean) {
        let newTranslations = (<any>this.ngTranslate).translations[language] || {};
        translations.forEach(d => {
            if (d && d.key && (!isAdmin || this.ngTranslate.instant(d.key) === d.key)) {
                newTranslations[d.key] = d[language];
            }
        });
        this.ngTranslate.setTranslation(language, newTranslations, true);
    }

    getCurrentLanguage() {
        return this.defaultLanguage;
    }

    getCurrentAngularLocale() {
        switch (this.defaultLanguage) {
            case 'en':
                return 'en-GB';
            case 'us':
                return 'en-US';
            case 'zhs':
                return 'zh-Hans';
            case 'zht':
                return 'zh-Hant';
            case 'fr':
            case 'de':
            case 'es':
            case 'nl':
            case 'pl':
            case 'it':
            case 'ru':
            case 'pt':
            case 'ja':
            case 'he':
            case 'ar':
            case 'th':
            case 'tr':
            case 'bg':
            case 'gr':
            case 'sl':
            case 'sk':
                return this.defaultLanguage;
            default:
                return 'en-US';
        }
    }

    getCurrentLanguageFull(separator = '_') {
        let l = this.getCurrentLanguage();
        return this.getLanguageFull(l, separator);
    }

    get(key: string, params?: Object): string {
        try {
            return this.ngTranslate.instant(key, params);
        } catch (err) {
            return key;
        }
    }

    getIcon(language: string) {
        switch (language) {
            case 'en':
                return 'flag-icon flag-icon-gb';
            case 'zhs':
                return 'flag-icon flag-icon-cn';
            case 'zht':
                return 'flag-icon flag-icon-hk';
            case 'ja':
                return 'flag-icon flag-icon-jp';
            case 'he':
                return 'flag-icon flag-icon-il';
            case 'ar':
                return 'flag-icon flag-icon-ae';
            case 'el':
                return 'flag-icon flag-icon-gr';
            case 'sl':
                return 'flag-icon flag-icon-si';
            default:
                return 'flag-icon flag-icon-' + language;
        }
    }

    getAll(language: string) {
        return Translate[language];
    }

    // loadAllFiles() {
    //     return Promise.all(Translate.availablesLanguage.map(l => Translate.loadFile(l)));
    // }

    polyglot(value: string) {
        if (value && value.replace && value.indexOf('%') >= 0) {
            return value.replace(/%(\w+)%/g, (match, key) => {
                return this.get(key);
            });
        }
        if (value && value.toUpperCase && value.toUpperCase() === value) {
            return this.get(value);
        }
        return value;
    }

    isCurrentLanguageRtl() {
        return this.isRtl(this.getCurrentLanguage());
    }

    isCurrentLanguageChinese() {
        let l = this.getCurrentLanguage();
        return ['zhs'].indexOf(l) >= 0;
    }

    isRtl(language: string) {
        if (language === 'he' || language === 'ar') {
            return true;
        }
        return false;
    }

    getLanguageFull(language: string, separator = '_') {
        switch (language) {
            case 'us':
                return 'en' + separator + 'US';
            case 'en':
                return 'en' + separator + 'GB';
            case 'ua':
                return 'uk' + separator + 'UA';
            case 'zhs':
                return 'zh' + separator + 'CN';
            case 'zht':
                return 'zh' + separator + 'TW';
            case 'ae':
                return 'ar' + separator + 'AE';
            default:
                return language + separator + language.toUpperCase();
        }
    }
}

@Injectable()
export class LogMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return params.key;
    }
}

// @Injectable()
// export class CustomTranslateLoader implements TranslateLoader {
//     getLanguage(language: string) {
//         return Translate.loadFile(language);
//     }

//     getTranslation(lang: string): Observable<any> {
//         return new Observable<any>((observer: Observer<any>) => {
//             this.getLanguage(lang).then(val => {
//                 observer.next(val);
//                 observer.complete();
//             });
//         });
//     }
// }
