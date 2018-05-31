import { Injectable } from '@angular/core';
import { AppResultDialogPageComponent } from '@app/common-base';
import { UtilsService as BaseUtilsService } from '@operations/common-base';
import { AppChatPageComponent } from '@app/common-web';
import { FeedDetailPageComponent } from '../../modals/feed-detail-page/feed-detail-page.component';

@Injectable()
export class UtilsService extends BaseUtilsService {

    protected getFeedDetailComponent() {
        return FeedDetailPageComponent;
    }

    protected getChatPageComponent() {
        return AppChatPageComponent;
    }

    protected getResultDialogPageComponent() {
        return AppResultDialogPageComponent;
    }
}