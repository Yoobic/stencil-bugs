import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { StoreManagerHomePageComponent } from './pages/storemanager-home-page/storemanager-home-page.component';
import { StoreManagerStorePageComponent } from './pages/storemanager-store-page/storemanager-store-page.component';

let PAGES = [
  MenuPageComponent,
  StoreManagerHomePageComponent,
  StoreManagerStorePageComponent,
  NotfoundPageComponent
];



@NgModule({
  declarations: [...PAGES],
  entryComponents: [],
  imports: [
    IonicModule, CommonModule
  ],
  exports: [IonicModule, CommonModule],
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
