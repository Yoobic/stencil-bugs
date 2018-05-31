import { Model, Editable, Searchable, Location, User, ROLES_CONDITIONS, getGroupsTransform, MissionDescription, TodoTaskSimple } from '@shared/data-core';
import { MissionValidationRendererComponent, NumberRendererComponent } from '@shared/data-form';
import { FormFieldType, IMissiondata } from '@shared/interfaces';

export function onMissionDataLocationChange(value, controls, data) {
    if (value && value.address) {
        controls.address.markAsTouched();
        controls.address.setValue((value.title ? value.title + ' - ' : '') + value.address);
        controls.locationId.markAsTouched();
        controls.locationId.setValue(value.clientid);
    }
}

@Model({
    className: 'Missiondata',
    collectionName: 'missiondatas',
    fields: ['*', 'user.imageData', 'user.username', 'missiondescription.title', 'location.title', 'mission.creatorDisplayName', 'mission.status', 'mission._ect', 'mission._lmt', 'mission.title'],
    include: ['user', 'missiondescription', 'location', 'mission']
})

export class Missiondata extends IMissiondata {
    @Editable('Missiondata', {
        type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', title: 'CAMPAIGN', required: true, icon: 'yo-bicycle', readonly: true, columnDefinition: { name: 'title', hidden: true },
        filters: [
            [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        ],
        hiddenFields: ['archived']
    })
    missiondescription: MissionDescription;

    @Editable('Missiondata', { type: FormFieldType.autocomplete, collectionName: 'missions', required: false, filterable: false, readonly: true, columnDefinition: { width: 180, name: 'title' } })
    mission: any;

    @Editable('Missiondata', { required: false, type: FormFieldType.text, columnDefinition: { width: 250 }, filterableAdvanced: true })
    @Searchable('Missiondata')
    address: string;

    @Editable('Missiondata', {
        type: FormFieldType.autocomplete,
        translate: true,
        values: [true, false, undefined],
        handleUndefined: true,
        flex: 50,
        clearable: true,
        icon: 'yo-check',
        columnDefinition: { width: 140 },
        cellRenderer: MissionValidationRendererComponent.renderer
    })
    validated: boolean;

    @Editable('Missiondata', { title: 'MISSION', visible: false, forceExport: true, type: 'string', filterable: false, suppressExport: true })
    missionRef: string;

    @Editable('Missiondata', { required: false, icon: 'yo-mission', type: FormFieldType.text, filterableAdvanced: true })
    @Searchable('Missiondata') locationId: string;

    @Editable('Missiondata', {
        type: FormFieldType.autocomplete, collectionName: 'locations', required: true, icon: 'yo-building', columnDefinition: { name: 'title', hidden: true, width: 80 },
        onChange: onMissionDataLocationChange
    })
    location: Location;

    @Editable('Missiondata', { required: true, icon: 'yo-calendar', type: FormFieldType.datetime, columnDefinition: { width: 80 } })
    date: Date;

    @Editable('Missiondata', { type: FormFieldType.autocomplete, collectionName: 'user', subQueryOverride: { field: 'userRef', values: '_id' }, required: true, icon: 'yo-user', columnDefinition: { name: 'username', width: 80 } })
    user: User;

    @Editable('Missiondata', { required: false, readonly: true, visible: false, forceExport: true, type: FormFieldType.starrating })
    rating: number;

    score: { value: number; total?: number; isPercentage?: boolean, title?: string };

    @Editable('Missiondata', { type: FormFieldType.number, name: 'score.value', title: 'SCORING', readonly: ROLES_CONDITIONS.isNotAdmin, filterableAdvanced: true, filterable: true, sortable: true, cellRenderer: NumberRendererComponent.renderer, columnDefinition: { hidden: true } })
    scoreValue: number;

    @Editable('Missiondata', { title: 'ID', visible: false, forceExport: true, filterable: false })
    _id: string;

    @Editable('Missiondata', { name: '_acl.groups.r', icon: 'yo-group', columnDefinition: { name: '_acl.groups.r', forceName: true, width: 100 }, title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, required: false, filterableAdvanced: true, suppressExport: true })
    _aclGroupsR: any;

    @Editable('Missiondata', { name: '_acl.groups.w', icon: 'yo-group', columnDefinition: { name: '_acl.groups.w', forceName: true, hidden: true }, title: 'EDITGROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, required: false, filterableAdvanced: true, advanced: true, suppressExport: true })
    _aclGroupsW: any;
}

export interface MissionDataField {
    value: any;
    fieldType?: string;
    fieldTitle?: string;
    edit?: string;
    texts?: Array<any>;
    answer?: any;
    explanation?: string;
    tasks?: Array<TodoTaskSimple>;
}