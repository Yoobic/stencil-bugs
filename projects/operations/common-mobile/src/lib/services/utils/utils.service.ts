import { Injectable } from '@angular/core';
import { AppResultDialogPageComponent } from '@app/common-base';
import { UtilsService as BaseUtilsService } from '@operations/common-base';
import { AppWhatsNewPageComponent, AppTermsAndConditionsPageComponent, AppGridDialogPageComponent, AppWalkthroughPageComponent, AppChatPageComponent, AppSearchPageComponent, AppFormDynamicPageComponent, EntityActionPageComponent } from '@app/common-mobile';
import { FeedDetailPageComponent } from '../../modals/feed-detail-page/feed-detail-page.component';
import { FeedCreatePageComponent } from '../../modals/feed-create-page/feed-create-page.component';
import { MissionDetailPageComponent } from '../../modals/mission-detail-page/mission-detail-page.component';
import { MissionFormPageComponent } from '../../modals/mission-form-page/mission-form-page.component';
import { MissionResultsPageComponent } from '../../modals/mission-results-page/mission-results-page.component';
import { ChatCreatePageComponent } from '../../modals/chat-create-page/chat-create-page.component';
import { EventCreatePageComponent } from '../../modals/event-create-page/event-create-page.component';
import { ServiceCreatePageComponent } from '../../modals/service-create-page/service-create-page.component';
import { TaskCreatePageComponent } from '../../modals/task-create-page/task-create-page.component';
import { CalendarPageComponent } from '../../modals/calendar-page/calendar-page.component';
import { FeedCommentsPageComponent } from '../../modals/feed-comments-page/feed-comments-page.component';

import { DocumentsPageComponent } from '../../modals/documents-page/documents-page.component';
import { DocumentsDetailPageComponent } from '../../modals/documents-detail-page/documents-detail-page.component';
import { NotesPageComponent } from '../../modals/notes-page/notes-page.component';
import { ContactsPageComponent } from '../../modals/contacts-page/contacts-page.component';

@Injectable()
export class UtilsService extends BaseUtilsService {

    protected getFeedDetailComponent() {
        return FeedDetailPageComponent;
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

    protected getEventCreateComponent() {
        return EventCreatePageComponent;
    }

    protected getChatCreateComponent() {
        return ChatCreatePageComponent;
    }

    protected getServiceCreateComponent() {
        return ServiceCreatePageComponent;
    }

    protected getTaskCreateComponent() {
        return TaskCreatePageComponent;
    }

    protected getCalendarPageComponent() {
        return CalendarPageComponent;
    }

    protected getSearchPageComponent() {
        return AppSearchPageComponent;
    }

    protected getFeedCommentsComponent() {
        return FeedCommentsPageComponent;
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