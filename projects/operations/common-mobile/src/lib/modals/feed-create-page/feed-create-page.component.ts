import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeedCreatePageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'feed-create-page',
  templateUrl: './feed-create-page.component.html',
  styleUrls: ['./feed-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class FeedCreatePageComponent extends FeedCreatePageBaseComponent {

}
