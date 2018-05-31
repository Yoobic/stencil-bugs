/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooResetPasswordComponent {
    constructor() {
        this.isMagicLink = false;
        this.showTitle = true;
    }
    componentWillLoad() {
    }
    validateLoginInputs() {
        let emailInput = this.host.querySelector('yoo-form-input');
        let submitBtn = this.host.querySelector('yoo-button');
        this.validateInput = emailInput.isValid();
        this.validateInput ? submitBtn.disabled = false : submitBtn.disabled = true;
    }
    onSubmit() {
        this.passwordResetRequestSubmitted.emit({ email: this.userEmail, isMagicLink: this.isMagicLink });
    }
    onInputChanged(ev) {
        this.userEmail = ev.detail;
    }
    onInputBlurred() {
        this.validateLoginInputs();
    }
    render() {
        return (h("div", { class: 'container', "attr-layout": "column", "attr-layout-align": "space-between" },
            this.showTitle ?
                (h("div", { class: 'title' }, this.heading))
                : null,
            h("div", { class: 'subtitle' }, this.subheading),
            h("div", { class: 'input' },
                h("yoo-form-input-container", { label: this.inputLabel },
                    h("div", null,
                        h("yoo-form-input", { class: "simple", "border-color": this.borderClass, validators: [{ name: 'email' }, { name: 'required' }], onInputChanged: (event) => this.onInputChanged(event), onInputBlurred: () => this.onInputBlurred() })))),
            h("div", { class: 'button' },
                h("yoo-button", { onButtonClicked: () => this.onSubmit(), text: this.buttonText, class: this.buttonClass + ' large' }))));
    }
    static get is() { return "yoo-reset-password"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "borderClass": {
            "type": String,
            "attr": "border-class"
        },
        "buttonClass": {
            "type": String,
            "attr": "button-class"
        },
        "buttonText": {
            "type": String,
            "attr": "button-text"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "inputLabel": {
            "type": String,
            "attr": "input-label"
        },
        "isMagicLink": {
            "type": Boolean,
            "attr": "is-magic-link"
        },
        "showTitle": {
            "type": Boolean,
            "attr": "show-title"
        },
        "subheading": {
            "type": String,
            "attr": "subheading"
        },
        "validateInput": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "passwordResetRequestSubmitted",
            "method": "passwordResetRequestSubmitted",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .container .title {\n  font-size: 1.5rem;\n  opacity: 0.8;\n  padding-bottom: 0.75rem; }\n\n:host .container .subtitle {\n  font-size: 0.875rem;\n  opacity: 0.8;\n  padding-bottom: 2.8125rem; }\n\n:host .container .button {\n  padding-top: 2.5rem;\n  -webkit-align-self: center;\n  -ms-flex-item-align: center;\n  align-self: center; }\n\n\@media only screen and (max-width: 767px) {\n  .container {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start; }\n    .container .title {\n      font-size: 1.0625rem !important;\n      opacity: 1 !important; }\n    .container .subtitle {\n      padding-top: 3.875rem;\n      font-size: 1.0625rem !important;\n      opacity: 1 !important;\n      padding-bottom: 3rem !important;\n      text-align: center;\n      padding-left: 3.4375rem;\n      padding-right: 3.4375rem; }\n    .container .input {\n      width: 100%;\n      padding: 0 1.875rem; }\n    .container .button {\n      padding-top: 2.875rem !important; } }"; }
}

export { YooResetPasswordComponent as YooResetPassword };
