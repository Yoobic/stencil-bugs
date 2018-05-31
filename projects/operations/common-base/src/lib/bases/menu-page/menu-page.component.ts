import { Injectable } from '@angular/core';
import { AppMenuBasePageComponent } from '@app/common-base';

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

}
