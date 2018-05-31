import { Entity, IAcl, Condition, Model, Editable, getGroupsTransform } from '@shared/data-core';
import { FormFieldType, IFormField } from '@shared/interfaces';

@Model({
    className: 'CustomFormField',
    collectionName: 'customFormFields',
    fields: ['*'],
    include: []
})

export class CustomFormField extends Entity {
    // export class CustomFormField implements IEntity {
    _id: string;
    _acl: IAcl;
    _lmt?: string;
    _ect?: string;

    @Editable('CustomFormField', { type: FormFieldType.text, required: true })
    title: string;

    @Editable('CustomFormField', { type: FormFieldType.textarea })
    description: string;

    @Editable('CustomFormField', { type: FormFieldType.autocomplete, multiple: true, required: true, idAttributeName: 'name', displayType: 'formfield' })
    fields: Array<IFormField>;

    conditions: Array<Condition>;

    @Editable('CustomFormField', { title: 'GROUPS', type: 'autocomplete', collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, required: true, allowCustomTag: true, tag: false })
    group: string;

}
