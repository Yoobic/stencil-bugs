/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { d as getElementDimensions } from './chunk-75914b41.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';

const ITEM_WIDTH = 40;
const ARROWS_SIZE = ITEM_WIDTH * 2;
const DESCRIPTION_LENGTH = 310; // need to adjust for translation
const TRUNCATION = '…';
const MIN_TRUNCATION_PAGER = 5;
class YooPaginationComponent {
    constructor() {
        this.currentPage = 0; // index number, i.e currentPage=0 will be page 1
        this.maxPagerSize = 11;
    }
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
    isTotalVisible(width) {
        const minWidthWithDescription = DESCRIPTION_LENGTH + ARROWS_SIZE + this.getPagerSize(width) * ITEM_WIDTH;
        return this.showTotal && width > minWidthWithDescription;
    }
    getPagerSize(width) {
        width -= ARROWS_SIZE;
        let availableItems = Math.floor(width / ITEM_WIDTH);
        return Math.min(this.totalPages, Math.max(0, availableItems), this.maxPagerSize);
    }
    getDisplayValue(position) {
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
        if (position < truncationPosition) {
            return position;
        }
        if (position > truncationPosition) {
            return this.totalPages - this.pagerSize + position;
        }
        return TRUNCATION;
    }
    moveToPage(page) {
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
    updateVisibility() {
        let width = getElementDimensions(this.host).width;
        this.pagerSize = this.getPagerSize(width);
        this.totalVisible = this.isTotalVisible(width);
    }
    updateItemsPerPage(newItemsPerPage) {
        this.itemsPerPageChanged.emit(newItemsPerPage);
    }
    componentDidLoad() {
        this.updateVisibility();
        parent.addEventListener('resize', () => this.updateVisibility()); //This implementaion must be used otherwise the host element will become undefined on page resize.
    }
    componentDidUpdate() {
        this.updateVisibility();
    }
    // rendering functions
    renderTotalDescription() {
        if (this.totalVisible) {
            return (h("div", { class: "total-container", "attr-layout": "row" },
                h("span", { class: "text-container" }, "Number of items per page:"),
                h("yoo-context-menu", null,
                    h("div", { slot: "trigger", class: "text-container" },
                        ' ' + this.itemsPerPage + ' ',
                        h("span", { class: "yo-arrow-dropdown" })),
                    h("div", { class: "dropdown-entry", onClick: () => this.updateItemsPerPage(10) }, "10"),
                    h("div", { class: "dropdown-entry", onClick: () => this.updateItemsPerPage(25) }, "25"),
                    h("div", { class: "dropdown-entry", onClick: () => this.updateItemsPerPage(100) }, "100"),
                    h("div", { class: "dropdown-entry", onClick: () => this.updateItemsPerPage(500) }, "500")),
                h("span", { class: "items-container", slot: "trigger", "attr-layout": "row" },
                    " Total items: ",
                    this.totalItems)));
        }
        return null;
    }
    renderPageItem(pos) {
        let page = this.getDisplayValue(pos);
        if (page === '…') {
            return (h("span", { class: "page-number ellipsis", "attr-layout": "row" },
                h("span", { class: "yo-more" })));
        }
        return (h("span", { class: 'page-number ' + (page === this.currentPageDisplay ? 'active' : ''), onClick: () => this.moveToPage(page), "attr-layout": "row" }, page));
    }
    render() {
        return (h("div", { "attr-layout": "row", class: 'container ' + (this.totalVisible ? 'show-total' : 'show-total-disabled') },
            this.renderTotalDescription(),
            h("div", { "attr-layout": "row", class: "inner-container" },
                h("div", { class: 'page-number ' + (!this.hasPrevious() ? 'disabled' : ''), "attr-layout": "row", onClick: this.hasPrevious() ? () => this.moveToPage('left') : null },
                    h("span", { class: "yo-left" })),
                [...Array(this.pagerSize)].fill(0).map((_, k) => {
                    return this.renderPageItem(k + 1);
                }),
                h("div", { class: 'page-number ' + (!this.hasNext() ? 'disabled' : ''), "attr-layout": "row", onClick: this.hasNext() ? () => this.moveToPage('right') : null },
                    h("span", { class: "yo-right" })))));
    }
    static get is() { return "yoo-pagination"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "currentPage": {
            "type": Number,
            "attr": "current-page"
        },
        "host": {
            "elementRef": true
        },
        "itemsPerPage": {
            "type": Number,
            "attr": "items-per-page"
        },
        "maxPagerSize": {
            "type": Number,
            "attr": "max-pager-size"
        },
        "pagerSize": {
            "state": true
        },
        "showTotal": {
            "type": Boolean,
            "attr": "show-total"
        },
        "totalItems": {
            "type": Number,
            "attr": "total-items"
        },
        "totalVisible": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "pageChanged",
            "method": "pageChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "itemsPerPageChanged",
            "method": "itemsPerPageChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-pagination-host]   .container[data-yoo-pagination] {\n  width: 100%; }\n  [data-yoo-pagination-host]   .container.show-total-disabled[data-yoo-pagination] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  [data-yoo-pagination-host]   .container.show-total[data-yoo-pagination] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n  [data-yoo-pagination-host]   .container[data-yoo-pagination]   .total-container[data-yoo-pagination] {\n    color: var(--dark-80, dimgray);\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    min-width: 7.6rem; }\n    [data-yoo-pagination-host]   .container[data-yoo-pagination]   .total-container[data-yoo-pagination]   .text-container[data-yoo-pagination] {\n      padding-left: 0.3rem; }\n    [data-yoo-pagination-host]   .container[data-yoo-pagination]   .total-container[data-yoo-pagination]   .dropdown-entry[data-yoo-pagination] {\n      padding: 0.5rem 1rem;\n      line-height: 1.5;\n      width: 100%;\n      cursor: pointer; }\n      [data-yoo-pagination-host]   .container[data-yoo-pagination]   .total-container[data-yoo-pagination]   .dropdown-entry[data-yoo-pagination]:hover {\n        background: var(--accent-05, #f4fbff);\n        color: var(--dark, #444); }\n    [data-yoo-pagination-host]   .container[data-yoo-pagination]   .total-container[data-yoo-pagination]   .items-container[data-yoo-pagination] {\n      padding-left: 0.5rem; }\n  [data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    border-radius: 5px;\n    height: 2.5rem;\n    width: 2.5rem; }\n    [data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination]:hover {\n      cursor: pointer; }\n\n.accent[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination] {\n  color: var(--accent, #1FB6FF);\n  font-size: 0.8rem;\n  font-weight: 400; }\n  .accent[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination]:hover {\n    background: var(--accent-20, #d2f0ff); }\n  .accent[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.active[data-yoo-pagination] {\n    background: var(--accent, #1FB6FF);\n    color: var(--light, #FFFFFF); }\n  .accent[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination] {\n    color: var(--accent-05, #f4fbff); }\n    .accent[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination]:hover {\n      cursor: not-allowed;\n      background: transparent; }\n  .accent[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.ellipsis[data-yoo-pagination]:hover {\n    cursor: default;\n    background: transparent; }\n\n.danger[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination] {\n  color: var(--danger, #ff625f);\n  font-size: 0.8rem;\n  font-weight: 400; }\n  .danger[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination]:hover {\n    background: var(--danger-20, #ffe0df); }\n  .danger[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.active[data-yoo-pagination] {\n    background: var(--danger, #ff625f);\n    color: var(--light, #FFFFFF); }\n  .danger[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination] {\n    color: var(--danger-05, #fff7f7); }\n    .danger[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination]:hover {\n      cursor: not-allowed;\n      background: transparent; }\n  .danger[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.ellipsis[data-yoo-pagination]:hover {\n    cursor: default;\n    background: transparent; }\n\n.success[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination] {\n  color: var(--success, #2EDBB7);\n  font-size: 0.8rem;\n  font-weight: 400; }\n  .success[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination]:hover {\n    background: var(--success-20, #d5f8f1); }\n  .success[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.active[data-yoo-pagination] {\n    background: var(--success, #2EDBB7);\n    color: var(--light, #FFFFFF); }\n  .success[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination] {\n    color: var(--success-05, #f5fdfb); }\n    .success[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination]:hover {\n      cursor: not-allowed;\n      background: transparent; }\n  .success[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.ellipsis[data-yoo-pagination]:hover {\n    cursor: default;\n    background: transparent; }\n\n.info[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination] {\n  color: var(--info, #fc459e);\n  font-size: 0.8rem;\n  font-weight: 400; }\n  .info[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination]:hover {\n    background: var(--info-20, #fedaec); }\n  .info[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.active[data-yoo-pagination] {\n    background: var(--info, #fc459e);\n    color: var(--light, #FFFFFF); }\n  .info[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination] {\n    color: var(--info-05, #fff6fa); }\n    .info[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination]:hover {\n      cursor: not-allowed;\n      background: transparent; }\n  .info[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.ellipsis[data-yoo-pagination]:hover {\n    cursor: default;\n    background: transparent; }\n\n.warning[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination] {\n  color: var(--warning, #ff6402);\n  font-size: 0.8rem;\n  font-weight: 400; }\n  .warning[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination]:hover {\n    background: var(--warning-20, #ffe0cc); }\n  .warning[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.active[data-yoo-pagination] {\n    background: var(--warning, #ff6402);\n    color: var(--light, #FFFFFF); }\n  .warning[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination] {\n    color: var(--warning-05, #fff7f2); }\n    .warning[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination]:hover {\n      cursor: not-allowed;\n      background: transparent; }\n  .warning[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.ellipsis[data-yoo-pagination]:hover {\n    cursor: default;\n    background: transparent; }\n\n.dark[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination] {\n  color: var(--dark-80, dimgray);\n  font-size: 0.8rem;\n  font-weight: 400; }\n  .dark[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number[data-yoo-pagination]:hover {\n    background: var(--dark-40, #b4b4b4); }\n  .dark[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.active[data-yoo-pagination] {\n    background: var(--dark-80, dimgray);\n    color: var(--light, #FFFFFF); }\n  .dark[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination] {\n    color: var(--dark-20, #dadada); }\n    .dark[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.disabled[data-yoo-pagination]:hover {\n      cursor: not-allowed;\n      background: transparent; }\n  .dark[data-yoo-pagination-host]   .container[data-yoo-pagination]   .inner-container[data-yoo-pagination]   .page-number.ellipsis[data-yoo-pagination]:hover {\n    cursor: default;\n    background: transparent; }"; }
}

export { YooPaginationComponent as YooPagination };
