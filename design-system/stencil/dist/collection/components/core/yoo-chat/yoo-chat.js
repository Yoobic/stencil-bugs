import { getBackImageStyle, cloudinary } from '../../../utils/helpers';
export class YooChatComponent {
    constructor() {
        this.messages = []; // suppose that messages are ordered to most recent to the older one
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "chat-header" },
                h("span", null, this.heading)),
            h("div", { class: "messages-container", "attr-layout": "column" }, (this.messages.map((mes) => h("div", { class: 'message ' + ((mes.userMessage) ? 'user-message' : 'other-message'), "attr-layout": "column" },
                h("div", { class: "message-content", "attr-layout": "column" },
                    mes.img ? [h("div", { class: "image", style: getBackImageStyle(cloudinary(mes.img)) }), h("br", null)] : null,
                    h("span", null, mes.content)),
                mes.author || mes.time ?
                    h("div", { class: "info-container" },
                        h("span", null,
                            mes.author,
                            "  ",
                            mes.time))
                    : null))))));
    }
    static get is() { return "yoo-chat"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "heading": { "type": String, "attr": "heading" }, "messages": { "type": "Any", "attr": "messages" } }; }
    static get style() { return "/**style-placeholder:yoo-chat:**/"; }
}
