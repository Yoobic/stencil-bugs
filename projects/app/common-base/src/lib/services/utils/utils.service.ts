import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Network, CoreConfig, LocalStorage, LocalForageService } from '@shared/common';
import { Authentication, Config, Session, Broker, Users, Smartloc } from '@shared/data-core';
import { Intercom, Channel } from '@shared/data-live';
import { Translate } from '@shared/translate';
import { IModalUpsertConfig } from '@shared/interfaces';

import { DialogService } from '../dialog/dialog.service';
import { slideXEnterAnimation, slideXLeaveAnimation } from '../../animations/animations';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File as FileNative } from '@ionic-native/file/ngx';


@Injectable()
export class UtilsService {

    public scrollToTop$ = new EventEmitter<any>();
    public loading$ = new EventEmitter<boolean>();

    constructor(
        protected dialog: DialogService, protected config: Config, protected coreConfig: CoreConfig, protected session: Session, protected translate: Translate, protected broker: Broker, protected channel: Channel,
        protected network: Network, protected authentication: Authentication, protected users: Users, protected router: Router, protected intercom: Intercom, protected imagePicker: ImagePicker, protected file: FileNative,
        protected localStorage: LocalStorage, protected localForage: LocalForageService, protected geolocatio: Smartloc,
        protected sanitizer: DomSanitizer, protected injector: Injector) {
        this.initExtraProviders();
    }

    initExtraProviders() { }

    logout() {
        if (this.network.isOffline() === false) {
            return this.dialog.confirm('LOGOUT', 'LOGOUTCONFIRM').then((retVal) => {
                if (retVal) {
                    return this._dologout();
                }
                return retVal;
            });
        }
        return Promise.resolve(false);
    }

    goToLogin() {
        this.router.navigateByUrl('');
    }

    showChat() {
        return this.dialog.modal(this.getChatPageComponent(), { closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    protected getChatPageComponent() {
        return null;
    }

    private _dologout() {
        if (this.network.isOffline() === false) {
            return this.authentication.logout().then(() => this._afterLogout(), () => this._afterLogout()).then(() => {
                return true;
            });
        }
        return Promise.resolve(false);
    }

    private _afterLogout() {
        this.goToLogin();
        // this.menuItemActive = null;
        // this.clearLocalBadges();
        // this.setLoading(false);
        // this.pubnub.disconnect();
    }

    showFormDynamic<T = {}>(data: Object, options?: IModalUpsertConfig): Promise<{ data?: T; role?: string }> {
        return this.dialog.modal(this.getFormDynamicPageComponent(), { data, ...options, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    protected getFormDynamicPageComponent() {
        return null;
    }
}