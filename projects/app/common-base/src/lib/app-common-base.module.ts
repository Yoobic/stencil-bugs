import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { DialogService } from './services/dialog/dialog.service';
import { UtilsService } from './services/utils/utils.service';
import { FormDynamicBuilder } from './services/form-dynamic-builder/form-dynamic-builder.service';
import { Models } from './services/models/models.service';
import { CoreConfig } from './services/core-config/core-config.service';

import { AppRootComponent } from './components/app-root/app-root.component';
import { AppFormDynamicComponent } from './components/app-form-dynamic/app-form-dynamic.component';

const COMPONENTS = [ AppFormDynamicComponent, AppRootComponent];

import { AppFormDynamicPageComponent } from './modals/app-form-dynamic-page/app-form-dynamic-page.component';

let ENTRY_COMPONENTS = [
  AppFormDynamicPageComponent
];


import { Device } from '@ionic-native/device/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File as FileNative } from '@ionic-native/file/ngx';
const IONIC = [Device, PhotoLibrary, ImagePicker, FileNative];

@NgModule({
  declarations: [...COMPONENTS, ...ENTRY_COMPONENTS],
  imports: [RouterModule, IonicModule, CommonModule],
  exports: [RouterModule, IonicModule, CommonModule, ...COMPONENTS, ...ENTRY_COMPONENTS],
  providers: [...IONIC],
  entryComponents: [...COMPONENTS, ...ENTRY_COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppCommonBaseModule {
  static forRoot(configuredProviders: Array<Provider> = []): ModuleWithProviders {
    return {
      ngModule: AppCommonBaseModule,
      providers: [
        DialogService,
        UtilsService,
        FormDynamicBuilder,
        Models,
        CoreConfig,
        ...configuredProviders
      ]
    };
  }
}
