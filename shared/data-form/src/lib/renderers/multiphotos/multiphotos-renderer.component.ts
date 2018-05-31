import { Component } from '@angular/core';
import { Models } from '@shared/data-core';
import { CloudinaryPipe, CoreConfig, Utils } from '@shared/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

import { uniqBy, isArray, pick } from 'lodash-es';

@Component({
    selector: 'multiphotos-cell',
    template: `<ng-template ngFor let-img [ngForOf]="images" let-i="index">
    <div class="ag-cell-image" style="display:inline-block; margin-right:5px" [style.background-image]="img|safe:'style'"></div>
    </ng-template>`
})
export class MultiPhotosRendererComponent implements ICellRendererAngularComp {
    public static cmp: any = null;

    public images: Array<string> = [];
    private cloudinaryPipe: CloudinaryPipe;
    private params: any;
    private photos: any;

    constructor(protected coreConfig: CoreConfig, protected utils: Utils) { }

    agInit(params: any) {
        this.params = params;
        this.cloudinaryPipe = new CloudinaryPipe(this.coreConfig, this.utils);
        let value = DefaultRendererComponent.renderer(this.params);
        if (value && isArray(value)) {
            value.forEach(v => {
                let image = 'url(' + this.cloudinaryPipe.transform(v, ...['30', '30']) + ')';
                this.images.push(image);
            });
        }
        this.photos = Models.getPhotosFromParams(params);
        if (this.photos && MultiPhotosRendererComponent.cmp && MultiPhotosRendererComponent.cmp.photos) {
            this.photos.forEach(p => p ? MultiPhotosRendererComponent.cmp.photos.push(p) : '');  // filter null piture
            MultiPhotosRendererComponent.cmp.photos = uniqBy(MultiPhotosRendererComponent.cmp.photos, (element) => <any>(JSON.stringify(pick(<any>element, ['_id', 'multiIndex']))));
        }
    }

    refresh(params: any) {
        return false;
    }
}