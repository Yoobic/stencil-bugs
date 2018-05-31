import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonModule as AppCommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';
import { AppCommonBaseModule } from '@app/common-base';

import { AppRootComponent } from './components/app-root/app-root.component';
let PAGES = [AppRootComponent];

import { AppGridDialogPageComponent } from './modals/app-grid-dialog-page/app-grid-dialog-page.component';
import { AppWhatsNewPageComponent } from './modals/app-whatsnew-page/app-whatsnew-page.component';
import { AppTermsAndConditionsPageComponent } from './modals/app-termsandconditions-page/app-termsandconditions-page.component';
import { AppResetPasswordPageComponent } from './modals/app-resetpassword-page/app-resetpassword-page.component';
import { AppWalkthroughPageComponent } from './modals/app-walkthrough-page/app-walkthrough-page.component';
import { AppChatPageComponent } from './modals/app-chat-page/app-chat-page.component';
import { AppSearchPageComponent } from './modals/app-search-page/app-search-page.component';
import { AppFormDynamicPageComponent } from './modals/app-form-dynamic-page/app-form-dynamic-page.component';
import { EntityActionPageComponent } from './modals/app-entity-action-page/app-entity-action-page.component';


let ENTRY_COMPONENTS = [
  AppGridDialogPageComponent,
  AppWhatsNewPageComponent,
  AppTermsAndConditionsPageComponent,
  AppResetPasswordPageComponent,
  AppWalkthroughPageComponent,
  AppChatPageComponent,
  AppSearchPageComponent,
  AppFormDynamicPageComponent,
  EntityActionPageComponent
];

import { IonicModule } from '@ionic/angular';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [...PAGES, ...ENTRY_COMPONENTS],
  imports: [RouterModule, IonicModule, CommonModule, AppCommonModule, TranslateModule, AppCommonBaseModule, NgAisModule],
  exports: [RouterModule, IonicModule, CommonModule, AppCommonModule, TranslateModule, AppCommonBaseModule, ...PAGES, ...ENTRY_COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppCommonWebModule { }
