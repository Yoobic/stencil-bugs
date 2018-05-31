import { Entity, IAcl, Model, Searchable, Editable, getGroupsTransform } from '@shared/data-core';
import { FormFieldType } from '@shared/interfaces';
@Model({
    className: 'GridState',
    collectionName: 'gridstate',
    fields: ['*'],
    include: []
})

export class GridState extends Entity {
    // export class GridState implements IEntity {
    _id: string;
    _acl: IAcl;
    _lmt?: string;
    _ect?: string;

    @Editable('GridState', { required: true, type: FormFieldType.text })
    @Searchable('GridState') title: string;

    @Editable('GridState', { required: true, title: 'DESCRIPTION', type: FormFieldType.textarea })
    @Searchable('GridState') description: string;

    @Editable('GridState', { title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true })
    group: string | Array<string>;

    collectionName: string;
    filters: any;
    sortModel: any;
    visibleFields: any;
    mode: any;

}
