export class YooCheckboxComponent {
    constructor() {
        this.state = 'unchecked';
    }
    onCheckboxClick() {
        this.getNextState();
        this.checkboxToggled.emit(this.state);
    }
    getNextState() {
        const TRANSITIONS = {
            checked: 'unchecked',
            indeterminate: 'checked',
            unchecked: this.isIndeterminate ? 'indeterminate' : 'checked'
        };
        this.state = TRANSITIONS[this.state];
    }
    render() {
        return (h("div", { class: "container" },
            this.disabled ?
                h("div", { class: this.state === 'unchecked' ? 'icon-container empty disabled' : 'icon-container disabled', "attr-layout": "row" },
                    h("span", { class: this.state === 'unchecked' ? 'icon empty' : 'icon disabled' },
                        h("i", { class: this.state === 'indeterminate' ? 'yo-minus' : 'yo-check' })))
                :
                    h("div", { class: this.state === 'unchecked' ? 'icon-container empty enabled' : 'icon-container enabled', "attr-layout": "row", onClick: () => this.onCheckboxClick() },
                        h("span", { class: this.state === 'unchecked' ? 'icon empty' : 'icon' },
                            h("i", { class: this.state === 'indeterminate' ? 'yo-minus' : 'yo-check' }))),
            this.disabled ?
                h("div", { class: "text-container disabled" }, this.text) :
                h("div", { class: "text-container enabled", onClick: () => this.onCheckboxClick() }, this.text)));
    }
    static get is() { return "yoo-checkbox"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "disabled": { "type": Boolean, "attr": "disabled" }, "isIndeterminate": { "type": Boolean, "attr": "is-indeterminate" }, "onCheckboxClick": { "method": true }, "state": { "type": String, "attr": "state", "mutable": true }, "text": { "type": String, "attr": "text" } }; }
    static get events() { return [{ "name": "checkboxToggled", "method": "checkboxToggled", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-checkbox:**/"; }
}
