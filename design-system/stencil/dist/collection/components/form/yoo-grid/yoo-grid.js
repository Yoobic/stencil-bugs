import { debounceEvent } from '../../../utils/helpers';
import { getRenderer } from './grid-renderers';
import agGrid from 'ag-grid/dist/ag-grid.min.noStyle';
//import '@ionic/core';
//import { Grid, GridOptions, GridApi } from 'ag-grid';
//import 'ag-grid-enterprise';
// import { LicenseManager } from 'ag-grid-enterprise/main';
// LicenseManager.setLicenseKey('Yoobic_Yoobic_1Devs17_October_2018__MTUzOTczMDgwMDAwMA==a9a2ef613a2a0df09373cfc61f65967e');
import { omit } from 'lodash-es';
export class YooGridComponent {
    constructor() {
        this.items = [];
        this.columnDefs = [];
        this.total = 0;
        this.pageSize = 10;
        this.canToggleDisplay = true;
        this.showFilters = false;
        this.showFiltersSimple = true;
        this.showCreate = true;
        this.type = 'card';
        this.currentPage = 0;
        YooGridComponent.componentCounter += 1;
        this.gridId = 'ag-grid-' + YooGridComponent.componentCounter;
    }
    get scroll() {
        if (!this._scroll) {
            this._scroll = this.host.querySelector('yoo-slim-scroll');
        }
        return this._scroll;
    }
    componentDidLoad() {
        this.fetchData = debounceEvent(this.fetchData, 500);
        this.onFetchData();
        this.onColumnsChanged();
    }
    componentDidUnload() {
    }
    onDataChanged(newItems, oldItems) {
        if (this.type === 'grid') {
            if (!this.grid) {
                this.gridOptions.rowData = newItems;
                this.grid = new agGrid.Grid(this.host.querySelector('#' + this.gridId), this.gridOptions);
            }
            else {
                this.gridOptions.api.setRowData(newItems);
            }
        }
    }
    onColumnsChanged() {
        let columnDefs = this.columnDefs.map(c => (Object.assign({}, omit(c, ['cellRendererFramework', 'type']), { cellRenderer: getRenderer(c.cellRendererType) })));
        this.gridOptions = {
            rowHeight: 52,
            //rowStyle: { 'line-height': '32px' },
            headerHeight: 50,
            enableColResize: true,
            enableServerSideSorting: true,
            rowDeselection: true,
            maxConcurrentDatasourceRequests: 2,
            cacheOverflowSize: 2,
            maxBlocksInCache: 2,
            infiniteInitialRowCount: 1,
            suppressPropertyNamesCheck: true,
            animateRows: true,
            showToolPanel: false,
            toolPanelSuppressSideButtons: true,
            suppressContextMenu: true,
            dateComponent: null,
            columnDefs: columnDefs,
            onGridReady: () => {
                //this.gridOptions.api.sizeColumnsToFit();
            }
        };
    }
    onFetchData() {
        if (this.scroll) {
            this.scroll.scrollToTop(100);
        }
        this.fetchData.emit({
            search: this.searchText,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            appendData: false
        });
    }
    onInfiniteScroll(ev) {
        if (this.currentPage < (this.total / this.pageSize)) {
            this.currentPage += 1;
            this.fetchData.emit({
                search: this.searchText,
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                appendData: true,
                infiniteScroll: ev.detail
            });
        }
        else {
            ev.detail.complete();
        }
    }
    onPullToRefresh(ev) {
        this.currentPage = 0;
        this.fetchData.emit({
            search: this.searchText,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            appendData: false,
            infiniteScroll: ev.detail
        });
    }
    onSearchInputChange(ev) {
        this.searchText = ev.detail;
        this.onFetchData();
    }
    onPageChanged(ev) {
        this.currentPage = ev.detail;
        this.onFetchData();
    }
    onItemsPerPageChanged(ev) {
        this.pageSize = ev.detail;
        this.onFetchData();
    }
    onToggleMode(ev) {
        switch (this.type) {
            case 'grid':
                this.type = 'card';
                break;
            case 'list':
                this.type = 'grid';
                break;
            case 'card':
                this.type = 'list';
                break;
        }
    }
    renderHeader() {
        return (this.hideHeader ? '' :
            h("yoo-toolbar", { class: "top" },
                this.showFilters ?
                    h("yoo-button", { class: "link-transparent", text: "Filter and Order" }) :
                    '',
                this.showFilters || this.showFiltersSimple ?
                    h("yoo-form-input", { "attr-flex": true, "icon-suffix": "yo-google", onInputChanged: (ev) => this.onSearchInputChange(ev) }) :
                    h("span", { "attr-flex": true }),
                this.canToggleDisplay ?
                    h("yoo-button", { class: "icon-only link-transparent", icon: "yo-card", onClick: () => this.onToggleMode(this) }) :
                    '',
                this.showCreate ?
                    h("yoo-button", { class: "icon-only accent", icon: "yo-plus" }) :
                    ''));
    }
    renderFooter() {
        return this.hideFooter ? '' :
            h("yoo-toolbar", { class: "bottom" },
                h("yoo-pagination", { "attr-flex": true, "total-items": this.total, "current-page": this.currentPage, "items-per-page": this.pageSize, "show-total": "true", "max-page-size": "7", class: "dark", onPageChanged: (ev) => this.onPageChanged(ev), onItemsPerPageChanged: (ev) => this.onItemsPerPageChanged(ev) }));
    }
    renderBody() {
        if (this.type === 'grid') {
            return h("div", { id: this.gridId, "attr-flex": true, class: "grid-container ag-theme-balham" });
        }
        else if (this.items && (this.items.length > 0)) {
            return [
                h("ion-list", { class: 'body-container ' + this.type }, this.items.map(item => h("ion-item", null,
                    h("yoo-entity", { item: item, mode: this.type, displayType: this.displayType })))),
                h("ion-infinite-scroll", { onIonInfinite: ev => this.onInfiniteScroll(ev) },
                    h("ion-infinite-scroll-content", { loadingSpinner: "dots" }))
            ];
        }
        else if (this.items && (this.items.length < 0)) {
            return h("div", { "attr-flex": true, class: 'body-container ' + this.type, "attr-layout": "column", "attr-layout-align": "center center" },
                h("yoo-slim-scroll", { "attr-flex": true, "attr-layout": "column" },
                    h("div", { slot: "scroll-slot", "attr-flex": true, "attr-layout": "row", class: this.type === 'card' ? 'card-container' : '' }, this.items.map(item => h("yoo-entity", { item: item, mode: this.type, displayType: this.displayType })))));
        }
        else {
            return h("yoo-empty-state", { "attr-flex": true, "attr-layout": "column", "attr-layout-align": "center center" });
        }
    }
    render() {
        return (h("div", { class: "container", "attr-layout": "column" },
            this.renderHeader(),
            this.renderBody(),
            this.renderFooter()));
    }
    static get is() { return "yoo-grid"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "canToggleDisplay": { "type": Boolean, "attr": "can-toggle-display" }, "columnDefs": { "type": "Any", "attr": "column-defs", "watchCallbacks": ["onColumnsChanged"] }, "displayType": { "type": String, "attr": "display-type" }, "hideFooter": { "type": Boolean, "attr": "hide-footer" }, "hideHeader": { "type": Boolean, "attr": "hide-header" }, "host": { "elementRef": true }, "items": { "type": "Any", "attr": "items", "watchCallbacks": ["onDataChanged"] }, "onPullToRefresh": { "method": true }, "pageSize": { "type": Number, "attr": "page-size", "mutable": true }, "showCreate": { "type": Boolean, "attr": "show-create" }, "showFilters": { "type": Boolean, "attr": "show-filters" }, "showFiltersSimple": { "type": Boolean, "attr": "show-filters-simple" }, "total": { "type": Number, "attr": "total" }, "type": { "type": String, "attr": "type", "mutable": true } }; }
    static get events() { return [{ "name": "fetchData", "method": "fetchData", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-grid:**/"; }
}
YooGridComponent.componentCounter = 0;
