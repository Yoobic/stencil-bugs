import { IFormField, MOBILE_FORM_FIELDS_ALL, FormFieldType, ICondition, IConditionalField } from '@shared/interfaces';

import { Editable } from '../../decorators/editable/editable.decorator';
import { Model } from '../../decorators/model/model.decorator';
import { CONDITION_TYPES } from './icondition.interface';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';

import { map } from 'lodash-es';

export const ROLES = [
    'dashboard', 'admin', 'manager', 'team', 'teamplus', 'creator', 'service', 'supervisor', 'quora', 'kiosk', 'score', 'nochat', 'anonymous', 'stat', 'todo',
    'serviceuser', 'polluser', 'newsuser', 'newscreator', 'documentsuser', 'calendaruser', 'store', 'clientadmin', 'missionanalysis', 'missionviewer', 'followup', 'followupnouser', 'profilenoedit',
    'workplace', 'trial', 'videocall', 'academy', 'pharmaone', 'instagram'
];

export const ROLES_ASK = [
    'manager', 'creator', 'quora', 'academy', 'academyplus'
];

export const ROLES_CONDITIONS = {
    isAdmin: { type: 'roles', operator: 'in', group: ['admin'] },
    isClientAdmin: { type: 'roles', operator: 'in', group: ['clientadmin'] },
    isAdminOrClientAdmin: { type: 'roles', operator: 'in', group: ['admin', 'clientadmin'] },
    isNotAdmin: { type: 'roles', operator: 'nin', group: ['admin'] },
    isManager: { type: 'roles', operator: 'in', group: ['manager'] },
    isTeam: { type: 'roles', operator: 'in', group: ['team'] },
    isWorkplace: { type: 'roles', operator: 'in', group: ['admin', 'workplace'] },
    isTrial: { type: 'roles', operator: 'in', group: ['trial'] },
    isNotTrial: { type: 'roles', operator: 'nin', group: ['trial'] },
    hasTodo: { type: 'roles', operator: 'in', group: ['todo'] },
    hasService: { type: 'roles', operator: 'in', group: ['admin', 'service'] }
};

// export const CLIENTS_CONDITIONS = {
//     isNotGmi: { type: 'groups', operator: 'nin', group: ['gmi_france'] }
// };

let conditions = {
    isNotField: 'type!="field"',
    isField: 'type=="field"',
    isTag: 'type=="tags"',
    isGroup: 'type=="groups"',
    isSelect: 'field.type=="selectmulti" or field.type=="selectbuttonsmulti"',
    isToggle: 'field.type=="checkbox" or field.type=="toggle"',
    isAutocomplete: 'field.type=="select" or field.type=="selectbuttons" or field.type=="autocomplete"',
    isFieldSimple: 'type=="field" and (field.type=="text" or field.type=="email" or field.type=="number" or field.type=="formula" or field.type=="date" or field.type=="tel" or field.type=="time" or field.type=="range" or field.type=="starrating")',
    isFieldWithValues: 'type=="field" and (field.type=="checkbox" or field.type=="toggle" or field.type=="select" or field.type=="selectmulti" or field.type=="selectbuttons" or field.type=="selectbuttonsmulti" or field.type=="autocomplete" or field.type=="selectimage")'
};

export function getGroupsTransform(res: ResponseObject) {
    if (res.data && res.data.filter) {
        res.data = res.data.filter(g => ROLES.indexOf(g._id) < 0 && g.isRole !== true);
    }
    return res;
}

export function isNotInformationField(m) {
    return m.type !== FormFieldType.information;
}

export function getFormFieldValues() {
    return map(MOBILE_FORM_FIELDS_ALL.filter(isNotInformationField), 'type');
}

@Model({ className: 'Condition' })
export class Condition extends ICondition {
    @Editable('Condition', { type: FormFieldType.text, required: true })
    title: string;

    @Editable('Condition', { type: FormFieldType.autocomplete, translate: true, values: CONDITION_TYPES, required: true })
    type: string;

    @Editable('Condition', { type: FormFieldType.autocomplete, condition: conditions.isField, required: true, idAttributeName: 'name' })
    field?: IFormField;

    // { condition: conditions.isSelect, values: ['in', 'notin', 'containsall'] }
    // contains all : check that all values are present.
    // Deactivated for the moment to be compatible with the V2
    @Editable('Condition', {
        type: FormFieldType.autocomplete,
        required: true,
        multiple: false,
        translate: true,
        condition: 'type',
        conditionalValues: [
            { condition: conditions.isNotField, values: ['in', 'notin'] },
            { condition: conditions.isSelect, values: ['in', 'notin'] },
            { condition: conditions.isToggle, values: ['equals', 'notequals'] },
            { condition: conditions.isAutocomplete, values: ['equals', 'in', 'notin'] }
        ],
        defaultValues: ['equals', 'notequals', 'greaterthan', 'lessthan']
    })
    operator: string;

    @Editable('Condition', { type: FormFieldType.autocomplete, condition: conditions.isTag, tag: true, multiple: true, collectionName: 'locations', required: true })
    tags?: Array<string>;

    @Editable('Condition', { title: 'GROUPS', required: true, type: 'autocomplete', collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, condition: conditions.isGroup, multiple: true, clearable: false })
    group?: Array<string>;

    @Editable('Condition', { type: FormFieldType.autocomplete, required: true, condition: conditions.isFieldWithValues, dynamicValues: 'field.values', defaultValues: ['true', 'false'], multiple: true })
    values: Array<any>;

    @Editable('Condition', { dynamicType: 'field.type', defaultType: FormFieldType.text, required: true, condition: conditions.isFieldSimple })
    value: any;
}

@Model({ className: 'ConditionalField' })
export class ConditionalField extends IConditionalField {

    @Editable('ConditionalField', { type: FormFieldType.text, readonly: true, title: 'FIELDIF' })
    fieldTitle: string;

    @Editable('ConditionalField', {
        type: FormFieldType.autocomplete,
        required: true,
        multiple: false,
        translate: true,
        title: 'FIELDIS',
        conditionalValues: [{ condition: conditions.isNotField, values: ['in', 'notin'] }, { condition: conditions.isSelect, values: ['in', 'notin'] }, { condition: conditions.isToggle, values: ['equals', 'notequals'] }, { condition: conditions.isAutocomplete, values: ['equals', 'in', 'notin'] }],
        defaultValues: ['equals', 'notequals', 'greaterthan', 'lessthan']
    })
    operator: string;

    @Editable('ConditionalField', { type: FormFieldType.autocomplete, required: true, condition: conditions.isFieldWithValues, dynamicValues: 'field.values', defaultValues: ['true', 'false'], multiple: true })
    values: Array<any>;

    @Editable('ConditionalField', { dynamicType: 'field.type', defaultType: FormFieldType.text, required: true, condition: conditions.isFieldSimple })
    value: any;

    @Editable('ConditionalField', { type: FormFieldType.autocomplete, required: true, title: 'FIELDTYPE', values: getFormFieldValues(), translate: true })
    newFieldType: string;

    @Editable('ConditionalField', { type: FormFieldType.text, required: true, title: 'TITLE' })
    newfieldTitle: string;

    @Editable('ConditionalField', { title: 'INSTRUCTIONS', type: FormFieldType.textarea })
    newfieldDescription: string;

    @Editable('ConditionalField', { title: 'MANDATORY', type: FormFieldType.checkbox })
    newFieldRequired: boolean;
}
