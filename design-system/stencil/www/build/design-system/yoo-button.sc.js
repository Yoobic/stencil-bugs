/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as setValidator, b as setAsyncValidator, c as onInputBlurred, d as setValueAndValidateInput, e as onInputFocused, f as onInputClear, g as convertValueForInputType } from './chunk-03ff812d.js';
import './chunk-b8bd1aac.js';
import './chunk-a7525511.js';
import './chunk-e9552ef3.js';
import './chunk-cdfb4b5d.js';
import './chunk-acfcbd22.js';

class YooButtonComponent {
    constructor() {
        this.disabled = false;
    }
    click() {
        if (!this.disabled) {
            this.buttonClicked.emit(true);
        }
    }
    renderButtonContent() {
        return (h("div", { class: "value" },
            this.text,
            this.icon ? h("span", { class: "icon" },
                h("i", { class: this.icon })) : null,
            h("slot", null)));
    }
    render() {
        return (h("button", { class: 'container ' + (this.disabled ? 'disabled' : ''), disabled: this.disabled, onClick: () => this.click() }, this.renderButtonContent()));
    }
    static get is() { return "yoo-button"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "isLoading": {
            "type": Boolean,
            "attr": "is-loading"
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "buttonClicked",
            "method": "buttonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-button-host]   .container[data-yoo-button] {\n  font-family: 'Lato';\n  -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);\n  padding: 0;\n  border: none;\n  display: block;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  border-radius: 26px;\n  min-height: 52px;\n  min-width: 160px;\n  cursor: pointer;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  background-color: #ffffff;\n  white-space: nowrap; }\n  [data-yoo-button-host]   .container.loading[data-yoo-button] {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    min-width: 40px;\n    width: 40px;\n    min-height: 24px; }\n    [data-yoo-button-host]   .container.loading[data-yoo-button]   .value[data-yoo-button] {\n      padding: 5px 0px; }\n      [data-yoo-button-host]   .container.loading[data-yoo-button]   .value[data-yoo-button]   img[data-yoo-button] {\n        width: 24px;\n        height: 24px; }\n  [data-yoo-button-host]   .container[data-yoo-button]:hover {\n    opacity: 0.6; }\n  [data-yoo-button-host]   .container[data-yoo-button]:active, [data-yoo-button-host]   .container[data-yoo-button]:focus {\n    outline: 0 !important; }\n  [data-yoo-button-host]   .container.disabled[data-yoo-button] {\n    pointer-events: none;\n    opacity: 0.4; }\n  [data-yoo-button-host]   .container[data-yoo-button]   .icon[data-yoo-button] {\n    font-size: 1rem;\n    padding-left: 0.5rem; }\n  [data-yoo-button-host]   .container[data-yoo-button]   .value[data-yoo-button] {\n    font-size: 1.0625rem;\n    font-weight: 300;\n    font-style: normal;\n    line-height: normal;\n    letter-spacing: normal;\n    text-align: center;\n    color: #adadad; }"; }
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class YooFormInputComponent {
    constructor() {
        this.validators = [];
        this.type = 'text';
        this.showPasswordToggle = false;
        this.showInputClear = false;
        // private coreConfig: ICoreConfig = (window as any).coreConfigService;
        // Reduced Validators
        this._validator = (x) => true;
        this._asyncValidator = (x) => __awaiter(this, void 0, void 0, function* () { return true; });
    }
    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
        this.inputTypeState = this.type;
    }
    isValid() {
        return this.validity;
    }
    onInputClear() {
        this.value = '';
        this.iconClicked.emit('clear');
    }
    onIconClicked(icon) {
        this.iconClicked.emit(icon);
    }
    onInputChanged(ev) {
        let value = ev.target && ev.target.value && convertValueForInputType(ev.target.value, this.type);
        setValueAndValidateInput(value, this);
    }
    onShowPassword() {
        this.inputTypeState === 'password' ? this.inputTypeState = 'text' : this.inputTypeState = 'password';
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.value);
    }
    renderEditable() {
        return [
            this.placeholdertolabel && this.placeholder ?
                h("div", { class: this.placeholdertolabel && this.isLabelAboveVisible ? 'label active' :
                        (this.placeholdertolabel && !this.isLabelAboveVisible ? 'label' : 'label active') },
                    this.placeholder,
                    this.required ? h("span", { class: "label-required" }, "*") : null) : '',
            h("div", { class: this.placeholdertolabel && this.isLabelAboveVisible ? ' input-container placeholderlabel active' :
                    (this.placeholdertolabel && !this.isLabelAboveVisible ? 'input-container placeholderlabel' : 'input-container') },
                this.iconPrefix ?
                    h("div", { class: "icon-prefix", "attr-layout": "row" },
                        h("i", { class: this.iconPrefix })) : null,
                h("input", { class: "swiper-no-swiping", type: this.inputTypeState, placeholder: !this.placeholdertolabel || !this.isLabelAboveVisible ? this.placeholder : '', value: this.value, required: this.required, onBlur: ev => onInputBlurred(ev, this, '.input-container'), onInput: ev => this.onInputChanged(ev), onFocus: ev => onInputFocused(ev, this, '.input-container') }),
                this.type === 'password' && this.showPasswordToggle ?
                    h("div", { class: "icon-suffix", onClick: this.onShowPassword.bind(this), "attr-layout": "row" },
                        h("i", { class: this.inputTypeState === 'password' ? 'yo-eye' : 'yo-eye-solid', title: "Show Password" }))
                    : null,
                this.showInputClear ?
                    h("div", { class: "icon-suffix", onClick: ev => onInputClear(ev, this), "attr-layout": "row" },
                        h("i", { class: "yo-close", title: "Clear" }))
                    : null,
                this.iconSuffix ?
                    h("div", { class: "icon-suffix", onClick: ev => this.onIconClicked(this.iconSuffix), "attr-layout": "row" },
                        h("yoo-tooltip", null,
                            h("i", { class: this.iconSuffix, title: this.tooltip })))
                    : null)
        ];
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-input"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "borderColor": {
            "type": String,
            "attr": "border-color",
            "mutable": true
        },
        "host": {
            "elementRef": true
        },
        "iconPrefix": {
            "type": String,
            "attr": "icon-prefix"
        },
        "iconSuffix": {
            "type": String,
            "attr": "icon-suffix"
        },
        "inputTypeState": {
            "state": true
        },
        "isLabelAboveVisible": {
            "state": true
        },
        "isValid": {
            "method": true
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "placeholdertolabel": {
            "type": Boolean,
            "attr": "placeholdertolabel"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "showInputClear": {
            "type": Boolean,
            "attr": "show-input-clear"
        },
        "showPasswordToggle": {
            "type": Boolean,
            "attr": "show-password-toggle"
        },
        "tooltip": {
            "type": String,
            "attr": "tooltip"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "state": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "iconClicked",
            "method": "iconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-form-input-host] {\n  display: block; }\n  [data-yoo-form-input-host]   .input-container[data-yoo-form-input] {\n    border: 1px solid var(--stable-30, rgba(173, 173, 173, 0.3));\n    border-radius: 2px;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex; }\n    [data-yoo-form-input-host]   .input-container.valid[data-yoo-form-input] {\n      border: 1px solid var(--success, #2EDBB7); }\n    [data-yoo-form-input-host]   .input-container.invalid[data-yoo-form-input] {\n      border: 1px solid var(--danger, #ff625f); }\n    [data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input], [data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n      padding: 0.5rem 1rem;\n      background: var(--dark-10, #ececec);\n      color: var(--dark, #444); }\n    [data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n      -ms-flex-align: center;\n      align-items: center;\n      border-right: 1px solid var(--dark-20, #dadada); }\n    [data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n      -ms-flex-align: center;\n      align-items: center;\n      border-left: 1px solid var(--dark-20, #dadada); }\n    [data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n      padding: 0.5rem 1rem;\n      font-size: 1rem;\n      line-height: 1.5;\n      text-align: left;\n      position: relative;\n      display: block;\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n      -ms-flex: 1;\n      flex: 1;\n      width: 100%;\n      border: none;\n      font-weight: 400;\n      color: var(--black, #000000);\n      -webkit-box-shadow: white 0px 0px 0px 1000px inset !important;\n      box-shadow: white 0px 0px 0px 1000px inset !important;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box; }\n      [data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-webkit-input-placeholder {\n        color: var(--dark-20, #dadada);\n        font-weight: 100; }\n      [data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-moz-placeholder {\n        color: var(--dark-20, #dadada);\n        font-weight: 100; }\n      [data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-moz-placeholder {\n        color: var(--dark-20, #dadada);\n        font-weight: 100; }\n      [data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-ms-input-placeholder {\n        color: var(--dark-20, #dadada);\n        font-weight: 100; }\n      [data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:focus {\n        outline: none; }\n  [data-yoo-form-input-host]   .placeholderlabel[data-yoo-form-input] {\n    margin-top: 0.5rem; }\n    [data-yoo-form-input-host]   .placeholderlabel.active[data-yoo-form-input] {\n      margin-top: 0rem; }\n  [data-yoo-form-input-host]   .label[data-yoo-form-input] {\n    font-size: 0.875rem;\n    line-height: 1.5;\n    letter-spacing: 2px;\n    text-align: left;\n    color: var(--text-color, #807f83);\n    margin-bottom: 0.25rem;\n    -webkit-transform: translateY(1.875rem);\n            transform: translateY(1.875rem);\n    transition: -webkit-transform 0.2s ease-in;\n    -webkit-transition: -webkit-transform 0.2s ease-in;\n    transition: transform 0.2s ease-in;\n    transition: transform 0.2s ease-in, -webkit-transform 0.2s ease-in;\n    padding-left: 0.5rem; }\n    [data-yoo-form-input-host]   .label.active[data-yoo-form-input] {\n      margin-top: 0.25rem;\n      -webkit-transform: translateY(0rem);\n              transform: translateY(0rem); }\n    [data-yoo-form-input-host]   .label[data-yoo-form-input]   .label-required[data-yoo-form-input] {\n      margin-left: 0.25rem;\n      color: var(--danger, #ff625f); }\n\n.small[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n  padding: 0.1875rem 1rem; }\n\n.small[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input], .small[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n  padding: 0.1875rem 1rem; }\n\n.simple[data-yoo-form-input-host]   .input-container[data-yoo-form-input] {\n  border: none;\n  border-bottom: 1px solid var(--stable-30, rgba(173, 173, 173, 0.3)); }\n  .simple[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n    padding: 0.5rem 0; }\n  .simple[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n    padding: 0rem;\n    padding-left: 0.5rem;\n    padding-right: 0.5rem;\n    background: transparent;\n    color: var(--text-color, #807f83);\n    border: none; }\n  .simple[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n    padding: 0rem;\n    padding-left: 0.5rem;\n    padding-right: 0.5rem;\n    background: transparent;\n    color: var(--text-color, #807f83);\n    border: none; }\n\n.simple-icon[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n  padding: 0rem;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  background: transparent;\n  color: var(--text-color, #807f83);\n  border: none; }\n\n.simple-icon[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n  padding: 0rem;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  background: transparent;\n  color: var(--text-color, #807f83);\n  border: none; }\n\n.round[data-yoo-form-input-host]   .input-container[data-yoo-form-input] {\n  border-radius: 1.5rem; }\n  .round[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n    border-top-left-radius: 1.5rem;\n    border-bottom-left-radius: 1.5rem; }\n  .round[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n    border-top-right-radius: 1.5rem;\n    border-bottom-right-radius: 1.5rem; }\n  .round[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n    border-radius: 1.5rem; }\n\n.accent[data-yoo-form-input-host]   .input-container[data-yoo-form-input] {\n  border-color: var(--accent, #1FB6FF); }\n  .accent[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n    border-right: none;\n    color: var(--accent, #1FB6FF); }\n  .accent[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n    border-left: none;\n    color: var(--accent, #1FB6FF); }\n  .accent[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n    color: var(--accent, #1FB6FF); }\n    .accent[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-webkit-input-placeholder {\n      color: var(--accent, #1FB6FF); }\n    .accent[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-moz-placeholder {\n      color: var(--accent, #1FB6FF); }\n    .accent[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-moz-placeholder {\n      color: var(--accent, #1FB6FF); }\n    .accent[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-ms-input-placeholder {\n      color: var(--accent, #1FB6FF); }\n  .accent[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .label[data-yoo-form-input] {\n    color: var(--accent, #1FB6FF); }\n\n.success[data-yoo-form-input-host]   .input-container[data-yoo-form-input] {\n  border-color: var(--success, #2EDBB7); }\n  .success[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n    border-right: none;\n    color: var(--success, #2EDBB7); }\n  .success[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n    border-left: none;\n    color: var(--success, #2EDBB7); }\n  .success[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n    color: var(--success, #2EDBB7); }\n    .success[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-webkit-input-placeholder {\n      color: var(--success, #2EDBB7); }\n    .success[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-moz-placeholder {\n      color: var(--success, #2EDBB7); }\n    .success[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-moz-placeholder {\n      color: var(--success, #2EDBB7); }\n    .success[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-ms-input-placeholder {\n      color: var(--success, #2EDBB7); }\n  .success[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .label[data-yoo-form-input] {\n    color: var(--success, #2EDBB7); }\n\n.info[data-yoo-form-input-host]   .input-container[data-yoo-form-input] {\n  border-color: var(--info, #fc459e); }\n  .info[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n    border-right: none;\n    color: var(--info, #fc459e); }\n  .info[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n    border-left: none;\n    color: var(--info, #fc459e); }\n  .info[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n    color: var(--info, #fc459e); }\n    .info[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-webkit-input-placeholder {\n      color: var(--info, #fc459e); }\n    .info[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-moz-placeholder {\n      color: var(--info, #fc459e); }\n    .info[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-moz-placeholder {\n      color: var(--info, #fc459e); }\n    .info[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-ms-input-placeholder {\n      color: var(--info, #fc459e); }\n  .info[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .label[data-yoo-form-input] {\n    color: var(--info, #fc459e); }\n\n.warning[data-yoo-form-input-host]   .input-container[data-yoo-form-input] {\n  border-color: var(--warning, #ff6402); }\n  .warning[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n    border-right: none;\n    color: var(--warning, #ff6402); }\n  .warning[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n    border-left: none;\n    color: var(--warning, #ff6402); }\n  .warning[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n    color: var(--warning, #ff6402); }\n    .warning[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-webkit-input-placeholder {\n      color: var(--warning, #ff6402); }\n    .warning[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-moz-placeholder {\n      color: var(--warning, #ff6402); }\n    .warning[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-moz-placeholder {\n      color: var(--warning, #ff6402); }\n    .warning[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-ms-input-placeholder {\n      color: var(--warning, #ff6402); }\n  .warning[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .label[data-yoo-form-input] {\n    color: var(--warning, #ff6402); }\n\n.danger[data-yoo-form-input-host]   .input-container[data-yoo-form-input] {\n  border-color: var(--danger, #ff625f); }\n  .danger[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n    border-right: none;\n    color: var(--danger, #ff625f); }\n  .danger[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n    border-left: none;\n    color: var(--danger, #ff625f); }\n  .danger[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n    color: var(--danger, #ff625f); }\n    .danger[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-webkit-input-placeholder {\n      color: var(--danger, #ff625f); }\n    .danger[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-moz-placeholder {\n      color: var(--danger, #ff625f); }\n    .danger[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-moz-placeholder {\n      color: var(--danger, #ff625f); }\n    .danger[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-ms-input-placeholder {\n      color: var(--danger, #ff625f); }\n  .danger[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .label[data-yoo-form-input] {\n    color: var(--danger, #ff625f); }\n\n.dark[data-yoo-form-input-host]   .input-container[data-yoo-form-input] {\n  border-color: var(--dark, #444); }\n  .dark[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n    border-right: none;\n    color: var(--dark, #444); }\n  .dark[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n    border-left: none;\n    color: var(--dark, #444); }\n  .dark[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n    color: var(--dark, #444); }\n    .dark[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-webkit-input-placeholder {\n      color: var(--dark, #444); }\n    .dark[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-moz-placeholder {\n      color: var(--dark, #444); }\n    .dark[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-moz-placeholder {\n      color: var(--dark, #444); }\n    .dark[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-ms-input-placeholder {\n      color: var(--dark, #444); }\n  .dark[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .label[data-yoo-form-input] {\n    color: var(--dark, #444); }\n\n.stable[data-yoo-form-input-host]   .input-container[data-yoo-form-input] {\n  border-color: var(--stable-30, rgba(173, 173, 173, 0.3)); }\n  .stable[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-prefix[data-yoo-form-input] {\n    border-right: none;\n    color: var(--text-color, #807f83); }\n  .stable[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .icon-suffix[data-yoo-form-input] {\n    border-left: none;\n    color: var(--text-color, #807f83); }\n  .stable[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input] {\n    color: var(--text-color, #807f83); }\n    .stable[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-webkit-input-placeholder {\n      color: var(--text-color, #807f83); }\n    .stable[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-moz-placeholder {\n      color: var(--text-color, #807f83); }\n    .stable[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]::-moz-placeholder {\n      color: var(--text-color, #807f83); }\n    .stable[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   input[data-yoo-form-input]:-ms-input-placeholder {\n      color: var(--text-color, #807f83); }\n  .stable[data-yoo-form-input-host]   .input-container[data-yoo-form-input]   .label[data-yoo-form-input] {\n    color: var(--text-color, #807f83); }"; }
}

class YooFormInputContainerComponent {
    render() {
        return [
            this.description ? h("div", { class: "description", innerHTML: this.description }, " ") : '',
            this.label ?
                h("div", { class: "label" },
                    h("span", { innerHTML: this.label }),
                    this.required ? h("span", { class: "label-required" }, "*") : null) : null,
            h("div", { class: "content-container" },
                h("slot", null)),
            this.hint ? h("div", { class: "hint" }, this.hint) : ''
        ];
    }
    static get is() { return "yoo-form-input-container"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "description": {
            "type": String,
            "attr": "description"
        },
        "hint": {
            "type": String,
            "attr": "hint"
        },
        "host": {
            "elementRef": true
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        }
    }; }
    static get style() { return "[data-yoo-form-input-container-host] {\n  display: block;\n  margin-bottom: 1rem; }\n  [data-yoo-form-input-container-host]   .label[data-yoo-form-input-container] {\n    font-size: 0.875rem;\n    font-weight: normal;\n    line-height: 1.5;\n    letter-spacing: 2px;\n    text-align: left;\n    color: var(--text-color, #807f83);\n    margin-bottom: 0.25rem;\n    font-variant-caps: all-petite-caps; }\n    [data-yoo-form-input-container-host]   .label[data-yoo-form-input-container]   .label-required[data-yoo-form-input-container] {\n      margin-left: 0.25rem;\n      color: var(--danger, #ff625f); }\n  [data-yoo-form-input-container-host]   .hint[data-yoo-form-input-container] {\n    font-size: 0.75rem;\n    line-height: 1.33;\n    text-align: left;\n    color: var(--text-color, #807f83);\n    margin-top: 0.25rem;\n    margin-bottom: 0.25rem; }\n  [data-yoo-form-input-container-host]   .description[data-yoo-form-input-container] {\n    color: var(--dark, #444);\n    font-size: 0.875rem; }\n\n.accent[data-yoo-form-input-container-host]   .hint[data-yoo-form-input-container] {\n  color: var(--accent-20, #d2f0ff); }\n\n.accent[data-yoo-form-input-container-host]   .description[data-yoo-form-input-container] {\n  color: var(--accent, #1FB6FF); }\n\n.dark[data-yoo-form-input-container-host]   .hint[data-yoo-form-input-container] {\n  color: var(--dark-20, #dadada); }\n\n.dark[data-yoo-form-input-container-host]   .description[data-yoo-form-input-container] {\n  color: var(--dark, #444); }\n\n.danger[data-yoo-form-input-container-host]   .hint[data-yoo-form-input-container] {\n  color: var(--danger-20, #ffe0df); }\n\n.danger[data-yoo-form-input-container-host]   .description[data-yoo-form-input-container] {\n  color: var(--danger, #ff625f); }\n\n.success[data-yoo-form-input-container-host]   .hint[data-yoo-form-input-container] {\n  color: var(--success-20, #d5f8f1); }\n\n.success[data-yoo-form-input-container-host]   .description[data-yoo-form-input-container] {\n  color: var(--success, #2EDBB7); }\n\n.warning[data-yoo-form-input-container-host]   .hint[data-yoo-form-input-container] {\n  color: var(--warning-20, #ffe0cc); }\n\n.warning[data-yoo-form-input-container-host]   .description[data-yoo-form-input-container] {\n  color: var(--warning, #ff6402); }\n\n.info[data-yoo-form-input-container-host]   .hint[data-yoo-form-input-container] {\n  color: var(--info-20, #fedaec); }\n\n.info[data-yoo-form-input-container-host]   .description[data-yoo-form-input-container] {\n  color: var(--info, #fc459e); }\n\n.stable[data-yoo-form-input-container-host]   .hint[data-yoo-form-input-container] {\n  color: var(--stable, #adadad); }\n\n.stable[data-yoo-form-input-container-host]   .description[data-yoo-form-input-container] {\n  color: var(--stable, #adadad); }"; }
}

export { YooButtonComponent as YooButton, YooFormInputComponent as YooFormInput, YooFormInputContainerComponent as YooFormInputContainer };
