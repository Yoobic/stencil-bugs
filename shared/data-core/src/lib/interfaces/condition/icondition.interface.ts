export const CONDITION_TYPES = ['field', 'tags', 'groups'];
export const CONDITION_ALL_OPERATORS = ['equals', 'notequals', 'in', 'notin', 'greaterthan', 'lessthan'];
export const SIMPLE_FIELD_TYPES = ['text', 'email', 'number', 'date', 'tel', 'time', 'range', 'starrating'];
export const WITH_VALUES_FIELD_TYPES = ['checkbox', 'toggle', 'select', 'selectmulti', 'selectbuttons', 'selectbuttonsmulti', 'autocomplete'];

export interface ICondition {
    _id?: string;
    type?: string;
    operator?: string;
    title?: string;
    field?: any;
    tags?: Array<string>;
    group?: Array<string>;
    values?: Array<any>;
    value?: any;
    key?: string;
}
