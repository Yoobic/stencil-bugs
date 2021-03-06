import { Injectable, OnInit, Input } from '@angular/core';
import { BasePageBaseComponent } from '../base-page/base-page.component';

@Injectable()
export class AppFormDynamicBasePageComponent extends BasePageBaseComponent implements OnInit {

    @Input() collectionName: string | any;
    @Input() formDefinition: Array<any>;
    @Input() slides: Array<any>;
    @Input() suffix: string;
    @Input() data: Object;
    @Input() secondaryActions: Array<any>;
    @Input() history: Array<any>;
    //extra options
    @Input() extraValidators: Array<any>;
    @Input() extraButtons: any;
    @Input() ignoreRequired: boolean;
    @Input() readonly: boolean;
    @Input() detailComponent: string;
    //text options
    @Input() title: string;
    @Input() saveText: string;
    @Input() cancelText: string;
    @Input() allowEdit: boolean;
    //visual options
    @Input() width: string;
    @Input() height: any;
    @Input() isFullscreen: boolean;
    @Input() canMove: boolean;

    protected finalData: any;

    ngOnInit() {
        this.finalData = this.data || {};
    }

    onDataChanged(data) {
        this.finalData = data;
    }

    onCancel() {
        this.closeModal();
    }

    onSave() {
        this.closeModal(this.finalData);
    }

    onShowSecondary() {
        if (this.secondaryActions && this.secondaryActions.length > 0) {
            this.dialog.actionsheet({
                buttons: this.secondaryActions.map(action => {
                    return {
                        text: action.text(this.data),
                        handler: () => {
                            if (action.handler) {
                                action.handler(this.data);
                            }
                            this.closeModal(null);
                        }
                    };
                })
            });
        }
    }
}