import { Component } from '@angular/core';
import { User } from '@shared/data-core';
import { Translate } from '@shared/translate';

import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'user-full-name-cell',
    template: `<div>{{defaultValue()}}</div>`
})
export class UserFullNameRendererComponent implements ICellRendererAngularComp {
    private params: any;

    constructor(protected translate: Translate) {
    }

    agInit(params: any) {
        this.params = params;
    }

    defaultValue() {
       let user;
        if (this.params.node && this.params.node.data && this.params.node.data.toJS) {
            user = this.params.node.data.toJS();
        } else {
            user = this.params.value;
        }
        return User.getDisplayName(user);
    }

    refresh(params: any) {
        return false;
    }

}