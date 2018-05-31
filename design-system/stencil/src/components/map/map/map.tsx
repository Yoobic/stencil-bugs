import { Component, Prop, State, Event, EventEmitter, Element, Method, Listen } from '@stencil/core';
import { IMapEntry, IFilterGroup, IPosition, IMarker, IMarkerColor } from '@shared/interfaces';

import mapboxgl from 'mapbox-gl';

@Component({
    tag: 'yoo-map',
    styleUrl: 'map.scss',
    scoped: true
})
export class YooMapComponent {

    @Prop() markers: IMarker[];
    @Prop() useCluster: boolean = false;
    @Prop() currentLanguage: string;
    @Prop() position: IPosition = {longitude: 2.3522220, latitude: 48.856614};
    @Prop() minZoom: number;
    @Prop() maxZoom: number;
    // @Prop({mutable: true}) getPopupTemplate: any;
    @Prop() groupBy: string;
    @Prop() hideLegend: boolean = false;
    @Prop() filterGroups: IFilterGroup[] = [];
    @Prop() legendColors: IMarkerColor[] = [
            { markerStatus: 'available', color: '#F2C83A'},
            { markerStatus: 'booked', color: '#1C76FC'},
            { markerStatus: 'validated', color: '#07ccc0'},
            { markerStatus: 'rejected', color: '#ef6e7f'},
            { markerStatus: 'tobevalidated', color: '#6A61FF'},
            { markerStatus: 'archived', color: '#3A3569'}
        ];
    @Prop() fitToMarkers: boolean = true;
    @Prop() showControls: boolean = true;
    @Prop() showDirections: boolean = false;
    @Prop() disableZoom: boolean = false;
    @Prop() icon: string;
    @Prop() mapEntry: IMapEntry = {};

    @Event() selectedParent: EventEmitter<IMarker>;
    @Event() selectedMultipleParent: EventEmitter<IMarker[]>;
    @Event() filterGroupsChangedParent: EventEmitter<IFilterGroup[]>;

    @State() isChinese: boolean = false;
    @Prop() zoom: number = this.isChinese ? 6 : 12; //Prop is declared here as it relies on isChinese state

     @Element() host: HTMLStencilElement;

    @Listen('selected')
    onSelected(event: CustomEvent) {
        this.selectedParent.emit(event.detail);
    }

    @Listen('selectedMultiple')
    onSelectedMultiple(event: CustomEvent) {
        this.selectedMultipleParent.emit(event.detail);
    }

    @Listen('filterGroupsChanged')
    onFilterGroupsChanged(event: CustomEvent) {
        this.filterGroupsChangedParent.emit(event.detail);
    }

    componentWillLoad() {
        if (this.currentLanguage === 'chinese') {
            this.isChinese = true;
        }
        this.populateMapEntry();
    }

    @Method()
    setProps(mapEntry: IMapEntry) {
        // Needs to be tested
        this.mapEntry = Object.assign(this.mapEntry, mapEntry);
    }

    isEmpty(object: any): boolean {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    populateMapEntry() {
        if (this.isEmpty(this.mapEntry)) {
            this.mapEntry.markers =  this.markers;
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

    renderMapGL(): JSX.Element {
        return (
            <yoo-map-gl mapEntry={this.mapEntry}></yoo-map-gl>
        );
    }

    renderMapJS(): JSX.Element {
        return (
            <yoo-map-js mapEntry={this.mapEntry}></yoo-map-js>
        );
    }

    renderAMap(): JSX.Element {
        return (
            <yoo-amap mapEntry={this.mapEntry}></yoo-amap>
        );
    }

    render(): JSX.Element {
        return (
            this.isChinese ? this.renderAMap() : mapboxgl.supported() ? this.renderMapGL() : this.renderMapJS()
        );
    }
}