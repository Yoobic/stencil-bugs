import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

@Component({
    selector: 'boolean-cell',
    template: `<div [innerHtml]="value()"></div>`
})
export class BooleanRendererComponent implements ICellRendererAngularComp {
    private params: any;

    agInit(params: any) {
        this.params = params;
    }

    value() {
        let value = DefaultRendererComponent.renderer(this.params);
        if (value === true || value === 'true') {
            return '<i class="yo yo-check balanced"></i>';
        } else if (value === false || value === 'false') {
            return '<i class="yo yo-close assertive"></i>';
        } else if (value !== false && value !== true) {
            return '<i class="yo yo-circle"></i>';
        }
        return '';
    }

    refresh(params: any) {
        return false;
    }
}