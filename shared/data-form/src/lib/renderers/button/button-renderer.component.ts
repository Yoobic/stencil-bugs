import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Translate } from '@shared/translate';

@Component({
    selector: 'ag-cell-button',
    template: `<div style="text-align:center" [attr.data-hint]="text" class="hint--bottom" ><i class="{{icon}} {{color}}"></i></div>`
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
    public text: string;
    public icon: string;
    public color: string;
    private params: any;

    constructor(protected translate: Translate) {
    }

    agInit(params: any) {
        this.params = params;
        if (this.params.colDef && this.params.colDef.context) {
            this.color = this.params.colDef.context.color;
            this.text = this.translate.get(this.params.colDef.context.text);
            this.icon = this.params.colDef.context.icon;
        }
    }

    defaultValue() {
        return '';
    }

    refresh(params: any) {
        return false;
    }

}