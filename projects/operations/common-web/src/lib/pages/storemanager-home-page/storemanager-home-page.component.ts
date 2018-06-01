import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StoreManagerPageBaseComponent } from '@operations/common-base';
import { gridPageTransition } from '@app/common-base';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'storemanager-home-page',
  templateUrl: './storemanager-home-page.component.html',
  styleUrls: ['./storemanager-home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'page', '[@gridPageTransition]': '' },
  animations: [gridPageTransition]
})
export class StoreManagerHomePageComponent extends StoreManagerPageBaseComponent {

  openYooModal() {
    (this.utils as UtilsService).showModal().then(rep => {
      console.log(rep);
    });
  }

}
