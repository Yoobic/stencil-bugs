import { Injectable } from '@angular/core';
import { AppMenuBasePageComponent } from '@app/common-base';
import { FormFieldType } from '@shared/interfaces';

@Injectable()
export class MenuBasePageComponent extends AppMenuBasePageComponent {


    onShowCreate() {
        this.dialog.actionsheet({
            header: this.translate.get('CREATE'),
            buttons: [{
                text: this.translate.get('CANCEL'),
                role: 'cancel'
            }, {
                text: this.translate.get('TASK'),
                handler: () => {
                    console.log('task');
                    return true;
                }
            }, {
                text: this.translate.get('SERVICE'),
                handler: () => {
                    console.log('service');
                    return true;
                }
            }, {
                text: this.translate.get('EVENT'),
                handler: () => {
                    console.log('event');
                    return true;
                }
            }, {
                text: this.translate.get('FEED'),
                handler: () => {
                    console.log('feed');
                    return true;
                }
            }, {
                text: this.translate.get('CHAT'),
                handler: () => {
                    console.log('chat');
                    return true;
                }
            }]
        });
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
                    { type: FormFieldType.textarea, name: 'textarea', required: true }
                ]
            }).then(ret => {
                window['console'].log(ret.data);
            });
    }

}
