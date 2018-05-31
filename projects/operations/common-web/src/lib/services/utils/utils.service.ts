import { Injectable } from '@angular/core';
import { AppResultDialogPageComponent } from '@app/common-base';
import { UtilsService as BaseUtilsService } from '@operations/common-base';
import { AppWhatsNewPageComponent, AppTermsAndConditionsPageComponent, AppGridDialogPageComponent, AppWalkthroughPageComponent, AppChatPageComponent, AppFormDynamicPageComponent, EntityActionPageComponent } from '@app/common-web';
import { FeedDetailPageComponent } from '../../modals/feed-detail-page/feed-detail-page.component';

@Injectable()
export class UtilsService extends BaseUtilsService {

    protected getFeedDetailComponent() {
        return FeedDetailPageComponent;
    }

    protected getWhatsNewPageComponent() {
        return AppWhatsNewPageComponent;
    }

    protected getTermsAndConditionsPageComponent() {
        return AppTermsAndConditionsPageComponent;
    }

    protected getGridPageComponent() {
        return AppGridDialogPageComponent;
    }

    protected getWalkthroughPageComponent() {
        return AppWalkthroughPageComponent;
    }

    protected getChatPageComponent() {
        return AppChatPageComponent;
    }

    protected getEntityActionPageComponent() {
        return EntityActionPageComponent;
    }

    protected getFormDynamicPageComponent() {
        return AppFormDynamicPageComponent;
    }

    protected getResultDialogPageComponent() {
        return AppResultDialogPageComponent;
    }
}