import { Injectable, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Log, CoreConfig, isPresent, isBlank, slenderizeObject } from '@shared/common';
import { Translate } from '@shared/translate';
import { Condition, Session, Slide, MissionDescription, Models } from '@shared/data-core';
import { FormFieldType, IFormField } from '@shared/interfaces';
import { formInputCatalogValidatorRequired, formFilterFieldValidatorRequired, formInputSelectValidatorRequired, formInputChecklistValidatorRequired, formInputBetweenValidatorRequired, formInputBaseEmailValidatorRequired, formInputMissionfieldValidatorRequired, formInputBaseNumberValidatorNumber, formInputMultiphotosValidatorRequired, formInputPhotoValidatorRequired } from '../../validators';

import * as uuid from 'uuid';
import { filtrex } from 'filtrex';

import { cloneDeep, isFunction, keys, isEmpty, isArray, isObject, isNull, isUndefined, isString, forEach, concat, filter, sortBy, isEqual, indexOf, get, set, mergeWith, intersection, result, isNumber, isBoolean } from 'lodash-es';

export interface FieldControl {
    [key: string]: any;
}

@Injectable()
export class FormDynamicBuilder {
    constructor(private builder: FormBuilder, private session: Session, private translate: Translate, private coreConfig: CoreConfig, private log: Log, private injector: Injector) { }

    generateFieldName() {
        return uuid.v4();
    }

    build(formDefinition: Array<IFormField>, slides: Array<Slide>, initialData: any, suffix = '', readonly = false, showComments = false, formDynamic, extraValidators = null, allowAnnotate = false, liveAnswers = false): {
        fieldControls: { [key: string]: FormControl },
        form: FormGroup,
        fieldData: Object,
        fields: Object,
        slidesState: Array<{ visible: boolean }>,
        formDefinition: Array<IFormField>
    } {

        //console.log('FormDynamicBuilder build', formDefinition);
        let fieldControls = {};
        let fieldData = {};
        let fields = {};
        if (!formDefinition) {
            return { fieldControls, form: null, fieldData, fields, slidesState: [], formDefinition: [] };
        }
        let slidesState = this.updateSlidesState(slides, initialData, suffix);
        formDefinition.forEach((field) => {
            let control = this.updateField(field, initialData, suffix, readonly, fieldData, fields, fieldControls, slidesState);
            let options;
            if (isFunction(field.onChange)) {
                control.valueChanges.subscribe((fieldValue) => {
                    if (control.touched) {
                        let originalFormDefinition = cloneDeep(formDefinition);
                        let forceChange = field.onChange(fieldValue, fieldControls, formDynamic.data, field, formDefinition, formDynamic);
                        if (forceChange === true && !isEqual(originalFormDefinition, formDefinition)) {
                            formDynamic.formDefinition = formDefinition.slice();
                            formDynamic.buildFormDefinition();
                            formDynamic.markForCheck();
                        }

                    }
                });
            }

            if (allowAnnotate) {
                field.allowAnnotate = true;
            }
            if (field.allowTime) {
                options = this.getNameAndData(field, initialData, '.time');
                fieldData[options.name] = options.data;
                control.valueChanges.subscribe((val) => {
                    formDynamic.data[field.name] = formDynamic.data[field.name] || {};
                    if (isObject(formDynamic.data[field.name])) {
                        formDynamic.data[field.name]['time'] = new Date();
                    }
                });
            }
            if (showComments && field.allowComments) {
                options = this.getNameAndData(field, initialData, '.comments');
                let controlComments = new FormControl(options.data, null);
                fieldControls[options.name] = controlComments;
                fieldData[options.name] = options.data;
            }
            if (field.allowTask) {
                options = this.getNameAndData(field, initialData, '.tasks');
                let controlTask = new FormControl(options.data, null);
                fieldControls[options.name] = controlTask;
                fieldData[options.name] = options.data;
            }
            if (field.answer) {
                options = this.getNameAndData(field, initialData, '.answer');
                fieldData[options.name] = options.data;
            }
            if (field.explanation) {
                options = this.getNameAndData(field, initialData, '.explanation');
                fieldData[options.name] = options.data;
            }
            if (field.advanced) {
                fields[field.name].advanced = field.advanced;
            }
            if (liveAnswers && isPresent(control.value)) {
                fields[field.name].readonly = true;
            }
        });
        let form = this.builder.group(fieldControls, extraValidators);
        return { fieldControls, form, fieldData, fields, slidesState, formDefinition };
    }

