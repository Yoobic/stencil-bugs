import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MissionDetailPageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'mission-detail-page',
  templateUrl: './mission-detail-page.component.html',
  styleUrls: ['./mission-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class MissionDetailPageComponent extends MissionDetailPageBaseComponent {

}
