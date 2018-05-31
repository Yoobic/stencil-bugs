import { Injectable } from '@angular/core';

import { User } from '../../interfaces/user/user.interface';
import { Notification } from '../../interfaces/notification/notification.interface';
import { NotificationEvent } from '../../interfaces/notification-event/notification-event.interface';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';

import { Subscription, Observable, Subject, of } from 'rxjs';

import { Colors, ConfigConstants, CoreConfig, Log } from '@shared/common';

import { moment } from '@shared/interfaces';


import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Push as PushNative } from '@ionic-native/push/ngx';

export * from '../../interfaces/notification/notification.interface';

import { pick, uniq, compact, union, without, isArray, uniqBy, filter, map, merge } from 'lodash-es';

@Injectable()
export class Push {

    private push: any;
    private tags: Array<string> = ['username', 'language', 'isTeam'];
    private _notificationReceived = new Subject<NotificationEvent>();
    private _parentSubscription: Subscription;
    private currentOneSignalId: string;
    private registered: boolean = false;

    constructor(private coreConfig: CoreConfig, private log: Log, private config: Config, private rq: Requestor, private configConstants: ConfigConstants, private oneSignal: OneSignal, private pushNative: PushNative) { }

    get notificationReceived$(): Observable<NotificationEvent> {
        return this._notificationReceived.asObservable();
    }

    getOneSignalAppId() {
        let retVal: string = this.configConstants.onesignalAppId;
        if (this.configConstants.onesignalAppIds && this.configConstants.onesignalAppIds[this.configConstants.appId]) {
            retVal = this.configConstants.onesignalAppIds[this.configConstants.appId];
        }
        return retVal;
    }

    registerOneSignal(user: User) {
        if (this.registered === true) {
            return Promise.resolve(user);
        }
        this.registered = true;
        let onesignalAppId = this.getOneSignalAppId();
        this._parentSubscription = new Subscription();
        if (this.coreConfig.isCordova()) {
            //OneSignal.setLogLevel({ logLevel: 4, visualLevel: 4 });
            this.oneSignal.startInit(onesignalAppId, this.configConstants.googleProjectNumber);
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
            this._parentSubscription.add(this.oneSignal.handleNotificationReceived().subscribe((notif) => this.onNotificationReceived(notif)));
            this._parentSubscription.add(this.oneSignal.handleNotificationOpened().subscribe((notif) => this.onNotificationOpened(notif)));
            this.oneSignal.endInit();

            return this.oneSignal.getIds().then(retVal => {
                this.oneSignal.setSubscription(true);
                this.oneSignal.sendTags(pick(user, this.tags));
                if (retVal && retVal.userId) {
                    this.currentOneSignalId = retVal.userId;
                    this.updateUserOneSignalIds(user, this.currentOneSignalId);
                    if (user.email) {
                        this.oneSignal.syncHashedEmail(user.email);
                    }
                    if (retVal.pushToken) {
                        this.addToken(user, retVal.pushToken);
                    }
                }
                return user;
            }, err => {
                this.log.forceLog(err);
                return user;
            });
        } else if (this.coreConfig.isWeb() && window.OneSignal) {
            return new Promise((resolve, reject) => {
                if (!window.OneSignal.isPushNotificationsSupported() || location.hostname === 'localhost') {
                    return resolve(user);
                }
                window.OneSignal.push(['init', {
                    appId: onesignalAppId,
                    autoRegister: true,
                    notifyButton: { enable: false },
                    safari_web_id: this.configConstants.onesignalSafariWebId
                }]);
                window.OneSignal.push(() => {
                    window.OneSignal.sendTags(pick(user, this.tags));
                    window.OneSignal.on('notificationDisplay', (ev) => {
                        this.onNotificationReceived(ev);
                    });

                    window.OneSignal.getUserId().then((userId) => {
                        this.currentOneSignalId = userId;
                        this.updateUserOneSignalIds(user, this.currentOneSignalId);
                        resolve(user);
                    });
                });
            });
        } else {
            return Promise.resolve(user);
        }
    }

    updateUserOneSignalIds(user, oneSignalId) {
        user.oneSignalId = uniq(compact(union([].concat(user.oneSignalId), [oneSignalId])));

        user.oneSignalAppIds = user.oneSignalAppIds || {};
        let bundleId = this.configConstants.appId.replace(/\./g, '_');
        user.oneSignalAppIds[bundleId] = uniq(compact(union([].concat(user.oneSignalAppIds[bundleId]), [oneSignalId])));
    }

    onNotificationReceived(notif: any) {
        this._notificationReceived.next({ type: 'received', notification: notif });
    }

    onNotificationOpened(notif: any) {
        this._notificationReceived.next({ type: 'opened', action: notif.action, notification: notif.notification });
    }

