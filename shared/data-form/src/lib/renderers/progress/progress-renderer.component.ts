import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CellRendererBase } from '../../services/cell-renderer/cell-renderer.base';
import { DefaultRendererComponent } from '../default/default-renderer.component';

@Component({
    selector: 'progress-cell',
    template: `{{defaultValue()}}`
})
export class ProgressRendererComponent implements ICellRendererAngularComp {
    private params: any;

    public static renderer(params, translate) {
        let retVal = '';
        if (params.node && params.node.aggData) {// && _keys(params.node.aggData).filter(k => k.indexOf('ag-Grid-AutoColumn') === 0).length > 0) {
            if (params.node.aggData.status && params.node.aggData.validated) {
                params.node.aggData.progress = ProgressRendererComponent.value(params.node);
                retVal += CellRendererBase.getKeyTemplate('progress', params.node.aggData.progress, translate, ' %', true, true);
            }
        }
        return retVal;
    }

    public static value(node) {
        if (node && node.aggData && node.aggData.status && node.aggData.status.counts) {
            let retVal = Math.round((node.aggData.status.counts.finished || 0) * 100 / ((node.aggData.status.counts.finished || 0) + (node.aggData.status.counts.available || 0)));
            return isNaN(retVal) ? 0 : retVal;
        }
        return 0;
    }

    public static comparator(valueA: any, valueB: any, nodeA: any, nodeB: any) {
        if (nodeA.group === true && nodeB.group === true) {
            let progressA = ProgressRendererComponent.value(nodeA);
            let progressB = ProgressRendererComponent.value(nodeB);
            return CellRendererBase.defaultComparator(progressA, progressB);
        } else {
            return CellRendererBase.coreGroupComparator(valueA, valueB, nodeA, nodeB);
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