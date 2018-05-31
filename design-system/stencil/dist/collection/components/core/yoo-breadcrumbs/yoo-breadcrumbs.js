import { getElementDimensions } from '../../../utils/helpers';
export class YooBreadcrumbsComponent {
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
        let width = getElementDimensions(this._host.parentElement).width;
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
            (!this.isLastItem(index, arr) ? h("i", { class: "yo-chevron-right" }) : '')));
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
                        h("span", { class: "yo-chevron-right" })),
                    h("div", { class: "context-container", "attr-layout": "column" }, collapsedItems.map(item => this.renderCollapsedBreadcrumbItem(item))))
                : '',
            visibleItems.map((item, index, arr) => this.renderDefaultBreadcrumbItem(item, index, arr))));
    }
    static get is() { return "yoo-breadcrumbs"; }
    static get encapsulation() { return "scoped"; }
    static get host() { return { "role": "navigation" }; }
    static get properties() { return { "_host": { "elementRef": true }, "items": { "type": "Any", "attr": "items" }, "visibleItems": { "state": true } }; }
    static get events() { return [{ "name": "itemSelected", "method": "itemSelected", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-breadcrumbs:**/"; }
}
