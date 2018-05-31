import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MissionFormPageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'mission-form-page',
  templateUrl: './mission-form-page.component.html',
  styleUrls: ['./mission-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class MissionFormPageComponent extends MissionFormPageBaseComponent {

}
