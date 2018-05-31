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
    static get style() { return "[data-yoo-loader-host] {\n  display: block; }\n  [data-yoo-loader-host]   .container[data-yoo-loader] {\n    text-align: center;\n    width: 100%;\n    height: 100%; }\n    [data-yoo-loader-host]   .container[data-yoo-loader]   .value[data-yoo-loader] {\n      font-size: 1rem;\n      font-weight: bold;\n      line-height: 1.5;\n      text-align: center; }\n      [data-yoo-loader-host]   .container[data-yoo-loader]   .value[data-yoo-loader]   img[data-yoo-loader] {\n        width: 1rem;\n        height: 1rem; }\n\n.absolute[data-yoo-loader-host] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 9; }\n\n.backdrop[data-yoo-loader-host]   .container[data-yoo-loader] {\n  background: var(--backdrop, rgba(49, 44, 87, 0.6)); }\n\n.small[data-yoo-loader-host]   .container[data-yoo-loader]   .value[data-yoo-loader]   img[data-yoo-loader] {\n  width: 1rem;\n  height: 1rem; }\n\n.medium[data-yoo-loader-host]   .container[data-yoo-loader]   .value[data-yoo-loader]   img[data-yoo-loader] {\n  width: 2rem;\n  height: 2rem; }\n\n.large[data-yoo-loader-host]   .container[data-yoo-loader]   .value[data-yoo-loader]   img[data-yoo-loader] {\n  width: 4rem;\n  height: 4rem; }"; }
}

export { YooLoaderComponent as YooLoader };
