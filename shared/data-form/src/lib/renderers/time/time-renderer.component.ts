import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

import { moment } from '@shared/interfaces';

@Component({
    selector: 'time-cell',
    template: `{{value()}}`
})
export class TimeRendererComponent implements ICellRendererAngularComp {
    private params: any;

    agInit(params: any) {
        this.params = params;
    }

    value() {
        let value = DefaultRendererComponent.renderer(this.params);
        if (value) {
            return moment(value, /^\d\d:\d\d/.test(value) ? 'HH:mm' : '').format('LT');
        }
        return '';
    }

    refresh(params: any) {
        return false;
    }
}