    updateFieldData(formDefinition: Array<IFormField>, slides: Array<Slide>, fields: Object, fieldControls, initialData: any, fieldData: Object, suffix = '', readonly = false, liveAnswers = false, changedData) {
        if (!formDefinition) {
            return;
        }
        let slidesState = this.updateSlidesState(slides, initialData, suffix);
        let keysData = keys(changedData || {});
        formDefinition.forEach((field) => {
            let slide;
            if (slides) {
                slide = slides.find(s => (s.items || []).map(f => f.name).indexOf(field.name) >= 0);
            }
            if (keysData.length === 0 || keysData.indexOf(field.name) >= 0 || field.condition || (slide && slide.condition)) {
                //console.log('FormDynamicBuilder updateFieldData', field);
                let control = this.updateField(field, initialData, suffix, readonly, fieldData, fields, fieldControls, slidesState);
                let visible = fields[field.name].visible;
                //let required = fields[field.name].required;
                let validators = fields[field.name].validators;

                //remove value of hidden field , maybe add a check if the field has conditions
                if (!visible && field.condition && !isEmpty(field.condition) && isPresent(control.value) && field.deleteOnHidden !== false) {
                    setTimeout(() => {
                        control.markAsTouched();
                        control.setValue(null, { onlySelf: false, emitModelToViewChange: true, emitEvent: true }); //, { onlySelf: true, emitModelToViewChange: false, emitEvent: false });
                    }, 200);
                }
                //this will not work anymore if we add custom validators other than required
                // if ((required && !control.validator) || (!required && control.validator)) {
                control.clearValidators();
                control.setValidators(validators);
                control.updateValueAndValidity({ emitEvent: false }); //keysData.length !== 0});
                // }

                if (liveAnswers && isPresent(control.value)) {
                    fields[field.name].readonly = true;
                }
            }
        });
        return { slidesState };
    }

    updateField(field: IFormField, initialData: any, suffix: string, readonly: boolean, fieldData: Object, fields: Object, fieldControls: any, slidesState) {
        //console.log('FormDynamicBuilder updateField', field.name, field);
        let options = this.getNameAndData(field, initialData, suffix);
        let visible = this.isVisible(field, readonly, initialData, suffix);
        if (field.slideIndex >= 0 && slidesState && slidesState.length > field.slideIndex && slidesState[field.slideIndex].visible === false) {
            visible = false;
        }
        let required = this.isRequired(field, initialData, suffix, visible);
        let validators = this.getRequiredValidators(field, required);
        let asyncValidators = this.getAsyncValidators(field);
        readonly = readonly || this.isReadonly(field, initialData, suffix);

        let control: FormControl;
        if (fieldControls && fieldControls[options.name]) {
            control = fieldControls[options.name];
        } else {
            control = new FormControl(options.data, validators, asyncValidators);
            fieldControls[options.name] = control;
        }

        if (field.dynamicValues) {
            field.values = <any>get(initialData, field.dynamicValues) || field.defaultValues;
        }
        if (field.dynamicType) {
            field.type = <any>get(initialData, field.dynamicType) || field.defaultType;
            if (field.type === FormFieldType.formula) {
                field.type = FormFieldType.number;
            }
        }
        if (field.conditionalValues) {
            let values;
            field.conditionalValues.forEach((c) => {
                if (this.evalInContext(c.condition, initialData, suffix)) {
                    values = c.values;
                }
            });
            field.values = values || field.defaultValues;
        }

        fieldData[options.name] = options.data;
        if (isArray(fieldData[options.name])) {
            fieldData[options.name] = fieldData[options.name].slice();
        }
        //else if (isJsObject(fieldData[options.name])) {
        //     fieldData[options.name] = Object.assign({}, fieldData[options.name]);
        // }

        fields[field.name] = {
            name: options.name,
            required: required,
            visible: visible,
            validators: validators,
            readonly: readonly,
            answer: field.answer,
            explanation: field.explanation,
            advanced: field.advanced,
            title: field.title
        };
        return control;
    }

    updateSlidesState(slides: Array<Slide>, initialData: any, suffix: string) {
        let slidesState = [];
        if (slides) {
            slidesState = slides.map((slide: Slide) => {
                return { visible: this.isVisible(slide, false, initialData, suffix), hasAdvanced: slide.items && slide.items.filter(f => f.advanced).length > 0 };
            });
        }
        return slidesState;
    }

