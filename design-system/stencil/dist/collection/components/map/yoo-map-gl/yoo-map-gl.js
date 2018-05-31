import { flatten, uniqBy, take } from 'lodash-es';
import mapboxgl from 'mapbox-gl';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { isAndroid, isCordova } from '../../../utils/helpers';
import { generateFilterGroups, layersFromKeys, getOldCSSClasses } from '../../../utils/helpers/map-helpers';
export class YooMapGLComponent {
    constructor() {
        // Need this Prop to force a re-render - consider changing this to @State()
        this.filterGroups = [];
        this.mapEntry = {};
        this.isLoading = true;
        this.directionActions = [
            { title: 'DRIVING', icon: 'yo-car', handler: () => this.onShowDirections('driving') },
            { title: 'CYCLING', icon: 'yo-bicycle', handler: () => this.onShowDirections('cycling') },
            { title: 'WALKING', icon: 'yo-walk', handler: () => this.onShowDirections('walking') }
        ];
        this.layers = [];
        this.circleRadius = { stops: [[5, 3], [10, 10]] };
        this.clusterRadius = 50;
        this.isDestroyed = false;
        this.isLoaded = false;
        this.legendsOld = { available: 'energized', booked: 'positive', validated: 'balanced', rejected: 'assertive', tobevalidated: 'royal', archived: 'dark' };
    }
    toggleFilterGroup(filterGroup, ev) {
        filterGroup.visible = !filterGroup.visible;
        if (ev.target.tagName === 'YOO-CHECKBOX') {
            ev.target.checkPressed();
        }
        this.onFilterGroupsChange(filterGroup.visible, filterGroup);
    }
    componentDidLoad() {
        this.isLoading = false;
        mapboxgl.accessToken = 'pk.eyJ1IjoieW9vYmljIiwiYSI6ImNpcTNxaGgwYzAwNjhodm5rdDRmM3JtMmwifQ.Ro3b2vKP5fMMd8ibPKy65A';
        this.initMap();
    }
    componentDidUnload() {
        this.isDestroyed = true;
        if (this.map) {
            this.map.remove();
        }
    }
    initMap() {
        if (this.isDestroyed) {
            return;
        }
        // Basic map setup
        this.map = new mapboxgl.Map({
            container: this.host.querySelector('.map-container'),
            style: 'mapbox://styles/yoobic/ciq7yppji0085cqm7c0np246c',
            center: [this.mapEntry.position.longitude, this.mapEntry.position.latitude],
            maxZoom: this.mapEntry.maxZoom,
            minZoom: this.mapEntry.minZoom,
            zoom: this.mapEntry.zoom
        });
        if (this.mapEntry.showControls) {
            this.addControls();
        }
        this.popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: true
        });
        // Map Event Handling below
        this.map.on('load', () => {
            this.isLoaded = true;
            this.initLanguage();
            this.initMarkers();
            if (this.mapEntry.disableZoom) {
                this.map.scrollZoom.disable();
            }
        });
        this.map.on('mousemove', (event) => {
            this.handleMouseMove(event);
        });
        this.map.on(isCordova() ? 'touchend' : 'click', (event) => {
            this.handleMapClick(event);
        });
    }
    handleMapClick(event) {
        let renderedFeatures = this.map.queryRenderedFeatures(event.point, { layers: this.layers });
        if (renderedFeatures.length) {
            let properties = [];
            renderedFeatures.forEach(feature => {
                // if the clicked feature is not in a cluster
                if (feature.properties.cluster !== true) {
                    properties = this.handleMarkerClick(renderedFeatures, properties);
                }
                else {
                    properties = this.handleClusterClick(event, properties);
                }
            });
            this.selected.emit(properties[0]);
            this.selectedMultiple.emit(properties);
        }
        else {
            if (this.map.getLayer('point')) {
                this.map.setLayoutProperty('point', 'visibility', 'none');
            }
            this.selected.emit(null);
        }
    }
    handleMarkerClick(renderedFeatures, singleMarker) {
        if (this.map.getLayer('point')) {
            this.map.setLayoutProperty('point', 'visibility', 'visible');
        }
        let singlePoint = this.map.getSource('single-point');
        if (singlePoint) {
            singlePoint.setData({
                type: 'Point',
                coordinates: [renderedFeatures[0].properties.longitude, renderedFeatures[0].properties.latitude]
            });
        }
        return singleMarker.concat(renderedFeatures.map(f => f.properties));
    }
    handleClusterClick(event, markerClusterPoints) {
        let pointsInCluster = this.mapEntry.markers.filter(m => {
            // Pixel coordinates relative to map container
            let pointPixels = this.map.project(new mapboxgl.LngLat(m.longitude, m.latitude));
            let pixelDistance = Math.sqrt(Math.pow(event.point.x - pointPixels.x, 2) +
                Math.pow(event.point.y - pointPixels.y, 2));
            return Math.abs(pixelDistance) <= this.clusterRadius;
        });
        return markerClusterPoints.concat(pointsInCluster);
    }
    handleMouseMove(event) {
        let features = this.map.queryRenderedFeatures(event.point, { layers: this.layers });
        this.map.getCanvas().style.cursor = (features && features.length) ? 'pointer' : '';
        if (!features.length) {
            this.popup.remove();
            return;
        }
        let uniqFeatures = uniqBy(features.map(f => f.properties), p => p.id);
        if (uniqFeatures.length > 0 && uniqFeatures[0].cluster !== true) {
            this.popup.setLngLat([uniqFeatures[0].longitude, uniqFeatures[0].latitude]).setHTML(this.getPopupTemplate(uniqFeatures)).addTo(this.map);
        }
    }
    //TODO: how will this be implemented ?
    initLanguage() {
        [].concat(['country-label-lg', 'country-label-md', 'country-label-sm'], ['state-label-lg', 'state-label-md', 'state-label-sm'], ['marine-label-lg-pt', 'marine-label-md-pt', 'marine-label-sm-pt', 'marine-label-lg-ln', 'marine-label-md-ln', 'marine-label-sm-ln'], ['place-city-lg-n', 'place-city-lg-s', 'place-city-md-n', 'place-city-md-s', 'place-city-sm']).forEach(l => {
            this.map.setLayoutProperty(l, 'text-field', '{name_' + this.mapEntry.currentLanguage + '}');
        });
    }
    addControls() {
        this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        this.map.addControl(new mapboxgl.GeolocateControl(), 'bottom-left');
    }
    initMarkers() {
        if (this.isDestroyed) {
            return;
        }
        if (this.mapEntry.markers && this.isLoaded) {
            let originalFilterGroups = this.mapEntry.filterGroups || [];
            this.removeLayers();
            this.layers = [];
            if (this.mapEntry.groupBy) {
                this.filterGroups = generateFilterGroups(this.mapEntry.markers, this.mapEntry.groupBy);
                this.layers = layersFromKeys(this.filterGroups);
            }
            else {
                // if nothing to group by, there will be a single marker's layer
                this.layers.push('markers');
            }
            this.layers = this.layers.slice();
            // Construct the GeoJSON data to feed to the map - get the markers for each layer
            this.addGeoJSONSources();
            // Fit map to markers
            let coords = this.mapEntry.markers.map(m => ([m.longitude, m.latitude]));
            coords = uniqBy(coords, (c) => JSON.stringify(c));
            if (this.mapEntry.fitToMarkers && coords.length > 1) {
                this.fitToMarkers();
            }
            else if (this.mapEntry.fitToMarkers && coords.length === 1) {
                // if only one marker - flyTo its location
                setTimeout(() => {
                    this.flyTo(this.mapEntry.markers[0].longitude, this.mapEntry.markers[0].latitude, 16);
                }, 500);
            }
            // add layers to the map to make markers visible
            if (this.mapEntry.useCluster) {
                this.addClusteredLayers();
            }
            else {
                // not using clusters
                this.addUnClusteredLayers();
            }
            // set original filter-groups
            this.setOriginalFilterGroups(originalFilterGroups);
            if (isAndroid()) {
                this.onResize();
            }
        }
    }
    removeLayers() {
        // re-initialize the map layers
        this.layers.forEach(l => {
            if (this.map.getLayer(l)) {
                this.map.removeLayer(l);
            }
        });
    }
    addGeoJSONSources() {
        this.layers.forEach(layerId => {
            let data = {
                'type': 'FeatureCollection',
                'features': this.mapEntry.markers.filter(m => {
                    if (this.mapEntry.groupBy) {
                        return m[this.mapEntry.groupBy] === layerId;
                    }
                    else {
                        return true;
                    }
                }).map((m) => {
                    return { 'type': 'Feature', 'properties': m, 'geometry': { 'type': 'Point', 'coordinates': [m.longitude, m.latitude] } };
                })
            };
            if (this.map.getSource('data_' + layerId)) {
                this.map.removeSource('data_' + layerId);
            }
            // Add the data source to the map
            this.map.addSource('data_' + layerId, { type: 'geojson', data: data, cluster: this.mapEntry.useCluster, clusterMaxZoom: 20, clusterRadius: this.clusterRadius });
        });
    }
    fitToMarkers() {
        let bounds = new mapboxgl.LngLatBounds(new mapboxgl.LngLat(this.mapEntry.markers[0].longitude, this.mapEntry.markers[0].latitude), new mapboxgl.LngLat(this.mapEntry.markers[1].longitude, this.mapEntry.markers[1].latitude));
        this.mapEntry.markers.forEach(m => {
            bounds.extend(new mapboxgl.LngLat(m.longitude, m.latitude));
        });
        // fit to marker bounds
        if (bounds.getNorth() !== bounds.getSouth()) {
            setTimeout(() => {
                this.map.fitBounds(bounds, { padding: 10 });
            }, 500);
        }
    }
    addClusteredLayers() {
        // Display the earthquake data in three layers, each filtered to a range of count values. Each range gets a different fill color.
        let clusteredLayers = this.layers.map((layerId) => {
            let color = this.getColor(layerId);
            let icon = this.getIcon(layerId);
            // Add layer for unclustered single markers
            this.map.addLayer({
                'id': 'unclustered_' + layerId,
                'type': 'symbol',
                'source': 'data_' + layerId,
                'filter': ['!has', 'point_count'],
                'layout': { 'icon-image': icon }
            });
            // Add cluster layer colors
            this.map.addLayer({
                'id': 'cluster_' + layerId,
                'type': 'circle',
                'source': 'data_' + layerId,
                'paint': { 'circle-color': color, 'circle-radius': 18, 'circle-opacity': 0.7 },
                'filter': ['>=', 'point_count', 0]
            });
            // Add a layer for the clusters' count labels
            this.map.addLayer({
                'id': 'cluster_count_' + layerId,
                'type': 'symbol',
                'source': 'data_' + layerId,
                'paint': { 'text-color': '#FFFFFF' },
                'filter': ['>=', 'point_count', 0],
                'layout': { 'text-field': '{point_count}', 'text-size': 12 }
            });
            // return the newly created layers
            return ['unclustered_' + layerId, 'cluster_' + layerId, 'cluster_count_' + layerId];
        });
        this.layers = flatten(clusteredLayers);
    }
    addUnClusteredLayers() {
        this.layers.forEach(layerId => {
            let config = { 'id': layerId, 'type': this.mapEntry.icon ? 'symbol' : 'circle', 'source': 'data_' + layerId };
            if (this.mapEntry.icon) {
                config.layout = { 'icon-image': this.mapEntry.icon || 'marker' };
            }
            else {
                config.paint = {
                    'circle-radius': this.circleRadius,
                    'circle-color': {
                        'property': 'color', 'type': 'categorical',
                        'stops': [['assertive', this.getColor('rejected')], ['balanced', this.getColor('validated')], ['positive', this.getColor('booked')], ['dark', this.getColor('archived')], ['energized', this.getColor('available')], ['royal', this.getColor('tobevalidated')]]
                    },
                    'circle-opacity': 0.4
                };
            }
            if (this.mapEntry.groupBy) {
                config.filter = ['==', this.mapEntry.groupBy, layerId];
            }
            this.map.addLayer(config);
        });
        // Add as layer as a single point layer if no clustering is used and no icon specified
        if (!this.mapEntry.icon) {
            if (this.map.getSource('single-point')) {
                this.map.removeSource('single-point');
            }
            this.map.addSource('single-point', { 'type': 'geojson', 'data': { 'type': 'FeatureCollection', 'features': [] } });
            if (this.map.getLayer('point')) {
                this.map.removeLayer('point');
            }
            this.map.addLayer({ 'id': 'point', 'source': 'single-point', type: 'circle', 'paint': { 'circle-radius': this.circleRadius, 'circle-color': '#43484D' } });
        }
    }
    setOriginalFilterGroups(originalFilterGroups) {
        this.filterGroups.forEach(filter => {
            let original = originalFilterGroups.find(o => o.value === filter.value);
            if (original) {
                filter.visible = original.visible;
                this.onFilterGroupsChange(original.visible, original);
            }
        });
    }
    getColor(layerId) {
        let color = '#3A3569';
        if (this.mapEntry.legendColors) {
            this.mapEntry.legendColors.forEach(markerColor => {
                if (markerColor.markerStatus === layerId) {
                    color = markerColor.color;
                }
            });
        }
        return color;
    }
    getIcon(layerId) {
        let icon = 'marker';
        if (this.mapEntry.legendColors) {
            this.mapEntry.legendColors.forEach(markerColor => {
                if (this.mapEntry.icon || markerColor.markerStatus === layerId) {
                    let oldColor = this.legendsOld[markerColor.markerStatus];
                    icon = 'marker_' + oldColor;
                }
            });
        }
        return icon;
    }
    getPopupTemplate(properties, collectionName) {
        let retVal = '';
        const MISSIONS_TO_DISPLAY = 8;
        if (collectionName === 'missions') {
            take(properties, MISSIONS_TO_DISPLAY).forEach(p => {
                let status = ' - ' + 'AVAILABlE';
                let validated = p.status !== 'finished' ? '' : ' - ' + (p.validated === true ? 'VALIDATED' : p.validated === false ? 'REJECTED' : 'TOBEVALIDATED');
                retVal += `<div class="popup-title">${p.title || ''}${status}${validated}</div>`;
            });
        }
        else {
            retVal = `<div class="popup-title">${properties[0].title}</div>`;
        }
        retVal += `<p class="popup-subtitle">${properties[0].address || ''}</p>`;
        return retVal;
    }
    onShowDirections(profile) {
        if (mapboxgl && MapboxDirections) {
            if (!this.directions) {
                this.directions = new MapboxDirections.default({
                    accessToken: mapboxgl.accessToken,
                    unit: this.mapEntry.currentLanguage === 'en' ? 'imperial' : 'metric',
                    profile: profile,
                    interactive: false,
                    controls: {
                        inputs: false,
                        instructions: true
                    }
                });
                if (this.map) {
                    this.map.addControl(this.directions, 'top-right');
                    this.directions.setOrigin([this.mapEntry.position.longitude, this.mapEntry.position.latitude]);
                    this.directions.setDestination([this.mapEntry.markers[0].longitude, this.mapEntry.markers[0].latitude]);
                }
            }
            else {
                this.directions.actions.setProfile(profile);
            }
        }
    }
    onFilterGroupsChange(visible, layer) {
        let visibility = visible ? 'visible' : 'none';
        layer.visible = visible;
        if (this.map) {
            if (this.mapEntry.useCluster) {
                this.map.setLayoutProperty('unclustered_' + layer.value, 'visibility', visibility);
                this.map.setLayoutProperty('cluster_' + layer.value, 'visibility', visibility);
                this.map.setLayoutProperty('cluster_count_' + layer.value, 'visibility', visibility);
            }
            else {
                this.map.setLayoutProperty(layer.value, 'visibility', visibility);
            }
        }
        this.filterGroups = this.filterGroups.slice();
        this.filterGroupsChanged.emit(this.mapEntry.filterGroups);
    }
    flyTo(longitude, latitude, zoom) {
        if (this.map) {
            let center = this.map.getCenter();
            let currentZoom = this.map.getZoom();
            if (longitude !== center.lng || latitude !== center.lat || zoom !== currentZoom) {
                this.map.flyTo({ center: { lng: longitude, lat: latitude }, zoom: zoom });
            }
        }
    }
    onResize() {
        this.map.resize();
    }
    render() {
        let legendsNew = getOldCSSClasses();
        let mapStyles = {
            height: '100%',
            width: '100%'
        };
        return (h("div", { "attr-layout": "column", class: "column-container" },
            h("div", { "attr-layout": "row", class: "map-container", style: mapStyles }),
            this.mapEntry.showDirections ? h("yoo-toolbar", { actions: this.directionActions, "show-active": "true" }) : null,
            this.isLoading ? h("yoo-loader", { class: "medium" }) : null,
            !this.mapEntry.hideLegend && this.filterGroups && this.filterGroups.length > 0 ?
                h("nav", { "attr-layout": "column", class: "filter-group" }, this.filterGroups.map((f) => h("div", { class: "filter" },
                    h("yoo-checkbox", { onClick: this.toggleFilterGroup.bind(this, f), text: f.title, class: legendsNew[f.value], state: "checked" }),
                    h("yoo-badge", { class: legendsNew[f.value], value: f.count }))))
                : null,
            this.mapEntry.showDirections ? (this.mapEntry.markers && this.mapEntry.markers.length === 1 ?
                h("div", { class: "marker-info" },
                    h("div", { class: "title" }, this.mapEntry.markers[0].title),
                    h("div", { class: "address" }, this.mapEntry.markers[0].address)) : null) : null));
    }
    static get is() { return "yoo-map-gl"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "filterGroups": { "type": "Any", "attr": "filter-groups", "mutable": true }, "host": { "elementRef": true }, "isLoading": { "state": true }, "mapEntry": { "type": "Any", "attr": "map-entry" } }; }
    static get events() { return [{ "name": "filterGroupsChanged", "method": "filterGroupsChanged", "bubbles": true, "cancelable": true, "composed": true }, { "name": "selected", "method": "selected", "bubbles": true, "cancelable": true, "composed": true }, { "name": "selectedMultiple", "method": "selectedMultiple", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-map-gl:**/"; }
}
