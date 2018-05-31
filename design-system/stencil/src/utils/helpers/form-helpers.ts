//import { uuid } from 'uuid';
import * as filtrex_ from 'filtrex';
const filtrex = (filtrex_ as any).default;
import { isBlank, isPresent } from './helpers';
import { IFormField, FormFieldType, ISlide, ICondition } from '@shared/interfaces';

import { isArray, indexOf, get, isString, isNull, isUndefined, isObject, isEmpty, map, clone, isNumber, isBoolean, concat, intersection, isEqual, result, set, sortBy } from 'lodash-es';

export function isVisible(field: IFormField | ISlide, readonly = false, data, suffix = '', session: any = {}) {
    let retVal = !(field.visible === false);
    if (field.visible === false && !field.condition) {
        retVal = false;
        //TODO: fix this
    } else if ((<any>field).hideMobile) { // && this.coreConfig.isIonic()
        retVal = false;
    } else {
        if ((readonly || (<any>field).readonly === true) && !field.condition) {
            retVal = hasValue(field, data, suffix);
        } else if ((readonly || (<any>field).readonly === true) && field.condition) {
            retVal = hasValue(field, data, suffix);
            retVal = retVal && (isString(field.condition) ? evalInContext(<string>field.condition, data, suffix) : evalConditionsInContext(concat(<any>field.condition, []), data, suffix));
        } else if (field.condition && isString(field.condition)) {
            retVal = evalInContext(<string>field.condition, data, suffix);
        } else if (field.condition && (isArray(field.condition) && (<Array<any>>field.condition).length > 0 || isObject(field.condition))) {
            retVal = evalConditionsInContext(concat(<any>field.condition, []), data, suffix, session);
        } else {
            //cases : Single Condition, Array of conditions
            //type: field or tags
        }
    }
    if (<any>retVal === 0) { retVal = false; }
    return retVal;
}

export function isRequired(field: IFormField, data, visible, suffix = '', session: any = {}) {
    let retVal = false;
    if (!visible) {
        retVal = false;
    } else if (field.required === true) {
        retVal = true;
    } else if (field.required === false) {
        retVal = false;
    } else if (!isBlank(field.required) && isString(field.required)) {
        retVal = evalInContext(<string>field.required, data, suffix);
    } else if (!isBlank(field.required) && (isArray(field.required) && (<Array<any>>field.required).length > 0 || isObject(field.required))) {
        retVal = evalConditionsInContext(concat(<any>field.required, []), data, suffix, session);
    }
    return retVal;
}

export function isReadonly(field: IFormField, data, suffix = '', session: any = {}) {
    let retVal = false;
    if (field.readonly === true) {
        retVal = true;
    } else if (field.readonly === false) {
        retVal = false;
    } else if (!isBlank(field.readonly) && isString(field.readonly)) {
        retVal = evalInContext(<string>field.readonly, data, suffix);
    } else if (!isBlank(field.readonly) && (isArray(field.readonly) && (<Array<any>>field.readonly).length > 0 || isObject(field.readonly))) {
        retVal = evalConditionsInContext(concat(<any>field.readonly, []), data, suffix, session);
    }

    return retVal;
}

export function hasValue(field: IFormField, data, suffix = '') {
    if (field.type === FormFieldType.image || field.type === FormFieldType.document || field.type === FormFieldType.videoplayer) { //field.type === FormFieldType.information ||
        return true;
    }
    let options = getNameAndData(field, data, suffix);
    let retVal = false;
    if (isPresent(options.data) && options.data !== '') {
        retVal = true;
        // if (isArray(options.data) && (<Array<any>>options.data).length === 0) {
        //     retVal = false;
        // };
        // Check whether options.data is an object or array; Then check whether it is empty
        if (isObject(options.data) && isEmpty(options.data)) {
            retVal = false;
        }
        if (field.type === FormFieldType.todo && (!options.data || !options.data.values || options.data.values.length <= 0)) {
            retVal = false;
        }
    }
    return retVal;
}

