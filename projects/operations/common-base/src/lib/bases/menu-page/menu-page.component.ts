import { Injectable } from '@angular/core';
import { AppMenuBasePageComponent } from '@app/common-base';
// import { Translate } from '@shared/translate';
//import { FormFieldType } from '@shared/interfaces';
// import { FORM_FILES_IMAGE_FILTER } from '@shared/data-core';

import { UtilsService } from '../../services/utils/utils.service';
import { FormFieldType } from '@shared/interfaces';

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

    onShowTestForm() {
        this.utils.showFormDynamic(
            {
                tenant: 'Test',
                number: 100,
                date: '2018-05-16T00:00:00.0Z',
                datetime: '2018-05-16T12:00:00.0Z',
                time: '2018-05-16T12:00:00.0Z',
                checbox: true,
                toggle: false,
                textarea: 'Danjkn rekbfe m'
            }, {
                formDefinition: [
                    { type: FormFieldType.text, name: 'tenant', required: true, description: 'this is my long field description' },
                    { type: FormFieldType.number, name: 'number', required: true },
                    { type: FormFieldType.tel, name: 'tel', required: true },
                    { type: FormFieldType.password, name: 'password', required: true },
                    { type: FormFieldType.date, name: 'date', required: true },
                    { type: FormFieldType.datetime, name: 'datetime', required: true },
                    { type: FormFieldType.time, name: 'time', required: true },
                    { type: FormFieldType.checkbox, name: 'checkbox', required: true },
                    { type: FormFieldType.toggle, name: 'toggle', required: true },
                    { type: FormFieldType.textarea, name: 'textarea', required: true },
                    { type: FormFieldType.range, name: 'range', required: true, min: 0, max: 100 },
                    { type: FormFieldType.autocomplete, name: 'user', collectionName: 'users', required: true },
                    { type: FormFieldType.autocomplete, name: 'users', multiple: true, collectionName: 'users', required: true }
                ]
            }).then(ret => {
                window['console'].log(ret.data);
            });
    }
    // onShowTestForm() {
    //     // this.utils.showFormDynamic(
    //     //     {
    //     //         tenant: 'Test',
    //     //         number: 100,
    //     //         date: '2018-05-16T00:00:00.0Z',
    //     //         datetime: '2018-05-16T12:00:00.0Z',
    //     //         time: '2018-05-16T12:00:00.0Z',
    //     //         checbox: true,
    //     //         toggle: false,
    //     //         textarea: 'Danjkn rekbfe m'
    //     //     }, {
    //     //         formDefinition: [
    //     //             //{ title: 'FEEDTAGS', name: 'tags', type: FormFieldType.autocomplete, tag: true, allowCustomTag: true, collectionName: 'feeds', multiple: true, icon: 'yo-flag', subQuery: { field: 'feedRef', values: '_id' }, exportOrder: 13 }
    //     //             //   { type: FormFieldType.autocomplete, name: 'language', translate: true, values: Translate.availablesLanguageAll },
    //     //             //   { type: FormFieldType.autocomplete, name: 'image', filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, maxWidth: 616, maxHeight: 616, crop: 'square', collectionName: 'files', title: 'PHOTO', required: true, columnDefinition: { name: '_downloadURL' }, filterable: false, sortable: false },
    //     //             //   { type: FormFieldType.autocomplete, name: 'document', fixedPosition: true, collectionName: 'files', required: false, columnDefinition: { name: '_downloadURL' }, filterable: false, sortable: false },
    //     //             //   { type: FormFieldType.text, name: 'tenant', required: true, description: 'this is my long field description' },
    //     //             //   { type: FormFieldType.number, name: 'number', required: true },
    //     //             //   { type: FormFieldType.tel, name: 'tel', required: true },
    //     //             //   { type: FormFieldType.password, name: 'password', required: true },
    //     //             //   { type: FormFieldType.date, name: 'date', required: true },
    //     //             //   { type: FormFieldType.datetime, name: 'datetime', required: true },
    //     //             //   { type: FormFieldType.time, name: 'time', required: true },
    //     //             //   { type: FormFieldType.checkbox, name: 'checkbox', required: true },
    //     //             //   { type: FormFieldType.toggle, name: 'toggle', required: true },
    //     //             //   { type: FormFieldType.textarea, name: 'textarea', required: true },
    //     //             //   { type: FormFieldType.range, name: 'range', required: true, min: 0, max: 100, value: {inf: 11, sup: 38}},
    //     //             //   { type: FormFieldType.autocomplete, name: 'user', collectionName: 'users', required: true },
    //     //             //   { type: FormFieldType.autocomplete, name: 'users', multiple: true, collectionName: 'users', required: true }
    //     //         ]
    //     //     }).then(ret => {
    //     //         window['console'].log(ret.data);
    //     //     });
    // }

}
