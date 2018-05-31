/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooDeviceComponent {
    constructor() {
        this.hideBar = false;
    }
    componentDidLoad() {
        let slimScroll = this.host.querySelector('yoo-slim-scroll');
        if (slimScroll) {
            setTimeout(() => slimScroll.refresh(), 300);
        }
    }
    render() {
        return (h("div", { class: "device" },
            h("div", { class: "content" },
                h("div", { "attr-layout": "column", class: "column" },
                    h("yoo-slim-scroll", null,
                        h("div", null,
                            !this.hideBar ?
                                h("div", { class: "top-bar" },
                                    h("div", { "attr-layout": "row" },
                                        h("i", { class: "yo-menu" }),
                                        h("span", null),
                                        h("span", { class: "heading" }, this.heading),
                                        h("span", null),
                                        h("i", { class: "yo-settings" })))
                                : null,
                            h("slot", null)))))));
    }
    static get is() { return "yoo-device"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "hideBar": {
            "type": Boolean,
            "attr": "hide-bar"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ":host .device {\n  width: 270px;\n  height: 557px;\n  background-image: url(./assets/devices/device-iphone-7.svg);\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  background-position: center;\n  margin: auto;\n  position: relative; }\n  :host .device .content {\n    top: 65px;\n    position: relative;\n    margin: auto;\n    width: 239px;\n    height: 422px;\n    overflow: hidden; }\n    :host .device .content .column {\n      height: 100%; }\n      :host .device .content .column /deep/ yoo-slim-scroll .scroll-slot-container iframe {\n        width: 100%; }\n    :host .device .content .top-bar {\n      background-color: var(--light, #FFFFFF);\n      min-height: 40px;\n      border-bottom: 1px solid var(--dark-60, #8f8f8f); }\n      :host .device .content .top-bar div {\n        padding: 0.4rem 0.2rem; }\n        :host .device .content .top-bar div .heading {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          font-size: 1rem;\n          color: var(--dark, #444);\n          line-height: 20px; }\n        :host .device .content .top-bar div span {\n          -webkit-box-flex: 1;\n          -webkit-flex: 1;\n          -ms-flex: 1;\n          flex: 1; }"; }
}

export { YooDeviceComponent as YooDevice };
