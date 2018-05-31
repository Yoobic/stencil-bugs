/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooFeedCreateComponent {
    render() {
        return (h("div", null, (this.photoItems || []).map(photo => h("img", { class: "thumbnail", src: photo.thumbnailURL }))));
    }
    static get is() { return "yoo-feed-create"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "photoItems": {
            "type": "Any",
            "attr": "photo-items"
        }
    }; }
    static get style() { return ".thumbnail {\n  width: 70px;\n  height: 70px; }"; }
}

export { YooFeedCreateComponent as YooFeedCreate };
