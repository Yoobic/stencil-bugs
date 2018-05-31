import { ChangeDetectorRef, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { Translate } from '@shared/translate';
import { LocalStorage, CoreConfig, ConfigConstants } from '@shared/common';
import { Requestor, LoadingBar, LinksService, Files, Session } from '@shared/data-core';

import { DialogService } from '../../services/dialog/dialog.service';
import { UtilsService } from '../../services/utils/utils.service';

@Injectable()
export class AppRootBaseComponent {

    public isTranslateInit: boolean = false;

    constructor(protected injector: Injector, protected translate: Translate, protected router: Router, protected cd: ChangeDetectorRef,
        protected localStorage: LocalStorage, protected coreConfig: CoreConfig, protected configConstants: ConfigConstants,
        protected rq: Requestor, protected loadingBar: LoadingBar, protected dialog: DialogService, protected linksService: LinksService,
        protected utils: UtilsService, protected session: Session, protected files: Files) {
        this.initExtraProviders();
        this.init();
    }

    initExtraProviders() { }

    init() {
        this.translate.init().then(() => {
            this.isTranslateInit = true;
            this.cd.markForCheck();
        });
        window.translateService = this.translate;
        window.coreConfigService = this.coreConfig;
        window.filesService = this.files;
        window.sessionService = this.session;

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
