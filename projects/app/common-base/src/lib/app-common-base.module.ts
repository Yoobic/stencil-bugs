import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonModule as AppCommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';

import { IonicModule } from '@ionic/angular';

import { DialogService } from './services/dialog/dialog.service';
import { UtilsService } from './services/utils/utils.service';

import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppGridComponent } from './components/app-grid/app-grid.component';
import { AppProfileComponent } from './components/app-profile/app-profile.component';
import { AppFormDynamicComponent } from './components/app-form-dynamic/app-form-dynamic.component';

import { AppResultDialogPageComponent } from './modals/app-result-dialog-page/app-result-dialog-page.component';

const COMPONENTS = [AppProfileComponent, AppLoginComponent, AppGridComponent, AppFormDynamicComponent, AppResultDialogPageComponent];

import { Activity } from '@shared/data-core';
const SERVICES = [Activity];

import { Device } from '@ionic-native/device/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File as FileNative } from '@ionic-native/file/ngx';
const IONIC = [Device, PhotoLibrary, ImagePicker, FileNative];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [RouterModule, IonicModule, AppCommonModule, TranslateModule, CommonModule],
  exports: [RouterModule, IonicModule, AppCommonModule, TranslateModule, CommonModule, ...COMPONENTS],
  providers: [...IONIC],
  entryComponents: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppCommonBaseModule {
  static forRoot(configuredProviders: Array<Provider> = []): ModuleWithProviders {
    return {
      ngModule: AppCommonBaseModule,
      providers: [
        DialogService,
        UtilsService,
        ...SERVICES,
        ...configuredProviders
      ]
    };
  }
}
