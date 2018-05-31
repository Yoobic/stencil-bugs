import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { PercentPipe } from '@angular/common';
import { isNumber } from 'lodash-es';
import { Translate } from '@shared/translate';
import { DefaultRendererComponent } from '../default/default-renderer.component';

@Component({
    selector: 'percentage-cell',
    template: `<div style="text-align:center">{{defaultValue()}}</div>`
})
export class PercentageRendererComponent implements ICellRendererAngularComp {
    protected percentPipe: PercentPipe;
    private params: any;

    constructor(protected translate: Translate) {
        this.percentPipe = new PercentPipe(this.translate.getCurrentAngularLocale());
    }

    agInit(params: any) {
        this.params = params;
    }

    defaultValue() {
        let value = DefaultRendererComponent.renderer(this.params);
        return isNumber(value) ? this.percentPipe.transform(value, '.0-0') : value;
    }

    refresh(params: any) {
        return false;
    }

}