import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EntityActionPageBaseComponent } from '@app/common-base';

@Component({
  selector: 'app-entity-action-page',
  templateUrl: './app-entity-action-page.component.html',
  styleUrls: ['./app-entity-action-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class EntityActionPageComponent extends EntityActionPageBaseComponent {

}
