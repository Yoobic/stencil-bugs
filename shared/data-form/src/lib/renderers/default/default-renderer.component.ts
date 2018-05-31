import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { isNumber, isEmpty } from 'lodash-es';

@Component({
    selector: 'default-cell',
    template: `{{value()}}`
})
export class DefaultRendererComponent implements ICellRendererAngularComp {
    private params: any;

    public static renderer(params) {
        let retVal;
        try {
            if (params.node && params.node.data && params.node.data.getIn) {
                retVal = params.node.data.getIn(params.column.colDef.field.split('.'));
            } else {
                retVal = params.value;
            }
            //retVal = (params.node && params.node.data && params.node.data.getIn ? params.node.data.getIn(params.column.colDef.field.split('.')) : params.value) || undefined;
        } catch (err) { }
        if (retVal === true || retVal === false || isNumber(retVal)) {
            return retVal.toString();
        }
        return isEmpty(retVal) === false ? (retVal.toJS ? retVal.toJS() : retVal + '') : '';
    }

    agInit(params: any) {
        this.params = params;
    }

    value() {
        return DefaultRendererComponent.renderer(this.params);
    }

    refresh(params: any) {
        return false;
    }
}