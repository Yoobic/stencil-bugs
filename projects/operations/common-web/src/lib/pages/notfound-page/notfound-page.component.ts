import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BasePageBaseComponent } from '@app/common-base';

@Component({
  selector: 'app-notfound-page',
  templateUrl: './notfound-page.component.html',
  styleUrls: ['./notfound-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'page' }
})
export class NotfoundPageComponent extends BasePageBaseComponent {

}
