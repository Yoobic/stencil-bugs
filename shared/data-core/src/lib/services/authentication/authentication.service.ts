import { Injectable } from '@angular/core';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { Session } from '../session/session.service';
import { Push } from '../push/push.service';
import { Config } from '../config/config.service';

import { Observable, Subject, throwError, of } from 'rxjs';
import { map, catchError, mergeMap, flatMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Network, LocalStorage, LocalForageService, isPresent, CoreConfig } from '@shared/common';
import { assign, some, map as _map, every, pick } from 'lodash-es';

@Injectable()
export class Authentication {

    protected static roleAdmin = 'admin';
    protected static roleTeam = 'team';
    protected static roleTrial = 'trial';
    protected static roleDashboard = 'dashboard';
    protected static roleManager = 'manager';
    protected static roleMissionViewer = 'missionviewer';

    public login$ = new Subject<string>();
    public logout$ = new Subject<string>();

    constructor(protected rq: Requestor, protected push: Push, protected config: Config, protected broker: Broker, protected network: Network, protected localStorage: LocalStorage, protected localForage: LocalForageService, protected session: Session, protected coreConfig: CoreConfig) { }

    login(username: string, password: string, roles?: Array<string>): Observable<any> {
        let url = this.broker.getServerUrl() + 'auth/login';
        return this.rq.post(url, { username, password, roles }).pipe(
            map(res => {
                this.afterLogin(res);
                return res;
            }),
            catchError((res) => {
                this.session.token = null;
                let err;
                if (res && res.json) {
                    err = res.json().error;
                } else if (res && res.error && res.error.error) {
                    err = res.error.error;
                } else if (res.name) {
                    err = { message: res.name.toUpperCase() };
                } else {
                    err = { message: 'REQUESTERROR' };
                }
                return throwError(err);
            })
        );
    }

    loginSocial(accessToken: string, provider = 'facebook') {
        let url = this.broker.getServerUrl() + 'auth/' + provider;
        return this.rq.post(url, { accessToken }).pipe(
            map(res => {
                this.afterLogin(res);
                return res;
            }),
            catchError((res) => {
                this.session.token = null;
                return throwError(res.json().error);
            })
        );
    }

    getLoginAdvancedUrl(tenant: string, method: string, host: string) {
        let url = this.broker.getServerUrl() + 'auth/' + tenant.toLowerCase() + '/' + method + '/login?host=' + host + '&tokenLocation=fragment'; //+ (this.coreConfig.isIonic() ? 'query' : 'fragment');
        return url;
    }

    getTenantAdvancedLoginMethods(tenant: string) {
        let url = this.broker.getServerUrl() + 'auth/' + tenant.toLowerCase() + '/providers';
        return this.rq.get(url);
    }

    getTenantFromToken(token): { _tenantRef?: string, _tenantName?: string; sub?: string; } {
        let jwtHelper: JwtHelperService = new JwtHelperService({});
        return jwtHelper.decodeToken(token) || {};
    }

    afterLogin(res) {
        this.session.token = res.$mcfly$token;
        this.session.userId = res.userId;
        this.session.user = res.user;
        let { _tenantRef, _tenantName } = this.getTenantFromToken(this.session.token);
        this.session.tenantRef = _tenantRef;
        this.session.tenantName = _tenantName;
        this.login$.next('');
        this.cleanUpLocalStorage();
        return res;
    }

    cleanUpLocalStorage() {
        let keys = ['stats.kpiFilterFormData', 'stats.selectedDescription', 'stats.selectedDashboard', 'stats.customSelectedDashboard'];
        keys.forEach(key => {
            this.localStorage.remove(key);
        });
    }

    getCurrentSession(): Observable<Session> {
        if (this.network.isOffline()) {
            return of(null);
        }
        return this.rq.get(this.broker.getApiUrl() + 'businesslogic/getCurrentSession').pipe(
            map((res: any) => {
                assign(this.session, res.data);
                return <any>this.session;
            }),
            catchError(() => {
                return of(null);
            })
        );
    }

    doLogout() {
        let url = this.broker.getApiUrl() + 'user/logout';
        return this.rq.post(url, {});
    }

    logout() {
        let promise = Promise.resolve(null);
        if (this.config.isTestpen) {
            this.localStorage.clear();
            this.localForage.clear();
        }
        if (this.session && this.session.user && this.session.user._id) {
            this.push.unregisterOneSignal(this.session.user);
            promise = this.updateProfile(this.session.user).toPromise();
        }
        this.logout$.next('');
        return promise.then(
            () => this.afterLogout(),
            () => this.afterLogout()
        );
    }

    afterLogout() {
        this.doLogout().subscribe(() => { }, () => { });
        this.network.forceOffline(false, false);
        this.session.clear().catch(() => { });
        return Promise.resolve();
    }

    signup(email: string, imageData: any, password: string) {
        let user = <any>{ username: email, email, password, imageData };
        let url = this.broker.getApiUrl() + 'user/signup';
        return this.rq.post(url, { user }).pipe(mergeMap(() => {
            return this.login(email, password);
        }));
    }

