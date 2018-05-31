import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ServiceCreatePageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'service-create-page',
  templateUrl: './service-create-page.component.html',
  styleUrls: ['./service-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class ServiceCreatePageComponent extends ServiceCreatePageBaseComponent {

}
