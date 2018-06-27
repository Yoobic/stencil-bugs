import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


import { DialogService } from '../dialog/dialog.service';
import { slideXEnterAnimation, slideXLeaveAnimation } from '../../animations/animations';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File as FileNative } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

export interface IModalUpsertConfig {
    collectionName?: string | any;
    formDefinition?: Array<any>;
    slides?: Array<any>;
    suffix?: string;
    editable?: boolean;
    secondaryActions?: Array<any>;
    //extra options
    extraValidators?: Array<any>;
    extraButtons?: any;
    ignoreRequired?: boolean;
    readonly?: boolean;
    //text options
    title?: string;
    saveText?: string;
    cancelText?: string;
    allowEdit?: boolean;
    //visual options
    width?: string;
    height?: any;
    isFullscreen?: boolean;
    canMove?: boolean;
}

@Injectable()
export class UtilsService {

    public scrollToTop$ = new EventEmitter<any>();
    public loading$ = new EventEmitter<boolean>();

    constructor(
        protected dialog: DialogService,
        protected router: Router, protected file: FileNative, protected transfer: FileTransfer,
        protected injector: Injector) {
        this.initExtraProviders();
    }

    initExtraProviders() { }

    showFormDynamic<T = {}>(data: Object, options?: IModalUpsertConfig): Promise<{ data?: T; role?: string }> {
        return this.dialog.modal(this.getFormDynamicPageComponent(), { data, ...options, closeIcon: 'yo-left' }, null, slideXEnterAnimation, slideXLeaveAnimation);
    }

    protected getFormDynamicPageComponent() {
        return null;
    }

    downloadFileToDevice(sourceUrl, targetDirectory) {
        let fileTransfer = this.transfer.create();
        return fileTransfer.download(sourceUrl, targetDirectory);
    }
}