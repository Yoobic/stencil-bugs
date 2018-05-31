import { Component, Prop, Element, State, Event, EventEmitter } from '@stencil/core';
import { IMapEntry, IMarker, IFilterGroup } from '@shared/interfaces';
import { generateFilterGroups, layersFromKeys, getOldCSSClasses } from '../../../utils/helpers/map-helpers';
import { isUniversal, isCordova, loadScript } from '../../../utils/helpers';

@Component({
    tag: 'yoo-amap',
    styleUrl: 'amap.scss',
    scoped: true
})
export class YooAmapComponent {

    @Prop({ mutable: true }) filterGroups: IFilterGroup[] = [];
    @Prop() mapEntry: IMapEntry = {};

    @Event() filterGroupsChanged: EventEmitter<IFilterGroup[]>;
    @Event() selected: EventEmitter<IMarker>;
    @Event() selectedMultiple: EventEmitter<IMarker[]>;

    @State() isLoading: boolean = true;

     @Element() host: HTMLStencilElement;

    private amapKey = '206fa92104679ea432b9f73d424409250';
    private amapUrl = 'https://webapi.amap.com/maps?v=1.4.4&key=' + this.amapKey + '&plugin=AMap.MarkerClusterer';

    private map: any;
    private layers: string[] = [];
    private markersByLayer: any = {};
    private clusterByLayer: any = {};
    private isLoaded: boolean = false;
    private isDestroyed: boolean = false;
    private legendsOld: {} = { available: 'energized', booked: 'positive', validated: 'balanced', rejected: 'assertive', tobevalidated: 'royal', archived: 'dark' };

    onToggleFilterGroup(filterGroup: IFilterGroup, ev: CustomEvent) {
        filterGroup.visible = !filterGroup.visible;
        // if the <yoo-form-checkbox> element is pressed, toggle the container
        if ((ev.target as any).tagName === 'YOO-FORM-CHECKBOX') {
            (ev.target as any).checkPressed();
        }
        this.onFilterGroupsChange(filterGroup.visible, filterGroup);
    }

    componentDidLoad() {
        this.initMap();
        this.isLoading = false;
    }

    componentDidUnload() {
        this.isDestroyed = true;
    }

    getAMap() {
        if (isUniversal()) {
            return Promise.resolve(null);
        }
        if ((window as any).AMap) {
            return Promise.resolve(true);
        } else {
            return loadScript(this.amapUrl).then(() => {
                return Promise.resolve((window as any).AMap);
            });
        }
    }

    initMap() {
        if (this.isDestroyed) {
            return;
        }
        this.getAMap().then((aMap) => {
            if (aMap && aMap.Map) {
                this.map = new aMap.Map('map-container', {
                    center: [this.mapEntry.position.longitude, this.mapEntry.position.latitude],
                    zoom: this.mapEntry.zoom,
                    resizeEnable: true
                });
                this.isLoaded = true;
                this.initMarkers();
            }
        });
    }

    initMarkers() {
        if (this.isDestroyed) {
            return;
        }

        let aMap = (window as any).AMap;

        if (this.mapEntry.markers && this.isLoaded) {
            this.clearClusters();

            this.populateLayers();

            this.layers.forEach(layerId => {
                let markers: IMarker[] = this.mapEntry.markers.filter(m => {
                    if (this.mapEntry.groupBy) {
                        return m[this.mapEntry.groupBy] === layerId;
                    } else {
                        return true;
                    }
                });
                this.markersByLayer[layerId] = markers;
            });

            if (this.mapEntry.useCluster) {
                Object.keys(this.markersByLayer).forEach(layerId => {
                    let markers = this.markersByLayer[layerId];
                    this.addCluster(layerId, markers, this.getIconUrl(layerId));
                });
            } else {
                // attach markers without clustering
                Object.keys(this.markersByLayer).forEach(layerId => {
                    let markers = this.markersByLayer[layerId];
                    markers.forEach(m => {
                        let aMarker = new aMap.Marker({
                            position: [m.longitude, m.latitude],
                            extData: m._id
                        });
                        aMarker.setMap(this.map);
                        this.attachMarkerClickHandler(aMarker);
                    });
                });
            }
        }
    }

