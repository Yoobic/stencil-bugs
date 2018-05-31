import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfigConstants } from '@shared/common';
import { environment } from '../../../../../shared/environments/src/environment';

@Component({
  selector: 'app',
  template: '<app-root></app-root>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class AppComponent {

  constructor(protected configConstants: ConfigConstants) {
    this.configConstants.setConfig(environment);
  }
}