    getRequiredValidators(field: IFormField, required: boolean): Array<(c: FormControl | AbstractControl) => { [validator: string]: boolean | { valid: boolean; }; }> {
        let retVal: Array<(c: FormControl | AbstractControl) => { [validator: string]: boolean | { valid: boolean; }; }> = [];
        if (required) {
            if (field.type === FormFieldType.filter) {
                retVal.push(formFilterFieldValidatorRequired());
            } else if (field.type === FormFieldType.selectmulti || field.type === FormFieldType.selectbuttonsmulti || field.type === FormFieldType.autocomplete) {
                retVal.push(formInputSelectValidatorRequired());
            } else if (field.type === FormFieldType.betweendate || field.type === FormFieldType.betweennumber) {
                retVal.push(formInputBetweenValidatorRequired());
            } else if (field.type === FormFieldType.missionfield) {
                retVal.push(formInputMissionfieldValidatorRequired());
            } else if (field.type === FormFieldType.photo) {
                retVal.push(formInputPhotoValidatorRequired(field));
            } else if (field.type === FormFieldType.multiphotos) {
                retVal.push(formInputMultiphotosValidatorRequired(field, { min: field.minPhotos }));
            } else if (field.type === FormFieldType.checklist) {
                retVal.push(formInputChecklistValidatorRequired());
            } else if (field.type === FormFieldType.catalog) {
                retVal.push(formInputCatalogValidatorRequired());
            } else if (field.type !== FormFieldType.information) {
                retVal.push(Validators.required);
            }
        }
        if (field.type === 'email') {
            retVal.push(formInputBaseEmailValidatorRequired());
        }
        if (field.type === 'number') {
            retVal.push(formInputBaseNumberValidatorNumber({ min: field.min, max: field.max }));
        }
        if (field.type === FormFieldType.inttel) {
            retVal.push(Validators.required);
        }
        return retVal;
    }

    getAsyncValidators(field: IFormField) {
        let retVal = [];
        if (field && field.asyncValidators) {
            retVal = field.asyncValidators.map(f => f(this.injector));
        }
        return retVal;
    }

    group(fieldControls: FieldControl) {
        return this.builder.group(fieldControls);
    }

    getChangedValues(form: FormGroup) {
        let retVal = {};
        forEach(form.controls, (control: FormControl, key: string) => {
            if (control.touched) {
                set(retVal, key, control.value);
                control['_touched'] = false;
            }
        });
        return retVal;
    }

