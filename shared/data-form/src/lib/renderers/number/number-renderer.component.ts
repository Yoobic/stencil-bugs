import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

import { isNumber } from 'lodash-es';

@Component({
    selector: 'number-cell',
    template: `{{defaultValue()}}`
})
export class NumberRendererComponent implements ICellRendererAngularComp {
    private params: any;

    public static renderer(value, field, params, translate, decimalPipe?, precision?: number) {
        let retVal = isNumber(value) ? value : DefaultRendererComponent.renderer(params);
        let format = '1.0-1';
        if (precision > 0) {
            format = '1.0-' + precision;
        }
        if (retVal && isFinite(retVal - 0)) {
            retVal = retVal - 0;
        }
        if (isNumber(retVal) && decimalPipe) {
            retVal = decimalPipe.transform(retVal, format).toString();
        } else if (retVal && retVal.toString) {
            retVal = retVal.toString();
        } else {
            retVal = '';
        }
        return retVal.toString();
    }

    agInit(params: any) {
        this.params = params;
    }

    defaultValue() {
        return DefaultRendererComponent.renderer(this.params);
    }

    refresh(params: any) {
        return false;
    }
}