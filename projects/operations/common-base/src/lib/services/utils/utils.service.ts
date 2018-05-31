import { Injectable } from '@angular/core';
import { UtilsService as BaseUtilsService  } from '@app/common-base';
import { UserSettings, User } from '@shared/data-core';
import { Feed } from '@operations/data';

@Injectable()
export class UtilsService extends BaseUtilsService {


    initExtraProviders() {
        super.initExtraProviders();
    }

    showFeedDetail(feed: Feed) {
        return this.dialog.modal(this.getFeedDetailComponent(), { feed }, 'modal-full-height');
    }

    showUserSettings() {
        this.loading$.emit(true);
        this.broker.getById('user', this.session.userId).subscribe((user: User) => {
            this.loading$.emit(false);
            this.showFormDynamic<UserSettings>(user, {
                collectionName: UserSettings,
                title: 'SETTINGS'
            }).then(retVal => {
                if (retVal && retVal.data) {
                    // Colors.setDarkTheme(retVal.darkTheme === true);
                    // this.localStorage.setObject('dark-theme', retVal.darkTheme || false);
                    // Colors.setBigFonts(retVal.useBigFonts === true);
                    // this.localStorage.setObject('use-big-fonts', retVal.useBigFonts || false);

                    this.loading$.emit(true);
                    this.authentication.updateProfile(retVal.data).subscribe((updateUser: any) => {
                        this.loading$.emit(false);
                        // this.currentUser = updateUser;
                        // this.cd.markForCheck();
                    });
                } else {
                    this.loading$.emit(false);
                }
            });
        });
    }

    protected getFeedDetailComponent() {
        return null;
    }

}