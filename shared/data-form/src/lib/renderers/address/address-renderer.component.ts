import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

@Component({
    selector: 'address-cell',
    template: `{{value()}}`
})
export class AddressRendererComponent implements ICellRendererAngularComp {
    private params: any;

    agInit(params: any) {
        this.params = params;
    }

    value() {
        let value = DefaultRendererComponent.renderer(this.params);
        return value ? value.address || value : '';
    }

    refresh(params: any) {
        return false;
    }

}