    hasValue(field: IFormField, data, suffix = '') {
        if (field.type === FormFieldType.image || field.type === FormFieldType.document || field.type === FormFieldType.videoplayer) { //field.type === FormFieldType.information ||
            return true;
        }
        let options = this.getNameAndData(field, data, suffix);
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

    isVisible(field: IFormField | Slide, readonly = false, data, suffix) {
        let retVal = !(field.visible === false);
        if (field.visible === false && !field.condition) {
            retVal = false;
        } else if ((<any>field).hideMobile && this.coreConfig.isIonic()) {
            retVal = false;
        } else {
            if ((readonly || (<any>field).readonly === true) && !field.condition) {
                retVal = this.hasValue(field, data, suffix);
            } else if ((readonly || (<any>field).readonly === true) && field.condition) {
                retVal = this.hasValue(field, data, suffix);
                retVal = retVal && (isString(field.condition) ? this.evalInContext(<string>field.condition, data, suffix) : this.evalConditionsInContext(concat(<any>field.condition, []), data, suffix));
            } else if (field.condition && isString(field.condition)) {
                retVal = this.evalInContext(<string>field.condition, data, suffix);
            } else if (field.condition && (isArray(field.condition) && (<Array<any>>field.condition).length > 0 || isObject(field.condition))) {
                retVal = this.evalConditionsInContext(concat(<any>field.condition, []), data, suffix);
            } else {
                //cases : Single Condition, Array of conditions
                //type: field or tags
                //this.log.log('condition not implemented yet', field);
            }
        }
        if (<any>retVal === 0) { retVal = false; }
        return retVal;
    }

    isRequired(field: IFormField, data, suffix, visible) {
        let retVal = false;
        if (!visible) {
            retVal = false;
        } else if (field.required === true) {
            retVal = true;
        } else if (field.required === false) {
            retVal = false;
        } else if (!isBlank(field.required) && isString(field.required)) {
            retVal = this.evalInContext(<string>field.required, data, suffix);
        } else if (!isBlank(field.required) && (isArray(field.required) && (<Array<any>>field.required).length > 0 || isObject(field.required))) {
            retVal = this.evalConditionsInContext(concat(<any>field.required, []), data, suffix);
        }
        return retVal;
    }

    isReadonly(field: IFormField, data, suffix) {
        let retVal = false;
        if (field.readonly === true) {
            retVal = true;
        } else if (field.readonly === false) {
            retVal = false;
        } else if (!isBlank(field.readonly) && isString(field.readonly)) {
            retVal = this.evalInContext(<string>field.readonly, data, suffix);
        } else if (!isBlank(field.readonly) && (isArray(field.readonly) && (<Array<any>>field.readonly).length > 0 || isObject(field.readonly))) {
            retVal = this.evalConditionsInContext(concat(<any>field.readonly, []), data, suffix);
        }

        return retVal;
    }

    answerIsValid(value, answer, field) {
        let ignoreOrder: boolean = field.type !== FormFieldType.ranking && field.type !== FormFieldType.missingword;

        if (Models.isNumberField(field)) {
            answer = [].concat(answer).map(a => (a - 0));
        }

        if (Models.isBooleanField(field)) {
            answer = [].concat(answer).map(a => (!isNull(a) && !isUndefined(a) && (a === 'true' || a === true || a.toUpperCase() === this.translate.get('true').toUpperCase())));
        }

        if (answer && answer.sort && ignoreOrder) {
            return isEqual(answer.sort(), [].concat(value).sort());
        } else if (answer) {
            return isEqual([].concat(answer), [].concat(value));
        }
        return false;
    }

    mergeData(data, values) {
        let retVal = Object.assign({}, mergeWith(data, values, (objValue, value) => {
            //not sure about this fix to detec if we are in the comments case where we want to merge or in an entity case where we want to replace
            if (isArray(value) || (isObject(value) && (value._id || value.title))) {
                return value;
            }
        }));
        return retVal;
    }

    hasScoring(missiondescription: MissionDescription) {
        if (missiondescription && missiondescription.scoring && missiondescription.scoring.length > 0) { // && _some(missiondescription.scoring, (score: any) => score.isActive)) {
            return true;
        }
        return false;
    }

    calculateScoring(mission: any, data: { [key: string]: any }) {
        if (mission.description.scoring.length > 1) {
            mission.extraScores = {};
        }
        forEach(mission.description.scoring, (scoring: any) => {
            //let scoring = _find(mission.description.scoring, (s: any) => s.isActive);
            let scoreValue = scoring.initialValue || 0;
            let scorePercentageBasis = scoring.percentageBasis || 0;
            forEach(data, (value, key) => {
                if (value && isArray(value.value)) {
                    forEach(value.value, v => {
                        if (v && isNumber(scoring[key + this.encodeScoringValue(v)])) {
                            let numValue = scoring[key + this.encodeScoringValue(v)];
                            if (numValue < 0 && (-numValue) % 1337 === 0) {
                                scorePercentageBasis -= (-numValue) / 1337;
                            } else {
                                scoreValue += numValue;
                            }
                        }
                    });
                } else {
                    if (value && isNumber(scoring[key + this.encodeScoringValue(value.value)])) {
                        let numValue = scoring[key + this.encodeScoringValue(value.value)];
                        if (numValue < 0 && (-numValue) % 1337 === 0) {
                            scorePercentageBasis -= (-numValue) / 1337;
                        } else {
                            scoreValue += numValue;
                        }
                    } else if (value && isNumber(value.value) && isNumber(scoring[key])) {
                        scoreValue += value.value * scoring[key];
                    } else if (isBoolean(value.value) && scoring[key + 'value']) {
                        //not sure why we have the 'value' in the form creator
                        if (value.value && isNumber(scoring[key + 'value'].value)) {
                            scoreValue += scoring[key + 'value'].value;
                        } else if (!value.value && isNumber(scoring[key + 'value'].novalue)) {
                            scoreValue += scoring[key + 'value'].novalue;
                        }
                    }
                }

                if (value && isPresent(value.value) && scoring[key + 'value'] && isNumber(scoring[key + 'value'].visible)) {
                    scorePercentageBasis += scoring[key + 'value'].visible;
                }
            });

            if (scoring.isPercentage && scorePercentageBasis > 0) {
                scoreValue = Math.round(scoreValue * 100 / scorePercentageBasis);
            }
            let score = { value: scoreValue, isPercentage: scoring.isPercentage, title: scoring.title };
            if (scoring.isActive || mission.description.scoring.length === 1) {
                mission.score = score;
                if ((scoring.minValue || scoring.minValue === 0) && scoreValue < scoring.minValue) {
                    mission.validated = false;
                }
            } else {
                mission.extraScores[score.title] = score;
            }
        });
    }

    calculateScoringQuizz(mission: any, slides: Array<Slide>, data: { [key: string]: any }) {
        let score = { total: 0, value: 0 };
        let fields = Models.getFieldsFromSlides(slides);
        forEach(fields, (field) => {
            if (field.answer && field.answer.length > 0) {
                score.total += 1;
            }
            if (data[field.name] && this.answerIsValid(data[field.name].value, field.answer, field)) {
                score.value += 1;
            }
        });
        mission.score = score;
    }

    hasTabs(formDefinition: Array<IFormField>) {
        return formDefinition.some(f => f.tab && f.tab.length > 0);
    }

    getSlides(formDefinition: Array<IFormField>) {
        let map = new Map<string, Slide>();
        map.set('GENERAL', <Slide>{ title: this.translate.get('GENERAL'), items: [], order: 0 });
        formDefinition.forEach(f => {
            let tabName = this.getTabName(f);
            if (!f.tab) {
                map.get('GENERAL').items.push(f);
            } else if (map.has(tabName)) {
                map.get(tabName).items.push(f);
                if (f.tabCondition) {
                    map.get(tabName).condition = <any>f.tabCondition;
                }
            } else {
                map.set(tabName, <Slide>{ title: tabName, items: [f], condition: f.tabCondition });
            }
        });
        return filter(sortBy(Array.from(map.values()), slide => slide.title), slide => slide.items.length > 0);
    }

    updateDataFieldType(data, fields: Array<IFormField>) {
        data.nonapplicableCount = 0;
        data.satisfactoryCount = 0;
        data.unsatisfactoryCount = 0;

        forEach(fields, (field) => {
            if (isObject(data[field.name])) {
                data[field.name].fieldType = field.type;
                data[field.name].fieldTitle = field.title;

                if (data[field.name] && data[field.name].value && field.type === FormFieldType.photo && field.values && (!data[field.name].tags || data[field.name].tags.length < 1)) {
                    data[field.name].tags = field.values;
                } else if (data[field.name] && data[field.name].value && field.type === FormFieldType.multiphotos && field.values) {
                    data[field.name].extraData = data[field.name].extraData || {};
                    data[field.name].value.forEach((v, i) => {
                        data[field.name].extraData[i] = data[field.name].extraData[i] || {};
                        if (!data[field.name].extraData[i].tags || data[field.name].extraData[i].tags.length < 1) {
                            data[field.name].extraData[i].tags = field.values;
                        }
                    });
                }

                if (field.shareToFeed) {
                    data[field.name].fieldShareToFeed = field.shareToFeed;
                }
                if (field.answer) {
                    data[field.name].answer = field.answer;
                    data[field.name].fieldValidity = this.answerIsValid(data[field.name].value, field.answer, field);
                }
                if (field.explanation) {
                    data[field.name].explanation = field.explanation;
                }
                if (field.valuesType) {
                    let value = data[field.name].value;
                    let type = field.valuesType.find(t => t.key === value);
                    if (type) {
                        data[field.name].valueType = type.value;
                    }
                }

                if (field.valuesType && data[field.name] && data[field.name].value) {
                    let values: Array<any> = [].concat(data[field.name].value);
                    values.forEach(key => {
                        let type = field.valuesType.find(t => t.key === key);
                        if (type) {
                            if (type.value === 'satisfactory') {
                                data.satisfactoryCount += 1;
                            } else if (type.value === 'unsatisfactory') {
                                data.unsatisfactoryCount += 1;
                            } else if (type.value === 'nonapplicable') {
                                data.nonapplicableCount += 1;
                            }
                        }
                    });
                }
            }
        });
    }

    getTabName(field: IFormField) {
        let retVal = '';
        if (field.tabIndex) {
            retVal += field.tabIndex + '. ';
        }
        if (field.tab) {
            retVal += this.translate.get(field.tab);
        }
        return retVal;
    }

    evalInContext(js: string, data: any, suffix = '', rawValue = false) {
        let flattenContext = data;
        let extraFunctions = {
            getAttributeValue: this.filtrexGetAttributeValue(data),
            contains: this.filtrexContains,
            isNullOrEmpty: this.filtrexIsNullOrEmpty,
            toStringAndUppercase: this.filtrexToStringAndUppercase,
            endsWith: this.filtrexEndsWith,
            indexOf: this.filtrexIndexOf(data),
            length: this.filtrexLength(data)
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
            this.log.log(err);
        }
        return true;
    }

    evalConditionsInContext(conditions: Array<Condition>, data: any, suffix = '') {
        let valid = true;
        let retVal;
        let op;
        conditions.forEach(condition => {
            if (isString(condition)) {
                valid = valid && this.evalInContext(<string><any>condition, data, suffix);
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
                        op = condition.operator === 'greaterthan' ? '>=' : (condition.operator === 'lessthan') ? '<=' : condition.operator;
                        let separator = '';
                        if (condition.field.type === FormFieldType.date || condition.field.type === FormFieldType.datetime || condition.field.type === FormFieldType.time) {
                            separator = '"';
                        }
                        expression = 'getAttributeValue(' + '"' + condition.field.name + suffix + '")' + op + separator + value + separator;
                    } else {
                        op = (condition.operator === 'equals' || condition.operator === '===') ? '==' : (condition.operator === 'notequals' || condition.operator === '!==') ? '!=' : '==';
                        expression = 'toStringAndUppercase(getAttributeValue(' + '"' + condition.field.name + suffix + '"))' + op + 'toStringAndUppercase(' + '"' + value + '"' + ')';
                    }
                }
                retVal = this.evalInContext(expression, data, suffix);
                valid = valid && retVal;
            } else if (condition.type === 'tags') {
                if (!(<any>this.session).selectedMission || !(<any>this.session).selectedMission.location) {
                    valid = valid && true;
                } else {
                    retVal = condition.operator === 'in' || !condition.operator ? intersection((<any>this.session).selectedMission.location.tags, condition.tags).length > 0 : intersection((<any>this.session).selectedMission.location.tags, condition.tags).length === 0;
                    valid = valid && retVal;
                }
            } else if (condition.type === 'groups' || condition.type === 'roles') {
                let groups = condition.type === 'groups' ? this.session.groups : this.session.roles;
                retVal = condition.operator === 'in' ? intersection(groups, condition.group).length > 0 : intersection(groups, condition.group).length === 0;
                valid = valid && retVal;
            } else if (condition.type === 'missionDescriptionAttribute') {
                if (!(<any>this.session).selectedMissionDescription) {
                    valid = valid && true;
                } else {
                    retVal = isEqual((<any>this.session).selectedMissionDescription[condition.key], condition.value);
                    valid = valid && retVal;
                }
            } else if (isString(condition)) {
                retVal = this.evalInContext(<string><any>condition, data, suffix);
                valid = valid && retVal;
            }
        });
        return valid;
    }

    filtrexContains: Function = (array, values, contains) => {
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

    filtrexIsNullOrEmpty: Function = (value) => {
        if (isBlank(value) || value.length === 0) {
            return true;
        }
        return false;
    }

    filtrexGetAttributeValue: Function = (data: any) => {
        let f = (key) => {
            return get(data, key);
        };
        return f;
    }

    filtrexToStringAndUppercase: Function = (value) => {
        if (value) {
            return value.toString().toUpperCase();
        }
        return value;
    }

    filtrexIndexOf: Function = (data: any) => {
        return (path, value) => {
            let array: Array<any> = <any>get(data, path);
            if (array && array.indexOf) {
                return array.indexOf(value);
            }
            return -1;
        };
    }

    filtrexEndsWith: Function = (value: string, searchString) => {
        if (value && value.endsWith) {
            return value.endsWith(searchString);
        }
        return false;
    }

    filtrexLength: Function = (data: any) => {
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

    encodeScoringValue(v) {
        if (v && v.toString) {
            return v.toString().replace(/\./, '_');
        } else {
            return v;
        }
    }

    private getNameAndData(field: IFormField, initialData, suffix) {
        let name = field.name + (suffix || '');
        let data = result(initialData, name);
        return { name: name, data: <any>data };
    }
}
