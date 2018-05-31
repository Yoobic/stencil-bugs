import { Injectable } from '@angular/core';
import { AppMenuBasePageComponent } from '@app/common-base';

import { UtilsService } from '../../services/utils/utils.service';

@Injectable()
export class MenuBasePageComponent extends AppMenuBasePageComponent {

    onShowCalendar() {
        (this.utils as UtilsService).showCalendarPage();
    }

    onShowSearch() {
        (this.utils as UtilsService).showSearchPage();
    }

    onShowCreate() {
        this.dialog.actionsheet({
            header: this.translate.get('CREATE'),
            buttons: [{
                text: this.translate.get('CANCEL'),
                role: 'cancel'
            }, {
                text: this.translate.get('TASK'),
                handler: () => {
                    this.onCreate('task');
                    return true;
                }
            }, {
                text: this.translate.get('SERVICE'),
                handler: () => {
                    this.onCreate('service');
                    return true;
                }
            }, {
                text: this.translate.get('EVENT'),
                handler: () => {
                    this.onCreate('event');
                    return true;
                }
            }, {
                text: this.translate.get('FEED'),
                handler: () => {
                    this.onCreate('feed');
                    return true;
                }
            }, {
                text: this.translate.get('CHAT'),
                handler: () => {
                    this.onCreate('chat');
                    return true;
                }
            }]
        });
    }

    onCreate(type: string) {
        switch (type) {
            case 'feed':
                (this.utils as UtilsService).showFeedCreate();
                break;
            case 'task':
                (this.utils as UtilsService).showTaskCreate();
                break;
            case 'service':
                (this.utils as UtilsService).showServiceCreate();
                break;
            case 'event':
                (this.utils as UtilsService).showEventCreate();
                break;
            case 'chat':
                (this.utils as UtilsService).showChatCreate();
                break;
        }
    }


}
