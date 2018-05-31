import { Component } from '@angular/core';
import { Models } from '@shared/data-core';
import { CloudinaryPipe, CoreConfig, Utils } from '@shared/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

import { uniqBy, pick } from 'lodash-es';

@Component({
    selector: 'photo-cell',
    template: `<div class="ag-cell-image" [style.background-image]="backgroundImg|safe:'style'"></div>`
})
export class PhotoRendererComponent implements ICellRendererAngularComp {
    public static cmp: any = null;

    public backgroundImg: string = '';
    private cloudinaryPipe: CloudinaryPipe;
    private params: any;
    private photo: any;

    constructor(protected coreConfig: CoreConfig, protected utils: Utils) {
    }

    agInit(params: any) {
        this.params = params;
        this.cloudinaryPipe = new CloudinaryPipe(this.coreConfig, this.utils);
        let value = DefaultRendererComponent.renderer(this.params);
        if (value) {
            this.backgroundImg = 'url(' + this.cloudinaryPipe.transform(value, ...['30', '30']) + ')';
        }
        this.photo = Models.getPhotoFromParams(params);
        if (this.photo && PhotoRendererComponent.cmp && PhotoRendererComponent.cmp.photos) {
            PhotoRendererComponent.cmp.photos.push(this.photo);
            PhotoRendererComponent.cmp.photos = uniqBy(PhotoRendererComponent.cmp.photos, (element) => <any>(JSON.stringify(pick(<any>element, ['_id', 'multiIndex']))));
        }
    }

    refresh(params: any) {
        return false;
    }
}