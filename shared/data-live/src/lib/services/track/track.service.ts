import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Network, ConfigConstants, Log } from '@shared/common';
import { User, Authentication, Session, Push, Config } from '@shared/data-core'; //, Requestor, Config
import { Intercom } from '../intercom/intercom.service';

import { merge } from 'lodash-es';
//import { captureException, init, sessionURL, getSessionURL, identify } from 'logrocket';
const LogRocket = require('logrocket');

@Injectable()
export class Track {

    constructor(protected network: Network, protected push: Push, protected session: Session, protected authentication: Authentication, protected configConstants: ConfigConstants, protected config: Config, protected log: Log, protected injector: Injector, protected intercom: Intercom) {
        this.loadAnalytics();
        this.loadLogRocket();
    }

    isEnabled(forceLoggedIn: boolean = true) {
        if (this.network.isOffline()) {
            return false;
        }

        if (this.configConstants.appName === 'yoodeeplearning') {
            return false;
        }
        // if (location.hostname === 'localhost') {
        //     return false;
        // }
        if (this.configConstants.configMode !== 'prod') {
            return false;
        }
        if (forceLoggedIn && !this.authentication.isLoggedIn()) {
            return false;
        }
        if (forceLoggedIn && this.session.user && this.session.user.disableTracking) {
            return false;
        }
        return true;
    }

    loadLogRocket() {
        if (this.isEnabled(false)) {
            try {
                LogRocket.init('z3mliv/yoobic', {
                    dom: {
                        baseHref: this.configConstants.webUrl
                    }
                });
            } catch (error) { }
        }
    }

    sendLogRocketError(err) {
        try {
            if (this.isEnabled(false)) {
                LogRocket.captureException(err);
            }
        } catch (err) {

        }
    }

    getLogRocketSessionUrl() {
        try {
            return LogRocket.sessionURL;
        } catch (error) { }
        return '';
    }

    loadAnalytics() {
        if (!this.isEnabled()) {
            return;
        }
        let analytics = window.analytics = window.analytics || [];
        if (!analytics.initialize) {
            if (analytics.invoked) {
                this.log.error('Segment snippet included twice.');
            } else {
                analytics.invoked = !0;
                analytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset', 'group', 'track', 'ready', 'alias', 'debug', 'page', 'once', 'off', 'on'];
                analytics.factory = function (tt) {
                    return function () {
                        let e = Array.prototype.slice.call(arguments);
                        e.unshift(tt);
                        analytics.push(e);
                        return analytics;
                    };
                };
                for (let t = 0; t < analytics.methods.length; t++) {
                    let e = analytics.methods[t];
                    analytics[e] = analytics.factory(e);
                }
                analytics.load = function (t) {
                    let e = document.createElement('script');
                    e.type = 'text/javascript';
                    e.async = !0;
                    e.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
                    let n = document.getElementsByTagName('script')[0];
                    n.parentNode.insertBefore(e, n);
                };
                analytics.SNIPPET_VERSION = '4.0.0';
                analytics.load('n3XrOUcHyNrzZlGAaoOEdbRhhs8n5NIk');
                analytics.page();

                LogRocket.getSessionURL((url) => {
                    analytics.track('LogRocket', {
                        sessionURL: url
                    });
                });
            }
        }
    }

    track(event: string, properties?: any) {
        if (this.isEnabled() && window.analytics) {
            try {
                window.analytics.track(event, merge(this.globalTrackedProps(this.session.user), properties));
            } catch (error) { }
        }
    }

    page(name: string, category?: string, properties?: any) {
        if (this.isEnabled() && window.analytics) {
            try {
                window.analytics.page(category, name, merge(this.globalTrackedProps(this.session.user), properties));
            } catch (error) { }
        }
    }

    identify(user: User) {
        if (!user) {
            return;
        }
        setTimeout(() => {
            let traits = {
                avatar: user.imageData,
                email: user.email || user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user._ect,
                phone: user.telephone,
                gender: user.gender,
                device: user.device,
                target: this.configConstants.getFullAppName(),
                language: user.language
            };
            if (this.isEnabled()) {
                try {
                    LogRocket.identify(user._id, traits);
                } catch (error) { }
                traits = Object.apply(traits, {
                    isTrial: this.authentication.isTrial(),
                    isTeam: this.authentication.isTeam(),
                    isCrowd: this.authentication.isCrowd(),
                    groups: this.authentication.isAdmin() ? [] : this.session.groups,
                    $ios_devices: this.push.getUserTokens(user, 'ios'),
                    $android_devices: this.push.getUserTokens(user, 'android')
                });
                if (window.analytics) {
                    try {
                        window.analytics.identify(user._id, traits);
                    } catch (error) { }
                }
            }
            this.intercom.identify(user);
        }, 3000);
    }

    intercomRegisterForPush() {
        this.intercom.registerForPush();
    }

    globalTrackedProps(user: User) {
        let props = {
            user_id: user._id,
            user_groups: this.authentication.isAdmin() ? [] : this.session.groups,
            user_firstname: user.firstName,
            user_lastname: user.lastName,
            device: this.configConstants.configPlatform,
            language: user.language,
            company_name: user.company
        };
        try {
            let router: Router;
            router = this.injector.get(Router);
            props = merge(props, { page: router.url });
        } catch (err) { }
        return props;
    }
}
