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
  public profilePage: any;

  ngOnInit() {
    this.profilePage = ProfilePageComponent;
    super.ngOnInit();
  }

}
