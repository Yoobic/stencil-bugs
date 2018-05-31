import { Entity, IAcl, Model, Searchable, Editable, Slide, getGroupsTransform, FORM_FILES_IMAGE_FILTER } from '@shared/data-core';
import { FormFieldType, IFormField } from '@shared/interfaces';

let conditions = {
    isAllowInventory: 'allowInventory == 1'
};

@Model({
    className: 'CustomModel',
    collectionName: 'custommodels',
    fields: ['*']
})

export class CustomModel extends Entity {
    // export class CustomModel implements IEntity {

    @Editable('CustomModel', { type: FormFieldType.text, visible: false })
    _id: string;

    _acl: IAcl;
    _lmt?: string;
    _ect?: string;

    @Editable('CustomModel', { required: true, type: FormFieldType.text })
    @Searchable('CustomModel')
    title: string;

    @Editable('CustomModel', { required: true, type: FormFieldType.text })
    @Searchable('CustomModel')
    name: string;

    @Editable('CustomModel', { required: false, type: FormFieldType.textarea })
    @Searchable('CustomModel')
    shortDescription: string;

    @Editable('CustomModel', { required: true, flex: 100, type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false })
    group: Array<string>;

    @Editable('CustomModel', { type: FormFieldType.checkbox, flex: 100, title: 'INVENTORY', columnDefinition: { width: 80 } })
    allowInventory: boolean;

    @Editable('CustomModel', { type: FormFieldType.autocomplete, required: true, condition: conditions.isAllowInventory, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, maxWidth: 750, maxHeight: 240, crop: 'square', collectionName: 'files', title: 'BACKGROUND', columnDefinition: { name: '_downloadURL' }, filterable: false, sortable: false })
    background: any;

    // @Editable('CustomModel', { required: false, type: FormFieldType.text })
    // @Searchable('CustomModel')
    feathersService: string;

    fields: Array<IFormField>;
    properties?: Array<any>;
    permissions?: string;

    appearance?: any;

    slides?: Array<Slide>;
}
