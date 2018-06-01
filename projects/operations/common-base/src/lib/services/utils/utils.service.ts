import { Injectable } from '@angular/core';
import { UtilsService as BaseUtilsService  } from '@app/common-base';

@Injectable()
export class UtilsService extends BaseUtilsService {


    initExtraProviders() {
        super.initExtraProviders();
    }

    showModal() {
        return this.dialog.modal(this.getFeedDetailComponent(), {}, 'modal-full-height');
    }

    protected getFeedDetailComponent() {
        return null;
    }

}