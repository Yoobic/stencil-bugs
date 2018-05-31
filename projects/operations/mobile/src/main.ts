import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '../../../../shared/environments/src/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener(window && (<any>window).cordova ? 'deviceready' : 'DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err)); // tslint:disable-line:no-console
});