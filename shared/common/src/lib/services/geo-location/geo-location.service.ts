/// <reference path="../../../../../../types/window/index.d.ts" />

import { Injectable } from '@angular/core';
import { IPosition, ILatLng } from '../../interfaces/position/position.interface';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { isNumber } from 'lodash-es';

import { CoreConfig } from '../core-config/core-config.service';

export class Position implements IPosition {
    latitude: number;
    longitude: number;
    accuracy: number;

    public static isPosition(p: any): p is Position {
        return p instanceof Position || (isNumber(p.latitude) && isNumber(p.longitude));
    }

    constructor(loc: IPosition | string | ILatLng) {
        if (typeof loc === 'string') {
            [this.latitude, this.longitude] = loc.split(',').map(parseFloat);
        } else if (Position.isPosition(loc)) {
            this.latitude = loc.latitude;
            this.longitude = loc.longitude;
            this.accuracy = loc.accuracy;
        } else {
            this.latitude = (<ILatLng>loc).lat;
            this.longitude = (<ILatLng>loc).lng;
        }
    }

    toGeoLoc(reversed = false): Array<number> {
        return reversed ? [this.longitude, this.latitude] : [this.latitude, this.longitude];
    }

    toJson() {
        return { latitude: this.latitude, longitude: this.longitude };
    }

    toStringLoc(): string {
        return this.latitude + ',' + this.longitude;
    }
}

@Injectable()
export class GeoLocation {

    public defaultPosition: Position = new Position({ latitude: 51.53162, longitude: -0.2376447 });
    private timeout = 30000;
    private cache: Position;

    constructor(private geolocation: Geolocation, protected coreConfig: CoreConfig) { }

    getDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit = 'K') {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === 'K') {
            dist = dist * 1.609344;
        }
        if (unit === 'N') {
            dist = dist * 0.8684;
        }
        return dist;
    }

    getLocation(forceRefresh = false): Promise<Position> {
        if (this.coreConfig.isCordova()) {
            return this.geolocation.getCurrentPosition({
                enableHighAccuracy: true, maximumAge: 90000, timeout: this.timeout
            }).then((value) => new Position(value.coords), (err) => this.defaultPosition);
        } else if (navigator && navigator.geolocation) {
            return new Promise((resolve, reject) => {
                if (!forceRefresh && this.cache) {
                    resolve(this.cache);
                } else {
                    navigator.geolocation.getCurrentPosition(pos => {
                        this.cache = new Position(pos.coords);
                        resolve(this.cache);
                    }, (err) => {
                        this.cache = this.defaultPosition;
                        resolve(this.defaultPosition);
                    }, { enableHighAccuracy: false, timeout: 10 * 1000, maximumAge: 10 * 60 * 1000 });
                }
            });
        }
    }

}
