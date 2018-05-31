import { Component, Element, Prop, State, Event, EventEmitter } from '@stencil/core';
import { uniqBy } from 'lodash-es';

import { isUniversal, loadScript } from '../../../utils/helpers';
import { generateFilterGroups, layersFromKeys, getOldCSSClasses } from '../../../utils/helpers/map-helpers';
import { IMapEntry, IMarker, IFilterGroup } from '@shared/interfaces';

@Component({
    tag: 'yoo-map-js',
    styleUrl: 'map-js.scss',
    scoped: true
})
export class YooMapJsComponent {

    @Prop({ mutable: true }) filterGroups: IFilterGroup[] = [];
    @Prop() mapEntry: IMapEntry = {};

    @Event() filterGroupsChanged: EventEmitter<IFilterGroup[]>;
    @Event() selected: EventEmitter<IMarker>;
    @Event() selectedMultiple: EventEmitter<IMarker[]>;

    @State() isLoading: boolean = true;

     @Element() host: HTMLStencilElement;

    protected map: any;
    protected popup: any;

    private idCounter: number = 0;
    private mapId: string = 'mapbox-' + this.idCounter++;
    private layers: string[] = [];
    private clusterRadius: number = 50;
    private isDestroyed: boolean = false;
    private isLoaded: boolean = false;
    private legendsOld: {} = { available: 'energized', booked: 'positive', validated: 'balanced', rejected: 'assertive', tobevalidated: 'royal', archived: 'dark' };

    componentDidLoad() {
        this.isLoading = false;
        this.initMap();
    }

    componentDidUnload() {
        this.isDestroyed = true;
        if (this.map) {
            this.map.remove();
        }
    }

    onToggleFilterGroup(filterGroup: IFilterGroup, ev: CustomEvent) {
        filterGroup.visible = !filterGroup.visible;
        if ((ev.target as any).tagName === 'YOO-FORM-CHECKBOX') {
            (ev.target as any).checkPressed();
        }
        this.onFilterGroupsChange();
    }

    getMapbox(): Promise<any> {
        if (isUniversal()) {
            return Promise.resolve(null);
        }
        if ((window as any).L) {
            return Promise.resolve((window as any).L);
        } else {
            // loading the mapbox JS
            return loadScript('https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js').then(() => {
                return Promise.resolve((window as any).L);
            });
        }
    }

    initMap() {
        if (this.isDestroyed) {
            return;
        }
        // L --> handler to access Leaftet
        this.getMapbox().then(L => {
            // validate the mapbox-js token
            if (L.mapbox) {
                L.mapbox.accessToken = 'pk.eyJ1IjoieW9vYmljIiwiYSI6ImNpcTNxaGgwYzAwNjhodm5rdDRmM3JtMmwifQ.Ro3b2vKP5fMMd8ibPKy65A';
            }
            this.map = new L.mapbox.map(this.host.querySelector('.map-container'), 'mapbox.streets');

            this.popup = new L.popup({
                closeButton: false,
                closeOnClick: true
            });

            this.map.on('load', () => {
                // set zoom after loading, otherwise this method is never called
                this.map.setZoom(this.mapEntry.zoom);
                this.map.setView(L.latLng(this.mapEntry.position.latitude, this.mapEntry.position.longitude));
                this.isLoaded = true;

                // add a new control here
                if (this.mapEntry.showControls) {
                    this.addControls(L);
                }

                // setup yoobic custom map styles
                let styleLayer = L.mapbox.styleLayer('mapbox://styles/yoobic/ciq7yppji0085cqm7c0np246c');
                this.map.addLayer(styleLayer);

                this.initLanguage();
                this.initMarkers();

                if (this.mapEntry.disableZoom) {
                    // disable the zoom with the JS API - scrollWheelZoom is a property of map.options
                    this.map.scrollWheelZoom.disable();
                }
                if (this.mapEntry.showDirections) {
                    this.addDirections('mapbox.cycling');
                }
            });
        });

    }

    addControls(L) {
        let zoomControl = L.control.zoom({
            position: 'topright',
            zoomInText: '+',
            zoomOutText: '-'
        });
        this.map.addControl(zoomControl);
    }

    initLanguage() {
        // TODO:
    }

