import { Model, Editable, Searchable, User, getGroupsTransform } from '@shared/data-core';
import { FormFieldType, INote } from '@shared/interfaces';

@Model({
    className: 'Note',
    collectionName: 'notes',
    fields: ['*', 'owner._id', 'owner.firstName', 'owner.lastName', 'owner.username', 'owner.imageData'],
    include: ['owner']
})

export class Note extends INote {
    @Editable('Note', { type: FormFieldType.photo, filterable: false, title: 'PHOTO', columnDefinition: { width: 52 }, allowLibrary: true })
    imageData: string;

    @Editable('Note', { required: true, title: 'NOTE', type: FormFieldType.textarea })
    @Searchable('Note')
    text: string;

    @Editable('Note', { required: false, type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: true })
    group: Array<string>;

    owner: User;
}
