import { getReducedValidator, getReducedAsyncValidator } from '../validators';
import { isPresent } from './helpers';
import { services } from '../../services';

import * as moment_ from 'moment';
const moment = (moment_ as any).default;

import * as momentTimeZone_ from 'moment-timezone';
const momentTimeZone = momentTimeZone_;

export { moment, momentTimeZone };
let inputBlur: boolean = true;

export function setValidator(inputElement:  any) {
    let _validator = getReducedValidator<string>(inputElement.validators);
    let _asyncValidator = getReducedAsyncValidator<string>(inputElement.asyncValidators);
    inputElement._validator = _validator;
    inputElement._asyncValidator = _asyncValidator;
    //we call this to validate the initial value
    validate(inputElement);
}

export function parseNumber(value: any) {
    let val = parseFloat(value);
    return isNaN(val) ? null : val;
}

export function parseStringToNumber(value: any): string {
    let matchedString = /^\-?\d*((\.|\,)\d*)?/.exec(value);
    let val;
    if (matchedString && Array.isArray(matchedString) && matchedString[0].length > 0) {
        val = matchedString[0];
    } else {
        val = '';
    }
    return val;
}

function focusIcons(inputElement:  any, borderContainerSelector: string = '.input-container'): void {
    if (inputElement.host.querySelector('.invalid-message')) { inputElement.host.querySelector('.invalid-message').classList.remove('invalid'); }
    if (inputElement.host.querySelector(borderContainerSelector)) {inputElement.host.querySelector(borderContainerSelector).classList.add('focused'); }
    if (inputElement.host.querySelector('.valid-icon')) { inputElement.host.querySelector('.valid-icon').classList.remove('valid'); }
    let iconContainers = inputElement.host.querySelectorAll('.icon-suffix-focus');
    if (iconContainers[0]) {iconContainers[0].classList.add('focused'); }
    if (iconContainers[1]) {iconContainers[1].classList.add('focused'); }
}

function convertTimeToDate(timestr) {
    let currentDate = new Date();
    let time = timestr.split(':');
    currentDate.setHours(time[0]);
    currentDate.setMinutes(time[1]);
    return currentDate;
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
            v = convertTimeToDate(v);
            let val = moment(v); //, 'HH:mm'
            return val.isValid() ? val.format('YYYY-MM-DDTHH:mm') : v;
        }
        default:
            return v;
    }
}

export function onFocus(ev: any, inputElement:  any): void {
    let inputEl = inputElement.host ? inputElement.host.querySelector('input') : null;
    if (inputEl) {
        inputEl.focus();
    }
    if (ev && ev.target && ev.target.value) { inputElement.iconClicked.emit(ev.target.value); }
}

export function onInputFocused(ev: any, inputElement:  any, borderContainerSelector: string = '.input-container', type: string = 'text'): void {
    console.log('input focused event being emitted');
    // this.isLabelAboveVisible = true;
    inputElement.inputFocused.emit(true);
    focusIcons(inputElement, borderContainerSelector);
}

export function onInputBlurred(ev: any, inputElement:  any, borderContainerSelector: string = '.input-container', type: string = 'text'): void {
    inputBlur = true;
    inputElement.inputBlurred.emit(ev);
    let iconContainers = inputElement.host.querySelectorAll('.icon-suffix-focus');
    setTimeout (() => {
        if (inputBlur) {
            if (inputElement.host.querySelector(borderContainerSelector)) { inputElement.host.querySelector(borderContainerSelector).classList.remove('focused'); }
            if (iconContainers[0]) {iconContainers[0].classList.remove('focused'); }
            if (iconContainers[1]) {iconContainers[1].classList.remove('focused'); }
            // this.isLabelAboveVisible = false;
            if (type !== 'password') {
                let container = inputElement.host.querySelector(borderContainerSelector);
                let iconContainer = inputElement.host.querySelector('.valid-icon');
                if (container) {
                    container.classList.remove('invalid');
                    container.classList.remove('valid');
                    if (iconContainer) { iconContainer.classList.remove('valid'); }
                    if (!inputElement.validity) {
                        container.classList.add('invalid');
                        if (inputElement.host.querySelector('.invalid-message')) {inputElement.host.querySelector('.invalid-message').classList.add('invalid'); }
                    } else if (inputElement.validity || inputElement.borderColor) {
                        container.classList.add('valid');
                        if (iconContainer) { iconContainer.classList.add('valid'); }
                    }
                }
            }
        }
    }, 150);
}

