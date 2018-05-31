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
    static get style() { return "[data-yoo-device-host]   .device[data-yoo-device] {\n  width: 270px;\n  height: 557px;\n  background-image: url(./assets/devices/device-iphone-7.svg);\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  background-position: center;\n  margin: auto;\n  position: relative; }\n  [data-yoo-device-host]   .device[data-yoo-device]   .content[data-yoo-device] {\n    top: 65px;\n    position: relative;\n    margin: auto;\n    width: 239px;\n    height: 422px;\n    overflow: hidden; }\n    [data-yoo-device-host]   .device[data-yoo-device]   .content[data-yoo-device]   .column[data-yoo-device] {\n      height: 100%; }\n      [data-yoo-device-host]   .device[data-yoo-device]   .content[data-yoo-device]   .column[data-yoo-device]     yoo-slim-scroll .scroll-slot-container iframe {\n        width: 100%; }\n    [data-yoo-device-host]   .device[data-yoo-device]   .content[data-yoo-device]   .top-bar[data-yoo-device] {\n      background-color: var(--light, #FFFFFF);\n      min-height: 40px;\n      border-bottom: 1px solid var(--dark-60, #8f8f8f); }\n      [data-yoo-device-host]   .device[data-yoo-device]   .content[data-yoo-device]   .top-bar[data-yoo-device]   div[data-yoo-device] {\n        padding: 0.4rem 0.2rem; }\n        [data-yoo-device-host]   .device[data-yoo-device]   .content[data-yoo-device]   .top-bar[data-yoo-device]   div[data-yoo-device]   .heading[data-yoo-device] {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          font-size: 1rem;\n          color: var(--dark, #444);\n          line-height: 20px; }\n        [data-yoo-device-host]   .device[data-yoo-device]   .content[data-yoo-device]   .top-bar[data-yoo-device]   div[data-yoo-device]   span[data-yoo-device] {\n          -webkit-box-flex: 1;\n          -webkit-flex: 1;\n          -ms-flex: 1;\n          flex: 1; }"; }
}

export { YooDeviceComponent as YooDevice };