    populateLayers() {
        this.layers = [];
        if (this.mapEntry.groupBy) {
            this.filterGroups = generateFilterGroups(this.mapEntry.markers, this.mapEntry.groupBy);
            this.layers = layersFromKeys(this.filterGroups);
        } else {
            this.layers.push('markers');
        }
    }

    clearClusters() {
        // clear map and remove all the markers by cluster layer
        this.map.clearMap();
        if (this.clusterByLayer) {
            Object.keys(this.clusterByLayer).forEach((layerId) => {
                let cluster = this.clusterByLayer[layerId];
                cluster.clearMarkers();
                cluster = null;
            });
        }

    }
    addCluster(layerId: string, markers: IMarker[], iconUrl: string) {
        let aMap = (window as any).AMap;
        let aMarkers = [];
        markers.forEach(m => {
            let aMarker = new aMap.Marker({
                position: [m.longitude, m.latitude],
                icon: iconUrl,
                extData: m._id,
                offset: new aMap.Pixel(-15, -15)
            });
            aMarkers.push(aMarker);
            this.attachMarkerClickHandler(aMarker);
        });
        let styles = [{
            url: iconUrl,
            size: new aMap.Size(44, 44),
            offset: new aMap.Pixel(-22, -22),
            textColor: '#FFFFFF',
            textSize: 12
        }];

        let cluster = new aMap.MarkerClusterer(this.map, aMarkers, {
            gridSize: 80,
            styles: styles,
            zoomOnClick: false
        });
        this.clusterByLayer[layerId] = cluster;
        // listen to the click event on a marker
        cluster.on('click', (e) => {
            let markersId = e.markers.map(m => m.G.extData);
            let clickedMarkers = this.mapEntry.markers.filter(m => {
                return markersId.indexOf(m._id) > -1;
            });
            // for multiple markers, show up the first one
            this.selected.emit(clickedMarkers[0]);
            this.selectedMultiple.emit(clickedMarkers);
        });
    }

    attachMarkerClickHandler(aMarker: any) {
        aMarker.on(isCordova() ? 'touchend' : 'click', (e) => {
            let markerId = e.target.F.extData;
            let clickedMarker = this.mapEntry.markers.filter(m => {
                return m._id === markerId;
            });
            this.selected.emit(clickedMarker[0]);
        });
    }

    onFilterGroupsChange(visible: boolean, filterGroup: IFilterGroup) {
        let visibility = visible ? 'visible' : 'none';
        filterGroup.visible = visible;
        let layerId = filterGroup.value;
        if (this.mapEntry.useCluster) {
            this.toggleMarkers(visibility, layerId, true);
        } else {
            this.toggleMarkers(visibility, layerId, false);
        }
        this.filterGroupsChanged.emit(this.filterGroups);
    }

    toggleMarkers(visibility: string, layerId: string, useCluster: boolean) {
        let markers = this.markersByLayer[layerId];
        if (useCluster) {
            let cluster = this.clusterByLayer[layerId];
            if (visibility === 'visible') {
                this.addCluster(layerId, markers, this.getIconUrl(layerId));
            } else {
                cluster.clearMarkers();
                cluster = null;
            }
        } else {
            markers.forEach(m => {
                if (visibility === 'visible') {
                    m.show();
                } else {
                    m.hide();
                }
            });
        }
    }

    getIconUrl(layerId: string) {
        let icon = '';
        if (this.mapEntry.legendColors) {
            this.mapEntry.legendColors.forEach(markerColor => {
                if (this.mapEntry.icon || markerColor.markerStatus === layerId) {
                    let oldColor = this.legendsOld[markerColor.markerStatus];
                    icon = 'marker_' + oldColor;
                }
            });
        }
        return './assets/markers/' + icon + '.svg';
    }

    render(): JSX.Element {
        let legendsNew = getOldCSSClasses();
        return (
            <div class="column-container" attr-layout="column">
                <div attr-layout="row" id="map-container"></div>
                {/* { this.showDirections ? <yoo-toolbar actions={this.directionActions}></yoo-toolbar> : null} */}
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