export function onInputClear(ev: any, inputElement:  any,  borderContainerSelector: string = '.input-container'): void {
    inputElement.value = '';
    inputElement.iconClicked.emit('clear');
    inputElement.host.querySelector('input').focus();
    inputBlur = false;
}

export function onIconClicked(icon: any, inputElement:  any): void {
    inputElement.iconClicked.emit(icon);
    inputElement.host.querySelector('input').focus();
    inputBlur = false;
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
        console.log('input change event being emited');
        inputElement.inputChanged.emit(inputElement.value);
    }
}

export function cleanupWKWebViewImagePath(value: string) {
    if (services.coreConfig.isWKWebView()) {
        return value.replace('file://', '');
    }
    return value;
}

export type Validator<A> = (x: A) => boolean;

export type AsyncValidator<A> = (x: A) => Promise<boolean>;

export interface ValidatorEntry {
    name?: string;
    options?: any;
}

export class FormFieldType {
    static audio: string = 'audio';
    static autocomplete: string = 'autocomplete';
    static barcode: string = 'barcode';
    static checkbox: string = 'checkbox';
    static date: string = 'date';
    static time: string = 'time';
    static datetime: string = 'datetime-local';
    static document: string = 'document';
    static documentuploader: string = 'documentuploader';
    static email: string = 'email';
    static emailreport: string = 'emailreport';
    static information: string = 'information';
    static image: string = 'image';
    static json: string = 'json';
    static number: string = 'number';
    static missionfield: string = 'missionfield';
    static missionscore: string = 'missionscore';
    static password: string = 'password';
    static photo: string = 'photo';
    static multiphotos: string = 'multiphotos';
    static range: string = 'range';
    static ranking: string = 'ranking';
    static select: string = 'select';
    static selectimage: string = 'selectimage';
    static selectmulti: string = 'selectmulti';
    static selectbuttons: string = 'selectbuttons';
    static selectbuttonsmulti: string = 'selectbuttonsmulti';
    static selectchat: string = 'selectchat';
    static swipeselect: string = 'swipeselect';
    static signature: string = 'signature';
    static starrating: string = 'starrating';
    static tel: string = 'tel';
    static text: string = 'text';
    static textarea: string = 'textarea';
    static toggle: string = 'toggle';
    static video: string = 'video';
    static grid: string = 'grid';
    static daterange: string = 'daterange';
    static filter: string = 'filter';
    static betweennumber: string = 'between-number';
    static betweendate: string = 'between-date';
    static betweendatetime: string = 'between-datetime';
    static betweentime: string = 'between-time';
    static timer: string = 'timer';
    static location: string = 'location';
    static catalog: string = 'catalog';
    static todo: string = 'todo';
    static button: string = 'button';
    static stripecard: string = 'stripecard';
    static invite: string = 'invite';
    static inttel: string = 'inttel';
    static color: string = 'color';
    static productcheck: string = 'productcheck';
    static missingword: string = 'missingword';
    static knob: string = 'knob';
    static connect: string = 'connect';
    static videoplayer: string = 'videoplayer';
    static game: string = 'game';
    static checklist: string = 'checklist';
    static task: string = 'task';
    static formula: string = 'formula';
    static schedule: string = 'schedule';
    static address: string = 'address';

}

// @Method()
// async asyncValidate(): Promise<boolean> {
//     let validation: boolean = await inputElement._asyncValidator(this.value);
//     return validation;
// }