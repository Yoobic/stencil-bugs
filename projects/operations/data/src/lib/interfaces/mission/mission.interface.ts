import { Model, Editable, Searchable, Location, User, ROLES_CONDITIONS, Translation, getGroupsTransform, MissionDescription, MISSION_TYPES } from '@shared/data-core';
import { IMission, IMissionValidate, FormFieldType, IMissionReject } from '@shared/interfaces';
import { Translate } from '@shared/translate';

import { uniq, range, concat } from 'lodash-es';

export const MISSION_STATUS = ['booked', 'finished', 'archived', 'scheduled'];
export const TRANSLATIONS_REJECT = [
    [{ field: 'isReject', operator: { _id: 'eq' }, value: true }]
];

let conditions = {
    isFinished: 'status == "finished"',
    isBookedOrFinished: 'status == "finished" or status == "booked"',
    isPublic: 'indexOf("_acl.groups.r", "public")>=0',
    isPoll: 'type=="poll"',
    isNotPoll: 'type!="poll"',
    isService: 'type == "service"',
    notService: 'type != "service"',
    notPollOrService: 'not (type == "service") and not (type == "poll")'
};

export function onMissionLocationChange(value, controls, data) {
    if (value && value.address) {
        controls.address.setValue((value.title ? value.title + ' - ' : '') + value.address);
    }
}

export function onMissionAddressChange(value, controls, data: Location) {
    if (value && value._geoloc) {
        data._geoloc = value._geoloc;
        controls.address.setValue(value.address, { onlySelf: true, emitModelToViewChange: false, emitEvent: false });
    }
}

export function onMissionUserChange(user: User, fieldControls, data) {
    if (!user) {
        data.ownerDisplayName = null;
        data.ownerRef = null;
    }
}

