import { Model, Editable, Searchable, FORM_FILES_IMAGE_FILTER, getGroupsTransform } from '@shared/data-core';
import { FormFieldType, IMissionCategory } from '@shared/interfaces';

@Model({
    className: 'MissionCategory',
    collectionName: 'missioncategories',
    fields: ['*'],
    include: []
})

export class MissionCategory extends IMissionCategory {

    @Editable('MissionCategory', { title: 'TITLE', required: true, type: FormFieldType.text, icon: 'yo-shorttext' })
    @Searchable('MissionCategory') title: string;

    @Editable('MissionCategory', { type: FormFieldType.autocomplete, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, maxWidth: 600, maxHeight: 300, crop: 'square', collectionName: 'files', title: 'BACKGROUND', required: true, columnDefinition: { name: '_downloadURL' } })
    background: any;

    @Editable('MissionCategory', { title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, required: true })
    group: string | Array<string>;

}
