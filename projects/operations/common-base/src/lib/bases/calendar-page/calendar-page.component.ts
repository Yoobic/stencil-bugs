import { Injectable } from '@angular/core';

import { BasePageBaseComponent } from '../base-page/base-page.component';

@Injectable()
export class CalendarPageBaseComponent extends BasePageBaseComponent {

    protected selectedTimescale: { date: Date; start: Date; end: Date };

    getMarkers() {
    }
}
