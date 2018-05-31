import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BasePageBaseComponent } from '@app/common-base';

@Component({
  selector: 'notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class NotesPageComponent extends BasePageBaseComponent {

}
