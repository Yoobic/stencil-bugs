import { Model, Editable, Searchable, User, Location, getGroupsTransform, MissionDescription } from '@shared/data-core';
import { MissionValidationRendererComponent } from '@shared/data-form';
import { IPhoto, IPhotoTag, IPhotoExport, FormFieldType } from '@shared/interfaces';

@Model({
    className: 'Photo',
    collectionName: 'photos',
    fields: ['*', 'user.imageData', 'user.username', 'missiondescription.title', 'location.title', 'location._geoloc'],
    include: ['user', 'missiondescription', 'location']
})

export class Photo extends IPhoto {
    public static sortModel = [{ colId: 'date', sort: 'desc' }, { colId: 'missiondataRef', sort: 'desc' }, { colId: 'slideIndex', sort: 'asc' }, { colId: 'itemIndex', sort: 'asc' }, { colId: 'multiIndex', sort: 'asc' }];

    @Editable('Photo', {
        type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', title: 'CAMPAIGN', required: true, icon: 'yo-bicycle', columnDefinition: { name: 'title', hidden: true },
        filters: [
            [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        ],
        hiddenFields: ['archived'],
        subQueryOverride: { field: 'missiondescriptionRef', values: '_id' }
    })
    missiondescription: MissionDescription;

    @Searchable('Photo')
    missiondescriptionTitle: string;

    @Editable('Photo', { required: true, icon: 'yo-shorttext', type: FormFieldType.text, columnDefinition: { width: 150 } })
    @Searchable('Photo')
    title: string;

    @Editable('Photo', { required: false, type: FormFieldType.text, columnDefinition: { width: 150 }, filterableAdvanced: true })
    @Searchable('Photo')
    address: string;

    @Editable('Photo', {
        type: FormFieldType.autocomplete,
        translate: true,
        values: [true, false, undefined],
        handleUndefined: true,
        flex: 50,
        clearable: true,
        icon: 'yo-check',
        columnDefinition: { width: 120 },
        cellRenderer: MissionValidationRendererComponent.renderer
    })
    validated: boolean;

    @Editable('Photo', { type: FormFieldType.toggle, flex: 100, title: 'FLAGGED' })
    flagged: boolean;

    @Editable('Photo', { title: 'TAGS', type: FormFieldType.autocomplete, tag: true, collectionName: 'photos', multiple: true })
    tags: Array<string>;

    @Editable('Photo', { required: false, icon: 'yo-mission', type: FormFieldType.text, filterableAdvanced: true })
    @Searchable('Photo')
    locationId: string;

    @Editable('Photo', { type: FormFieldType.autocomplete, collectionName: 'locations', required: true, icon: 'yo-building', columnDefinition: { name: 'title', hidden: true, width: 80 } })
    location: Location;

    @Editable('Photo', { required: true, icon: 'yo-calendar', type: FormFieldType.date, columnDefinition: { width: 80 } })
    date: Date;

    @Editable('Photo', { title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, required: true })
    group: string | Array<string>;

    @Searchable('Photo')
    userDisplayname: string;

    @Editable('Photo', { type: FormFieldType.autocomplete, collectionName: 'user', required: true, icon: 'yo-user', columnDefinition: { name: 'username', width: 80 }, subQueryOverride: { field: 'userRef', values: '_id' } })
    user: User;

    @Editable('Photo', { readonly: true, type: FormFieldType.text, title: 'Url', filterableAdvanced: true })
    value: string;

    @Editable('Photo', { type: FormFieldType.text, visible: false, forceExport: true, filterable: false })
    phash?: string;
}

@Model({ className: 'PhotoTag' })
export class PhotoTag extends IPhotoTag {
    @Editable('PhotoTag', { title: 'TAGS', type: FormFieldType.autocomplete, tag: true, collectionName: 'photos', multiple: true, allowCustomTag: true })
    tags: Array<string>;
}

@Model({ className: 'PhotoExport' })
export class PhotoExport extends IPhotoExport {
    @Editable('PhotoExport', { type: FormFieldType.toggle, title: 'ONEFOLDERPERSTORE' })
    oneFolderPerStore: boolean;

    @Editable('PhotoExport', { type: FormFieldType.autocomplete, translate: true, values: ['email', 'notification', 'allnotification'], required: false, clearable: true })
    mode: string;

    @Editable('PhotoExport', { type: FormFieldType.emailreport, required: false, condition: 'mode=="email" or mode=="allnotification"' })
    emails: Array<string>;
}
