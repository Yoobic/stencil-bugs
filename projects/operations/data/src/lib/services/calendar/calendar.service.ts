import { Injectable } from '@angular/core';

import { CoreConfig } from '@shared/common';

import { Mission } from '../../interfaces/mission/mission.interface';

import { Calendar as CalendarNative } from '@ionic-native/calendar/ngx';

import { moment } from '@shared/interfaces';


@Injectable()
export class Calendar {

    constructor(private coreConfig: CoreConfig, private calendarNative: CalendarNative) { }

    createFromMission(mission: Mission) {
        if (this.coreConfig.isCordova()) {
            return this.calendarNative.createCalendar('YOOBIC').then((calId) => {
                return this.calendarNative.createEventInteractivelyWithOptions(mission.title, mission.address, mission.comments, moment(mission.bookedUntil || new Date()).toDate(), moment(mission.bookedUntil || new Date()).add(1, 'hour').toDate(), {
                    calendarName: 'YOOBIC',
                    calendarId: calId
                });
            }, (err) => {
                return null;
            });
        } else {
            return Promise.resolve(true);
        }
    }
}
