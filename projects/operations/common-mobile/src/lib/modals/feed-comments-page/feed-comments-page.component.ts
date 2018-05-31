import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeedCommentsPageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'feed-comments-page',
  templateUrl: './feed-comments-page.component.html',
  styleUrls: ['./feed-comments-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class FeedCommentsPageComponent extends FeedCommentsPageBaseComponent {

}
