/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooVerticalMenuComponent {
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
                        h("img", { class: "image", src: this.imgSrc, alt: "Menu Header" }))),
                h("yoo-slim-scroll", null,
                    h("div", null, this.entry.menuRows.map((row, index) => this.renderRow(row, index)))))
            :
                h("yoo-modal", { heading: this.heading ? this.heading : '', class: "menu dark", onClosed: () => this.onModalClosed() },
                    h("div", { "attr-layout": "column" }, this.entry.menuRows.map((row, index) => this.renderRow(row, index)))));
    }
    static get is() { return "yoo-vertical-menu"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "activeRow": {
            "state": true
        },
        "entry": {
            "type": "Any",
            "attr": "entry",
            "mutable": true
        },
        "fixed": {
            "type": Boolean,
            "attr": "fixed"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "imgSrc": {
            "type": String,
            "attr": "img-src"
        },
        "setItemActive": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "itemClicked",
            "method": "itemClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "menuClosed",
            "method": "menuClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host /deep/ div.modal-body,\n:host div.fixed-container {\n  width: 100%;\n  background-color: var(--darkblue, #3a4361);\n  color: var(--light, #FFFFFF); }\n  :host /deep/ div.modal-body .row,\n  :host div.fixed-container .row {\n    -webkit-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;\n    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }\n    :host /deep/ div.modal-body .row a,\n    :host div.fixed-container .row a {\n      color: var(--light, #FFFFFF);\n      text-decoration: none;\n      -webkit-box-flex: 1;\n      -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n      flex-grow: 1; }\n      :host /deep/ div.modal-body .row a.active,\n      :host div.fixed-container .row a.active {\n        border-left: 0.25rem solid var(--accent, #1FB6FF);\n        padding-left: 0.75rem; }\n      :host /deep/ div.modal-body .row a:hover,\n      :host div.fixed-container .row a:hover {\n        background-color: var(--darkblue-80, #55628d); }\n      :host /deep/ div.modal-body .row a .item,\n      :host div.fixed-container .row a .item {\n        padding-left: 1rem;\n        padding-top: 0.4rem;\n        padding-bottom: 0.4rem;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center; }\n        :host /deep/ div.modal-body .row a .item img,\n        :host div.fixed-container .row a .item img {\n          max-height: 1.5rem;\n          max-width: 1.5rem;\n          margin-right: 1rem; }\n        :host /deep/ div.modal-body .row a .item i,\n        :host div.fixed-container .row a .item i {\n          margin-left: auto;\n          margin-right: 1rem;\n          -webkit-transition: all 0.3s;\n          transition: all 0.3s; }\n          :host /deep/ div.modal-body .row a .item i.chevron-active,\n          :host div.fixed-container .row a .item i.chevron-active {\n            -webkit-transform: rotate(-90deg);\n                    transform: rotate(-90deg); }\n        :host /deep/ div.modal-body .row a .item.active,\n        :host div.fixed-container .row a .item.active {\n          background-color: var(--darkblue-80, #55628d);\n          border-left: 0.25rem solid var(--accent, #1FB6FF);\n          padding-left: 0.75rem; }\n        :host /deep/ div.modal-body .row a .item:hover,\n        :host div.fixed-container .row a .item:hover {\n          background-color: var(--darkblue-80, #55628d); }\n    :host /deep/ div.modal-body .row a:hover,\n    :host div.fixed-container .row a:hover {\n      text-decoration: none; }\n    :host /deep/ div.modal-body .row .sub-container,\n    :host div.fixed-container .row .sub-container {\n      overflow: hidden;\n      width: 100%;\n      background: var(--darkblue, #3a4361); }\n      :host /deep/ div.modal-body .row .sub-container .row-subitems,\n      :host div.fixed-container .row .sub-container .row-subitems {\n        overflow: hidden;\n        -webkit-animation: sub-item-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;\n                animation: sub-item-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }\n        :host /deep/ div.modal-body .row .sub-container .row-subitems .item,\n        :host div.fixed-container .row .sub-container .row-subitems .item {\n          padding-left: 2rem; }\n          :host /deep/ div.modal-body .row .sub-container .row-subitems .item.active,\n          :host div.fixed-container .row .sub-container .row-subitems .item.active {\n            padding-left: 1.75rem;\n            background-color: var(--darkblue-60, #7a86af); }\n          :host /deep/ div.modal-body .row .sub-container .row-subitems .item:hover,\n          :host div.fixed-container .row .sub-container .row-subitems .item:hover {\n            background-color: var(--darkblue-60, #7a86af); }\n    :host /deep/ div.modal-body .row.hidden .row-subitems,\n    :host div.fixed-container .row.hidden .row-subitems {\n      display: none; }\n    :host /deep/ div.modal-body .row.sub-display,\n    :host div.fixed-container .row.sub-display {\n      background: var(--darkblue-80, #55628d); }\n\n:host div.fixed-container {\n  height: 100vh; }\n  :host div.fixed-container div.menu-header {\n    margin-left: 1rem;\n    background: var(--darkblue, #3a4361);\n    color: var(--light, #FFFFFF); }\n    :host div.fixed-container div.menu-header span {\n      font-size: 1.4rem; }\n    :host div.fixed-container div.menu-header .header-slot {\n      padding: 1rem; }\n      :host div.fixed-container div.menu-header .header-slot .image {\n        max-width: 90%; }\n  :host div.fixed-container .row {\n    margin: 0px; }\n    :host div.fixed-container .row .row-subitems {\n      width: 100%; }\n\n:host /deep/ yoo-modal .outer-container {\n  background: var(--darkblue, #3a4361) !important;\n  border: none !important; }\n  :host /deep/ yoo-modal .outer-container .modal-body {\n    padding: 0 !important;\n    padding-top: 5.0625rem !important; }\n\n\@-webkit-keyframes sub-item-appear {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0%);\n            transform: translateY(0%); } }\n\n\@keyframes sub-item-appear {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0%);\n            transform: translateY(0%); } }"; }
}

export { YooVerticalMenuComponent as YooVerticalMenu };
