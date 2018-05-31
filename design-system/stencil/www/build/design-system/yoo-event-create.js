/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooEventCreateComponent {
    render() {
        return (h("div", null, "EventCreate needs a proper template"));
    }
    static get is() { return "yoo-event-create"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ""; }
}

export { YooEventCreateComponent as YooEventCreate };
