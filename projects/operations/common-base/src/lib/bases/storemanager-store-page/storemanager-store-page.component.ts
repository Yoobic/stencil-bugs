import { Injectable, OnInit } from '@angular/core';
import { INavBarTab } from '@shared/interfaces';
import { Mission } from '@operations/data';
import { Location } from '@shared/data-core';

import { BasePageBaseComponent } from '../base-page/base-page.component';
import { UtilsService } from '../../services/utils/utils.service';

@Injectable()
export class StoreManagerStorePageBaseComponent extends BasePageBaseComponent implements OnInit {
  public tabs: Array<INavBarTab>;
  public selectedTab: INavBarTab;

  public params: any;
  public location: Location;

  ngOnInit() {
    super.ngOnInit();
    this.params = { value: 'trigger', params: { enter: 'translateX(100%)', leave: 'translateX(-100%)' } };
    this.sorts = [{ colId: '_lmt', sort: 'desc' }];
    this.filters = [[
      { field: 'ownerRef', operator: { _id: 'inq' }, value: [this.session.userId] },
      { field: 'status', operator: { _id: 'inq' }, value: ['finished'] }
    ]];
    this.location = this.session.user.location;

    this.tabs = [
      { title: this.translate.get('OVERVIEW'), value: 'overview' },
      ... this.location ? [{ title: this.translate.get('PERFORMANCE'), value: 'performance' }] : [],
      { title: this.translate.get('HISTORY'), value: 'history' }
    ];
    this.selectedTab = this.tabs[0];
  }

  onTabSelected(ev: { detail: INavBarTab }) {
    this.selectedTab = ev.detail;
  }

  onTabSelectedIsToRight(ev: { detail: boolean }) {
    this.params = ev.detail ? { value: 'trigger', params: { enter: 'translateX(100%)', leave: 'translateX(-100%)' } } : { value: 'trigger', params: { enter: 'translateX(-100%)', leave: 'translateX(100%)' } };
  }

  onMissionSelect(mission: Mission) {
    if (mission) {
      (this.utils as UtilsService).showMissionDetail(mission);
    }
  }
}