    inviteUsers(users: Array<{ email: string; roles: Array<string>; locationRef?: string }>, groups: Array<string>, password: string = null, sendPassword: boolean = true, appName?: string, appleStoreUrl?: string, playStoreUrl?: string): Observable<any> {
        let url = this.broker.getApiUrl() + 'usertrial/inviteUsers';
        return this.rq.post(url, { users, groups, password, sendPassword, appName, appleStoreUrl, playStoreUrl });
    }

    isLoggedIn() {
        return this.session.token && this.session.token.length > 0 && !this.isTokenExpired(this.session.token);
    }

    hasRole(role: string) {
        return this.session.roles && this.session.roles.indexOf(role) >= 0;
    }

    hasRoles(roles: Array<string>) {
        return some(_map(roles, role => this.hasRole(role)), t => t === true);
    }

    hasAllRoles(roles: Array<string>) {
        return every(roles, role => this.hasRole(role));
    }

    hasGroup(group: string) {
        return this.session.groups && this.session.groups.indexOf(group) >= 0;
    }

    hasGroups(groups: Array<string>) {
        return some(_map(groups, group => this.hasGroup(group)), t => t === true);
    }

    hasAllGroups(groups: Array<string>) {
        return every(groups, group => this.hasGroup(group));
    }

    isAdmin(checkSmartin: boolean = false) {
        let retVal = this.hasRole(Authentication.roleAdmin);
        if (checkSmartin && this.session.user.username !== 'smartin@yoobic.com') {
            retVal = false;
        }
        return retVal;
    }

    isTrial() {
        return !this.hasRole(Authentication.roleAdmin) && this.hasRole(Authentication.roleTrial);
    }

    isDashboard() {
        return this.hasRole(Authentication.roleDashboard) && !this.isAdmin() && !this.hasRole(Authentication.roleMissionViewer) && !this.hasRole(Authentication.roleManager);
    }

    isTeam() {
        return this.hasRole(Authentication.roleTeam);
    }

    isCrowd() {
        return !this.hasRole(Authentication.roleTeam);
    }

    isStore() {
        return this.session.user && isPresent(this.session.user.locationRef);
    }

    isStoreManager() {
        return this.hasRole('store') && this.session.user && this.session.user.useBeta;
    }

    getCurrentUser(): any {
        return this.session.user;
    }

    passwordChange(oldPassword: string, newPassword: string) {
        return this.rq.post(this.broker.getApiUrl() + 'user/changePassword', { oldPassword, newPassword });
    }

    passwordReset(email, isMagicLink: boolean = false, urlPrefix: string = 'https://yoobic.app.link/') {
        if (isMagicLink) {
            return this.rq.post(this.broker.getApiUrl() + 'user/getMagicLink', { username: email, urlPrefix });
        } else {
            return this.rq.post(this.broker.getApiUrl() + 'user/reset', { email: email });
        }
    }

    passwordResetConfirm(token: string, password: string, host?: string) {
        let url = host ? 'https://' + host + '/api/' : this.broker.getApiUrl();
        return this.rq.post(url + 'Endpoints/resetPassword', { password: password }, token, null, true);
    }

    passwordResetAdmin(user: any, password: string, dontSendMail = false) {
        return this.rq.post(this.broker.getApiUrl() + 'AdminDashboard/resetPassword', {
            options: {
                userPasswordList: [user].map((u: any) => ({ username: u.username, _id: u._id, password: password })),
                dontSendMail: dontSendMail
            }
        });
    }

    impersonate(username: string) {
        return this.rq.post(this.broker.getApiUrl() + 'AdminDashboard/impersonate', {
            username
        });
    }

    forceLogout(username: string) {
        return this.rq.post(this.broker.getApiUrl() + 'AdminDashboard/forceLogout', {
            username
        });
    }

    generatePassword() {
        let length = 8;
        let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let retVal = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    updateProfile(user?: any, skipAcl = false, fields: Array<string> = []) {
        let userToUpdate: any = user || this.getCurrentUser();
        if (!this.isAdmin() && !skipAcl) {
            this.broker.setAcl(userToUpdate, this.session.groups);
        }
        if (fields && fields.length > 0) {
            userToUpdate = <any>(pick(userToUpdate, fields));
            if (fields.indexOf('_acl') < 0) {
                skipAcl = true;
            }
        }
        return this.broker.upsert('user', userToUpdate, null, skipAcl).pipe(flatMap((retVal) => {
            //this.session.user = retVal;
            return this.broker.getById('user', retVal._id);
        }));
    }

    isTokenExpired(token: string) {
        let jwtHelper: JwtHelperService = new JwtHelperService({});
        try {
            return jwtHelper.isTokenExpired(token);
        } catch (err) {
            return true;
        }
    }

    setToken(token: string, userId: string) {
        this.session.token = token;
        this.session.userId = userId;
        return this.broker.getById('user', userId).pipe(map((retVal: any) => {
            this.session.user = retVal;
            return retVal;
        }));
    }

}
