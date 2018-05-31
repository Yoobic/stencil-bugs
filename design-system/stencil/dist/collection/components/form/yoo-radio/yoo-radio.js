export class YooRadioComponent {
    constructor() {
        this.state = 'unchecked';
    }
    onRadioCheck() {
        if (this.state === 'unchecked') {
            this.state = 'checked';
        }
        else if (this.state === 'checked') {
            this.state = 'unchecked';
        }
        this.radioClicked.emit(this.state);
    }
    render() {
        return (h("div", { class: "container" },
            this.disabled ?
                h("div", { class: this.state === 'unchecked' ? 'icon-container empty disabled' : 'icon-container disabled', "attr-layout": "row" },
                    h("div", { class: this.state === 'unchecked' ? 'icon empty' : 'icon disabled' }))
                :
                    h("div", { class: this.state === 'unchecked' ? 'icon-container empty enabled' : 'icon-container enabled', "attr-layout": "row", onClick: () => this.onRadioCheck() },
                        h("div", { class: this.state === 'unchecked' ? 'icon empty' : 'icon' })),
            this.disabled ?
                h("div", { class: "text-container disabled" }, this.text) :
                h("div", { class: "text-container enabled", onClick: () => this.onRadioCheck() }, this.text)));
    }
    static get is() { return "yoo-radio"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "disabled": { "type": Boolean, "attr": "disabled" }, "state": { "type": String, "attr": "state", "mutable": true }, "text": { "type": String, "attr": "text" } }; }
    static get events() { return [{ "name": "radioClicked", "method": "radioClicked", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-radio:**/"; }
}
