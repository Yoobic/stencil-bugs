import { Component } from '@angular/core';
import { CoreConfig, HttpsPipe, Utils } from '@shared/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

@Component({
    selector: 'video-cell',
    template: `<video class="ag-cell-image video" [src]="videoUrl|safe:'url'"></video>`
})
export class VideoRendererComponent implements ICellRendererAngularComp {
    public videoUrl: string = '';
    private params: any;
    private httpsPipe: HttpsPipe;

    constructor(protected coreConfig: CoreConfig, protected utils: Utils) {
    }

    agInit(params: any) {
        this.params = params;
            this.httpsPipe = new HttpsPipe(this.coreConfig, this.utils);
            let value = DefaultRendererComponent.renderer(this.params);
            if (value && this.httpsPipe) {
                this.videoUrl = this.httpsPipe.transform(value);
            }
    }

    refresh(params: any) {
        return false;
    }
}