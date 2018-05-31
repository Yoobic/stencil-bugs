import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Network, CoreConfig, LocalStorage, LocalForageService } from '@shared/common';
import { Authentication, Config, Session, User, Broker, Users, Smartloc } from '@shared/data-core';
import { Intercom, ChannelInterface, Channel } from '@shared/data-live';
import { Translate } from '@shared/translate';
import { IModalUpsertConfig, IEntity } from '@shared/interfaces';

import { DialogService } from '../dialog/dialog.service';
import { slideXEnterAnimation, slideXLeaveAnimation } from '../../animations/animations';

import { LibraryItem } from '@ionic-native/photo-library/ngx'; //PhotoLibrary,
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File as FileNative } from '@ionic-native/file/ngx';

import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { sortBy } from 'lodash-es';

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

    scrollToTop() {
        this.scrollToTop$.emit();
    }

    showHelp() {
        this.intercom.show();
    }

    showWhatsNew() {
        return this.dialog.modal(this.getWhatsNewPageComponent(), { closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showTermsAndConditions() {
        return this.dialog.modal(this.getTermsAndConditionsPageComponent(), { closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showWalkthrough(): Promise<{ data?: any; role?: string }> {
        return Promise.resolve(null);
    }

    showFormDynamic<T = {}>(data: Object, options?: IModalUpsertConfig): Promise<{ data?: T; role?: string }> {
        return this.dialog.modal(this.getFormDynamicPageComponent(), { data, ...options, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showEntityActionPage(entity: IEntity, action: string, actionName: string): Promise<{ data?: any; role?: string }> {
        return this.dialog.modal(this.getEntityActionPageComponent(), { entity, action, actionName, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showProfileEdit() {
        this.loading$.emit(true);
        this.broker.getById('user', this.session.userId).subscribe((user: User) => {
            this.loading$.emit(false);
            this.showFormDynamic<User>(user, {
                collectionName: User,
                title: 'SETTINGS'
            }).then(retVal => {
                if (retVal && retVal.data) {
                    this.loading$.emit(true);
                    this.authentication.updateProfile(retVal.data).subscribe((updateUser: any) => {
                        this.loading$.emit(false);
                    });
                } else {
                    this.loading$.emit(false);
                }
            });
        });
    }

    showResultDialog(heading: string, subheading: string, success: boolean, buttonText?: string) {
        return this.dialog.modal(this.getResultDialogPageComponent(), { heading, subheading, success, buttonText });
    }
    //CHAT
    showChat(user: User, photo?: any) {
        return this.getChannel(user).toPromise().then((channel) => {
            if (channel) {
                return this.dialog.modal(this.getChatPageComponent(), { channel, closable: true, photo, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
            } else {
                return Promise.reject('no channel found');
            }
        });
    }

    showChatByChannel(channel: ChannelInterface, isMultiple?: boolean) {
        return this.dialog.modal(this.getChatPageComponent(), { channel, isMultiple, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    showChatById(userId: string, photo?: any) {
        return this.broker.getById('user', userId).toPromise().then(user => {
            return this.showChat(user, photo);
        });
    }

    showChatBySelection(photo?: any): Promise<{ data?: any; role?: string }> {
        return new Promise((resolve, reject) => {
            this.dialog.modal(this.getGridPageComponent(), { multipleSelect: false, showFilters: true, collectionName: 'user', title: 'USER', customFilter: this.users.getCustomFilterNoAdmin(false) }).then((retVal) => {
                if (retVal.data) {
                    return this.getChannel(retVal.data).subscribe((channel) => {
                        if (channel) {
                            this.dialog.modal(this.getChatPageComponent(), { channel, closable: true, photo, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation).then(ret => resolve(ret));
                        } else {
                            return reject('no channel found');
                        }
                    });
                }
            });
        });
    }

    getChannel(user: User) {
        if (!user || user._id === this.session.userId) {
            return of(null);
        }
        let obs: Observable<any>;
        if (this.authentication.isAdmin(true)) {
            obs = this.channel.getSupportByUser(user);
        } else {
            obs = this.channel.getByUsers(this.session.user, user);
        }
        return obs;
    }

    getChannelById(userId: string): Observable<any> {
        return this.broker.getById('user', userId).pipe(mergeMap(user => {
            return this.getChannel(user);
        }));
    }

    getChannelByChannelId(channelId: string) {
        return this.channel.getChannelById(channelId);
    }

    //END OF CHAT

    //ENVIRONMENT
    getEnvironmentUrl() {
        return this.config.serverUrl;
    }

    setEnvironment(url) {
        this.session.clear(false).then(() => {
            this.config.serverUrl = url;
            this.coreConfig.reload();
        });
    }

    changeEnvironment() {
        let items = this.config.servers.map(server => ({ title: server.name, url: server.url, _id: server._id, icon: 'yo-servers' }));
        let custom: { title: string; url: string; _id: string; icon: string } = { title: this.translate.get('CUSTOM'), url: null, _id: 'custom', icon: 'yo-edit' };
        let selections = items.filter(s => s.url === this.getEnvironmentUrl());
        let initialSelection;
        if (selections.length <= 0) {
            custom.url = this.getEnvironmentUrl();
            initialSelection = custom;
        } else {
            initialSelection = selections[0];
        }
        items.unshift(custom);
        this.dialog.modal(this.getGridPageComponent(), {
            displayType: 'card-list',
            entityType: 'environnement',
            title: 'ENVIRONMENT',
            items: items,
            initialSelection: initialSelection,
            multipleSelect: false,
            closeIcon: 'yo-left'
        }).then((retVal?) => {
            if (retVal && retVal.data) {
                if (retVal.data._id === 'custom') {
                    if (custom.url && custom.url.length > 1 && custom.url.endsWith('/') === false) {
                        custom.url += '/';
                    }
                    this.dialog.rename('URL', '', custom.url || '').then(url => {
                        if (url) {
                            return this.setEnvironment(url);
                        }
                    });
                } else if (retVal.data.url) {
                    return this.setEnvironment(retVal.data.url);
                }
            }
        });
    }
    //END OF ENVIRONMENT

    changeLanguage() {
        let items: any = Translate.availablesLanguage.map(language => ({ title: this.translate.get(language.toUpperCase()), _id: language, icon: this.translate.getIcon(language) }));
        this.dialog.modal(this.getGridPageComponent(), {
            mode: 'list',
            entityType: 'language',
            displayType: 'card-list',
            title: 'LANGUAGE',
            items: sortBy(items, (i: any) => i.title),
            initialSelection: items.filter(i => i._id === this.translate.getCurrentLanguage()),
            multipleSelect: false,
            closeIcon: 'yo-left'
        }, null, slideXEnterAnimation, slideXLeaveAnimation).then(retVal => {
            if (retVal && retVal.data) {
                this.translate.setLanguage(retVal.data._id);
            }
        });
    }

    getPhotoLibraryDialog(maxImagesCount: number = 10) {
        return this.imagePicker.requestReadPermission().then(() => {
            return this.imagePicker.getPictures({
                maximumImagesCount: 10,
                width: 140
            }).then(results => {
                return results.map(r => ({
                    thumbnailURL: r
                }));
            });
        });
    }

    getPhotoLibrary(thumbnailWidth: number = 80, thumbnailHeight: number = 80, itemsInChunk: number = 5) {//: Promise<Array<LibraryItem>> {
        return new Promise((resolve, reject) => {
            let photoLibrary = (<any>window.cordova.plugins).photoLibrary;
            photoLibrary.requestAuthorization(() => {
                photoLibrary.getLibrary((retVal: { library: Array<LibraryItem> }) => {
                    // retVal.library.forEach(element => {
                    //     element.thumbnailURL = this.sanitizer.bypassSecurityTrustUrl(element.thumbnailURL);
                    //     element.photoURL = this.sanitizer.bypassSecurityTrustUrl(element.photoURL);
                    // });
                    Promise.all(retVal.library.map(item => {
                        return this.getThumnailUrl(item).then(url => {
                            item.thumbnailURL = url;
                        });
                    })).then(() => {
                        resolve(retVal.library);
                    });
                }, (err) => {
                    reject(err);
                }, { thumbnailHeight, thumbnailWidth, itemsInChunk });
            }, (err) => {
                //console.log(err);
                reject('could not get photos');
            });
            // this.photoLibrary.requestAuthorization().then(() => {
            //     this.photoLibrary.getLibrary({ thumbnailHeight, thumbnailWidth, itemsInChunk }).subscribe({
            //         next: (library) => {
            //             resolve(library);
            //         },
            //         error: (err) => {
            //             console.log(err);
            //             reject('could not get photos');
            //         },
            //         complete: () => {

            //         }
            //     });
            // }).catch(err => {
            //     console.log(err);
            //     reject('permissions weren\'t granted');
            // });
        });
    }

    protected getThumnailUrl(libraryItem): Promise<string> {
        return new Promise((resolve, reject) => {
            let photoLibrary = (<any>window.cordova.plugins).photoLibrary;
            photoLibrary.getPhoto(
                libraryItem.id,
                (blob: any) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = () => {
                        resolve('');
                    };
                    reader.readAsDataURL(blob);
                },
                (err) => { }, {
                    thumbnailWidth: 70,
                    thumbnailHeight: 70,
                    quality: 0.8
                });
        });
    }

    protected getWhatsNewPageComponent() {
        return null;
    }

    protected getTermsAndConditionsPageComponent() {
        return null;
    }

    protected getGridPageComponent() {
        return null;
    }

    protected getChatPageComponent() {
        return null;
    }

    protected getWalkthroughPageComponent() {
        return null;
    }

    protected getFormDynamicPageComponent() {
        return null;
    }

    protected getEntityActionPageComponent() {
        return null;
    }

    protected getResultDialogPageComponent() {
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
}