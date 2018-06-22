import { Injectable } from '@angular/core';

import { CoreConfig } from '../core-config/core-config.service';

import { ModalController, PopoverController, ToastController, ActionSheetController, LoadingController, AlertController, PickerController } from '@ionic/angular';
import { AnimationBuilder, ActionSheetOptions } from '@ionic/core';

@Injectable()
export class DialogService {

    constructor(protected coreConfig: CoreConfig, protected modalCtrl: ModalController, protected popoverCtrl: PopoverController, protected toastCtrl: ToastController, protected actionsheetCtrl: ActionSheetController, protected loadingCtrl: LoadingController, protected alertCtrl: AlertController, protected pickerCtrl: PickerController) { }

    alert(header: string, message: string) {
        return new Promise((resolve, reject) => {
            this.alertCtrl.create({
                header:  (header),
                message:  (message),
                buttons: [
                    { text:  ('OK'), handler: () => resolve(true) }
                ]
            }).then((alert) => {
                alert.present();
            });
        });
    }

    alertDismiss() {
        return this.alertCtrl.dismiss();
    }

    rename(header: string, message: string, value: string) {
        return new Promise((resolve, reject) => {
            this.alertCtrl.create({
                header:  (header),
                message:  (message),
                inputs: [{
                    value: value,
                    type: 'text',
                    name: 'textinput'
                }],
                buttons: [{
                    text:  ('OK'),
                    handler: (ret) => {
                        resolve(ret.textinput);
                        return true;
                    }
                }]
            }).then((alert) => {
                alert.present();
            });
        });
    }

    renameDismiss() {
        return this.alertCtrl.dismiss();
    }

    confirm(header: string, message: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.alertCtrl.create({
                header:  (header),
                message:  (message),
                buttons: [
                    { text:  ('CANCEL'), role: 'cancel', cssClass: 'assertive', handler: () => resolve(false) },
                    { text:  ('OK'), handler: () => resolve(true) }
                ]
            }).then((alert) => {
                alert.present();
            });
        });
    }

    confirmDismiss() {
        return this.alertCtrl.dismiss();
    }

    toast(message: string) {
        return this.toastCtrl.create({ message:  (message) }).then((alert) => {
            return alert.present();
        });
    }

    toastDismiss() {
        return this.toastCtrl.dismiss();
    }

    actionsheet(opts: ActionSheetOptions): Promise<{ data?: any; role?: string }> {
        return new Promise((resolve, reject) => {
            this.actionsheetCtrl.create(opts).then(sheet => {
                sheet.onDidDismiss((ret) => {
                    resolve(ret);
                });
                sheet.present();
            });
        });
    }

    actionsheetDismiss(opts: ActionSheetOptions) {
        return this.actionsheetCtrl.dismiss();
    }

    popover(component: any) {
        return this.popoverCtrl.create({ component, ev: null }).then((popover) => {
            return popover.present();
        });
    }

    popoverDismiss() {
        return this.popoverCtrl.dismiss();
    }

    modal(component: any, data: any = {}, cssClass: string = null, enterAnimation: AnimationBuilder = null, leaveAnimation: AnimationBuilder = null): Promise<{ data?: any; role?: string }> {
        return new Promise((resolve, reject) => {
            if (!component) {
                return resolve(null);
            }
            return this.modalCtrl.create({ cssClass: cssClass, component, componentProps: { ...data, isModal: true }, enterAnimation, leaveAnimation }).then((modal) => {
                modal.onDidDismiss((ret) => {
                    resolve(ret);
                });
                modal.present();
            });
        });
    }

    modalDismiss(data?: any, role?: string, id?: number) {
        return this.modalCtrl.dismiss(data, role, id);
    }

    frame(url: string, title: string, external: boolean = false) {
        // if (this.coreConfig.isCordova()) {
        //     let browser = this.inAppBrowser.create(url, target, { toolbar: 'no', location: 'no' });
        //     return Promise.resolve(browser);
        // } else {
        return window.open(url, external ? '_system' : '_blank', 'location=no,toolbar=yes');
        //if external===false
        //return this.modal(DialogFrameComponent, { title, url, width: '100%', height: '100%', isFullscreen: true });
        //}
    }
}
