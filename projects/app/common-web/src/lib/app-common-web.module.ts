import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonModule as AppCommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';
import { AppCommonBaseModule } from '@app/common-base';

import { AppRootComponent } from './components/app-root/app-root.component';
let PAGES = [AppRootComponent];


import { IonicModule } from '@ionic/angular';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [...PAGES],
  imports: [RouterModule, IonicModule, CommonModule, AppCommonModule, TranslateModule, AppCommonBaseModule, NgAisModule],
  exports: [RouterModule, IonicModule, CommonModule, AppCommonModule, TranslateModule, AppCommonBaseModule, ...PAGES],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppCommonWebModule { }
