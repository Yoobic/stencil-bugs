import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeedDetailPageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'feed-detail-page',
  templateUrl: './feed-detail-page.component.html',
  styleUrls: ['./feed-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class FeedDetailPageComponent extends FeedDetailPageBaseComponent {

}
