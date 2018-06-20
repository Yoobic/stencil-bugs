import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfigConstants } from '../services/config-constants/config-constants.service';
import { environment } from '../environment';

import { defineCustomElements } from 'design-system/esm/es5/design-system.define';

@Component({
  selector: 'app',
  template: '<app-root></app-root>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class AppComponent {

  constructor(protected configConstants: ConfigConstants) {
    this.configConstants.setConfig(environment);
    defineCustomElements(window);
  }
}
