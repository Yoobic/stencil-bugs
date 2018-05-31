export class YooTagComponent {
    constructor() {
        this.closed = false;
    }
    onClose() {
        this.tagClosed.emit(true);
        this.closed = true;
    }
    render() {
        return (h("div", { class: 'outer-container' + ((this.closed) ? ' closed' : '') },
            h("div", { class: "inner-container" },
                this.icon ? h("i", { class: 'icon ' + this.icon }) : null,
                this.text,
                this.closable ? h("span", { class: "icon-close", onClick: this.onClose.bind(this) },
                    h("i", { class: "yo-close" })) : null)));
    }
    static get is() { return "yoo-tag"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "closable": { "type": Boolean, "attr": "closable" }, "closed": { "state": true }, "icon": { "type": String, "attr": "icon" }, "text": { "type": String, "attr": "text" } }; }
    static get events() { return [{ "name": "tagClosed", "method": "tagClosed", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-tag:**/"; }
}
