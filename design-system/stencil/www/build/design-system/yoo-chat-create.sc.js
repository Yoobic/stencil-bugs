/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooChatCreateComponent {
    render() {
        return (h("div", null, "ChatCreate needs a proper template"));
    }
    static get is() { return "yoo-chat-create"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ""; }
}

export { YooChatCreateComponent as YooChatCreate };
