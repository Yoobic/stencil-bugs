import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { routerTransition } from '@app/common-base';
import { MenuBasePageComponent } from '@operations/common-base';
//import { Feed } from '@operations/data';
//import { ITabEntry } from '@shared/interfaces';
// import { FormFieldType } from '@shared/interfaces';
import { ProfilePageComponent } from '../../modals/profile-page/profile-page.component';

@Component({
  selector: 'menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' },
  animations: [routerTransition]
})
export class MenuPageComponent extends MenuBasePageComponent implements OnInit {
  //public tabs: Array<ITabEntry>;
  public profilePage: any;
  public enableCustomModel: boolean;

  ngOnInit() {
    this.enableCustomModel = true;
    this.profilePage = ProfilePageComponent;
    // this.tabs = [
    //   { label: 'HOME2', icon: 'yo-home', iconSelected: 'yo-home-solid', href: '/menu/home', name: 'home' },
    //   { label: 'FEEDS', icon: 'yo-feed', iconSelected: 'yo-feed-solid', href: '/menu/feeds', name: 'feeds' },
    //   { label: 'MYSTORE', icon: 'yo-chart', iconSelected: 'yo-chart-solid', href: '/menu/mystore', name: 'mystore' },
    //   { label: 'CHAT', icon: 'yo-chat', iconSelected: 'yo-chat-solid', href: '/menu/chats', name: 'chats' },
    //   { label: 'ACTIVITY', icon: 'yo-activity', iconSelected: 'yo-activity-solid', href: '/menu/activity', name: 'activity' }
    // ];
    super.ngOnInit();
  }

}
