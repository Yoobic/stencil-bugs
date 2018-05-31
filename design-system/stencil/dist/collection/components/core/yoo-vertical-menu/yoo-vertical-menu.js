export class YooVerticalMenuComponent {
    constructor() {
        this.entry = { menuRows: [] };
        this.fixed = true;
        this.activeRow = [];
    }
    onModalClosed() {
        this.menuClosed.emit(true);
    }
    componentWillLoad() {
        this.activeRow = this.entry.menuRows.map(() => false);
        if (this.fixed) {
            this.host.classList.add('fixed');
        }
    }
    componentDidLoad() {
        let slim = this.host.querySelector('yoo-slim-scroll');
        if (slim) {
            slim.height = this.getInnerHeight();
            setTimeout(() => slim.refresh(), 200);
        }
    }
    componentDidUpdate() {
        let slim = this.host.querySelector('yoo-slim-scroll');
        if (slim) {
            //slim.height = this.getInnerHeight();
            setTimeout(() => slim.refresh(), 200);
        }
    }
    getInnerHeight() {
        let header = this.host.querySelector('.menu-header');
        if (header) {
            return (window.innerHeight - header.clientHeight) + 'px';
        }
        return '';
    }
    onItemClick(item, index = null) {
        this.itemClicked.emit(item);
        if (index || index === 0) {
            this.activeRow[index] = !this.activeRow[index];
            this.activeRow = this.activeRow.map((e) => e);
        }
        if (item) {
            this.setItemActive(item);
        }
    }
    setItemActive(menuItem) {
        this.entry = {
            menuRows: this.entry.menuRows.map((row) => {
                row.item.isActive = row.item === menuItem && !row.item.isActive;
                if (row.subItems) {
                    row.subItems = row.subItems.map((item) => {
                        item.isActive = menuItem === item;
                        row.item.isActive = row.item.isActive || menuItem === item;
                        return item;
                    });
                }
                return row;
            })
        };
    }
    renderItem(item, hasSubItem, index = null) {
        return (h("a", { href: item.anchor ? item.anchor : null },
            h("div", { class: 'item' + ((item.isActive) ? ' active' : ''), onClick: () => this.onItemClick(item, index), "attr-layout": "row" },
                item.imgSrc ? h("img", { src: item.imgSrc }) : null,
                item.icon ? h("i", { class: item.icon }) : null,
                item.text ?
                    h("span", null, item.text)
                    : null,
                hasSubItem ?
                    h("i", { class: 'yo-arrow-dropdown' + ((this.activeRow[index]) ? ' chevron-active' : '') })
                    : null)));
    }
    renderRow(row, index) {
        if (row.subItems && row.subItems !== []) {
            return (h("div", { class: 'row' + ((this.activeRow[index]) ? ' sub-display' : ' hidden') },
                this.renderItem(row.item, true, index),
                h("div", { class: "sub-container" },
                    h("div", { class: 'row-subitems' }, row.subItems.map((subItem) => this.renderItem(subItem, false))))));
        }
        else {
            return (h("div", { class: "row" }, this.renderItem(row.item, false)));
        }
    }
    render() {
        return (this.fixed ?
            h("div", { class: "fixed-container", "attr-layout": "column" },
                h("div", { class: "menu-header" },
                    h("span", null, this.heading),
                    h("div", { class: "header-slot" },
                        h("slot", { name: "header-slot" }))),
                h("yoo-slim-scroll", null,
                    h("div", { slot: "scroll-slot" }, this.entry.menuRows.map((row, index) => this.renderRow(row, index)))))
            :
                h("yoo-modal", { heading: this.heading ? this.heading : '', class: "menu dark", onClosed: () => this.onModalClosed() },
                    h("div", { slot: "modal-content", "attr-layout": "column" }, this.entry.menuRows.map((row, index) => this.renderRow(row, index)))));
    }
    static get is() { return "yoo-vertical-menu"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "activeRow": { "state": true }, "entry": { "type": "Any", "attr": "entry", "mutable": true }, "fixed": { "type": Boolean, "attr": "fixed" }, "heading": { "type": String, "attr": "heading" }, "host": { "elementRef": true }, "setItemActive": { "method": true } }; }
    static get events() { return [{ "name": "itemClicked", "method": "itemClicked", "bubbles": true, "cancelable": true, "composed": true }, { "name": "menuClosed", "method": "menuClosed", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-vertical-menu:**/"; }
}
