import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EventCreatePageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'event-create-page',
  templateUrl: './event-create-page.component.html',
  styleUrls: ['./event-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class EventCreatePageComponent extends EventCreatePageBaseComponent {

}
