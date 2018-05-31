import { Component, Prop, EventEmitter, Event, Element, Watch, Method, State } from '@stencil/core';
import { debounceEvent, getNextValueInArray } from '../../../utils/helpers';
import { getRenderer } from './grid-renderers';
import { IGridSearch, CardType, EntityType, IEntityAction, IEntity, IColumnDefinition } from '@shared/interfaces';
import agGrid from 'ag-grid/dist/ag-grid.min.noStyle';
import { findIndex, isEqual, omit, range } from 'lodash-es';
import { services } from '../../../services';
//import { Grid, GridOptions, GridApi } from 'ag-grid';
//import 'ag-grid-enterprise';
// import { LicenseManager } from 'ag-grid-enterprise/main';
// LicenseManager.setLicenseKey('Yoobic_Yoobic_1Devs17_October_2018__MTUzOTczMDgwMDAwMA==a9a2ef613a2a0df09373cfc61f65967e');
@Component({
    tag: 'yoo-grid',
    styleUrl: 'grid.scss',
    scoped: true
})

export class YooGridComponent {

    protected static componentCounter: number = 0;
    @Prop() direction: 'vertical' | 'horizontal';
    @Prop() items: Array<IEntity> = [];
    @Prop() initialSelection: Array<IEntity>;
    @Prop() isLocal: boolean = false;
    @Prop() columnDefs: Array<IColumnDefinition> = [];
    @Prop() total: number = 0;
    @Prop() looseCount: boolean = false;
    @Prop() emptyState: string;
    @Prop({ mutable: true }) displayType: CardType;
    @Prop() entityType: EntityType;
    @Prop() hideHeader: boolean;
    @Prop() hideFooter: boolean;
    @Prop() displayModes: Array<CardType>;
    @Prop() showFilters: boolean = false;
    @Prop() showFiltersSimple: boolean = true;
    @Prop() showCreate: boolean = true;
    @Prop({ mutable: true }) pageSize: number = 20;
    @Prop({ mutable: true }) type: 'grid' | 'card' | 'tree' = 'card';
    @Prop() headerFn?: (item, index, records) => string;
    @Prop() isLoading: boolean;
    @Prop() keepSelection: boolean;
    @Prop() multiple: boolean = false;
    @Prop() useTranslate: boolean;

    @Prop() icons: Array<IEntityAction>;
    @Prop() topActions: Array<IEntityAction>;
    @Prop() bottomActions: Array<IEntityAction>;
    @Prop() secondaryActions: Array<IEntityAction>;

    @State() selection: Array<any>;
    @State() iconDisplayNext: string = 'yo-grid-view';

    @Event() fetchData: EventEmitter<IGridSearch>;
    @Event() select: EventEmitter<Array<IEntity>>;
    @Event() searchInputFocused: EventEmitter<boolean>;

    @Element() protected host: HTMLElement;

    protected currentPage: number = 0;
    protected searchText: string;
    protected gridOptions: agGrid.GridOptions;
    protected slidesOptions;
    protected get scroll(): HTMLYooSlimScrollElement {
        if (!this._scroll) {
            this._scroll = this.host.querySelector('yoo-slim-scroll');
        }
        return this._scroll;
    }
    private _scroll: HTMLYooSlimScrollElement;

    private grid: agGrid.Grid;
    private gridId: string;

    constructor() {
        YooGridComponent.componentCounter += 1;
        this.gridId = 'ag-grid-' + YooGridComponent.componentCounter;
        this.slidesOptions = {
            slidesPerView: 1.1,
            spaceBetween: 10,
            freeMode: true
        };
    }

    componentDidLoad() {
        this.fetchData = debounceEvent(this.fetchData, 500);
        this.selection = [].concat(this.initialSelection || []);
        if (!this.items || !this.isLocal) {
            this.onFetchData();
        }
        this.onColumnsChanged();
        this.updateSlides();
    }

    componentDidUpdate() {
        this.updateSlides();
    }