    unregisterOneSignal(user: User) {
        if (this.coreConfig.isCordova()) {
            this.oneSignal.setSubscription(false);
            if (this._parentSubscription) {
                this._parentSubscription.unsubscribe();
                this._parentSubscription = null;
            }
            user.oneSignalId = without(user.oneSignalId, this.currentOneSignalId);
            this.registered = false;
        }
    }

    addToken(user: User, token: string) {
        let platform = this.coreConfig.isIOS() ? 'ios' : 'android';
        if (!user._messaging || !isArray(user._messaging.pushTokens)) {
            user._messaging = { pushTokens: [] };
        }
        user._messaging.pushTokens.push({ token: token, platform: platform });
        user._messaging.pushTokens = uniqBy(user._messaging.pushTokens, push => push.token);
        delete (<any>user).messaging;
    }

    removeToken(user: User, token: string) {
        if (user._messaging && isArray(user._messaging.pushTokens)) {
            user._messaging.pushTokens = filter(user._messaging.pushTokens, push => push.token !== token);
        }
    }

    getUserTokens(user: User, platform: string) {
        let tokens = [];
        if (user._messaging && user._messaging.pushTokens) {
            tokens = union(map(filter(user._messaging.pushTokens, push => push.platform === platform), 'token'));
        }
        return tokens;
    }

    notifyGroups(groups: string | Array<string>, notification: Notification) {
        groups = [].concat(groups);
        if (groups && groups.length > 0) {
            notification.group = groups;
            //notification.userQuery = { where: { '_acl.groups.r': { inq: groups } } };
            return this.notify(notification);
        } else {
            return of(null);
        }
    }

    notifyUsers(users: Array<User>, notification: Notification) {
        if (users && users.length > 0) {
            notification.userQuery = { where: { _id: { inq: users.map(u => u._id) } } };
            return this.notify(notification);
        } else {
            return of(null);
        }
    }

    notifyUserById(userId: string, notification: Notification) {
        if (userId) {
            notification.userQuery = { where: { _id: { inq: [userId] } } };
            return this.notify(notification);
        } else {
            return of(null);
        }
    }

    notifyUsersById(userIds: Array<string>, notification: Notification) {
        if (userIds && userIds.length > 0) {
            notification.userQuery = { where: { _id: { inq: userIds } } };
            return this.notify(notification);
        } else {
            return of(null);
        }
    }

    notify(notification: Notification) {
        if (notification.scheduledDate) {
            notification.scheduledDate = <any>moment(notification.scheduledDate).format();
        }
        if (notification.userQuery && notification.userQuery.limit) {
            delete notification.userQuery.limit;
        }
        notification.notificationOptions = merge(notification.notificationOptions || {}, {
            ios_badgeType: 'Increase',
            ios_badgeCount: 1
        });
        let url = this.config.apiUrl + 'businesslogic/sendNotification';
        if (notification.mode === 'allnotification') {
            (<any>notification).mode = 'all';
        }
        return this.rq.post(url, notification);
    }

    // notifyMissionReminder(descriptionRef: string, userIds: Array<string>, mode: string, comment?: string, type?: string, options?: any) {
    //     options = options || {};
    //     if (userIds && userIds.length > 0) {
    //         options.userQuery = { where: { _id: { inq: userIds } } };
    //     }
    //     let url = this.config.apiUrl + 'businesslogic/sendMissionReminders';
    //     return this.rq.post(url, { descriptionRef, mode, comment, type, options });
    // }

    // updateDevice(onesignalId: string, data: any) {
    //     let url = this.config.apiUrl + 'businesslogic/editPushDevice';
    //     return this.rq.post(url, { id: onesignalId, data });
    // }

    //deprecated
    protected _registerNative(): Promise<string> {
        if (this.coreConfig.isCordova()) {
            return new Promise((resolve, reject) => {
                let promiseFulfilled = false;
                this.push = this.pushNative.init({
                    android: { senderID: this.configConstants.googleProjectNumber, iconColor: Colors.balanced, icon: 'notify' },
                    ios: { alert: 'true', badge: 'true', sound: 'false' }
                });
                this.push.on('registration').subscribe((data: any) => {
                    promiseFulfilled = true;
                    resolve(data.registrationId);
                });

                this.push.on('error').subscribe(error => {
                    reject(error);
                });

                this.push.on('notification').subscribe((data: any) => { });
                //sometimes on ios if the push are not enable it will not send an error, so we check after 10 sec
                setTimeout(() => { if (!promiseFulfilled) { reject('timeout'); } }, 10000);
            });
        } else {
            return <any>Promise.reject('not cordova');
        }
    }
}
