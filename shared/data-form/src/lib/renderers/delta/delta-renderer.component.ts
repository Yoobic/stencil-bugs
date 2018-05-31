import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import { indexOf, isNumber } from 'lodash-es';

@Component({
    selector: 'delta-cell',
    template: `{{value()}}`
})
export class DeltaRendererComponent implements ICellRendererAngularComp {
    private params: any;

    public static renderer(params) {
        let value = params.value || '';
        let rows = params.node.parent.allLeafChildren;
        let index = indexOf(rows, params.node);
        let field = params.colDef.field;
        if (index > 0 && index < rows.length) {
            let current = rows[index].data[field];
            let previous = rows[index - 1].data[field];
            if (isNumber(current) && isNumber(previous) && Math.abs(previous) > 0) {
                let delta = Math.round((current - previous) / previous * 100);
                if (Math.abs(delta) > 0) {
                    value += '<span style="margin-left:10px" class="' + (delta > 0 ? 'balanced' : 'assertive') + '"> (' + delta + '%)</span>';
                }
            }
        }
        return value;
    }

    agInit(params: any) {
        this.params = params;
    }

    value() {
        return DeltaRendererComponent.renderer(this.params);
    }

    refresh(params: any) {
        return false;
    }
}