import { ChangeDetectionStrategy, Component, Input, AfterViewInit } from '@angular/core';

//import { IonicConfigurator } from '@shared/ui-core/dist/ui-core.ionic';
//import { DeployBase, Utils } from '../../../services/base';
import { AppRootBaseComponent } from '@app/common-base';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';

//import { App, Platform } from '@ionic/angular';

@Component({
    selector: 'app-root',
    styleUrls: ['./app-root.component.scss'],
    templateUrl: './app-root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppRootComponent extends AppRootBaseComponent implements AfterViewInit {
    //@Input() public root: any;
    //@Input() statusBarStyle: string = 'default';
    @Input() appLogo: string;

    public isFullscreen: boolean;
    protected splashScreen: SplashScreen;

    initExtraProviders() {
        super.initExtraProviders();
        this.splashScreen = this.injector.get<SplashScreen>(SplashScreen);
    }

    init() { //protected app: App, protected platform: Platform,
        super.init();
        this.isFullscreen = true;
        if (location && location.search && location.search.indexOf('fullscreen=false') >= 0) {
            this.isFullscreen = false;
        }

        if (this.coreConfig.isCordova()) {
            this.splashScreen.hide();
            if (window.cordova && (<any>window.cordova).InAppBrowser) {
                window.open = (<any>window.cordova).InAppBrowser.open;
            }
        }
        //this.ionicConfigurator.init(this.config, this.platform, this.isFullscreen, this.statusBarStyle);
        this.linksService.onReadyOrResume();
        //this.platform.resume.subscribe(() => this.linksService.onReadyOrResume());
        // this.deploy.check().then((update) => {
        //     if (update) {
        //         this.utils.showUpdateDialog(false, this.injector, this.viewContainerRef);
        //     }
        // });
    }

    ngAfterViewInit() {
        if (!this.isFullscreen && !this.coreConfig.isUniversal()) {
            window.document.querySelector('ion-app').classList.add('framed');
            //this.app.setElementClass('framed', true);
        }
    }
}