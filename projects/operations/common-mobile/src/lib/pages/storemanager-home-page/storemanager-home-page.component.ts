import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StoreManagerPageBaseComponent } from '../../bases/storemanager-home-page/storemanager-home-page.component';
import { gridPageTransition } from '@app/common-base';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'storemanager-home-page',
  templateUrl: './storemanager-home-page.component.html',
  styleUrls: ['./storemanager-home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[@gridPageTransition]': '' },
  animations: [gridPageTransition]
})
export class StoreManagerHomePageComponent extends StoreManagerPageBaseComponent {

  openIonModal() {
    (this.utils as UtilsService).showModal().then(rep => {
      console.log(rep);
    });
  }

  downloadToDevice() {
    this.utils.downloadFileToDevice('pdf', 'pdf');
  }
}
