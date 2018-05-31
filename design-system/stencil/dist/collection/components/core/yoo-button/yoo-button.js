export class YooButtonComponent {
    constructor() {
        this.disabled = false;
    }
    click() {
        if (!this.disabled) {
            this.buttonClicked.emit(true);
        }
    }
    renderLoadingContainer() {
        return (h("div", { class: "container", onClick: () => this.click() },
            h("span", { class: "value" },
                h("img", { src: "assets/loader/loading.svg" }))));
    }
    renderButtonContent() {
        return (h("div", { class: "value" },
            this.text,
            this.icon ? h("span", { class: "icon" },
                h("i", { class: this.icon })) : null,
            h("slot", null)));
    }
    render() {
        return ((this.isLoading ? this.renderLoadingContainer() :
            h("button", { class: 'container ' + (this.disabled ? 'disabled' : ''), disabled: this.disabled, onClick: () => this.click() }, this.renderButtonContent())));
    }
    static get is() { return "yoo-button"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "disabled": { "type": Boolean, "attr": "disabled" }, "host": { "elementRef": true }, "icon": { "type": String, "attr": "icon" }, "isLoading": { "type": Boolean, "attr": "is-loading" }, "text": { "type": String, "attr": "text" } }; }
    static get events() { return [{ "name": "buttonClicked", "method": "buttonClicked", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-button:**/"; }
}
