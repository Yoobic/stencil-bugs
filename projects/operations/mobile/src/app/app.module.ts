import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CommonModule, ConfigConstants } from '@shared/common';
import { DataCoreModule, Session } from '@shared/data-core';
import { DataLiveModule } from '@shared/data-live';
import { DataFormModule } from '@shared/data-form';
import { TranslateModule } from '@shared/translate';

import { AppCommonBaseModule, UtilsService as AppUtilsService } from '@app/common-base';
import { UtilsService as UtilsServiceOperations } from '@operations/common-base';
import { OperationsCommonMobileModule, routes, ConfigConstants as ConfigConstantsMobile, UtilsService } from '@operations/common-mobile';
import { OperationsDataModule, Session as SessionOperations } from '@operations/data';

import { TranslateModule as NgxTranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxTranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CommonModule.forRoot([
      { provide: ConfigConstants, useExisting: ConfigConstantsMobile }
    ]),
    DataCoreModule.forRoot([
      { provide: Session, useExisting: SessionOperations }
    ]),
    DataLiveModule.forRoot([]),
    DataFormModule.forRoot([]),
    TranslateModule.forRoot([]),
    IonicModule.forRoot(),
    AppCommonBaseModule.forRoot([
      { provide: AppUtilsService, useExisting: UtilsService },
      { provide: UtilsServiceOperations, useExisting: UtilsService }
    ]),
    OperationsCommonMobileModule.forRoot([]),
    OperationsDataModule.forRoot([]),
    RouterModule.forRoot([...routes], { useHash: true })
  ],
  providers: [UtilsService, SessionOperations, ConfigConstantsMobile],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
