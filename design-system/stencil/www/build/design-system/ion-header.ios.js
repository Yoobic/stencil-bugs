/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { d as createThemedClasses } from './chunk-9dddf042.js';

class Header {
    constructor() {
        /**
         * If true, the header will be translucent.
         * Note: In order to scroll content behind the header, the `fullscreen`
         * attribute needs to be set on the content.
         * Defaults to `false`.
         */
        this.translucent = false;
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'header-translucent') : {};
        const hostClasses = Object.assign({}, themedClasses);
        return {
            class: hostClasses
        };
    }
    static get is() { return "ion-header"; }
    static get host() { return {
        "theme": "header"
    }; }
    static get properties() { return {
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get style() { return "ion-header {\n  position: relative;\n  z-index: 10;\n  display: block;\n  -webkit-box-ordinal-group: 0;\n  -webkit-order: -1;\n  -ms-flex-order: -1;\n  order: -1;\n  width: 100%; }\n\n.header-translucent-ios {\n  -webkit-backdrop-filter: saturate(180%) blur(20px);\n          backdrop-filter: saturate(180%) blur(20px); }"; }
    static get styleMode() { return "ios"; }
}

export { Header as IonHeader };
