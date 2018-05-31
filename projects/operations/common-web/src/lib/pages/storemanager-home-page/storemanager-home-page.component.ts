import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StoreManagerPageBaseComponent } from '@operations/common-base';
import { gridPageTransition } from '@app/common-base';

@Component({
  selector: 'storemanager-home-page',
  templateUrl: './storemanager-home-page.component.html',
  styleUrls: ['./storemanager-home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'page', '[@gridPageTransition]': '' },
  animations: [gridPageTransition]
})
export class StoreManagerHomePageComponent extends StoreManagerPageBaseComponent {

}
