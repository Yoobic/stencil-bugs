import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GeoLocation } from '@shared/common';
// import { DefaultRendererComponent } from '../default/default-renderer.component';
import { isArray, isEmpty } from 'lodash-es';

@Component({
    selector: 'distance-cell',
    template: `{{ value() | distance }}`
})
export class DistanceRendererComponent implements ICellRendererAngularComp {
    private params: any;

    constructor(protected geolocation: GeoLocation) { }

    // public static comparator(valueA: any, valueB: any, nodeA: any, nodeB: any) {
    //     if (valueA < valueB) {
    //         return -1;
    //     } else if (valueA > valueB) {
    //         return 1;
    //     } else {
    //         return 0;
    //     }
    // }

    agInit(params: any) {
        this.params = params;
    }

    value() {
        let keyPath = this.params.column.colDef.field.split('.');
        let value;
        if (isArray(keyPath) && keyPath.indexOf('distance') > -1 && this.params && this.params.node && this.params.data && this.params.node.data.getIn) {
            let _geoloc = this.params.node.data.getIn(['_geoloc']);
            let _geolocSave = this.params.node.data.getIn(['_geolocSave']);
            _geoloc = isEmpty(_geoloc) === false ? (_geoloc.toJS ? _geoloc.toJS() : _geoloc) : '';
            _geolocSave = isEmpty(_geolocSave) === false ? (_geolocSave.toJS ? _geolocSave.toJS() : _geolocSave) : '';
            if (_geoloc && _geoloc.length === 2 && _geolocSave && _geolocSave.length === 2) {
                value = this.geolocation.getDistance(_geolocSave[1], _geolocSave[0], _geoloc[1], _geoloc[0]);
            }
        }
        return value ? value : '';
    }

    refresh(params: any) {
        return false;
    }

}