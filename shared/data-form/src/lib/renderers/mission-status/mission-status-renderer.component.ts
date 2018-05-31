import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Translate } from '@shared/translate';
import { CellRenderer } from '../../services/cell-renderer/cell-renderer.service';
import { DefaultRendererComponent } from '../default/default-renderer.component';

import { reduce } from 'lodash-es';

@Component({
    selector: 'mission-status-cell',
    template: `{{defaultValue()}}`
})
export class MissionStatusRendererComponent implements ICellRendererAngularComp {
    private params: any;

    public static renderer(value, field, params, translate: Translate) {
        if (value === 'finished') {
            return '<span class="badge dark">' + translate.get('FINISHED') + '</span>';
        }
        if (value === 'booked') {
            return '<span class="badge positive">' + translate.get('BOOKED') + '</span>';
        }
        if (value === 'available') {
            return '<span class="badge energized">' + translate.get('AVAILABLE') + '</span>';
        }
        return value ? value.toString() : '';
    }

    public static simpleRenderer(translate: Translate) {
        function getMissionStatusRendererSimpleInternal(value) {
            if (value === 'finished') {
                return '<span class="badge dark">' + translate.get('FINISHED') + '</span>';
            }
            if (value === 'booked') {
                return '<span class="badge positive">' + translate.get('BOOKED') + '</span>';
            }
            if (value === 'available') {
                return '<span class="badge energized">' + translate.get('AVAILABLE') + '</span>';
            }
            return '';
        }
        return getMissionStatusRendererSimpleInternal;
    }

    public static comparator(valueA: any, valueB: any, nodeA: any, nodeB: any) {
        if (nodeA && nodeB && nodeA.group === true && nodeB.group === true) {
            nodeA.aggData = nodeA.aggData || {};
            nodeA.aggData.status = nodeA.aggData.status || {};
            let progressA = reduce(nodeA.aggData.status.counts, (prev, val: any) => prev + (val || 0), 0);

            nodeB.aggData = nodeB.aggData || {};
            nodeB.aggData.status = nodeB.aggData.status || {};
            let progressB = reduce(nodeB.aggData.status.counts, (prev, val: any) => prev + (val || 0), 0);
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