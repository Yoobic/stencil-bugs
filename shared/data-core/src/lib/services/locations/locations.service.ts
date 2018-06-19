import { Injectable } from '@angular/core';
import { IPosition } from '@shared/common';
import { Broker } from '../broker/broker.service';
import { Smartloc } from '../smartloc/smartloc.service';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { Location } from '../../interfaces/location/location.interface';
import { LocationType } from '../../interfaces/location-type/location-type.interface';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { Filters, SubQuery, IHealthscore } from '@shared/interfaces';

import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNumber } from 'lodash-es';

@Injectable()
export class Locations {

    constructor(private geoloc: Smartloc, private broker: Broker, protected rq: Requestor, protected config: Config) { }

    loadMarkers(position: IPosition, maxPoints = 5000) {
        position = position || this.geoloc.defaultPosition;
        let filters = [
            [{ field: '_geoloc', operator: { _id: 'nearSphere' }, value: [position.longitude, position.latitude], max: 40000 }]
        ];
        return this.broker.getAll('locations', ['_id', 'title', '_geoloc', 'address'], null, null, filters, null, 0, maxPoints).pipe(map(retVal => {
            return this.getMarkers(retVal.data);
        }));
    }

    getMarkers(locations: Array<Location>) {
        return this.broker.getMarkers(locations);
    }

    getMarkersData(collectionName: string, maxPoints: number = 5000, fields?: Array<string>, filters?: Filters, subQuery?: SubQuery) {
        return this.broker.getAll(collectionName, fields || ['_id', 'title', '_geoloc', 'address'], null, null, filters, null, 0, maxPoints, false, subQuery).pipe(
            map(retVal => {
                let markers = this.getMarkers(retVal.data);
                let legendColors = { available: 'energized', booked: 'positive', validated: 'balanced', rejected: 'assertive', tobevalidated: 'royal', archived: 'dark' };
                return { markers, legendColors };
            }));
    }

    getLegendColors() {
        let legendColors = { available: 'energized', booked: 'positive', validated: 'balanced', rejected: 'assertive', tobevalidated: 'royal', archived: 'dark' };
        return legendColors;
    }

    getStatsAndDistanceTransformAsync(position?: IPosition) {
        return (res: ResponseObject) => {
            return new Observable<ResponseObject>((observer: Observer<ResponseObject>) => {
                if (res && res.data && res.data.length > 0) {
                    let ids = res.data.map((location: Location) => location._id);
                    this.broker.getUserOrLocationStat(ids, 'location').subscribe((stats) => {
                        if (position) {
                            res.data = res.data.map((location: Location) => {
                                if (location._geoloc) {
                                    location.distance = this.geoloc.getDistance(position.latitude, position.longitude, location._geoloc[1], location._geoloc[0]);
                                }
                                return location;
                            });
                        }

                        res.data.forEach((location: Location) => {
                            let stat = stats.find(s => s._id === location._id);
                            // if (stat) {
                            location.stats = [{
                                title: 'AVAILABLE',
                                color: 'energized',
                                value: stat ? stat.count - stat.finished - stat.booked - stat.archived : 0
                            }, {
                                title: 'FINISHED',
                                color: 'royal',
                                value: stat ? stat.finished : 0
                            }];
                            // , {
                            //     title: 'ARCHIVED',
                            //     color: 'stable',
                            //     value: stat ? stat.archived : 0
                            // }
                        });

                        observer.next({ count: res.count, data: <any>res.data });
                        observer.complete();
                    });
                } else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            });
        };
    }

    getDistanceTransform(position: IPosition) {
        return (res: ResponseObject) => {
            if (res && res.data && res.data.map) {
                res.data = res.data.map((location: Location) => {
                    if (location._geoloc && position && isNumber(position.latitude) && isNumber(position.longitude)) {
                        location.distance = this.geoloc.getDistance(position.latitude, position.longitude, location._geoloc[1], location._geoloc[0]);
                    }
                    return location;
                });
            }
            return res;
        };
    }

    getAroundMeFilter(aroundMe: boolean, stats: boolean) {
        let filters: Array<any>;
        let sortModel: Array<any>;
        let mapTransform: any;
        return this.geoloc.getLocation().then(res => {
            mapTransform = stats ? this.getStatsAndDistanceTransformAsync(res) : this.getDistanceTransform(res);
            if (!aroundMe) {
                filters = [[]];
                sortModel = [{ colId: 'title', sort: 'asc' }];
            } else {
                sortModel = [];
                filters = [[{ field: '_geoloc', operator: { _id: 'nearSphere' }, value: [res.longitude, res.latitude], max: 40000 }]];
            }
            return { filters, sortModel, mapTransform };
        });
    }

    getLocationTypesTransform() {
        return (res: ResponseObject, search, filters, start, pageSize) => {
            return new Observable<ResponseObject>((observer: Observer<ResponseObject>) => {
                if (res && res.data && res.data.length > 0) {
                    let ids = res.data.map((type: LocationType) => type._id);
                    this.getLocationTypesStat(ids).subscribe((stats) => {
                        res.data.forEach((locationType: LocationType) => {
                            let stat = stats.find(s => s._id === locationType._id);
                            let count = stat ? stat.count || 0 : 0;
                            locationType.count = count;
                        });
                        observer.next({ count: res.count, data: <any>res.data });
                        observer.complete();
                    });
                } else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            });
        };
    }

    getLocationTypesStat(locationTypeIds: Array<string>): Observable<Array<{ _id: string; count: number }>> {
        let filters = [[{ field: 'typeRef', operator: { _id: 'inq' }, value: locationTypeIds }]];
        let options = [{
            '$project': {
                _id: '$typeRef'
            }
        }, {
            '$group': {
                _id: '$_id', count: { $sum: 1 }
            }
        }];
        return this.broker.aggregateQuery('locations', filters, options);
    }

    getHealthscore(locationId: string): Observable<IHealthscore> {
        let url = this.config.apiUrl + 'locations/healthScore?storeId=' + locationId;
        return this.rq.get(url).pipe(map(ret => ret.data));
    }

}