    initMarkers() {
        if (this.isDestroyed) {
            return;
        }
        this.getMapbox().then(L => {
            let coords: Array<any> = this.mapEntry.markers.map(m => ([m.longitude, m.latitude]));
            coords = uniqBy(coords, (c) => JSON.stringify(c));

            if (this.mapEntry.fitToMarkers && coords.length > 1) {
                // fit to markers
                this.fitToMarkers(L);
            } else if (this.mapEntry.fitToMarkers && coords.length === 1) {
                setTimeout(() => {
                    this.flyTo(this.mapEntry.markers[0].longitude, this.mapEntry.markers[0].latitude, 16);
                }, 500);
            }
            if (this.mapEntry.markers && this.isLoaded) {
                let originalFilterGroups = this.mapEntry.filterGroups || [];
                this.layers = [];

                if (this.mapEntry.groupBy) {
                    this.filterGroups = generateFilterGroups(this.mapEntry.markers, this.mapEntry.groupBy);
                    this.layers = layersFromKeys(this.filterGroups);

                    this.setOriginalFilterGroups(originalFilterGroups);
                } else {
                    this.layers.push('markers');
                }
                this.layers = this.layers.slice();
                // create the cluster groups and add to map
                this.createClusterGroup(this.layers);
            }
        });
    }

    fitToMarkers(L) {
        let bounds = L.latLngBounds(L.latLng(this.mapEntry.markers[0].latitude, this.mapEntry.markers[0].longitude), L.latLng(this.mapEntry.markers[1].latitude, this.mapEntry.markers[1].longitude));
        this.mapEntry.markers.forEach(function (m) {
            bounds.extend(L.latLng(m.latitude, m.longitude));
        });
        if (bounds.getNorth() !== bounds.getSouth()) {
            setTimeout(() => {
                try {
                    this.map.fitBounds(bounds);
                } catch (err) { }
            }, 500);
        }
    }

    setOriginalFilterGroups(originalFilterGroups: IFilterGroup[]) {
        this.filterGroups.forEach(f => {
            let original = originalFilterGroups.find(o => o.value === f.value);
            if (original) {
                f.visible = original.visible;
                this.onFilterGroupsChange();
            }
        });
    }

    flyTo(longitude: number, latitude: number, zoom: number = 12) {
        if (isNaN(longitude) || isNaN(latitude)) {
            return;
        }
        if (this.map) {
            let center = this.map.getCenter();
            let currentZoom = this.map.getZoom();
            if (longitude !== center.lng || latitude !== center.lat || zoom !== currentZoom) {
                this.getMapbox().then(L => {
                    this.map.panTo(L.latLng(latitude, longitude));
                    let icon = L.divIcon({
                        className: 'marker balanced'
                    });
                    let marker = L.marker([latitude, longitude], {
                        icon: icon
                    });

                    this.map.addLayer(marker);
                    setTimeout(() => {
                        this.map.setZoom(zoom);
                    }, 800);
                });
            }
        }
    }

    createClusterGroup(clusters: string[] = []) {
        this.getMapbox().then(L => {
            loadScript('https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/leaflet.markercluster.js').then(() => {
                if (L.MarkerClusterGroup && this.mapEntry.legendColors) {
                    clusters.forEach(cluster => {
                        let color = this.getOldColor(cluster);
                        let markers = this.createCluster(L, cluster + '-cluster', color);
                        this.map.addLayer(markers);
                    });
                }
            });
        });
    }

    createCluster(L: any, divClass: string, color: string) {
        let cluster = new L.MarkerClusterGroup({
            iconCreateFunction: (c) => {
                return L.divIcon({
                    html: '<div class=' + divClass + '>' + c.getChildCount() + '</div>',
                    className: color
                });
            }
        });

        this.mapEntry.markers.forEach(m => {
            if (m.color === color) {
                let title = m.title;
                let latitude = m.latitude;
                let longitude = m.longitude;
                let icon = L.divIcon({
                    className: m.color + ' marker'
                });
                let marker = L.marker([latitude, longitude], {
                    icon: icon
                });
                marker.bindPopup(title);

                marker.on('click', e => {
                    let properties = [];
                    let pointsInCluster = this.mapEntry.markers.filter(mm => {
                        let pointPixels = this.map.project(L.latLng(mm.latitude, mm.longitude));
                        let clickPixels = this.map.project(e.latlng);

                        let pixelDistance = Math.sqrt(
                            Math.pow(clickPixels.x - pointPixels.x, 2) +
                            Math.pow(clickPixels.y - pointPixels.y, 2)
                        );
                        return (Math.abs(pixelDistance) <= this.clusterRadius);
                    });
                    properties = properties.concat(pointsInCluster as any);
                    this.selected.emit(properties[0]);
                    this.selectedMultiple.emit(properties);
                });
                cluster.addLayer(marker);
            }
        });
        return cluster;
    }

