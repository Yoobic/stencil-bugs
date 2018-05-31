import { Injectable } from '@angular/core';
import { ICondition , CONDITION_TYPES, CONDITION_ALL_OPERATORS, SIMPLE_FIELD_TYPES, WITH_VALUES_FIELD_TYPES } from '@shared/data-core';

import * as uuid from 'uuid';

import { isEqual, omit, isArray } from 'lodash-es';

@Injectable()
export class Conditions {
    constructor() {}

    generateConditionId() {
        return uuid.v4();
    }

    convertOperator(op: string) {
        if (!op) {
            return 'in';
        }
        let retVal;
        switch (op.toLowerCase().replace(/\s/g, '')) {
            case 'equals':
            case '==':
            case '===':
            case 'égal':
                retVal = 'equals';
                break;
            case 'notequals':
            case '!=':
            case '!==':
            case 'différentde':
                retVal = 'notequals';
                break;
            case 'greaterthan':
            case '>=':
            case 'plusgrandque':
                retVal = 'greaterthan';
                break;
            case 'lessthan':
            case '<=':
            case 'pluspetitque':
                retVal = 'lessthan';
                break;
            case 'in':
            case 'contient':
            case 'contains':
                retVal = 'in';
                break;
            case 'notin':
            case 'necontientpas':
            case 'notcontains':
                retVal = 'notin';
                break;
        }
        return retVal;
    }

    convertType(type: string) {
        if (!type) {
            return;
        }
        let retVal;
        switch (type.toLowerCase().replace(/\s/g, '')) {
            case 'field':
            case 'champ':
                retVal = 'field';
                break;
            case 'tags':
                retVal = 'tags';
                break;
            case 'groups':
            case 'groupes':
                retVal = 'groups';
                break;
            default:
                retVal = '';
                break;
        }
        return retVal;
    }

    convertField(f) {
        if (!f) {
            return;
        }
        let res = { name: f.name, title: f.title, type: f.type };
        if (f.values) {
            res['values'] = f.values;
        }
        return res;
    }

    isValid(c: ICondition) {
        if (!c) {
            return false;
        }
        let isTitleValid = c.title && !!c.title.replace(/\s/g, '');
        let isOpValid = c.operator && CONDITION_ALL_OPERATORS.indexOf(c.operator) >= 0;
        let isTypeValid = c.type && CONDITION_TYPES.indexOf(c.type) >= 0;
        let isFieldValid = c.type === 'field' && c.field;
        let isTagsValid = c.type === 'tags' && c.tags && isArray(c.tags) && c.tags.length > 0;
        let isGroupValid = c.type === 'groups' && c.group && isArray(c.group) && c.group.length > 0;
        let isValueValid = c.type === 'field' && isFieldValid && SIMPLE_FIELD_TYPES.indexOf(c.field.type) >= 0 && c.value;
        let areValuesValid = c.type === 'field' && isFieldValid && WITH_VALUES_FIELD_TYPES.indexOf(c.field.type) >= 0 && c.values && isArray(c.values) && c.values.length > 0;

        return isTitleValid && isOpValid && isTypeValid && (isGroupValid || isTagsValid || (isFieldValid && (isValueValid || areValuesValid)));

    }

    areEqual(c1: ICondition, c2: ICondition) {
        if (c1._id && c2._id) {
            return c1._id === c2._id;
        } else if (!c1._id && !c2._id) {
            return isEqual(c1, c2);
        } else if (c1._id && !c2._id) {
            return isEqual(c2, omit(c1, '_id'));
        } else if (!c1._id && c2._id) {
            return isEqual(c1, omit(c2, '_id'));
        }
    }
}
