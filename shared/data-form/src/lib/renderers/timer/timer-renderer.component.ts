import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

import { moment } from '@shared/interfaces';


@Component({
    selector: 'timer-cell',
    template: `{{value()}}`
})
export class TimerRendererComponent implements ICellRendererAngularComp {
    private params: any;

    agInit(params: any) {
        this.params = params;
    }

    value() {
        let value = DefaultRendererComponent.renderer(this.params);
        if (value && value.startDate && value.endDate) {
            let ms = moment(value.endDate).diff(moment(value.startDate));
            let d = moment.duration(ms);
            let s = Math.floor(d.asHours()) + moment.utc(ms).format(':mm:ss');
            return s;
        } else {
            return '';
        }
    }

    refresh(params: any) {
        return false;
    }
}