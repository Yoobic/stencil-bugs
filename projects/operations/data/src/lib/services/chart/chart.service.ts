import { Injectable } from '@angular/core';

import { CoreConfig, LocalForageService, Utils } from '@shared/common';
import { Chart as ChartCore } from '@shared/data-form';
import { Broker, Requestor, DashboardCore, ChartDefinition } from '@shared/data-core';
import { Translate } from '@shared/translate';

import { CampaignsProgressKpi, KPIS, MissionDatasKpi, MissionPhotosKpi } from '../../interfaces/kpi/kpi.interface';
import { Missions } from '../missions/missions.service';

import { Observable } from 'rxjs';

@Injectable()
export class Chart extends ChartCore {
    constructor(protected broker: Broker, protected dashboard: DashboardCore, protected rq: Requestor, protected missions: Missions, protected translate: Translate, protected localForage: LocalForageService, protected coreConfig: CoreConfig, protected utils: Utils) {
        super(broker, dashboard, rq, translate, localForage, coreConfig, utils);
    }

    getKpiClass(name: string): typeof MissionPhotosKpi | typeof CampaignsProgressKpi {
        let retVal = KPIS.find(kpi => kpi.name === name);
        return retVal.type;
    }

    getKpiIconByType(type: string) {
        let retVal = KPIS.find(kpi => kpi.type === type);
        return retVal.icon;
    }

    getKpiIcon(name: string) {
        let retVal = KPIS.find(kpi => kpi.name === name);
        return retVal.icon;
    }

    getMapConfig(cd: ChartDefinition, data: Array<any>) {
        let markers = [];
        if (cd.collectionName === 'missions') {
            markers = this.missions.getMarkers(data);
        } else {
            markers = data.map((d) => {
                if (d._geoloc) {
                    return { latitude: d._geoloc[1], longitude: d._geoloc[0], title: '' };
                }
            }).filter(d => d !== undefined);
        }
        return {
            markers: markers,
            position: markers.length > 0 ? markers[0] : null,
            getPopupTemplate: this.missions.getPopupTemplate(cd.collectionName)
        };
    }

    getDataObservable(cd: ChartDefinition, component: any, forceRefresh = false, start = 0): Observable<any> {
        this.decodeChart(cd);
        if (cd.kpiType === 'MissionPhotosKpi' || (cd.collectionName === 'photos' && cd.showAs === 'carousel')) {
            if (cd.kpi) {
                MissionPhotosKpi.getChartDefinition(<any>cd.kpiFormValues, cd, this.translate);
                return this.dashboard.getPhotos((<any>cd.kpiFormValues).missionfields.selectedDescription, (<any>cd.kpiFormValues).missionfields.fields, start);
            } else {
                return this.dashboard.getPhotos(cd.missionfields.selectedDescription, <any>cd.missionfields.fields, start);
            }
        } else if (cd.collectionName === 'missiondatas') {
            let options = MissionDatasKpi.getAggregate(<any>cd, this.translate, this.cloudinaryPipe);
            return this.getAggregateQuery(cd, cd.collectionName, options.filters, options.aggregateOptions, forceRefresh);
        } else {
            return super.getDataObservable(cd, component, forceRefresh, start);
        }
    }

}
