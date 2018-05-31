export class YooDeviceComponent {
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
                        h("div", { slot: "scroll-slot" },
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
                                h("slot", { name: "device-content" }))))))));
    }
    static get is() { return "yoo-device"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "heading": { "type": String, "attr": "heading" }, "hideBar": { "type": Boolean, "attr": "hide-bar" }, "host": { "elementRef": true } }; }
    static get style() { return "/**style-placeholder:yoo-device:**/"; }
}
