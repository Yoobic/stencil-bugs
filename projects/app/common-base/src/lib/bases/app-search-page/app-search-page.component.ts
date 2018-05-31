import { Injectable } from '@angular/core';

import { BasePageBaseComponent } from '../base-page/base-page.component';

@Injectable()
export class AppSearchPageBaseComponent extends BasePageBaseComponent {
    public algoliaConfig: any;

    initExtraProviders() {
        super.initExtraProviders();
        this.algoliaConfig = {
            apiKey: '27dce9059e7067e28cd1e3b5e48583d5',
            appId: 'GZZ70RM922',
            indexName: 'missions',
            routing: false
        };
    }

}
