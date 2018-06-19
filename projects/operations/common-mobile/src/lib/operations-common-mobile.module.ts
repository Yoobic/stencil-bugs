import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as AppCommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';
import { AppCommonMobileModule } from '@app/common-mobile';
import { IonicModule } from '@ionic/angular';

import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { StoreManagerHomePageComponent } from './pages/storemanager-home-page/storemanager-home-page.component';

let PAGES = [
  MenuPageComponent,
  StoreManagerHomePageComponent,
  NotfoundPageComponent
];



@NgModule({
  declarations: [...PAGES],
  entryComponents: [],
  imports: [
    IonicModule, CommonModule, AppCommonModule, TranslateModule, AppCommonMobileModule
  ],
  exports: [IonicModule, CommonModule, AppCommonModule, TranslateModule, AppCommonMobileModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperationsCommonMobileModule {
  static forRoot(configuredProviders: Array<Provider> = []): ModuleWithProviders {
    return {
      ngModule: OperationsCommonMobileModule,
      providers: [
        ...configuredProviders
      ]
    };
  }
}
