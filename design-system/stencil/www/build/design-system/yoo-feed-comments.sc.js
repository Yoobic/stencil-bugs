/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooFeedCommentsComponent {
    render() {
        return (h("div", null, "FeedComments needs a proper template"));
    }
    static get is() { return "yoo-feed-comments"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ""; }
}

export { YooFeedCommentsComponent as YooFeedComments };
