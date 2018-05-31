/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooTaskCreateComponent {
    render() {
        return (h("div", null, "TaskCreate needs a proper template"));
    }
    static get is() { return "yoo-task-create"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ""; }
}

export { YooTaskCreateComponent as YooTaskCreate };
