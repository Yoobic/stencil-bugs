/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { b as getBackImageStyle, c as cloudinary, i as resizeWindow } from './chunk-75914b41.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';

class WebMenuComponent {
    constructor() {
        this.logoWidth = 34;
        this.logoHeight = 34;
        this.tooltipOptions = {
            theme: 'dark',
            size: 'small',
            distance: 14
        };
    }
    isActivePage(page) {
        return page.href && this.activePage && page.href === this.activePage;
    }
    resize() {
        let slim = this.host.querySelector('yoo-slim-scroll');
        if (slim) {
            this.scrollHeight = slim.clientHeight - (this.host.querySelector('.menu-container').clientHeight - window.innerHeight) + 'px';
        }
    }
    componentDidLoad() {
        setTimeout(() => this.resize(), 300);
        resizeWindow(() => this.resize());
    }
    renderUser() {
        return (this.entry ?
            h("yoo-avatar", { class: "small", user: this.entry.user, onClick: () => this.profilClicked.emit(this.entry.user) })
            : null);
    }
    render() {
        return (h("div", { class: "menu-container", "attr-layout": "column" },
            this.entry && this.entry.logo ?
                h("div", { class: "menu-logo" },
                    h("div", { class: "image", style: getBackImageStyle(cloudinary(this.entry.logo, this.logoWidth, this.logoHeight)) })) : null,
            h("yoo-slim-scroll", { height: this.scrollHeight },
                h("div", null, this.entry && this.entry.items && this.entry.items.length ?
                    h("div", { class: "menu-items", "attr-layout": "column" }, this.entry.items.map(a => h("div", { class: 'item-container ' + (a.separator ? 'item-separator' : '') },
                        h("div", null,
                            h("yoo-tooltip", { placement: "left", text: a.label, options: this.tooltipOptions }, a.icon ?
                                h("div", { class: 'menu-icon' + (this.isActivePage(a) ? ' selected' : ''), onClick: () => { this.itemClicked.emit(a); } },
                                    a.iconSelected && this.isActivePage(a) ?
                                        h("i", { class: a.iconSelected })
                                        : h("i", { class: a.icon }),
                                    a.badge ? h("yoo-badge", { text: a.badge, class: "notification danger" }) : null) : null))))) : null)),
            this.entry && this.entry.user ?
                h("div", { class: "menu-user" }, this.renderUser()) : null));
    }
    static get is() { return "yoo-web-menu"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "activePage": {
            "type": String,
            "attr": "active-page"
        },
        "entry": {
            "type": "Any",
            "attr": "entry"
        },
        "host": {
            "elementRef": true
        },
        "logoHeight": {
            "state": true
        },
        "logoWidth": {
            "state": true
        },
        "resize": {
            "method": true
        },
        "scrollHeight": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "itemClicked",
            "method": "itemClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "profilClicked",
            "method": "profilClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .menu-container {\n  background-color: #f2f2f2;\n  height: 100%;\n  width: 68px;\n  padding: 0.8rem; }\n  :host .menu-container > * {\n    margin-left: 0.2rem; }\n  :host .menu-container .menu-logo {\n    height: 36px;\n    width: 36px;\n    margin-bottom: 2rem; }\n    :host .menu-container .menu-logo .image {\n      height: 100%; }\n  :host .menu-container .menu-items {\n    margin-bottom: 1rem; }\n    :host .menu-container .menu-items .item-container {\n      position: relative; }\n      :host .menu-container .menu-items .item-container.item-separator {\n        margin-bottom: 4rem; }\n    :host .menu-container .menu-items .menu-icon {\n      position: relative;\n      border-radius: 50%;\n      border: 1px solid var(--success, #2EDBB7);\n      background-color: var(--light, #FFFFFF);\n      height: 36px;\n      width: 36px;\n      margin-bottom: 1rem; }\n      :host .menu-container .menu-items .menu-icon i {\n        position: absolute;\n        color: var(--success, #2EDBB7);\n        top: 50%;\n        left: 50%;\n        -webkit-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%); }\n      :host .menu-container .menu-items .menu-icon:hover {\n        background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n        :host .menu-container .menu-items .menu-icon:hover i {\n          color: var(--light, #FFFFFF); }\n      :host .menu-container .menu-items .menu-icon.selected {\n        background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n        :host .menu-container .menu-items .menu-icon.selected i {\n          color: var(--light, #FFFFFF); }\n      :host .menu-container .menu-items .menu-icon /deep/ yoo-badge .outer-container {\n        position: absolute;\n        top: -0.1875rem;\n        right: -0.25rem; }\n  :host .menu-container .menu-user {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0;\n    -ms-flex: 0;\n    flex: 0;\n    height: 100%;\n    border-top: 1px solid var(--stable, #adadad);\n    margin-right: -0.8rem;\n    margin-left: -0.8rem;\n    padding-left: 1rem;\n    padding-top: 1rem; }"; }
}

export { WebMenuComponent as YooWebMenu };