export function evalConditionsInContext(conditions: Array<ICondition>, data: any, suffix = '', session: any = {}) {
    let valid = true;
    for (let condition of conditions) {
        if (isString(condition)) {
            valid = valid && evalInContext(<string><any>condition, data, suffix);
        } else if (condition.type === 'field') {
            let expression;
            if (condition.field.type === FormFieldType.selectmulti || condition.field.type === FormFieldType.selectbuttonsmulti) {
                expression = 'contains(getAttributeValue(' + '"' + condition.field.name + suffix + '"), "' + condition.values + '", "' + condition.operator + '")';
            } else if (condition.field.type === FormFieldType.select || condition.field.type === FormFieldType.selectbuttons || condition.field.type === FormFieldType.autocomplete) {
                expression = 'contains(getAttributeValue(' + '"' + condition.field.name + suffix + '"), "' + condition.values + '", "' + condition.operator + '")';
            } else {
                let value = condition.value;
                if (!value && value !== false && value !== 0) {
                    value = condition.values;
                }
                if (condition.operator === '>=' || condition.operator === '<=' || condition.operator === 'greaterthan' || condition.operator === 'lessthan') {
                    let op = condition.operator === 'greaterthan' ? '>=' : (condition.operator === 'lessthan') ? '<=' : condition.operator;
                    let separator = '';
                    if (condition.field.type === FormFieldType.date || condition.field.type === FormFieldType.datetime || condition.field.type === FormFieldType.time) {
                        separator = '"';
                    }
                    expression = 'getAttributeValue(' + '"' + condition.field.name + suffix + '")' + op + separator + value + separator;
                } else {
                    let op = (condition.operator === 'equals' || condition.operator === '===') ? '==' : (condition.operator === 'notequals' || condition.operator === '!==') ? '!=' : '==';
                    expression = 'toStringAndUppercase(getAttributeValue(' + '"' + condition.field.name + suffix + '"))' + op + 'toStringAndUppercase(' + '"' + value + '"' + ')';
                }
            }
            let retVal = evalInContext(expression, data, suffix);
            valid = valid && retVal;
        } else if (condition.type === 'tags') {
            if (!session.selectedMission || !session.selectedMission.location) {
                valid = valid && true;
            } else {
                let retVal = condition.operator === 'in' || !condition.operator ? intersection(session.selectedMission.location.tags, condition.tags).length > 0 : intersection(session.selectedMission.location.tags, condition.tags).length === 0;
                valid = valid && retVal;
            }
        } else if (condition.type === 'groups' || condition.type === 'roles') {
            let groups = condition.type === 'groups' ? session.groups : session.roles;
            let retVal = condition.operator === 'in' ? intersection(groups, condition.group).length > 0 : intersection(groups, condition.group).length === 0;
            valid = valid && retVal;
        } else if (condition.type === 'missionDescriptionAttribute') {
            if (!session.selectedMissionDescription) {
                valid = valid && true;
            } else {
                let retVal = isEqual(session.selectedMissionDescription[condition.key], condition.value);
                valid = valid && retVal;
            }
        } else if (isString(condition)) {
            let retVal = evalInContext(<string><any>condition, data, suffix);
            valid = valid && retVal;
        }
    }
    return valid;
}

export function updateFormulas(slides: Array<ISlide> = [], data, suffix = '') {
    let fields: Array<IFormField> = [];
    let didUpdate: boolean = false;
    if (slides) {
        slides.forEach(slide => {
            if (slide && slide.items) {
                fields = fields.concat(slide.items);

            }
        });
    }

    if (fields && fields.length > 0) {
        fields.forEach(field => {
            if (field.type === FormFieldType.formula) {
                let formula = field.formula;
                if (formula) {
                    let toReplace: Array<{ original: string; replacement: string }> = [];
                    for (let name in fields) {
                        let f: IFormField = fields[name];
                        if (formula.indexOf(f.title) >= 0) {
                            toReplace.push({ original: f.title, replacement: f.name });
                            //formula = formula.replace(new RegExp(f.title, 'g'), 'getAttributeValue("' + f.name + '")');
                        }
                    }
                    toReplace = sortBy(toReplace, o => -o.original.length);
                    toReplace.forEach(o => {
                        formula = formula.replace(new RegExp(o.original, 'g'), 'getAttributeValue("' + o.replacement + '")');
                    });

                    let value = evalInContext(formula, data, suffix, true);
                    if (isNumber(value) && !isNaN(value) && isFinite(value)) {
                        value = Math.round(value * 100) / 100;
                    } else {
                        value = null;
                    }

                    setFieldData(field, value, data, suffix);
                }
            }
        });
    }
    return didUpdate;
}

export function setFieldData(field: IFormField, value, data, suffix) {
    let nameAndData = getNameAndData(field, data, suffix);
    set(data, nameAndData.name, value);
}

