import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { isNumber } from 'lodash-es';
import { Translate } from '@shared/translate';
import { DefaultRendererComponent } from '../default/default-renderer.component';

@Component({
    selector: 'number-cell',
    template: `<div style="text-align:center">{{defaultValue()}}</div>`
})
export class DurationRendererComponent implements ICellRendererAngularComp {
    private params: any;

    constructor(protected translate: Translate) {
    }

    agInit(params: any) {
        this.params = params;
    }

    defaultValue() {
        let value = DefaultRendererComponent.renderer(this.params);
        return isNumber(value) ? Math.round(value) + ' ' + this.translate.get('MIN').toLowerCase() + '.' : value;
    }

    refresh(params: any) {
        return false;
    }

}