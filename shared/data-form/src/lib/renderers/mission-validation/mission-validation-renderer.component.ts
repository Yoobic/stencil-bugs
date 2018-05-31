import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CellRenderer } from '../../services/cell-renderer/cell-renderer.service';
import { DefaultRendererComponent } from '../default/default-renderer.component';

import { isObject, isEmpty, reduce } from 'lodash-es';

@Component({
    selector: 'mission-validation-cell',
    template: `{{defaultValue()}}`
})
export class MissionValidationRendererComponent implements ICellRendererAngularComp {
    private params: any;

    public static renderer(value, field, params, translate) {
        if (isObject(value) && value.counts) {
            return value.toString();
        }
        if (value !== false && value !== true && isEmpty(value) && params.node && params.node.data && params.node.data.get) {
            value = params.node.data.get('validated');
        }
        let status = '';
        if (params.node && params.node.data) {
            status = params.node.data.getIn ? params.node.data.getIn(['status']) : params.node.data.status;
        }
        if (value === true || value === 'false' || value === 'validated') {
            return '<span class="badge balanced">  <i class="yo yo-check-circle"></i> ' + translate.get('VALIDATED') + '</span>';
        } else if (value === false ||  value === 'false' || value === 'rejected') {
            return '<span class="badge assertive">  <i class="yo yo-close-circle"></i>  ' + translate.get('REJECTED') + '</span>';
        } else if (status === 'finished' && value !== false && value !== true && value !== 'false' && value !== 'true' || value === 'tobevalidated') {
            return '<span class="badge royal">  <i class="yo yo-circle"></i> ' + translate.get('TOBEVALIDATED') + '</span>';
        }
        if (params.node.group && params.column.cellRenderer === 'group') {
            return '<span class="badge stable">' + translate.get('N/A') + '</span>';
        }
        return '';
    }

    public static comparator(valueA: any, valueB: any, nodeA: any, nodeB: any) {
        if (nodeA && nodeB && nodeA.group === true && nodeB.group === true && nodeA.aggData && nodeA.aggData.validated && nodeA.aggData.validated.counts && nodeB.aggData && nodeB.aggData.validated && nodeB.aggData.validated.counts) {
            let progressA = reduce(nodeA.aggData.validated.counts, (prev, val: any) => prev + (val || 0), 0);
            let progressB = reduce(nodeB.aggData.validated.counts, (prev, val: any) => prev + (val || 0), 0);
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