    getOldColor(cluster: string) {
        let oldColor = '';
        if (this.mapEntry.legendColors) {
            this.mapEntry.legendColors.forEach(markerColor => {
                if (markerColor.markerStatus === cluster) {
                    oldColor = this.legendsOld[markerColor.markerStatus];
                }
            });
        }
        return oldColor;
    }

    addDirections(profile: string) {
        this.getMapbox().then(L => {
            loadScript('https://api.mapbox.com/mapbox.js/plugins/mapbox-directions.js/v0.4.0/mapbox.directions.js').then(() => {
                let directions = L.mapbox.directions({
                    profile: profile
                });
                let directionsLayer = L.mapbox.directions.layer(directions);
                directionsLayer.addTo(this.map);

                let directionsInputControl = L.mapbox.directions.inputControl('inputs', directions);
                directionsInputControl.addTo(this.map);

                let directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions);
                directionsErrorsControl.addTo(this.map);

                let directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions);
                directionsRoutesControl.addTo(this.map);

                let directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions);
                directionsInstructionsControl.addTo(this.map);
            });
        });
    }

    onFilterGroupsChange() {
        this.getMapbox().then(L => {
            loadScript('https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/leaflet.markercluster.js').then(() => {
                if (this.mapEntry.legendColors) {
                    // remove all feature layers of the map
                    for (let key in this.map._layers) {
                        if (this.map._layers[key]._featureGroup) {
                            this.map.removeLayer(this.map._layers[key]);
                        }
                    }
                    let baseId = this.mapId + '_';
                    for (let target of this.mapEntry.legendColors) {
                        let missionFilter = baseId + target.markerStatus;
                        // retrieve the filter elements from the DOM (type="checkbox")
                        let el = document.getElementById(missionFilter) as HTMLYooFormCheckboxElement;
                        if (el == null) {
                            continue;
                        }
                        // restore the feature layers for the checked markers
                        if (el.value === true) {
                            // pass L to avoid re-loading MarkerClusterGroup script multiple times
                            let color = this.getOldColor(target.markerStatus);
                            let markers = this.createCluster(L, target.markerStatus + '-cluster', color);
                            this.map.addLayer(markers);
                        }
                    }
                }
                this.filterGroupsChanged.emit(this.filterGroups);
            });
        });
    }

    render(): JSX.Element {
        let legendsNew = getOldCSSClasses();
        return (
            <div class="column-container" attr-layout="column">
                <div attr-layout="row" class="map-container"></div>
                {this.mapEntry.showDirections ? [
                    <div id="inputs"></div>,
                    <div id="errors"></div>,
                    <div class="directions-container">
                        <div id="routes"></div>
                        <div id="instructions"></div>
                    </div>
                ]
                    : null}
                {this.isLoading ? <yoo-loader class="medium"></yoo-loader> : null}
                {!this.mapEntry.hideLegend && this.filterGroups && this.filterGroups.length > 0 ?
                    <nav attr-layout="column" class="filter-group">
                        {this.filterGroups.map((f) =>
                            <div class="filter">
                                {/* <yoo-form-checkbox onClick={this.onToggleFilterGroup.bind(this, f)} text={f.title} class={legendsNew[f.value]} state="checked"></yoo-form-checkbox> */}
                                <yoo-form-checkbox onClick={this.onToggleFilterGroup.bind(this, f)} class={legendsNew[f.value]} value={true}></yoo-form-checkbox>
                                <yoo-badge class={legendsNew[f.value] + ' small round'} text={f.count.toString()}></yoo-badge>
                            </div>
                        )}
                    </nav>
                    : null}
                {this.mapEntry.showDirections ? (this.mapEntry.markers && this.mapEntry.markers.length === 1 ?
                    <div class="marker-info">
                        <div class="title">{this.mapEntry.markers[0].title}</div>
                        <div class="address">{this.mapEntry.markers[0].address}</div>
                    </div> : null) : null}
            </div>
        );
    }
}
