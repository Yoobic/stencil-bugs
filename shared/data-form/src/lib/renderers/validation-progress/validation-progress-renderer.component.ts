import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CellRenderer } from '../../services/cell-renderer/cell-renderer.service';
import { DefaultRendererComponent } from '../default/default-renderer.component';

@Component({
    selector: 'validation-progress-cell',
    template: `{{defaultValue()}}`
})
export class ValidationProgressRendererComponent implements ICellRendererAngularComp {
    private params: any;

    public static renderer(params, translate) {
        let retVal = '';
        if (params.node && params.node.aggData) { // && _keys(params.node.aggData).filter(k => k.indexOf('ag-Grid-AutoColumn') === 0).length > 0) {
            if (params.node.aggData.status && params.node.aggData.validated) {
                params.node.aggData.validationprogress = ValidationProgressRendererComponent.value(params.node);
                retVal += CellRenderer.getKeyTemplate('validationprogress', params.node.aggData.validationprogress, translate, ' %', true, true);
            }
        }
        return retVal;
    }

    public static value(node) {
        if (node.aggData && node.aggData.validated && node.aggData.validated.counts) {
            let retVal = Math.round(((node.aggData.validated.counts.validated || 0) + (node.aggData.validated.counts.rejected || 0)) * 100 / (node.aggData.status.counts.finished || 0));
            return isNaN(retVal) ? 0 : retVal;
        }
        return 0;
    }

    public static comparator(valueA: any, valueB: any, nodeA: any, nodeB: any) {
        if (nodeA.group === true && nodeB.group === true) {
            let progressA = ValidationProgressRendererComponent.value(nodeA);
            let progressB = ValidationProgressRendererComponent.value(nodeB);
            return CellRenderer.defaultComparator(progressA, progressB);
        } else {
            return CellRenderer.coreGroupComparator(valueA, valueB, nodeA, nodeB);
        }
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