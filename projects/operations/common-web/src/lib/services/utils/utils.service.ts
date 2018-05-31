import { Injectable } from '@angular/core';
import { AppResultDialogPageComponent } from '@app/common-base';
import { UtilsService as BaseUtilsService } from '@operations/common-base';
import { AppWhatsNewPageComponent, AppTermsAndConditionsPageComponent, AppGridDialogPageComponent, AppWalkthroughPageComponent, AppChatPageComponent, AppFormDynamicPageComponent, EntityActionPageComponent } from '@app/common-web';
import { FeedDetailPageComponent } from '../../modals/feed-detail-page/feed-detail-page.component';
import { MissionDetailPageComponent } from '../../modals/mission-detail-page/mission-detail-page.component';
import { FeedCreatePageComponent } from '../../modals/feed-create-page/feed-create-page.component';
import { MissionFormPageComponent } from '../../modals/mission-form-page/mission-form-page.component';
import { MissionResultsPageComponent } from '../../modals/mission-results-page/mission-results-page.component';

import { DocumentsPageComponent } from '../../modals/documents-page/documents-page.component';
import { DocumentsDetailPageComponent } from '../../modals/documents-detail-page/documents-detail-page.component';
import { NotesPageComponent } from '../../modals/notes-page/notes-page.component';
import { ContactsPageComponent } from '../../modals/contacts-page/contacts-page.component';
import { FeedCommentsPageComponent } from '../../modals/feed-comments-page/feed-comments-page.component';

@Injectable()
export class UtilsService extends BaseUtilsService {

    protected getFeedDetailComponent() {
        return FeedDetailPageComponent;
    }

    protected getFeedCommentsComponent() {
        return FeedCommentsPageComponent;
    }

    protected getMissionDetailComponent() {
        return MissionDetailPageComponent;
    }

    protected getMissionResultsComponent() {
        return MissionResultsPageComponent;
    }

    protected getMissionFormComponent() {
        return MissionFormPageComponent;
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

    protected getFeedCreateComponent() {
        return FeedCreatePageComponent;
    }

    protected getChatPageComponent() {
        return AppChatPageComponent;
    }

    protected getEntityActionPageComponent() {
        return EntityActionPageComponent;
    }

    protected getDocumentsComponent() {
        return DocumentsPageComponent;
    }

    protected getNotesComponent() {
        return NotesPageComponent;
    }

    protected getContactsComponent() {
        return ContactsPageComponent;
    }

    protected getFormDynamicPageComponent() {
        return AppFormDynamicPageComponent;
    }

    protected getResultDialogPageComponent() {
        return AppResultDialogPageComponent;
    }

    protected getDocumentDetailDialog() {
        return DocumentsDetailPageComponent;
    }
}