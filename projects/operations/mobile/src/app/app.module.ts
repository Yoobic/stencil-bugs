import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppCommonBaseModule, UtilsService as AppUtilsService } from '@app/common-base';
import { OperationsCommonMobileModule, routes, ConfigConstantsBase as ConfigConstantsMobile, UtilsService } from '@operations/common-mobile';

import { ConfigConstants } from '../services/config-constants/config-constants.service';

import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppCommonBaseModule.forRoot([
      { provide: AppUtilsService, useExisting: UtilsService },
      { provide: UtilsService, useExisting: UtilsService }
    ]),
    OperationsCommonMobileModule.forRoot([]),
    RouterModule.forRoot([...routes], { useHash: true })
  ],
  providers: [UtilsService, ConfigConstantsMobile, ConfigConstants],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
