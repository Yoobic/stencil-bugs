/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { b as FormFieldType } from './chunk-b8bd1aac.js';
import { a as getReducedValidator, b as getReducedAsyncValidator } from './chunk-acfcbd22.js';

function setValidator(validators) {
    return getReducedValidator(validators);
}
function setAsyncValidator(asyncValidators) {
    return getReducedAsyncValidator(asyncValidators);
}
function parseNumber(value) {
    let val = parseFloat(value);
    return isNaN(val) ? null : val;
}
function convertValueForInputType(v, type) {
    switch (type) {
        case FormFieldType.number:
        case FormFieldType.range: {
            return parseNumber(v);
        }
        // case FormFieldType.date:
        //     //case FormFieldType.betweendate:
        //     {
        //         if (!isPresent(v)) {
        //             return null;
        //         }
        //         let val = moment(v);
        //         return val.isValid() ? val.format('YYYY-MM-DD') : null;
        //     }
        // case FormFieldType.datetime: {
        //     if (!isPresent(v)) {
        //         return null;
        //     }
        //     let val = moment(v);
        //     return val.isValid() ? val.format('YYYY-MM-DDTHH:mm') : null; //
        // }
        // case FormFieldType.time: {
        //     if (!isPresent(v)) {
        //         return null;
        //     }
        //     let val = moment(v); //, 'HH:mm'
        //     return val.isValid() ? val.format('YYYY-MM-DDTHH:mm') : v;
        // }
        default:
            return v;
    }
}
function onInputFocused(ev, inputElement, borderContainerSelector = '.input-container') {
    // this.isLabelAboveVisible = true;
    inputElement.inputFocused.emit(true);
    if (inputElement.host.querySelector(borderContainerSelector) && inputElement.borderColor) {
        inputElement.host.querySelector(borderContainerSelector).setAttribute('style', `border-color: var(--${inputElement.borderColor});`);
    }
}
function onInputBlurred(ev, inputElement, borderContainerSelector = '.input-container') {
    inputElement.inputBlurred.emit(ev);
    // this.isLabelAboveVisible = false;
    let container = inputElement.host.querySelector(borderContainerSelector);
    if (container) {
        container.classList.remove('invalid');
        container.classList.remove('valid');
        if (!inputElement.validity) {
            container.classList.add('invalid');
        }
        else if (inputElement.validity || inputElement.borderColor) {
            container.classList.add('valid');
        }
    }
}
function onInputClear(ev, inputElement) {
    inputElement.value = '';
    inputElement.iconClicked.emit('clear');
}
function validate(inputElement) {
    let currentValidity = inputElement._validator(inputElement.value);
    if (inputElement.validity !== currentValidity) {
        inputElement.validityChanged.emit(currentValidity);
    }
    inputElement.validity = currentValidity; // update the validity
    return inputElement.validity;
}
function setValueAndValidateInput(value, inputElement) {
    inputElement.value = value;
    if (validate(inputElement)) { // only emit new value if it is valid
        inputElement.inputChanged.emit(inputElement.value);
    }
}
// @Method()
// async asyncValidate(): Promise<boolean> {
//     let validation: boolean = await inputElement._asyncValidator(this.value);
//     return validation;
// }

export { setValidator as a, setAsyncValidator as b, onInputBlurred as c, setValueAndValidateInput as d, onInputFocused as e, onInputClear as f, convertValueForInputType as g };
