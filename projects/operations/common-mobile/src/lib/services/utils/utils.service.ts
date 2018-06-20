import { Injectable } from '@angular/core';
import { AppFormDynamicPageComponent, UtilsService as BaseUtilsService } from '@app/common-base';

@Injectable()
export class UtilsService extends BaseUtilsService {


    initExtraProviders() {
        super.initExtraProviders();
    }

    showModal() {
        return this.dialog.modal(this.getFeedDetailComponent(), {}, 'modal-full-height');
    }


    protected getFormDynamicPageComponent() {
        return AppFormDynamicPageComponent;
    }

    protected getFeedDetailComponent() {
        return null;
    }
}