export class YooFormInputComponent {
    constructor() {
        this.type = 'text';
        this.showPasswordToggle = false;
        this.showInputClear = false;
    }
    componentWillLoad() {
        this.inputTypeState = this.type;
    }
    onInputBlurred(ev) {
        this.inputBlurred.emit(ev);
        this.isLabelAboveVisible = false;
        if (this.host.querySelector('.input-container')) {
            this.host.querySelector('.input-container').setAttribute('style', `border-color: cssvar(dark-20)`);
        }
    }
    onInputChanged(ev) {
        this.value = ev.target && ev.target.value;
        this.inputChanged.emit(this.value);
    }
    onInputFocused() {
        this.isLabelAboveVisible = true;
        this.inputFocused.emit(true);
        if (this.host.querySelector('.input-container')) {
            this.host.querySelector('.input-container').setAttribute('style', `border-color: var(--${this.borderColorOnFocus});`);
        }
    }
    onFocus(icon) {
        let inputEl = this.getInputElement();
        if (inputEl) {
            inputEl.focus();
        }
        if (icon) {
            this.iconClicked.emit(icon);
        }
    }
    onShowPassword() {
        this.inputTypeState === 'password' ? this.inputTypeState = 'text' : this.inputTypeState = 'password';
    }
    onInputClear() {
        this.value = '';
    }
    getInputElement() {
        if (this.host) {
            return this.host.querySelector('input');
        }
        return null;
    }
    render() {
        return [
            this.placeholdertolabel && this.placeholder ?
                h("div", { class: this.placeholdertolabel && this.isLabelAboveVisible ? 'label active' :
                        (this.placeholdertolabel && !this.isLabelAboveVisible ? 'label' : 'label active') },
                    this.placeholder,
                    this.required ? h("span", { class: "label-required" }, "*") : null) : '',
            h("div", { class: this.placeholdertolabel && this.isLabelAboveVisible ? ' input-container placeholderlabel active' :
                    (this.placeholdertolabel && !this.isLabelAboveVisible ? 'input-container placeholderlabel' : 'input-container') },
                this.iconPrefix ?
                    h("div", { class: "icon-prefix" },
                        h("i", { class: this.iconPrefix })) : null,
                h("input", { type: this.inputTypeState, placeholder: !this.placeholdertolabel || !this.isLabelAboveVisible ? this.placeholder : '', value: this.value, required: this.required, onBlur: this.onInputBlurred.bind(this), onInput: this.onInputChanged.bind(this), onFocus: this.onInputFocused.bind(this) }),
                this.type === 'password' && this.showPasswordToggle ?
                    h("div", { class: "icon-suffix", onClick: this.onShowPassword.bind(this) },
                        h("yoo-tooltip", null,
                            h("i", { class: this.inputTypeState === 'password' ? 'yo-eye-01' : 'yo-eye-full', title: "Show Password" })))
                    : null,
                this.showInputClear ?
                    h("div", { class: "icon-suffix", onClick: this.onInputClear.bind(this) },
                        h("yoo-tooltip", null,
                            h("i", { class: "yo-close2", title: "Clear" })))
                    : null,
                this.iconSuffix ?
                    h("div", { class: "icon-suffix", onClick: this.onFocus.bind(this) },
                        h("yoo-tooltip", null,
                            h("i", { class: this.iconSuffix, title: this.tooltip })))
                    : null)
        ];
    }
    static get is() { return "yoo-form-input"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "borderColorOnFocus": { "type": String, "attr": "border-color-on-focus" }, "host": { "elementRef": true }, "iconPrefix": { "type": String, "attr": "icon-prefix" }, "iconSuffix": { "type": String, "attr": "icon-suffix" }, "inputTypeState": { "state": true }, "isLabelAboveVisible": { "state": true }, "placeholder": { "type": String, "attr": "placeholder" }, "placeholdertolabel": { "type": Boolean, "attr": "placeholdertolabel" }, "required": { "type": Boolean, "attr": "required" }, "showInputClear": { "type": Boolean, "attr": "show-input-clear" }, "showPasswordToggle": { "type": Boolean, "attr": "show-password-toggle" }, "tooltip": { "type": String, "attr": "tooltip" }, "type": { "type": String, "attr": "type" }, "value": { "type": String, "attr": "value", "mutable": true } }; }
    static get events() { return [{ "name": "inputBlurred", "method": "inputBlurred", "bubbles": true, "cancelable": true, "composed": true }, { "name": "inputFocused", "method": "inputFocused", "bubbles": true, "cancelable": true, "composed": true }, { "name": "inputChanged", "method": "inputChanged", "bubbles": true, "cancelable": true, "composed": true }, { "name": "iconClicked", "method": "iconClicked", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-form-input:**/"; }
}
