import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Session } from '../session/session.service';
import { GeoLocation, Position } from '@shared/common';

@Injectable()
export class Smartloc {
    constructor(private session: Session, private geoLoc: GeoLocation, private config: Config, private rq: Requestor) { }

    get defaultPosition() {
        return this.geoLoc.defaultPosition;
    }

    getLocation(forceRefresh = false) {
        if (this.hasRole('store') && !this.hasRole('admin')) {
            let promise;
            if (this.session.user && this.session.user.location && this.session.user.location._geoloc) {
                promise = Promise.resolve(this.session.user.location);
            } else if (this.session.user && this.session.user.locationRef) {
                promise = this.getLocationEntity(this.session.user.locationRef); //, ['_id', 'title', '_geoloc', 'address']
            } else if (this.session.user && this.session.user.address && this.session.user.address._geoloc) {
                promise = Promise.resolve(this.session.user.address);
            }
            if (promise) {
                return promise.then(loc => {
                    if (loc && loc._geoloc && loc._geoloc.length > 1) {
                        this.session.user.location = loc;
                        let position = new Position({ latitude: loc._geoloc[1], longitude: loc._geoloc[0] });
                        return position;
                    }
                    return null;
                });
            }
        }
        return this.geoLoc.getLocation(forceRefresh);
    }

    getDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit = 'K') {
        return this.geoLoc.getDistance(lat1, lon1, lat2, lon2, unit);
    }

    getLocationEntity(id) {
        let url = this.config.apiUrl + 'locations' + '/' + id;
        return this.rq.get(url).toPromise();
    }

    hasRole(role: string) {
        return this.session.roles && this.session.roles.indexOf(role) >= 0;
    }

}