    updateSlides() {
        setTimeout(() => {
            let slides = this.host.querySelector('ion-slides');
            if (slides) {
                slides.update();
            }
        }, 300);
    }

    @Watch('items')
    onDataChanged(newItems: Array<IEntity>, oldItems: Array<IEntity>) {
        if (this.type === 'grid') {
            if (!this.grid) {
                this.gridOptions.rowData = newItems;
                this.grid = new agGrid.Grid(this.host.querySelector('#' + this.gridId), this.gridOptions);
            } else {
                this.gridOptions.api.setRowData(newItems);
            }
        }
    }

    @Watch('columnDefs')
    onColumnsChanged() {
        let columnDefs = this.columnDefs.map(c => ({
            ...omit(c, ['cellRendererFramework', 'type']),
            cellRenderer: getRenderer(c.cellRendererType)
        }));

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

    onInfiniteScroll(ev: CustomEvent) {
        // if (this.currentPage < (this.total / this.pageSize) || this.looseCount) {
        this.currentPage += 1;
        this.fetchData.emit({
            search: this.searchText,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            appendData: true,
            infiniteScroll: ev.target as any
        });
        // } else if (ev && ev.detail && ev.detail.complete) {
        //     ev.detail.complete();
        // }
    }

    @Method()
    pullToRefresh(refresher) {
        this.currentPage = 0;
        this.fetchData.emit({
            search: this.searchText,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            appendData: false,
            infiniteScroll: refresher
        });
    }

    @Method()
    closeItemsSliding() {
        let itemsSliding = this.host.querySelectorAll('ion-item-sliding');
        [].forEach.call(itemsSliding, (itemSliding) => itemSliding.close());
    }

    onItemSelect(ev: MouseEvent, item) {
        let index = this.selection.indexOf(item);
        if (this.multiple) {
            if (index >= 0) {
                this.selection.splice(index, 1);
                this.selection = [...this.selection];
            } else {
                this.selection = [...this.selection, item];
            }
        } else {
            if (index >= 0 && this.keepSelection) {
                this.selection = [];
            } else {
                this.selection = [item];
            }
        }
        this.select.emit(this.multiple ? this.selection : (this.selection.length > 0 ? this.selection[0] : null));
    }

    isSelected(item) {
        if (this.keepSelection) {
            let selection = [].concat(this.selection);
            let index = findIndex(selection, (s) => isEqual(item, s));
            return index >= 0;
        }
        return false;
    }

    onSearchInputChange(ev: CustomEvent) {
        this.searchText = ev.detail;
        this.onFetchData();
    }

    onSearchInputFocused() {
        this.searchInputFocused.emit(true);
    }

    onPageChanged(ev: CustomEvent) {
        this.currentPage = ev.detail;
        this.onFetchData();
    }

    onItemsPerPageChanged(ev: CustomEvent) {
        this.pageSize = ev.detail;
        this.onFetchData();
    }

    onChangeDisplay() {
        if (this.displayModes && this.displayModes.length > 1) {
            this.displayType = getNextValueInArray<CardType>(this.displayModes, this.displayType);
            let nextDisplayType = getNextValueInArray<CardType>(this.displayModes, this.displayType);
            switch (nextDisplayType) {
                case 'card-list':
                    this.iconDisplayNext = 'yo-list-view';
                    break;
                case 'card-cell':
                    this.iconDisplayNext = 'yo-grid-view';
                    break;
                default:
                    this.iconDisplayNext = 'yo-settings';
            }
        }
    }

    onToggleMode() {
        switch (this.type) {
            case 'grid':
                this.type = 'card';
                break;

            case 'card':
                this.type = 'grid';
                break;
        }
    }

    renderHeader() {
        return (
            this.hideHeader ? '' :
                <yoo-toolbar class="top">
                    {/* {this.showFilters ?
                        <yoo-button class="link-transparent squared" text="Filter and Order"></yoo-button> :
                        ''
                    } */}
                    {this.showFilters || this.showFiltersSimple ?
                        <yoo-form-input class="search" attr-flex icon-prefix="yo-search" placeholder={services.translate.get('SEARCH')} onInputChanged={(ev) => this.onSearchInputChange(ev)} onInputFocused={() => this.onSearchInputFocused()}></yoo-form-input> :
                        <span attr-flex></span>
                    }
                    {/*
                    {this.showCreate ?
                        <yoo-button class="icon-only accent squared" icon="yo-plus"></yoo-button> :
                        ''} */}
                </yoo-toolbar>
        );
    }

    renderDisplayMode(): JSX.Element {
        return (
            this.displayModes && this.displayModes.length > 0 && this.items && this.items.length > 0 ?
                <div class="toggle-container">
                    <i class={this.iconDisplayNext} onClick={() => this.onChangeDisplay()}></i>
                </div>
                : null
        );
    }

    renderFooter() {
        return this.hideFooter ? '' :
            <yoo-toolbar class="bottom">
                <yoo-pagination attr-flex total-items={this.total} current-page={this.currentPage} items-per-page={this.pageSize} show-total="true" max-page-size="7" class="dark"
                    onPageChanged={(ev) => this.onPageChanged(ev)}
                    onItemsPerPageChanged={(ev) => this.onItemsPerPageChanged(ev)}></yoo-pagination>
            </yoo-toolbar>;
    }

    renderBody() {
        if (this.type === 'grid') {
            return <div id={this.gridId} attr-flex class="grid-container ag-theme-balham"></div>;
        } else if (this.displayType === 'card-cell' && this.items && (this.items.length > 0) && this.direction !== 'horizontal') {
            if (this.headerFn) {
                // compute headers with the headerFn, if null then no header to add
                let headers = this.items.map((item, index, records) => {
                    return {text: this.headerFn(item, index, records), index: index};
                }).filter(i => i.text);
                return [
                    headers.map((header, index, array) => {
                        let end = index === array.length - 1 ? this.items.length : array[index + 1].index;
                        return [
                            <ion-item-divider>
                                <span class="divider-text">{header.text}</span>
                            </ion-item-divider>,
                            <div class="grid-cell">
                                {this.items.slice(header.index, end).map(item => this.renderEntity(item))}
                            </div>
                        ];
                    }),
                    this.renderInfiniteScroll()
                ];
            } else {
                return [
                    <div class="grid-cell">
                        {this.items.map(item => this.renderEntity(item))}
                    </div>,
                    this.renderInfiniteScroll()
                ];
            }
        } else if (this.items && (this.items.length > 0) && this.direction === 'horizontal') {
            return [
                <ion-slides pager={false} class={'body-container ' + this.displayType} options={this.slidesOptions}>
                    {
                        this.items.map(item =>
                            <ion-slide >
                                <div class="slide">
                                    {this.renderEntity(item)}
                                </div>
                            </ion-slide>
                        )
                    }
                </ion-slides>
            ];
        } else if (this.items && (this.items.length > 0) && this.direction !== 'horizontal' && this.headerFn) {
            // return [
            //     <ion-virtual-scroll items={this.items} headerFn={this.headerFn} class={'body-container ' + this.displayType} approxHeaderHeight={30} approxItemHeight={44} renderItem={(item) => {
            //         return (
            //             <ion-item lines="none">
            //                 {this.renderEntity(item)}
            //             </ion-item>);
            //     }}
            //         renderHeader={(item) => {
            //             return <ion-item-divider color="light"><span innerHTML={item}></span></ion-item-divider>;
            //         }}>
            //     </ion-virtual-scroll>,
            //     this.renderInfiniteScroll()
            // ];
            let headers = this.items.map((item, index, records) => {
                return {text: this.headerFn(item, index, records), index: index};
            }).filter(i => i.text);
            return [
                <ion-list>
                    {headers.map((header, index, array) => {
                        let end = index === array.length - 1 ? this.items.length : array[index + 1].index;
                        return [
                            <ion-item-divider>
                                <span>{header.text}</span>
                            </ion-item-divider>,
                            this.secondaryActions && this.secondaryActions.length ?
                                this.items.slice(header.index, end).map(item =>
                                    this.renderItemSliding(item)
                                )
                            : (this.items.slice(header.index, end).map(item =>
                                <ion-item lines="none">
                                    {this.renderEntity(item)}
                                </ion-item>
                            ))
                        ];
                    })}
                </ion-list>,
                this.renderInfiniteScroll()
            ];
        } else if (this.items && (this.items.length > 0) && this.direction !== 'horizontal' && !this.headerFn) {
            return [
                <ion-list class={'body-container ' + this.displayType}>
                    {this.secondaryActions && this.secondaryActions.length ?
                        this.items.map(item =>
                            this.renderItemSliding(item)
                        ) :
                        (this.items.map(item =>
                            <ion-item lines="none">
                                {this.renderEntity(item)}
                            </ion-item>
                        ))
                    }
                </ion-list>,
                this.renderInfiniteScroll()
            ];
        } else if (this.isLoading) {
            return this.renderPlaceholders();
        } else {
            return <yoo-empty-state class="absolute" attr-flex attr-layout="column" attr-layout-align="center center" type={this.emptyState} />;
        }
    }

    renderItemSliding(item: IEntity) {
        return (
            <ion-item-sliding>
                <ion-item lines="none">
                    {this.renderEntity(item)}
                </ion-item>
                <ion-item-options>
                    {this.secondaryActions.filter(a => a.isVisible(item)).map(action =>
                        <button ion-button onClick={() => action.handler(item)} class={action.cssClass(item)}>
                            {action.icon ? <i class={action.icon(item)}></i> : null}
                            {action.text ? <span>{action.text(item)}</span> : null}
                        </button>
                    )}
                </ion-item-options>
            </ion-item-sliding>
        );
    }

    renderEntity(item: IEntity) {
        return <yoo-entity
            useTranslate={this.useTranslate}
            onClick={(ev) => this.onItemSelect(ev, item)}
            class={(this.isSelected(item) ? 'selected ' : '') + (item.isChild ? 'child' : '')}
            item={item}
            displayType={this.displayType} entityType={this.entityType}
            icons={this.icons} topActions={this.topActions}
            bottomActions={this.bottomActions} secondaryActions={this.secondaryActions}
        ></yoo-entity>;
    }

    renderInfiniteScroll() {
        return !this.isLocal ?
            <ion-infinite-scroll onIonInfinite={ev => this.onInfiniteScroll(ev)} >
                <ion-infinite-scroll-content loadingSpinner="dots"></ion-infinite-scroll-content>
            </ion-infinite-scroll> : null;
    }

    renderPlaceholders() {
        if (this.direction === 'horizontal') {
            return <ion-slides pager={false} class={'body-container ' + this.displayType} options={this.slidesOptions}>
                {this.getPlaceholderContent(true)}
            </ion-slides>;
        } else {
            return (<ion-list class={'body-container ' + this.displayType}>
                {this.getPlaceholderContent()}
            </ion-list>);
        }
    }

    getPlaceholderContent(useSlide: boolean = false) {
        const Tag: any = useSlide ? 'ion-slide' : 'ion-item';
        let placeholders: number[];
        if (this.displayType === 'card-list') {
            placeholders = range(0, 20);
        } else {
            placeholders = range(0, 3);
        }

        return placeholders.map(() =>
            <Tag lines="none">
                <yoo-card-placeholder displayType={this.displayType} entityType={this.entityType} ></yoo-card-placeholder>
            </Tag>
        );
    }

    render() {
        return (
            <div class={this.direction === 'horizontal' ? 'container-horizontal' : 'container'} attr-layout="column" >
                {this.renderHeader()}
                {this.renderDisplayMode()}
                {this.renderBody()}
                {this.renderFooter()}
            </div>
        );
    }
}