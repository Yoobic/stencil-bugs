import { Injectable, OnInit } from '@angular/core';

import { BasePageBaseComponent } from '../base-page/base-page.component';

@Injectable()
export class FeedCreatePageBaseComponent extends BasePageBaseComponent implements OnInit {

    public photoItems: Array<any>;

    ngOnInit() {
        if (this.coreConfig.isCordova()) {
            this.utils.getPhotoLibrary().then((items: any) => {
                this.photoItems = items;
                this.cd.markForCheck();
            });
        }
    }
}
