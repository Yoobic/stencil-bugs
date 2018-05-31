import { Injectable, OnInit } from '@angular/core';
import { Notification } from '@shared/data-core';

import { BasePageBaseComponent } from '../base-page/base-page.component';

@Injectable()
export class ActivityPageBaseComponent extends BasePageBaseComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
    this.sorts = [{ colId: '_ect', sort: 'desc' }];
    this.filters = [[
      { field: 'data.type', operator: { _id: 'neq' }, value: 'chat' },
      { field: 'senderRef', operator: { _id: 'nin' }, value: [this.session.userId] }
    ]];
  }

  onNotificationSelect(ev: { detail: Notification }) {

  }

}
