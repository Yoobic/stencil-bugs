import { Component, Prop, Event, EventEmitter, State, Element } from '@stencil/core';
import { getElementDimensions } from '../../../utils/helpers';

const ITEM_WIDTH: number = 40;
const ARROWS_SIZE: number = ITEM_WIDTH * 2;
const DESCRIPTION_LENGTH: number = 310; // need to adjust for translation
const TRUNCATION = '…';
const MIN_TRUNCATION_PAGER = 5;
@Component({
    tag: 'yoo-pagination',
    styleUrl: 'pagination.scss',
    scoped: true
})

export class YooPaginationComponent {

    @Prop() totalItems: number;
    @Prop() itemsPerPage: number;
    @Prop() currentPage: number = 0; // index number, i.e currentPage=0 will be page 1
    @Prop() showTotal: boolean;
    @Prop() maxPagerSize: number = 11;

    @Event({ bubbles: true, composed: true }) pageChanged: EventEmitter<any>;
    @Event() itemsPerPageChanged: EventEmitter<number>;

    @State() pagerSize: number; // including ellipsis
    @State() totalVisible: boolean;

     @Element() host: HTMLStencilElement;

    get currentPageDisplay() {
        return this.currentPage + 1;
    }

    get totalPages() {
        return this.itemsPerPage > 0 ? Math.ceil(this.totalItems / this.itemsPerPage) : 0;
    }

    isLastPage(page) {
        return page >= this.totalPages;
    }

    isFirstPage(page) {
        return page === 1;
    }

    hasNext() {
        return !this.isLastPage(this.currentPageDisplay);
    }

    hasPrevious() {
        return !this.isFirstPage(this.currentPageDisplay);
    }

    isTotalVisible(width): boolean {
        const minWidthWithDescription: number = DESCRIPTION_LENGTH + ARROWS_SIZE + this.getPagerSize(width) * ITEM_WIDTH;
        return this.showTotal && width > minWidthWithDescription;
    }

    getPagerSize(width: number): number {
        width -= ARROWS_SIZE;
        let availableItems = Math.floor(width / ITEM_WIDTH);
        return Math.min(this.totalPages, Math.max(0, availableItems), this.maxPagerSize);
    }

    getDisplayValue(position: number): string | number {
        // no truncation required. position = page number.
        if (this.totalPages <= this.pagerSize) {
            return position;
        }
        let leftTruncationPos = this.currentPageDisplay >= this.pagerSize - 1 ? 2 : undefined;
        let rightTruncationPos = this.totalPages - this.currentPageDisplay + 1 >= this.pagerSize - 1 ? this.pagerSize - 1 : undefined;

        let currentPagePosition = Math.ceil(this.pagerSize / 2);

        if (this.pagerSize < MIN_TRUNCATION_PAGER) {
            if (leftTruncationPos && !rightTruncationPos) {
                currentPagePosition = this.pagerSize - this.totalPages + this.currentPageDisplay;
            }
            if (!leftTruncationPos && rightTruncationPos) {
                currentPagePosition = this.currentPageDisplay;
            }
            return this.currentPageDisplay - currentPagePosition + position;
        }

        // Both truncations
        if (rightTruncationPos && leftTruncationPos) {
            if (position === leftTruncationPos || position === rightTruncationPos) {
                return TRUNCATION;
            }
            if (position === 1) {
                return position;
            }
            if (position === this.pagerSize) {
                return this.totalPages;
            }
            return this.currentPageDisplay - currentPagePosition + position;
        }
        // only right or left truncation
        let truncationPosition = leftTruncationPos || rightTruncationPos;
        if (position < truncationPosition) { return position; }
        if (position > truncationPosition) { return this.totalPages - this.pagerSize + position; }
        return TRUNCATION;
    }

    moveToPage(page: number | string): void {
        let newPage = this.currentPageDisplay;
        if (page === 'right' && this.hasNext()) {
            newPage++;
        }
        if (page === 'left' && this.hasPrevious()) {
            newPage--;
        }
        if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
            newPage = page;
        }
        if (this.pageChanged && this.currentPageDisplay !== newPage) {
            this.pageChanged.emit(newPage - 1);
        }
    }

    updateVisibility(): void {
        let width = getElementDimensions(this.host).width;
        this.pagerSize = this.getPagerSize(width);
        this.totalVisible = this.isTotalVisible(width);
    }

    updateItemsPerPage(newItemsPerPage: number) {
        this.itemsPerPageChanged.emit(newItemsPerPage);
    }

    componentDidLoad(): void {
        this.updateVisibility();
        parent.addEventListener('resize', () => this.updateVisibility()); //This implementaion must be used otherwise the host element will become undefined on page resize.
    }

    componentDidUpdate() {
        this.updateVisibility();
    }

    // rendering functions
    renderTotalDescription(): JSX.Element {
        if (this.totalVisible) {
            return (
                <div class="total-container" attr-layout="row">
                    <span class="text-container">Number of items per page:</span>
                    <yoo-context-menu>
                            <div slot="trigger" class="text-container">
                                {' ' + this.itemsPerPage + ' '}<span class="yo-arrow-dropdown"></span>
                            </div>
                            <div class="dropdown-entry" onClick={() => this.updateItemsPerPage(10)}>10</div>
                            <div class="dropdown-entry" onClick={() => this.updateItemsPerPage(25)}>25</div>
                            <div class="dropdown-entry" onClick={() => this.updateItemsPerPage(100)}>100</div>
                            <div class="dropdown-entry" onClick={() => this.updateItemsPerPage(500)}>500</div>
                    </yoo-context-menu>
                    <span class="items-container" slot="trigger" attr-layout="row"> Total items: {this.totalItems}</span>
                </div>
            );
        }
        return null;
    }

    renderPageItem(pos: number): JSX.Element {
        let page = this.getDisplayValue(pos);
        if (page === '…') {
            return (
                <span class="page-number ellipsis" attr-layout="row">
                    <span class="yo-more"></span>
                </span>
            );
        }
        return (
            <span class={'page-number ' + (page === this.currentPageDisplay ? 'active' : '')}
                onClick={() => this.moveToPage(page)} attr-layout="row">
                {page}
            </span>
        );
    }

    render() {

        return (
            <div attr-layout="row" class={'container ' + (this.totalVisible ? 'show-total' : 'show-total-disabled')}>
                {this.renderTotalDescription()}
                <div attr-layout="row" class="inner-container">
                    <div class={'page-number ' + (!this.hasPrevious() ? 'disabled' : '')} attr-layout="row" onClick={this.hasPrevious() ? () => this.moveToPage('left') : null}>
                        <span class="yo-left"></span>
                    </div>
                    {[...Array(this.pagerSize)].fill(0).map((_, k) => {
                        return this.renderPageItem(k + 1);
                    })}

                    <div class={'page-number ' + (!this.hasNext() ? 'disabled' : '')} attr-layout="row" onClick={this.hasNext() ? () => this.moveToPage('right') : null}>
                        <span class="yo-right"></span>
                    </div>
                </div>

            </div>
        );
    }
}
