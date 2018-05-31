import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MissionResultsPageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'mission-results-page',
  templateUrl: './mission-results-page.component.html',
  styleUrls: ['./mission-results-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class MissionResultsPageComponent extends MissionResultsPageBaseComponent {

}
