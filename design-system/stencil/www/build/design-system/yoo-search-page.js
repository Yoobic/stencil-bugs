/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooSearchPageComponent {
    render() {
        return (h("div", null, "SearchPage needs a proper template"));
    }
    static get is() { return "yoo-search-page"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ""; }
}

export { YooSearchPageComponent as YooSearchPage };
