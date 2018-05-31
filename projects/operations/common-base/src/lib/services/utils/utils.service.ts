import { Injectable } from '@angular/core';
import { UtilsService as BaseUtilsService  } from '@app/common-base';
import { Feed } from '@operations/data';

@Injectable()
export class UtilsService extends BaseUtilsService {


    initExtraProviders() {
        super.initExtraProviders();
    }

    showFeedDetail(feed: Feed) {
        return this.dialog.modal(this.getFeedDetailComponent(), { feed }, 'modal-full-height');
    }

    protected getFeedDetailComponent() {
        return null;
    }

}