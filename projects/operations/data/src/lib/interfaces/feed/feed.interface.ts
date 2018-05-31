import { Model, Searchable, Editable, FORM_FILES_IMAGE_FILTER, getGroupsTransform, ROLES_CONDITIONS } from '@shared/data-core';
import { FormFieldType, IFile, IFeed, IFeedComment } from '@shared/interfaces';

import { Translate } from '@shared/translate';

let conditions = {
    isShowCalendar: 'showCalendar == 1'
};

@Model({
    className: 'Feed',
    collectionName: 'feeds',
    fields: ['*'], //, 'missiondescription.title', 'missiondescription.background', 'missiondescription.icon', 'user._id', 'user.firstName', 'user.lastName', 'user.username', 'user.imageData', 'comments._id', 'document._filename'],
    include: ['user', 'missiondescription', { relation: 'comments', scope: { fields: ['_id'] } }, { relation: 'document' }]
})

export class Feed extends IFeed {

    @Editable('Feed', { required: true, type: FormFieldType.text })
    @Searchable('Feed') title: string;

    @Editable('Feed', { required: true, title: 'DESCRIPTION', type: FormFieldType.textarea, filterable: false, sortable: false, language: 'html' }) //
    description: string;

    @Editable('Feed', { title: 'FEEDTAGS', type: FormFieldType.autocomplete, tag: true, allowCustomTag: true, collectionName: 'feeds', multiple: true, icon: 'yo-flag', subQuery: { field: 'feedRef', values: '_id' }, exportOrder: 13 })
    tags?: Array<string>;

    @Editable('Feed', { type: FormFieldType.autocomplete, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, maxWidth: 616, maxHeight: 616, crop: 'square', collectionName: 'files', title: 'PHOTO', required: true, columnDefinition: { name: '_downloadURL' }, filterable: false, sortable: false })
    image: any;

    @Editable('Feed', { type: FormFieldType.autocomplete, fixedPosition: true, collectionName: 'files', required: false, columnDefinition: { name: '_downloadURL' }, filterable: false, sortable: false })
    document: IFile;
    documentRef: string;

    @Editable('Feed', { title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, required: true })
    group: string | Array<string>;

    @Editable('Feed', { type: FormFieldType.checkbox, flex: 100, columnDefinition: { width: 40 }, filterableAdvanced: true, advanced: true })
    disableNotifications: boolean;

    @Editable('Feed', { type: FormFieldType.checkbox, flex: 50, columnDefinition: { width: 40 }, filterableAdvanced: true, advanced: true })
    disableLikes: boolean;

    @Editable('Feed', { type: FormFieldType.checkbox, flex: 50, columnDefinition: { width: 40 }, filterableAdvanced: true, advanced: true })
    disableComments: boolean;

    @Editable('Feed', { type: FormFieldType.checkbox, flex: 100, columnDefinition: { width: 40 }, filterableAdvanced: true, advanced: true })
    showCalendar: boolean;

    @Editable('Feed', { type: FormFieldType.checkbox, flex: 100, columnDefinition: { width: 40 }, filterableAdvanced: true, advanced: true, condition: [ROLES_CONDITIONS.isAdmin] })
    sticky: boolean;

    @Editable('Feed', { flex: 50, type: FormFieldType.date, filterableAdvanced: true, condition: conditions.isShowCalendar, advanced: true })
    startDate: Date;

    @Editable('Feed', { flex: 50, type: FormFieldType.date, filterableAdvanced: true, condition: conditions.isShowCalendar, advanced: true })
    endDate: Date;

    @Editable('Feed', { type: FormFieldType.autocomplete, translate: true, values: Translate.availablesLanguageAll, clearable: false, required: true, advanced: true })
    language: string;

    @Editable('Feed', { type: FormFieldType.date, title: 'CREATIONDATE', name: '_ect', readonly: true, suppressExport: true, filterableAdvanced: false, advanced: true })
    creationDate?: any;

    comments: Array<FeedComment>;

}

@Model({
    className: 'FeedComment',
    collectionName: 'feedsComments',
    fields: ['*', 'user._id', 'user.firstName', 'user.lastName', 'user.username', 'user.imageData'],
    include: ['user']
})

export class FeedComment extends IFeedComment {

    group?: string | Array<string>;

    @Editable('FeedComment', { required: true, type: FormFieldType.text })
    @Searchable('FeedComment')
    text: string;

    @Editable('FeedComment', { required: true, type: FormFieldType.date })
    date: Date;
}
