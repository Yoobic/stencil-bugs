import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonModule as AppCommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';
import { AppCommonBaseModule } from '@app/common-base';

import { AppRootComponent } from './components/app-root/app-root.component';
let PAGES = [AppRootComponent];

import { AppChatPageComponent } from './modals/app-chat-page/app-chat-page.component';


let ENTRY_COMPONENTS = [
  AppChatPageComponent
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
