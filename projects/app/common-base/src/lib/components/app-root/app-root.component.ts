import { ChangeDetectionStrategy, Component, Input, AfterViewInit } from '@angular/core';

//import { IonicConfigurator } from '@shared/ui-core/dist/ui-core.ionic';
//import { DeployBase, Utils } from '../../../services/base';
import { AppRootBaseComponent } from '../../bases/app-root/app-root-base.component';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';

//import { App, Platform } from '@ionic/angular';

@Component({
    selector: 'app-root',
    styleUrls: ['./app-root.component.scss'],
    templateUrl: './app-root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppRootComponent extends AppRootBaseComponent implements AfterViewInit {

    @Input() appLogo: string;


    initExtraProviders() {
        super.initExtraProviders();
    }

    init() {
        super.init();

        if (this.coreConfig.isCordova()) {
            if (window.cordova && (<any>window.cordova).InAppBrowser) {
                window.open = (<any>window.cordova).InAppBrowser.open;
            }
        }
        this.linksService.onReadyOrResume();
    }

    ngAfterViewInit() {
    }
}