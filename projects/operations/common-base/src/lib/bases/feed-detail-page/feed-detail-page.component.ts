import { Injectable, OnInit } from '@angular/core';

import { BasePageBaseComponent } from '../base-page/base-page.component';

@Injectable()
export class FeedDetailPageBaseComponent extends BasePageBaseComponent implements OnInit {


    initExtraProviders() {
        super.initExtraProviders();
    }

    ngOnInit() {
    }

}
