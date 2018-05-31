import { Entity, IAcl, User, Model, Editable, Searchable, FORM_FILES_IMAGE_FILTER, getGroupsTransform } from '@shared/data-core';
import { FormFieldType } from '@shared/interfaces';

@Model({
    className: 'Channels',
    collectionName: 'channels',
    fields: ['*'],
    include: ['users']
})

export class Channels extends Entity {
    // export class Channels implements IEntity {
    _id: string;
    _acl: IAcl;
    _lmt?: string;
    _ect?: string;

    channel: string;

    @Editable('Channels', { required: true, type: FormFieldType.text })
    @Searchable('Channels') name: string;

    @Editable('Channels', { type: FormFieldType.autocomplete, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, collectionName: 'files', title: 'BACKGROUND', required: false, columnDefinition: { name: '_downloadURL' } })
    background: any;

    @Editable('Channels', { title: 'GROUPS', flex: 100, required: true, type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false })
    group: string;

    @Editable('Channels', { type: FormFieldType.autocomplete, required: true, collectionName: 'user', clearable: true, multiple: true, columnDefinition: { name: 'username' } })
    users: Array<User>;

    others: Array<User>;

    lastMessage: any;
    lastMessageAlternate: boolean;
    lastMessageDate?: any;
}
