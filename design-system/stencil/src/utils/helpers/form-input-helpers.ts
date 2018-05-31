import { FormFieldType, IFormInputBase, moment } from '@shared/interfaces';
import { getReducedValidator, getReducedAsyncValidator } from '../validators';
import { isPresent } from './helpers';

export function setValidator(inputElement: IFormInputBase<any>) {
    let _validator = getReducedValidator<string>(inputElement.validators);
    let _asyncValidator = getReducedAsyncValidator<string>(inputElement.asyncValidators);
    inputElement._validator = _validator;
    inputElement._asyncValidator = _asyncValidator;
    //we call this to validate the initial value
    validate(inputElement);
}

function parseNumber(value: any) {
    let val = parseFloat(value);
    return isNaN(val) ? null : val;
}

export function convertValueForInputType(v: any, type: string): any {
    switch (type) {
        case FormFieldType.number:
        case FormFieldType.range: {
            return parseNumber(v);
        }
        case FormFieldType.date:
            //case FormFieldType.betweendate:
            {
                if (!isPresent(v)) {
                    return null;
                }
                let val = moment(v);
                return val.isValid() ? val.format('YYYY-MM-DD') : null;
            }
        case FormFieldType.datetime: {
            if (!isPresent(v)) {
                return null;
            }
            let val = moment(v);
            return val.isValid() ? val.format('YYYY-MM-DDTHH:mm') : null; //
        }
        case FormFieldType.time: {
            if (!isPresent(v)) {
                return null;
            }
            let val = moment(v); //, 'HH:mm'
            return val.isValid() ? val.format('YYYY-MM-DDTHH:mm') : v;
        }
        default:
            return v;
    }
}

export function onFocus(ev: any, inputElement: IFormInputBase<any>): void {
    let inputEl = inputElement.host ? inputElement.host.querySelector('input') : null;
    if (inputEl) {
        inputEl.focus();
    }
    if (ev && ev.target && ev.target.value) { inputElement.iconClicked.emit(ev.target.value); }
}

export function onInputFocused(ev: any, inputElement: IFormInputBase<any>, borderContainerSelector: string = '.input-container'): void {
    // this.isLabelAboveVisible = true;
    inputElement.inputFocused.emit(true);
    if (inputElement.host.querySelector(borderContainerSelector) && inputElement.borderColor) {
        inputElement.host.querySelector(borderContainerSelector).setAttribute('style', `border-color: var(--${inputElement.borderColor});`);
    }
}

export function onInputBlurred(ev: any, inputElement: IFormInputBase<any>, borderContainerSelector: string = '.input-container'): void {
    inputElement.inputBlurred.emit(ev);
    // this.isLabelAboveVisible = false;
    let container = inputElement.host.querySelector(borderContainerSelector);
    if (container) {
        container.classList.remove('invalid');
        container.classList.remove('valid');
        if (!inputElement.validity) {
            container.classList.add('invalid');
        } else if (inputElement.validity || inputElement.borderColor) {
            container.classList.add('valid');
        }
    }
}

export function onInputClear(ev: any, inputElement: IFormInputBase<any>): void {
    inputElement.value = '';
    inputElement.iconClicked.emit('clear');
}

export function validate(inputElement): boolean {
    if (inputElement._validator) {
        let currentValidity = inputElement._validator(inputElement.value);
        if (inputElement.validity !== currentValidity) {
            inputElement.validityChanged.emit(currentValidity);
        }
        inputElement.validity = currentValidity;  // update the validity
        return inputElement.validity;
    }
    return true;
}

export function setValueAndValidateInput(value: any, inputElement: any): void {
    inputElement.value = value;
    if (validate(inputElement)) {   // only emit new value if it is valid
        inputElement.inputChanged.emit(inputElement.value);
    }
}

// @Method()
// async asyncValidate(): Promise<boolean> {
//     let validation: boolean = await inputElement._asyncValidator(this.value);
//     return validation;
// }