@Model({
    className: 'Mission',
    collectionName: 'missions',
    fields: ['*', 'location._id', 'location.clientid', 'location.title', 'location.address', 'location.tags', 'owner._id', 'owner.firstName', 'owner.lastName', 'owner.username', 'creator._id', 'creator.firstName', 'creator.lastName', 'creator.username', 'description.title', 'description.background', 'description.icon', 'description.allowSameUserValidation'],
    include: ['location', 'owner', 'description', 'creator']
})
export class Mission extends IMission {
    @Editable('Mission', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 22, filterable: true, filterableAdvanced: true })
    @Searchable('Mission') _id?: string;

    @Editable('Mission', { title: 'MISSIONTITLE', required: true, type: FormFieldType.text, icon: 'yo-shorttext', exportOrder: 1 })
    @Searchable('Mission') title: string;

    @Editable('Mission', {
        type: FormFieldType.autocomplete,
        title: 'CAMPAIGN',
        collectionName: 'missiondescriptions',
        required: true,
        columnDefinition: { name: 'title' },
        icon: 'yo-bicycle',
        filters: [
            [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        ],
        hiddenFields: ['archived']
    })
    description?: MissionDescription;

    @Editable('Mission', {
        type: FormFieldType.autocomplete,
        collectionName: 'locations',
        required: true,
        condition: conditions.isNotPoll,
        columnDefinition: { name: 'title' },
        icon: 'yo-building',
        exportOrder: 23,
        onChange: onMissionLocationChange
    })
    location?: Location;

    @Editable('Mission', {
        required: true,
        type: FormFieldType.address,
        icon: 'yo-map-marker2',
        filterName: '_geoloc',
        condition: conditions.isNotPoll,
        columnDefinition: { width: 350 },
        exportOrder: 2,
        filterableAdvanced: true,
        onChange: onMissionAddressChange
    })
    @Searchable('Mission')
    address?: string;

    @Editable('Mission', { type: FormFieldType.checkbox, columnDefinition: { width: 80 }, condition: conditions.isNotPoll, icon: 'yo-fire', exportOrder: 6, advanced: false })
    vip?: boolean;

    @Editable('Mission', { required: conditions.isFinished, sortable: true, type: FormFieldType.datetime, icon: 'yo-calendar', exportOrder: 4, advanced: true })
    finishedDate?: Date;

    @Editable('Mission', { sortable: true, type: FormFieldType.datetime, icon: 'yo-calendar', filterableAdvanced: true, advanced: true }) //required: conditions.isBookedOrFinished,
    bookedDate?: Date;

    @Editable('Mission', { sortable: true, type: FormFieldType.datetime, icon: 'yo-calendar', filterableAdvanced: true, exportOrder: 25, readonly: true, advanced: true }) //required: conditions.isBookedOrFinished,
    bookedUntil?: Date;

    @Editable('Mission', { name: '_acl.groups.r', icon: 'yo-group', columnDefinition: { name: '_acl.groups.r', forceName: true }, title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, required: true, exportOrder: 15, filterableAdvanced: true })
    _aclGroupsR?: any;

    // @Editable('Mission', { name: '_acl.groups.w', icon: 'yo-group', columnDefinition: { name: '_acl.groups.w', forceName: true }, title: 'EDITGROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, required: true, exportOrder: 15, filterableAdvanced: true, advanced: true })
    _aclGroupsW?: any;

    //@Editable('Mission', { type: FormFieldType.autocomplete, translate: true, values: uniq(without(MISSION_STATUS, 'finished')), flex: 50, clearable: true, icon: 'yo-flag', exportOrder: 14 })
    @Editable('Mission', { type: FormFieldType.autocomplete, translate: true, values: uniq(concat(MISSION_STATUS, [undefined])), handleUndefined: true, flex: 50, clearable: true, icon: 'yo-flag', exportOrder: 14 })
    status?: string;

    @Editable('Mission', { type: FormFieldType.autocomplete, translate: true, values: [true, false, undefined], handleUndefined: true, flex: 50, clearable: true, icon: 'yo-check', exportOrder: 5, advanced: true })
    validated?: boolean;

    @Editable('Mission', { type: FormFieldType.autocomplete, collectionName: 'user', readonly: true, forceExport: true, exportOrder: 18, filterableAdvanced: true, advanced: true })
    validatedBy?: string;

    @Editable('Mission', {
        type: FormFieldType.autocomplete,
        collectionName: 'user',
        icon: 'yo-user',
        clearable: true,
        required: conditions.isBookedOrFinished,
        columnDefinition: { name: 'username' },
        exportOrder: 3,
        advanced: true,
        onChange: onMissionUserChange,
        filterableAdvanced: false
    })
    owner?: User;

    @Searchable('Mission')
    ownerDisplayName?: string;

    @Editable('Mission', {
        type: FormFieldType.autocomplete,
        collectionName: 'user',
        icon: 'yo-user',
        condition: conditions.isService,
        columnDefinition: { name: 'username' },
        exportOrder: 24,
        advanced: true,
        title: 'CREATEDBY',
        filterableAdvanced: true
    })
    creator?: User;

    @Editable('Mission', { type: FormFieldType.autocomplete, translate: true, values: MISSION_TYPES, flex: 50, clearable: false, icon: 'yo-flag', exportOrder: 13, filterableAdvanced: true, advanced: true })
    type: string;

    @Editable('Mission', { type: FormFieldType.autocomplete, translate: true, values: range(1, 5), flex: 50, clearable: true, icon: 'yo-flag', exportOrder: 12, advanced: true })
    priority?: number;

    @Editable('Mission', { filterable: false, type: FormFieldType.checkbox, columnDefinition: { width: 80 }, exportOrder: 9, filterableAdvanced: true, advanced: true })
    skipValidation?: boolean;

    @Editable('Mission', { required: false, sortable: false, type: FormFieldType.number, condition: conditions.isPublic, icon: 'yo-cash', exportOrder: 11, advanced: true, filterable: false })
    price?: number;

    @Editable('Mission', { filterable: false, sortable: false, type: FormFieldType.datetime, condition: conditions.notService, exportOrder: 26, advanced: true })
    duedate?: Date;

    @Editable('Mission', { filterable: false, sortable: false, type: FormFieldType.datetime, condition: conditions.notService, flex: 33, exportOrder: 16, advanced: true })
    validFrom?: Date;

    @Editable('Mission', { filterable: false, sortable: false, type: FormFieldType.datetime, condition: conditions.notService, flex: 33, exportOrder: 17, advanced: true })
    validUntil?: Date;

    @Editable('Mission', { filterable: false, sortable: false, type: FormFieldType.text, condition: conditions.notService, flex: 33, filterableAdvanced: true, advanced: true })
    versionmin?: string;

    @Editable('Mission', { filterable: false, type: FormFieldType.checkbox, condition: conditions.notService, flex: 50, exportOrder: 7, filterableAdvanced: true, advanced: true })
    autoRenew?: boolean;

    @Editable('Mission', { filterable: false, type: FormFieldType.checkbox, condition: conditions.notService, flex: 50, exportOrder: 8, filterableAdvanced: true, advanced: true })
    autoRenewOnBooking?: boolean;

    @Editable('Mission', { filterable: false, sortable: false, required: false, title: 'MISSIONDURATION', type: FormFieldType.number, flex: 50, condition: conditions.notService, filterableAdvanced: true, advanced: true })
    duration?: string;

    @Editable('Mission', { filterable: false, sortable: false, required: false, type: FormFieldType.number, flex: 50, condition: [conditions.notPollOrService, conditions.isPublic], filterableAdvanced: true, advanced: true })
    bookingDuration?: string;

    //@Editable('Mission', { filterable: false, sortable: false, type: FormFieldType.number, condition: conditions.notPollOrService, flex: 50, filterableAdvanced: true, advanced: true })
    startDistance?: any;

    @Editable('Mission', { name: '_ect', title: 'CREATIONDATE', type: FormFieldType.date, readonly: true, exportOrder: 21, filterableAdvanced: true, advanced: true })
    creationDate?: Date;

    @Editable('Mission', { type: FormFieldType.datetime, readonly: true, filterableAdvanced: true, advanced: true })
    validatedDate?: Date;

    @Editable('Mission', { type: FormFieldType.checkbox, readonly: true, visible: false, forceExport: true, exportOrder: 10, filterableAdvanced: true, advanced: true })
    isCalendar?: boolean;

    @Editable('Mission', { type: FormFieldType.number, readonly: true, visible: false, forceExport: true, exportOrder: 19, filterable: false, sortable: false, advanced: true })
    republishCount?: number;

    @Editable('Mission', { type: FormFieldType.text, readonly: true, visible: false, forceExport: true, exportOrder: 20, filterable: false, sortable: false })
    unvalidatedReason?: string;

    score?: { value: number; total?: number; isPercentage?: boolean, title?: string };
    extraScores?: {
        [s: string]: { value: number; total?: number; isPercentage?: boolean, title?: string }
    };

    @Editable('Mission', { type: FormFieldType.number, name: 'score.value', title: 'SCORING', flex: 50, readonly: ROLES_CONDITIONS.isNotAdmin, filterableAdvanced: true, filterable: true, sortable: true })
    scoreValue?: number;

    @Editable('Mission', { required: false, type: FormFieldType.starrating, filterableAdvanced: true })
    rating?: number;

    @Editable('Mission', { type: FormFieldType.autocomplete, condition: conditions.isPoll, title: 'LANGUAGE', translate: true, values: Translate.availablesLanguageAll, clearable: false, filterableAdvanced: true, advanced: true })
    language?: string;

    @Editable('Mission', { title: 'CATEGORY', type: 'autocomplete', tag: true, collectionName: 'missions', multiple: true, filterableAdvanced: true })
    @Searchable('Mission')
    tags?: Array<string>;

}

@Model({ className: 'MissionValidate' })
export class MissionValidate extends IMissionValidate {
    @Editable('MissionValidate', { required: false, type: FormFieldType.starrating })
    rating: number;

    @Editable('MissionValidate', { required: false, type: FormFieldType.textarea })
    comments: string;
}

@Model({ className: 'MissionReject' })
export class MissionReject extends IMissionReject {
    @Editable('MissionReject', { type: FormFieldType.autocomplete, collectionName: 'translations', clearable: true, hiddenFields: ['isReject'], filters: TRANSLATIONS_REJECT })
    reason: Translation;

    @Editable('MissionReject', { required: 'isNullOrEmpty(getAttributeValue("reason")) == 1', type: FormFieldType.textarea })
    comments: string;

    @Editable('MissionReject', { required: false, type: FormFieldType.checkbox, condition: 'type !="poll"' })
    republish: boolean;

    @Editable('MissionReject', { required: false, type: FormFieldType.checkbox, condition: 'republish == 1 and type !="todo" and type !="poll"' })
    republishWithAnswers: boolean;

}