function evalInContext(js: string, data: any, suffix = '', rawValue = false) {
    let flattenContext = data;
    let extraFunctions = {
        getAttributeValue: filtrexGetAttributeValue(data),
        contains: filtrexContains,
        isNullOrEmpty: filtrexIsNullOrEmpty,
        toStringAndUppercase: filtrexToStringAndUppercase,
        endsWith: filtrexEndsWith,
        indexOf: filtrexIndexOf(data),
        length: filtrexLength(data)
    };
    if (typeof js !== 'string') {
        return true;
    }
    if (js.indexOf('.') > 0) {
        flattenContext = slenderizeObject(data);
    }
    try {
        let expression = filtrex(js, extraFunctions);
        let retVal = expression(flattenContext || {});
        if (rawValue) {
            return retVal;
        }
        return !!retVal;
    } catch (err) {
        window['console'].log(err);
    }
    return true;
}

function filtrexContains(array, values, contains) {
    if (!array || (isArray(array) && array.length === 0)) {
        array = [];
    }
    if (!isArray(array)) {
        array = [array];
    }
    let val = values.split(',');
    let found = 0;
    for (let v of val) {
        if (indexOf(array, v) >= 0) {
            found++;
        }
    }
    switch (contains) {
        case 'in':
        case 'contains':
            return found >= 1;
        case 'notin':
        case 'notcontains':
            return found === 0;
        case 'containsall':
            return found === val.length;
        case 'equals':
        case '===':
            return val.length === array.length && found === val.length;
        case 'notequals':
        case '!==':
            return val.length === array.length && found === 0;
    }
}

function filtrexIsNullOrEmpty(value) {
    if (isBlank(value) || value.length === 0) {
        return true;
    }
    return false;
}

function filtrexGetAttributeValue(data: any) {
    let f = (key) => {
        return get(data, key);
    };
    return f;
}

function filtrexToStringAndUppercase(value) {
    if (value) {
        return value.toString().toUpperCase();
    }
    return value;
}

function filtrexIndexOf(data: any) {
    return (path, value) => {
        let array: Array<any> = <any>get(data, path);
        if (array && array.indexOf) {
            return array.indexOf(value);
        }
        return -1;
    };
}

function filtrexEndsWith(value: string, searchString) {
    if (value && value.endsWith) {
        return value.endsWith(searchString);
    }
    return false;
}

function filtrexLength(data: any) {
    return (path) => {
        let temp = <any>get(data, path);
        if (isArray(temp)) {
            let array: Array<any> = temp;
            if (array && array.indexOf) {
                return array.length;
            }
        } else if (isString(temp) && !isNull(temp) && !isUndefined(temp)) {
            return temp.length;
        } else if (isObject(temp) && !isEmpty(temp)) {
            return 1;
        }
        return 0;
    };
}

function slenderizeObject(fatObject) {
    let propertyIdentifiers = [];
    let slenderObject = {};

    function processNode(theNode, _propertyIdentifiers, _slenderObject) {
        theNode = theNode || {};
        _propertyIdentifiers = _propertyIdentifiers || [];
        let retVal = map(theNode,
            (value, key) => {
                let myKeys = clone(_propertyIdentifiers);
                let ret = {};
                myKeys.push(key);
                // if value is a string, number or boolean
                if (isString(value) || isNumber(value) || isBoolean(value)) {
                    // build a keyString to use as a property identifier
                    let keyString = myKeys.join('.');
                    // add a property with that identifier and childNode as the value to our return object
                    ret[keyString] = _slenderObject[keyString] = value;
                } else {
                    // Call processNode recursively if value isn't a leaf node type (string, number or boolean)
                    processNode(value, myKeys, _slenderObject);
                    ret = value;
                }
                return ret;
            }
        );
        return retVal;
    }
    processNode(fatObject, propertyIdentifiers, slenderObject);
    return slenderObject;
}

export function getFieldPath(field: IFormField, suffix: string) {
    return field.name + (suffix ? suffix : '');
}
export function getFieldValue(field: IFormField, initialData: Object, suffix: string): any {
    let name = getFieldPath(field, suffix);
    let data = result(initialData, name);
    return data;
}
function getNameAndData(field: IFormField, initialData: Object, suffix) {
    let name = getFieldPath(field, suffix);
    let data = getFieldValue(field, initialData, suffix);
    return { name: name, data: data };
}
