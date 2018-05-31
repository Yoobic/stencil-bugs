/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooServiceCreateComponent {
    render() {
        return (h("div", null, "ServiceCreate needs a proper template"));
    }
    static get is() { return "yoo-service-create"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ""; }
}

export { YooServiceCreateComponent as YooServiceCreate };
