import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { routerTransition } from '@app/common-base';
import { MenuBasePageComponent } from '@operations/common-base';
import { ITabEntry, IWebMenuEntry } from '@shared/interfaces';

@Component({
  selector: 'menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'attr-layout': 'row' },
  animations: [routerTransition]
})
export class MenuPageComponent extends MenuBasePageComponent implements OnInit {
  public tabs: Array<ITabEntry>;
  public entry: IWebMenuEntry;

  ngOnInit() {
    this.entry = {
      logo: 'assets/logo/operations_simple.svg',
      items: [
        { label: this.translate.get('HOME2'), icon: 'yo-home', iconSelected: 'yo-home-solid', href: '/menu/home', name: 'home', separator: true },
        { label: this.translate.get('FEEDS'), icon: 'yo-feed', iconSelected: 'yo-feed-solid', href: '/menu/feeds', name: 'feeds' },
        { label: this.translate.get('MYSTORE'), icon: 'yo-chart', iconSelected: 'yo-chart-solid', href: '/menu/mystore', name: 'mystore' }
      ]
    };
    super.ngOnInit();
  }

  onItemClicked(ev) {
    if (ev && ev.detail && ev.detail.handler) {
      ev.detail.handler();
    }
    if (ev && ev.detail && ev.detail.href) {
      this.goTo(ev.detail.href);
    }
  }

  onProfileClicked(ev) {
    this.onShowProfile();
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
