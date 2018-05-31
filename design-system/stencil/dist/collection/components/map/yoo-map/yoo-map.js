import mapboxgl from 'mapbox-gl';
export class YooMapComponent {
    constructor() {
        this.useCluster = false;
        this.position = { longitude: 2.3522220, latitude: 48.856614 };
        this.hideLegend = false;
        this.filterGroups = [];
        this.legendColors = [
            { markerStatus: 'available', color: '#F2C83A' },
            { markerStatus: 'booked', color: '#1C76FC' },
            { markerStatus: 'validated', color: '#07ccc0' },
            { markerStatus: 'rejected', color: '#ef6e7f' },
            { markerStatus: 'tobevalidated', color: '#6A61FF' },
            { markerStatus: 'archived', color: '#3A3569' }
        ];
        this.fitToMarkers = true;
        this.showControls = true;
        this.showDirections = false;
        this.disableZoom = false;
        this.mapEntry = {};
        this.isChinese = false;
        this.zoom = this.isChinese ? 6 : 12; //Prop is declared here as it relies on isChinese state
    }
    onSelected(event) {
        this.selectedParent.emit(event.detail);
    }
    onSelectedMultiple(event) {
        this.selectedMultipleParent.emit(event.detail);
    }
    onFilterGroupsChanged(event) {
        this.filterGroupsChangedParent.emit(event.detail);
    }
    componentWillLoad() {
        if (this.currentLanguage === 'chinese') {
            this.isChinese = true;
        }
        this.populateMapEntry();
    }
    setProps(mapEntry) {
        // Needs to be tested
        this.mapEntry = Object.assign(this.mapEntry, mapEntry);
    }
    isEmpty(object) {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    populateMapEntry() {
        if (this.isEmpty(this.mapEntry)) {
            this.mapEntry.markers = this.markers;
            this.mapEntry.useCluster = this.useCluster;
            this.mapEntry.currentLanguage = this.currentLanguage;
            this.mapEntry.position = this.position;
            this.mapEntry.zoom = this.zoom;
            this.mapEntry.minZoom = this.minZoom;
            this.mapEntry.maxZoom = this.maxZoom;
            // this.getPopupTemplate = mapEntry.getPopupTemplate;
            this.mapEntry.groupBy = this.groupBy;
            this.mapEntry.hideLegend = this.hideLegend;
            this.mapEntry.filterGroups = this.filterGroups;
            this.mapEntry.legendColors = this.legendColors;
            this.mapEntry.fitToMarkers = this.fitToMarkers;
            this.mapEntry.showControls = this.showControls;
            this.mapEntry.showDirections = this.showDirections;
            this.mapEntry.disableZoom = this.disableZoom;
            this.mapEntry.icon = this.icon;
        }
    }
    renderMapGL() {
        return (h("yoo-map-gl", { mapEntry: this.mapEntry }));
    }
    renderMapJS() {
        return (h("yoo-map-js", { mapEntry: this.mapEntry }));
    }
    renderAMap() {
        return (h("yoo-amap", { mapEntry: this.mapEntry }));
    }
    render() {
        return (this.isChinese ? this.renderAMap() : mapboxgl.supported() ? this.renderMapGL() : this.renderMapJS());
    }
    static get is() { return "yoo-map"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "currentLanguage": { "type": String, "attr": "current-language" }, "disableZoom": { "type": Boolean, "attr": "disable-zoom" }, "filterGroups": { "type": "Any", "attr": "filter-groups" }, "fitToMarkers": { "type": Boolean, "attr": "fit-to-markers" }, "groupBy": { "type": String, "attr": "group-by" }, "hideLegend": { "type": Boolean, "attr": "hide-legend" }, "host": { "elementRef": true }, "icon": { "type": String, "attr": "icon" }, "isChinese": { "state": true }, "legendColors": { "type": "Any", "attr": "legend-colors" }, "mapEntry": { "type": "Any", "attr": "map-entry" }, "markers": { "type": "Any", "attr": "markers" }, "maxZoom": { "type": Number, "attr": "max-zoom" }, "minZoom": { "type": Number, "attr": "min-zoom" }, "position": { "type": "Any", "attr": "position" }, "setProps": { "method": true }, "showControls": { "type": Boolean, "attr": "show-controls" }, "showDirections": { "type": Boolean, "attr": "show-directions" }, "useCluster": { "type": Boolean, "attr": "use-cluster" }, "zoom": { "type": Number, "attr": "zoom" } }; }
    static get events() { return [{ "name": "selectedParent", "method": "selectedParent", "bubbles": true, "cancelable": true, "composed": true }, { "name": "selectedMultipleParent", "method": "selectedMultipleParent", "bubbles": true, "cancelable": true, "composed": true }, { "name": "filterGroupsChangedParent", "method": "filterGroupsChangedParent", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get listeners() { return [{ "name": "selected", "method": "onSelected" }, { "name": "selectedMultiple", "method": "onSelectedMultiple" }, { "name": "filterGroupsChanged", "method": "onFilterGroupsChanged" }]; }
    static get style() { return "/**style-placeholder:yoo-map:**/"; }
}
