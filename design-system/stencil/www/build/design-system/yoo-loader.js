/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as setAnimation, b as animations } from './chunk-d3f1c80d.js';
import './chunk-a7525511.js';

class YooLoaderComponent {
    render() {
        setAnimation(animations.fade, this.host, { open: true });
        return (h("div", { class: "container", "attr-layout": "row", "attr-layout-align": "center center" },
            h("div", { class: "value" },
                h("img", { src: "assets/loader/loading_dark.svg" }))));
    }
    static get is() { return "yoo-loader"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ":host {\n  display: block; }\n  :host .container {\n    text-align: center;\n    width: 100%;\n    height: 100%; }\n    :host .container .value {\n      font-size: 1rem;\n      font-weight: bold;\n      line-height: 1.5;\n      text-align: center; }\n      :host .container .value img {\n        width: 1rem;\n        height: 1rem; }\n\n:host(.absolute) {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 9; }\n\n:host(.backdrop) .container {\n  background: var(--backdrop, rgba(49, 44, 87, 0.6)); }\n\n:host(.small) .container .value img {\n  width: 1rem;\n  height: 1rem; }\n\n:host(.medium) .container .value img {\n  width: 2rem;\n  height: 2rem; }\n\n:host(.large) .container .value img {\n  width: 4rem;\n  height: 4rem; }"; }
}

export { YooLoaderComponent as YooLoader };
