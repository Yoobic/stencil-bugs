/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function combineAsyncValidators(x, y) {
    return (a) => __awaiter(this, void 0, void 0, function* () { return (yield x(a)) && (yield y(a)); });
}
function getReducedAsyncValidator(validators) {
    return validators.reduce(combineAsyncValidators, (a) => __awaiter(this, void 0, void 0, function* () { return true; }));
}

const emailValidator = (email) => {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;
    if (!email) {
        return false;
    }
    if (email.length <= 5 || !EMAIL_REGEXP.test(email)) {
        return false;
    }
    return true;
};

function getNumberValidator(options) {
    return (val) => {
        if (val === null) {
            return false;
        }
        if (options.min && options.max) {
            return val < options.min || val > options.max ? false : true;
        }
        else if (options.min) {
            return val < options.min ? false : true;
        }
        else if (options.max) {
            return val > options.max ? false : true;
        }
        else {
            return false;
        }
    };
}

const VALIDATORS = {
    email: 'email',
    number: 'number'
};
function validatorFactory(entry) {
    switch (entry.name) {
        case VALIDATORS.email:
            return emailValidator;
        case VALIDATORS.number:
            return getNumberValidator(entry.options);
        default:
            return null;
    }
}
function isValidEntry(entry) {
    return entry && entry.name && typeof entry.name === 'string' && validatorFactory(entry) ? true : false;
}
function getValidator(validator) {
    return isValidEntry(validator) ? validatorFactory(validator) : validator;
}
function combineValidators(x, y) {
    return (a) => x(a) && y(a);
}
function getReducedValidator(validators) {
    return validators.map(item => getValidator(item)).reduce(combineValidators, (a) => true);
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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
        this._validator = (x) => true;
        this._asyncValidator = (x) => __awaiter$1(this, void 0, void 0, function* () { return true; });
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
            // VALIDATION PASSED
            this._host.setAttribute('valid', 'true');
            // UPDATE UI HERE IF YOU NEED TO
        }
        else {
            // VALIDATION REJECTED
            this._host.setAttribute('valid', 'false');
            // UPDATE UI HERE IF YOU NEED TO
        }
        return this._validator(this.value);
    }
    asyncValidate() {
        return __awaiter$1(this, void 0, void 0, function* () {
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
    static get properties() { return { "_host": { "elementRef": true }, "asyncValidate": { "method": true }, "asyncValidators": { "type": "Any", "attr": "async-validators", "watchCallbacks": ["setAsyncValidator"] }, "validate": { "method": true }, "validators": { "type": "Any", "attr": "validators", "watchCallbacks": ["setValidator"] }, "value": { "type": String, "attr": "value", "mutable": true } }; }
    static get events() { return [{ "name": "changed", "method": "changed", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return ""; }
}

export { YooFormInputValidatedComponent as YooFormInputValidated };
