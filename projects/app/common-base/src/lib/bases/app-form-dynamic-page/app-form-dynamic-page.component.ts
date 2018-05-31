import { Injectable, OnInit, Input } from '@angular/core';
import { BasePageBaseComponent } from '../base-page/base-page.component';
import { IFormField, ISlide } from '@shared/interfaces';

@Injectable()
export class AppFormDynamicBasePageComponent extends BasePageBaseComponent implements OnInit {

    @Input() collectionName: string | any;
    @Input() formDefinition: Array<IFormField>;
    @Input() slides: Array<ISlide>;
    @Input() suffix: string;
    @Input() data: Object;
    //extra options
    @Input() extraValidators: Array<any>;
    @Input() extraButtons: any;
    @Input() ignoreRequired: boolean;
    @Input() readonly: boolean;
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
}