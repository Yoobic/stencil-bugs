import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonModule as AppCommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';

import { AppCommonWebModule } from '@app/common-web';
import { IonicModule } from '@ionic/angular';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { FeedsPageComponent } from './pages/feeds-page/feeds-page.component';
import { StoreManagerHomePageComponent } from './pages/storemanager-home-page/storemanager-home-page.component';
import { StoreManagerStorePageComponent } from './pages/storemanager-store-page/storemanager-store-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
let PAGES = [
  LoginPageComponent,
  MenuPageComponent,
  FeedsPageComponent,
  StoreManagerHomePageComponent,
  StoreManagerStorePageComponent,
  NotfoundPageComponent
];

import { ProfilePageComponent } from './modals/profile-page/profile-page.component';
import { DocumentsPageComponent } from './modals/documents-page/documents-page.component';
import { DocumentsDetailPageComponent } from './modals/documents-detail-page/documents-detail-page.component';
import { FeedDetailPageComponent } from './modals/feed-detail-page/feed-detail-page.component';
import { FeedCommentsPageComponent } from './modals/feed-comments-page/feed-comments-page.component';
import { FeedCreatePageComponent } from './modals/feed-create-page/feed-create-page.component';
import { MissionDetailPageComponent } from './modals/mission-detail-page/mission-detail-page.component';
import { NotesPageComponent } from './modals/notes-page/notes-page.component';
import { ContactsPageComponent } from './modals/contacts-page/contacts-page.component';
import { MissionFormPageComponent } from './modals/mission-form-page/mission-form-page.component';
import { MissionResultsPageComponent } from './modals/mission-results-page/mission-results-page.component';
let ENTRY_COMPONENTS = [
  ProfilePageComponent,
  DocumentsPageComponent,
  DocumentsDetailPageComponent,
  FeedDetailPageComponent,
  FeedCommentsPageComponent,
  FeedCreatePageComponent,
  MissionDetailPageComponent,
  NotesPageComponent,
  ContactsPageComponent,
  MissionFormPageComponent,
  MissionResultsPageComponent
];

@NgModule({
  declarations: [...PAGES, ...ENTRY_COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
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
