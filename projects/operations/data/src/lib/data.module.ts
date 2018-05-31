import { NgModule, ModuleWithProviders, Provider } from '@angular/core';

import { DataCoreModule } from '@shared/data-core';
import { DataFormModule } from '@shared/data-form';
//import { DATA_YOOBIC_PROVIDERS } from './services';
import { Activity } from './services/activity/activity.service';
import { Authentication } from './services/authentication/authentication.service';
import { Calendar } from './services/calendar/calendar.service';
import { Chart } from './services/chart/chart.service';
import { DashboardService } from './services/dashboard/dashboard.service';
import { Feeds } from './services/feeds/feeds.service';
import { MissionCreator } from './services/mission-creator/mission-creator.service';
import { Missiondatas } from './services/missiondatas/missiondatas.service';
import { Missiondescriptions } from './services/missiondescriptions/missiondescriptions.service';
import { Missions } from './services/missions/missions.service';
import { Payments } from './services/payments/payments.service';
import { Security } from './services/security/security.service';
import { Session } from './services/session/session.service';
import { Trial } from './services/trial/trial.service';
import { Calendar as CalendarNative } from '@ionic-native/calendar/ngx';

@NgModule({
    declarations: [],
    imports: [DataCoreModule, DataFormModule],
    exports: [DataCoreModule, DataFormModule]
})
export class OperationsDataModule {
    static forRoot(configuredProviders: Array<Provider>): ModuleWithProviders {
        return {
            ngModule: OperationsDataModule,
            providers: [
                Activity,
                Authentication,
                Calendar,
                Chart,
                DashboardService,
                Feeds,
                MissionCreator,
                Missiondatas,
                Missiondescriptions,
                Missions,
                Payments,
                Trial,
                Security,
                Session,
                ...configuredProviders,
                CalendarNative
            ]
        };
    }
}
