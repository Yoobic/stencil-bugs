import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeedPageBaseComponent } from '@operations/common-base';
import { gridPageTransition } from '@app/common-base';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'feeds-page',
  templateUrl: './feeds-page.component.html',
  styleUrls: ['./feeds-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[@gridPageTransition]': '' },
  animations: [gridPageTransition]
})
export class FeedsPageComponent extends FeedPageBaseComponent {

  openIonModal() {
    (this.utils as UtilsService).showModal().then(rep => {
      console.log(rep);
    });
  }
}
