import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonModule as AppCommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';

import { AppCommonWebModule } from '@app/common-web';
import { IonicModule } from '@ionic/angular';

import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { StoreManagerHomePageComponent } from './pages/storemanager-home-page/storemanager-home-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';

let PAGES = [
  MenuPageComponent,
  StoreManagerHomePageComponent,
  NotfoundPageComponent
];


@NgModule({
  declarations: [...PAGES],
  entryComponents: [],
  imports: [
    IonicModule, CommonModule, AppCommonModule, TranslateModule, AppCommonWebModule
  ],
  exports: [IonicModule, CommonModule, AppCommonModule, TranslateModule, AppCommonWebModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperationsCommonWebModule {
  static forRoot(configuredProviders: Array<Provider> = []): ModuleWithProviders {
    return {
      ngModule: OperationsCommonWebModule,
      providers: [
        ...configuredProviders
      ]
    };
  }
}
