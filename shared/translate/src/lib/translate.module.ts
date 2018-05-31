import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule as AngularCommonModule, registerLocaleData } from '@angular/common';

//import { TRANSLATE_PIPES } from './pipes';
import { DistancePipe } from './pipes/distance/distance.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { PolyglotPipe } from './pipes/polyglot/polyglot.pipe';
//import { TRANSLATE_PROVIDERS } from './services';
import { Translate } from './services/translate/translate.service';

import { TranslateModule as NgxTranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
    declarations: [
        DistancePipe,
        FilterPipe,
        PolyglotPipe
    ],
    imports: [
        AngularCommonModule,
        NgxTranslateModule
    ],
    exports: [
        NgxTranslateModule,
        TranslatePipe,
        DistancePipe,
        FilterPipe,
        PolyglotPipe
    ]
})
export class TranslateModule {
    static forRoot(configuredProviders: Array<Provider> = []): ModuleWithProviders {
        return {
            ngModule: TranslateModule,
            providers: [
                Translate,
                ...configuredProviders
            ]
        };
    }
}

import localeEnGB from '@angular/common/locales/en-GB';
import localeEnGBExtra from '@angular/common/locales/extra/en';
registerLocaleData(localeEnGB, 'en-GB', localeEnGBExtra);

import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);

import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
registerLocaleData(localeEs, 'es-ES', localeEsExtra);

import localeNl from '@angular/common/locales/nl';
import localeNlExtra from '@angular/common/locales/extra/nl';
registerLocaleData(localeNl, 'nl-NL', localeNlExtra);

import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';
registerLocaleData(localePl, 'pl-PL', localePlExtra);

import localeIt from '@angular/common/locales/it';
import localeItExtra from '@angular/common/locales/extra/it';
registerLocaleData(localeIt, 'it-IT', localeItExtra);

import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
registerLocaleData(localeRu, 'ru-RU', localeRuExtra);

import localeZhs from '@angular/common/locales/zh-Hans';
import localeZhsExtra from '@angular/common/locales/extra/zh-Hans';
registerLocaleData(localeZhs, 'zh-Hans', localeZhsExtra);

import localeZht from '@angular/common/locales/zh-Hant';
import localeZhtExtra from '@angular/common/locales/extra/zh-Hant';
registerLocaleData(localeZht, 'zh-Hant', localeZhtExtra);

import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
registerLocaleData(localePt, 'pt-PT', localePtExtra);

import localeJa from '@angular/common/locales/ja';
import localeJaExtra from '@angular/common/locales/extra/ja';
registerLocaleData(localeJa, 'ja-JA', localeJaExtra);

import localeHe from '@angular/common/locales/he';
import localeHeExtra from '@angular/common/locales/extra/he';
registerLocaleData(localeHe, 'he-HE', localeHeExtra);

import localeAr from '@angular/common/locales/ar';
import localeArExtra from '@angular/common/locales/extra/ar';
registerLocaleData(localeAr, 'ar-AR', localeArExtra);

import localeTh from '@angular/common/locales/th';
import localeThExtra from '@angular/common/locales/extra/th';
registerLocaleData(localeTh, 'th-TH', localeThExtra);

import localeTr from '@angular/common/locales/tr';
import localeTrExtra from '@angular/common/locales/extra/tr';
registerLocaleData(localeTr, 'tr-TR', localeTrExtra);

import localeBg from '@angular/common/locales/bg';
import localeBgExtra from '@angular/common/locales/extra/bg';
registerLocaleData(localeBg, 'bg-BG', localeBgExtra);

import localeEl from '@angular/common/locales/el';
import localeElExtra from '@angular/common/locales/extra/el';
registerLocaleData(localeEl, 'el-EL', localeElExtra);

import localeSl from '@angular/common/locales/sl';
import localeSlExtra from '@angular/common/locales/extra/sl';
registerLocaleData(localeSl, 'sl-SL', localeSlExtra);

import localeSk from '@angular/common/locales/sk';
import localeSkExtra from '@angular/common/locales/extra/sk';
registerLocaleData(localeSk, 'sk-SK', localeSkExtra);
