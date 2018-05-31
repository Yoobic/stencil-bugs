/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { d as getElementDimensions } from './chunk-75914b41.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';

class YooBreadcrumbsComponent {
    constructor() {
        this.ITEM_WIDTH = 80;
        this.MAX_VISIBLE_ITEMS = 7;
        this.items = [];
        this.visibleItems = 7;
    }
    componentWillLoad() {
        this.setItemNumber();
        // check the body width here and set max_steps accordingly
        window.addEventListener('resize', () => this.setItemNumber());
    }
    setItemNumber() {
        let width = getElementDimensions(this.host.parentElement).width;
        this.visibleItems = Math.min(Math.floor(width / this.ITEM_WIDTH), this.MAX_VISIBLE_ITEMS);
    }
    selectItem(item) {
        this.itemSelected.emit(item);
    }
    isLastItem(index, arr) {
        return index === arr.length - 1;
    }
    renderDefaultBreadcrumbItem(item, index, arr) {
        // last item is active
        return (h("div", { class: 'breadcrumb-item ' + (this.isLastItem(index, arr) ? 'active' : ''), onClick: this.selectItem.bind(this, item) },
            h("span", null, item),
            (!this.isLastItem(index, arr) ? h("i", { class: "yo-right" }) : '')));
    }
    renderCollapsedBreadcrumbItem(item) {
        return (h("span", { onClick: this.selectItem.bind(this, item) }, item));
    }
    // totalItems > MAX_VISIBLE_ITEMS creates a dropdown
    render() {
        let collapsedItems = [];
        if (this.items.length > this.MAX_VISIBLE_ITEMS) {
            collapsedItems = this.items.slice(0, this.items.length - this.visibleItems);
        }
        let visibleItems;
        collapsedItems.length > 0 ? visibleItems = this.items.slice(this.items.length - this.visibleItems) : visibleItems = this.items;
        return (h("div", { class: 'breadcrumb ' + (collapsedItems.length > 0 ? 'long' : ''), "attr-layout": "row" },
            collapsedItems.length > 0 ?
                h("yoo-context-menu", null,
                    h("div", { slot: "trigger", class: "breadcrumb-item more" },
                        h("span", { class: "more-icons" },
                            h("i", { class: "yo-more" }),
                            " ",
                            h("i", { class: "yo-arrow-dropdown" })),
                        h("span", { class: "yo-right" })),
                    h("div", { class: "context-container", "attr-layout": "column" }, collapsedItems.map(item => this.renderCollapsedBreadcrumbItem(item))))
                : '',
            visibleItems.map((item, index, arr) => this.renderDefaultBreadcrumbItem(item, index, arr))));
    }
    static get is() { return "yoo-breadcrumbs"; }
    static get encapsulation() { return "scoped"; }
    static get host() { return {
        "role": "navigation"
    }; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "items": {
            "type": "Any",
            "attr": "items"
        },
        "visibleItems": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "itemSelected",
            "method": "itemSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .breadcrumb {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  line-height: 2;\n  font-size: 0.875rem;\n  padding: 0.375rem 0rem; }\n  :host .breadcrumb .breadcrumb-item {\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    align-self: center;\n    color: var(--dark-60, #8f8f8f);\n    padding-right: 0.75rem; }\n    :host .breadcrumb .breadcrumb-item span {\n      position: relative;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      padding-right: 0.75rem; }\n    :host .breadcrumb .breadcrumb-item.active {\n      color: var(--text-color, #807f83); }\n    :host .breadcrumb .breadcrumb-item.more span.yo-right {\n      padding-right: 0rem; }\n    :host .breadcrumb .breadcrumb-item.more .more-icons {\n      padding-left: 0.75rem; }\n      :host .breadcrumb .breadcrumb-item.more .more-icons i.yo-arrow-dropdown {\n        padding: 0rem 0.25rem; }\n  :host .breadcrumb yoo-context-menu .context-container {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: column-reverse;\n    -ms-flex-direction: column-reverse;\n    flex-direction: column-reverse; }\n    :host .breadcrumb yoo-context-menu .context-container span {\n      padding: 0.5rem 1rem;\n      line-height: 1.5;\n      width: 100%;\n      position: relative;\n      border-top: 1px solid var(--dark-20, #dadada); }\n      :host .breadcrumb yoo-context-menu .context-container span:last-child {\n        border-top: none; }\n      :host .breadcrumb yoo-context-menu .context-container span:hover {\n        background: var(--accent-05, #f4fbff);\n        color: var(--dark, #444); }"; }
}

export { YooBreadcrumbsComponent as YooBreadcrumbs };
