import { Injectable } from '@angular/core';
import { UtilsService as BaseUtilsService } from '@operations/common-base';
import { AppChatPageComponent } from '@app/common-mobile';
import { FeedDetailPageComponent } from '../../modals/feed-detail-page/feed-detail-page.component';

@Injectable()
export class UtilsService extends BaseUtilsService {

    protected getFeedDetailComponent() {
        return FeedDetailPageComponent;
    }

    protected getChatPageComponent() {
        return AppChatPageComponent;
    }
}