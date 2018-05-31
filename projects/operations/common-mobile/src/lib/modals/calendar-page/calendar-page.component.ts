import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarPageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class CalendarPageComponent extends CalendarPageBaseComponent {

}