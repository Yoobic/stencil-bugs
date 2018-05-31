import { Injectable, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { momentTimeZone } from '@shared/interfaces';
import { CoreConfig, Network, ConfigConstants } from '@shared/common';
import { Session, Authentication, Broker, Push, Users, Smartloc, Version, User } from '@shared/data-core';
import { CustomModels } from '@shared/data-form';
import { Intercom, Pubnub, RavenErrorHandler, Track } from '@shared/data-live';
import { Translate } from '@shared/translate';

import { DialogService } from '../../services/dialog/dialog.service';
import { UtilsService } from '../../services/utils/utils.service';

import { Device } from '@ionic-native/device/ngx';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { isEmpty, pull } from 'lodash-es';

@Injectable()
export class AppMenuBasePageComponent implements OnInit {

    @Input() profilePage: any;
    public isCordova: boolean = false;
    public isOffline: boolean = false;
    public enableCustomModel: boolean = false;
    public currentUser: User;

    protected _parentSubscription = new Subscription();

    constructor(
        protected session: Session, protected dialog: DialogService, protected utils: UtilsService, protected coreConfig: CoreConfig, protected router: Router, protected route: ActivatedRoute, protected device: Device,
        protected translate: Translate, protected network: Network, protected authentication: Authentication, protected customModels: CustomModels, protected intercom: Intercom, protected pubnub: Pubnub, protected errorHandler: RavenErrorHandler,
        protected configConstants: ConfigConstants, protected broker: Broker, protected push: Push, protected track: Track, protected users: Users, protected geolocation: Smartloc, protected versionService: Version
    ) {
        this.isCordova = this.coreConfig.isCordova();
        this.isOffline = this.network.isOffline();
        this.currentUser = this.session.user;
    }

    ngOnInit() {
        if (!this.isOffline) {
            if (this.enableCustomModel && this.authentication.isLoggedIn()) {
                this.customModels.registerModelsForClient();
            }
            this.updateUserData();
            this.initRealtimeServices();
        }
        // if (this.forcedOffline) {
        //     this.onForcedOfflineChange(this.forcedOffline);
        // }
    }

    ///realtime
    initRealtimeServices() {
        this.intercom.init();
        if (this.configConstants.configIsE2E) {
            return;
        }
        if (this.session.user && this.session.user._id) {
            this._parentSubscription.add(this.pubnub.init(this.session.user).subscribe((message) => this.onNewChatNotification(message)));
            // this._parentSubscription.add(this.twilio.init().subscribe(() => { })); //this.twilio.client.on('invite', invite => this.onNewVideoCall(invite))
            this._parentSubscription.add(this.intercom.unreadCount$.subscribe((count) => this.onIntercomUnreadCount(count)));
        }
    }

    updateUserData() {
        if (!this.session.userId) {
            this.utils.logout();
            return;
        }
        //we need to do this because of the walkthrough
        let oneSignalId: Array<string>;
        let oneSignalAppIds: any;
        if (this.session.user && this.session.user.oneSignalId) {
            oneSignalId = this.session.user.oneSignalId;
        }
        if (this.session.user && this.session.user.oneSignalAppIds) {
            oneSignalAppIds = this.session.user.oneSignalAppIds;
        }
        let invited = this.session.user.invited;
        this.broker.getById('user', this.session.userId).subscribe(user => {
            if (!user || isEmpty(user)) {
                this.utils.logout();
                return;
            }
            if (oneSignalId) {
                user.oneSignalId = oneSignalId;
            }
            if (oneSignalAppIds) {
                user.oneSignalAppIds = oneSignalAppIds;
            }
            if (invited === false) {
                user.invited = false;
            }
            this.session.user = user;
            this.errorHandler.identify(this.session.userId, this.session.user.email, this.session.user.username);

            let promise = Promise.resolve(null);
            if (this.configConstants.appName !== 'yooask') {
                promise = this.geolocation.getLocation();
            }
            return promise.then(position => {
                if (position && this.session && this.session.user) {
                    this.session.user._geoloc = [position.longitude, position.latitude];
                }
                if (!this.session || !this.session.user) {
                    return;
                }
                this.push.registerOneSignal(this.session.user)
                    .then((retVal: any) => {
                        if (!this.session || !this.session.user) {
                            return;
                        }
                        this.session.user.isTeam = this.authentication.isTeam();
                        this.session.user.language = this.translate.getCurrentLanguage();
                        this.session.user.target = this.coreConfig.getPlatform();
                        if (!this.session.user.timezone && momentTimeZone.tz) {
                            this.session.user.timezone = momentTimeZone.tz.guess();
                        }
                        this.users.setAcl(this.session.user, this.session.groups);
                        if (this.coreConfig.isCordova()) {
                            this.updateUserDevice();
                        } else {
                            this.session.user.version = this.versionService.get();
                        }
                        let fields: Array<string> = [
                            '_id', '_acl', '_geoloc', 'isTeam', 'language',
                            'target', 'timezone', 'mobileVersion', 'device', 'platform',
                            'uuid', 'version', 'oneSignalId', 'oneSignalAppIds', 'invited'
                        ];
                        if (this.session.user.username.endsWith('@yoobic.com') && this.authentication.hasRole('admin')) {
                            fields = pull(fields, '_acl');
                        }
                        this.authentication.updateProfile(this.session.user, false, fields).subscribe(() => { });
                    }, () => { })
                    .then(() => {
                        this.track.identify(this.session.user);
                        this.track.intercomRegisterForPush();
                    });
            });
        });
    }

    updateUserDevice() {
        this.session.user.mobileVersion = this.versionService.get();
        this.session.user.device = this.device.model;
        this.session.user.platform = this.device.platform;
        this.session.user.uuid = this.device.uuid;
    }

    onNewChatNotification(message) { }

    onIntercomUnreadCount(count) { }

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

    onScrollToTop() {
        this.utils.scrollToTop();
    }

}
