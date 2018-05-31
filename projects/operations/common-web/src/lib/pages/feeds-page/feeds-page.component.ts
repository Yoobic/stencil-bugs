import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeedPageBaseComponent } from '@operations/common-base';
import { gridPageTransition } from '@app/common-base';

@Component({
  selector: 'feeds-page',
  templateUrl: './feeds-page.component.html',
  styleUrls: ['./feeds-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'page', '[@gridPageTransition]': '' },
  animations: [gridPageTransition]
})
export class FeedsPageComponent extends FeedPageBaseComponent {
}
