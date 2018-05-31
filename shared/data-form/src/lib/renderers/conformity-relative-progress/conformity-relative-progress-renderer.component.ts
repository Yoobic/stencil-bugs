import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CellRenderer } from '../../services/cell-renderer/cell-renderer.service';
import { DefaultRendererComponent } from '../default/default-renderer.component';
import { ProgressRendererComponent } from '../progress/progress-renderer.component';
import { ConformityProgressRendererComponent } from '../conformity-progress/conformity-progress-renderer.component';

@Component({
    selector: 'conformity-relative-progress-cell',
    template: `{{defaultValue()}}`
})
export class ConformityRelativeProgressRendererComponent implements ICellRendererAngularComp {
    private params: any;

    public static renderer(params, translate) {
        let retVal = '';
        if (params.node && params.node.aggData) { // && _keys(params.aggData).filter(k => k.indexOf('ag-Grid-AutoColumn') === 0).length > 0) {
            if (params.node.aggData.status && params.node.aggData.validated) {
                params.node.aggData.conformityrelativeprogress = ConformityRelativeProgressRendererComponent.value(params.node);
                retVal += CellRenderer.getKeyTemplate('conformityrelativeprogress', params.node.aggData.conformityrelativeprogress, translate, ' %', true, true);
            }
        }
        return retVal;
    }

    public static value(node) {
        let campaignProgress = ProgressRendererComponent.value(node);
        let campaignConformityProgress = ConformityProgressRendererComponent.value(node);
        let retVal = Math.round(campaignConformityProgress * campaignProgress / 100);
        return isNaN(retVal) ? 0 : retVal;
    }

    public static comparator(valueA: any, valueB: any, nodeA: any, nodeB: any) {
        if (nodeA.group === true && nodeB.group === true) {
            let progressA = ConformityRelativeProgressRendererComponent.value(nodeA);
            let progressB = ConformityRelativeProgressRendererComponent.value(nodeB);
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