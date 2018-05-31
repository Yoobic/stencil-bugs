import { Model, Editable, Searchable, getGroupsTransform } from '@shared/data-core';
import { IInstagram, FormFieldType, IInstagramConfig } from '@shared/interfaces';

@Model({
    className: 'Instagram',
    collectionName: 'instagramfeedresult',
    fields: ['*'],
    include: []
})

export class Instagram extends IInstagram {
    // export class Instagram implements IEntity {

    @Searchable('Instagram')
    title: string;

    @Searchable('Instagram')
    tags: string;

    @Searchable('Instagram')
    caption_text: string;
}

@Model({
    className: 'InstagramConfig',
    collectionName: 'instagramfeedconfig',
    fields: ['*'],
    include: []
})

export class InstagramConfig extends IInstagramConfig {
    _id: string;

    @Editable('InstagramConfig', { type: FormFieldType.text, required: true })
    @Searchable('InstagramConfig')
    title: string;

    @Editable('InstagramConfig', { type: FormFieldType.text, required: true })
    @Searchable('InstagramConfig')
    tags: string;

    @Editable('InstagramConfig', { title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, required: true })
    group: string | Array<string>;

}