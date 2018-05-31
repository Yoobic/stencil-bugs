/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooMissionResultsComponent {
    render() {
        return (h("div", null, "MissionResults needs a proper template"));
    }
    static get is() { return "yoo-mission-results"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "mission": {
            "type": "Any",
            "attr": "mission"
        }
    }; }
    static get style() { return ""; }
}

export { YooMissionResultsComponent as YooMissionResults };
