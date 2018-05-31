import { Injectable } from '@angular/core';
import { CoreConfig, ConfigConstants } from '@shared/common';
import { Authentication, User, Config, Session } from '@shared/data-core';
import { Subject } from 'rxjs';
import { Intercom as IntercomNative } from '@ionic-native/intercom/ngx';
import { moment } from '@shared/interfaces';


@Injectable()
export class Intercom {

    public unreadCount$ = new Subject<number>();

    constructor(protected coreConfig: CoreConfig, protected config: Config, protected configConstants: ConfigConstants, protected intercomNative: IntercomNative, protected authentication: Authentication, protected session: Session) {
        this.authentication.login$.subscribe(() => this.init());
        this.authentication.logout$.subscribe(() => this.logout());
    }

    isEnabled() {
        if (this.config.isE2E) {
            return false;
        }
        return true;
    }

    init() {
        // initialize intercom when lauching the app or log in
        if (!this.isEnabled()) {
            return;
        }
        if (!this.coreConfig.isCordova()) {
            if (window.Intercom) {
                window.Intercom('boot', {
                    app_id: this.configConstants.configMode === 'prod' ? this.configConstants.intercomIdProd : this.configConstants.intercomIdDev,
                    hide_default_launcher: true
                });
            }
        } else {
            // register identified user only if the app is loggedin
            if (this.authentication.isLoggedIn() && this.session.userId) {
                this.intercomNative.setLauncherVisibility('GONE');
                this.intercomNative.registerIdentifiedUser({ userId: this.session.userId });

            }

        }
    }

    registerForPush() {
        if (this.coreConfig.isCordova()) {
            this.intercomNative.registerForPush();
        }
    }

    logout() {
        if (!this.isEnabled()) {
            return;
        }
        // This resets the Intercom integration's cache of your user's identity and wipes the slate clean and also hide the launcher.
        if (!this.coreConfig.isCordova()) {
            if (window.Intercom) {
                window.Intercom('shutdown');
            }
        } else {
            this.intercomNative.reset();
            //this.ionicIntercom.setLauncherVisibility('HIDE');
        }
    }

    identify(user: User) {
        if (!this.isEnabled()) {
            return;
        }
        let traits = {
            user_id: user._id,
            language_override: user.language,
            avatar: {
                'type': 'avatar',
                'image_url': user.imageData
            },
            email: user.email || user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: moment(user._ect).unix(),
            phone: user.telephone,
            gender: user.gender,
            device: user.device,
            target: this.configConstants.getFullAppName(),
            company: user.company,
            tenant: user._tenant ? user._tenant.name : '',
            hide_default_launcher: true
            //custom_launcher_selector: '#intercom_launcher'
        };
        if (!this.coreConfig.isCordova()) {
            if (window.Intercom) {
                window.Intercom('update', traits);
                window.Intercom('onUnreadCountChange', (unreadCount) => {
                    this.unreadCount$.next(unreadCount);
                });
            }
        } else {
            this.intercomNative.updateUser(traits);
            this.intercomNative.unreadConversationCount().then((unreadCount) => {
                this.unreadCount$.next(unreadCount);
            });
        }
    }

    show() {
        if (!this.isEnabled()) {
            return;
        }
        if (!this.coreConfig.isCordova()) {
            if (window.Intercom) {
                window.Intercom('show');
            }
        } else {
            this.intercomNative.displayMessenger();
        }
    }

}
