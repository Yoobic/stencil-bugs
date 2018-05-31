/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as getReducedValidator, b as getReducedAsyncValidator } from './chunk-acfcbd22.js';

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// TEST COMPONENT
class YooFormInputValidatedComponent {
    constructor() {
        this.validators = [];
        // Reduced Validators
        this._validator = (x) => true;
        this._asyncValidator = (x) => __awaiter(this, void 0, void 0, function* () { return true; });
    }
    setValidator() {
        this._validator = getReducedValidator(this.validators);
    }
    setAsyncValidator() {
        this._asyncValidator = getReducedAsyncValidator(this.asyncValidators);
    }
    componentWillLoad() {
        this.setValidator();
        this.setAsyncValidator();
    }
    onChange(ev) {
        this.value = ev.target.value;
        this.validate();
        this.changed.emit(this.value);
    }
    validate() {
        if (this._validator(this.value)) {
            this.host.setAttribute('valid', 'true');
        }
        else {
            this.host.setAttribute('valid', 'false');
        }
        return this._validator(this.value);
    }
    asyncValidate() {
        return __awaiter(this, void 0, void 0, function* () {
            let validation = yield this._asyncValidator(this.value);
            return validation;
        });
    }
    render() {
        return (h("div", null,
            h("input", { type: "text", value: this.value, onChange: (ev) => this.onChange(ev), onInput: (ev) => this.onChange(ev) })));
    }
    static get is() { return "yoo-form-input-validated"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "asyncValidate": {
            "method": true
        },
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators",
            "watchCallbacks": ["setAsyncValidator"]
        },
        "host": {
            "elementRef": true
        },
        "validate": {
            "method": true
        },
        "validators": {
            "type": "Any",
            "attr": "validators",
            "watchCallbacks": ["setValidator"]
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "changed",
            "method": "changed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

export { YooFormInputValidatedComponent as YooFormInputValidated };
