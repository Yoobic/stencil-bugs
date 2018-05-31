import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as AppCommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';
import { AppCommonMobileModule } from '@app/common-mobile';
import { IonicModule } from '@ionic/angular';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { FeedsPageComponent } from './pages/feeds-page/feeds-page.component';
import { StoreManagerHomePageComponent } from './pages/storemanager-home-page/storemanager-home-page.component';
import { StoreManagerStorePageComponent } from './pages/storemanager-store-page/storemanager-store-page.component';

let PAGES = [
  LoginPageComponent,
  MenuPageComponent,
  FeedsPageComponent,
  StoreManagerHomePageComponent,
  StoreManagerStorePageComponent,
  NotfoundPageComponent
];

import { ProfilePageComponent } from './modals/profile-page/profile-page.component';
import { FeedDetailPageComponent } from './modals/feed-detail-page/feed-detail-page.component';

let ENTRY_COMPONENTS = [
  ProfilePageComponent,
  FeedDetailPageComponent
];

@NgModule({
  declarations: [...PAGES, ...ENTRY_COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
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
