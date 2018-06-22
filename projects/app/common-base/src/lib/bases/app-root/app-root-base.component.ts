import { ChangeDetectorRef, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
// import { LinksService } from '../../services/links/links.service';
import { CoreConfig } from '../../services/core-config/core-config.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';


import { DialogService } from '../../services/dialog/dialog.service';
import { UtilsService } from '../../services/utils/utils.service';

@Injectable()
export class AppRootBaseComponent {

    public isTranslateInit: boolean = false;

    constructor(protected injector: Injector, protected router: Router, protected cd: ChangeDetectorRef,
        protected dialog: DialogService, protected coreConfig: CoreConfig,
        protected utils: UtilsService) {
        this.initExtraProviders();
        this.init();
    }

    initExtraProviders() { }

    init() {

        this.isTranslateInit = true;
        this.cd.markForCheck();

        if (!this.coreConfig.isUniversal()) {
            document.addEventListener('click', (e) => {
                e = e || <any>window.event;
                let element: any = e.target || e.srcElement;
                if (element && element.tagName === 'A' && element.getAttribute('href') && element.getAttribute('href').startsWith('#') === false && element.getAttribute('href').startsWith('blob') === false) {
                    e.stopPropagation();
                    e.preventDefault();
                    this.dialog.frame(element.href, '', true);
                    return;
                }
            });
        }

        if (!this.coreConfig.isUniversal()) {
            document.addEventListener('drop', function (e) {
                e.preventDefault();
            });
            document.addEventListener('dragover', function (e) {
                e.preventDefault();
            });
        }
    }
}