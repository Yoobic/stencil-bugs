import { Injectable, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreConfig, Network, ConfigConstants } from '@shared/common';
import { Session, Authentication, Broker, Push, Users, Smartloc, Version } from '@shared/data-core';
import { CustomModels } from '@shared/data-form';
import { Intercom, Pubnub, RavenErrorHandler, Track } from '@shared/data-live';
import { Translate } from '@shared/translate';

import { DialogService } from '../../services/dialog/dialog.service';
import { UtilsService } from '../../services/utils/utils.service';

import { Device } from '@ionic-native/device/ngx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppMenuBasePageComponent implements OnInit {

    @Input() profilePage: any;
    public isCordova: boolean = false;

    constructor(
        protected session: Session, protected dialog: DialogService, protected utils: UtilsService, protected coreConfig: CoreConfig, protected router: Router, protected route: ActivatedRoute, protected device: Device,
        protected translate: Translate, protected network: Network, protected authentication: Authentication, protected customModels: CustomModels, protected intercom: Intercom, protected pubnub: Pubnub, protected errorHandler: RavenErrorHandler,
        protected configConstants: ConfigConstants, protected broker: Broker, protected push: Push, protected track: Track, protected users: Users, protected geolocation: Smartloc, protected versionService: Version
    ) {
        this.isCordova = this.coreConfig.isCordova();
    }

    ngOnInit() {
    }

    ///router
    goTo(path: string, prefixByMenu: boolean = false) {
        if (this.router) {
            if (this.coreConfig.isIonic()) {
                this.router.navigateByUrl('/menu/(' + path + ':' + path + ')');
            } else {
                this.router.navigate([(prefixByMenu ? '/menu/' : '') + path]);
            }
        }
    }

    isActive(path: string) {
        return this.router.url === path;
    }

    getActivePath() {
        return this.router.url;
    }

    getParam(param: string) {
        if (this.route && this.route.snapshot) {
            return this.route.snapshot.params[param] || this.route.snapshot.data[param];
        }
        return null;
    }

    getParamAsync(param: string): Observable<any> {
        return this.route.params.pipe(
            map(params => params[param])
        );
    }

    ///profile
    onShowProfile() {
        if (this.profilePage) {
            this.dialog.modal(this.profilePage, {}, 'modal-full-screen');
        }
    }

    onProfileClicked(ev) {
        this.onShowProfile();
    }

    onPageClicked(ev) {
        if (ev.detail && ev.detail.name) {
            this.goTo(ev.detail.name, true);
        }
    }

    onActionClicked(ev) {
        if (ev.detail && ev.detail.handler) {
            ev.detail.handler();
        }
    }

}
