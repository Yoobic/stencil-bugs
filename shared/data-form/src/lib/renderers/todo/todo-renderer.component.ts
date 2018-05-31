import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

import { map as _map } from 'lodash-es';

@Component({
    selector: 'todo-cell',
    template: `{{value()}}`
})
export class TodoRendererComponent implements ICellRendererAngularComp {
    private params: any;

    agInit(params: any) {
        this.params = params;
    }

    value() {
        let value = DefaultRendererComponent.renderer(this.params);
        if (value && value.values) {
            return _map(value.values, (v: any) => v.text.value).join(', ');
        }
        return '';
    }

    refresh(params: any) {
        return false;
    }
}