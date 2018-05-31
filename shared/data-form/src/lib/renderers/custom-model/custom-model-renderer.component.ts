import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';
import { Models } from '@shared/data-core';
import { compact } from 'lodash-es';
@Component({
    selector: 'custom-model-cell',
    template: `{{value()}}`
})
export class CustomModelRendererComponent implements ICellRendererAngularComp {
    private params: any;

    agInit(params: any) {
        this.params = params;
    }

    value() {
        let data = DefaultRendererComponent.renderer(this.params);
        if (data && data._modelName) {
            let appareance = Models.getModelByCollectionName(data._modelName).appareance;
            if (appareance) {
                let v = [].concat(appareance.get('title'));
                let array = compact(v.map(t => data[t]));
                return array.length > 1 ? array.join(' - ') : array.join('');
            }
        }
        return '';
    }

    refresh(params: any) {
        return false;
    }
}