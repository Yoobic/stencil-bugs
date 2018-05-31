import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StoreManagerStorePageBaseComponent } from '@operations/common-base';
import { slideInTransition } from '@app/common-base';

@Component({
  selector: 'storemanager-store-page',
  templateUrl: './storemanager-store-page.component.html',
  styleUrls: ['./storemanager-store-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInTransition]
})
export class StoreManagerStorePageComponent extends StoreManagerStorePageBaseComponent {

}
