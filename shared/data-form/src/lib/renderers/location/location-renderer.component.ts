import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

@Component({
    selector: 'location-cell',
    template: `{{value()}}`
})
export class LocationRendererComponent implements ICellRendererAngularComp {
    private params: any;

    agInit(params: any) {
        this.params = params;
    }

    value() {
        let value = DefaultRendererComponent.renderer(this.params);
        return value ? (value.title ? value.title + ' - ' : '') + value.address : '';
    }

    refresh(params: any) {
        return false;
    }
}