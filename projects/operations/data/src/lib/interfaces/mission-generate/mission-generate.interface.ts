import { FormControl } from '@angular/forms';
import { Model, Editable, Entity, MissionDescription, Location, ROLES_CONDITIONS, ModelExtended, TagGroup, getGroupsTransform } from '@shared/data-core';
import { FormFieldType, IFormField } from '@shared/interfaces';
import { findLast, findIndex, range } from 'lodash-es';

let conditions = {
    isSingle: 'length("campaigns.selection") < 2',
    isPublic: 'public == 1',
    //isPollorService: 'type == "poll" or type == "service"',
    notPublic: 'not (public == 1)',
    notService: 'not (type == "service")',
    notPollOrService: 'not (type == "service") and not (type == "poll")',
    notPollOrServiceAndPublic: 'not (type == "service") and not (type == "poll") and (public == 1)',
    calendarIsMission: 'getAttributeValue("missiondescription.type")=="mission"',
    //isPhotosOnly: 'photosOnly == 1',
    isScheduled: 'scheduled == 1'//,
    //isNotScheduled: 'not (scheduled == 1)',
    //isAutorenew: 'autoRenewOnBooking == 1'
};

export function onMissionGenerateCampaignsChange(value: any, controls, data, field: IFormField, formDefinition: Array<IFormField>) {
    if (data.multiple) {
        if (field.multiple && value && value.selection && value.selection.length > 0) {
            if (value.selection.length > 1) {
                return;
            }
            data.type = value.selection[0].type;
            data.public = value.selection[0].public;
            field.gridOptions.filters = [
                [{ field: 'type', operator: { _id: 'inq' }, value: [data.type] },
                { field: 'public', operator: { _id: 'eq' }, value: data.public }
                ]
            ];
        } else {
            field.gridOptions.filters = [
                [{ field: 'type', operator: { _id: 'inq' }, value: ['mission', 'poll'] }]
            ];
        }
        field.gridOptions = Object.assign({}, field.gridOptions);
    } else {
        if (value && value.selection) {
            data.title = value.selection.title;
            data.type = value.selection.type;
            data.public = value.selection.public;
            let locationOptionsField = findLast(formDefinition, (f => f.name === 'locationOptions'));
            locationOptionsField.onChange(data.locationOptions, controls, data, locationOptionsField, formDefinition);
        } else {
            data.title = null;
            data.type = null;
            data.public = null;
        }

    }
    return false;
}

export function onMissionGenerateMultipleChange(value: any, controls: { [key: string]: FormControl }, data, field: IFormField, formDefinition: Array<IFormField>, formDynamic) {
    let index = findIndex(formDefinition, (f => f.name === 'campaigns'));
    let campaignField = formDefinition[index];
    campaignField.multiple = value;
    formDefinition[index].gridOptions = Object.assign({}, formDefinition[index].gridOptions);
    controls['campaigns'].setValue(null, { onlySelf: true, emitModelToViewChange: false, emitEvent: false });
    return false;
}

export function onMissionGenerateLocationOptionsChange(value: any, controls, data, field: IFormField, formDefinition: Array<IFormField>) {
    let index = findIndex(formDefinition, (f => f.name === 'locations'));
    let locationsField: IFormField = formDefinition[index];
    //locationsField.gridOptions = { showMap: true };

    if (value && !data.multiple && data.campaigns && data.campaigns.selection) {
        locationsField.gridOptions.subQuery = { collectionName: 'missions', field: '_id', exclude: true, values: 'locationRef', where: { 'descriptionRef': data.campaigns.selection._id } };
        if (value === 'CHECKAVAILABLE') {
            locationsField.gridOptions.subQuery.where.status = { nin: ['booked', 'finished', 'archived'] };
        }
    } else {
        locationsField.gridOptions.subQuery = null;
    }
    if (data['locations']) {
        data['locations'].query = data['locations'].query || {};
        data['locations'].query.subQuery = locationsField.gridOptions.subQuery;
    }

    locationsField.gridOptions = Object.assign({}, locationsField.gridOptions);
    return false;
}

export function onMissionGenerateAutorenewOnBookingChange(value: any, controls, data, field: IFormField, formDefinition: Array<IFormField>) {
    if (value === true && controls['scheduled']) {
        controls['scheduled'].setValue(null, { onlySelf: false, emitModelToViewChange: true, emitEvent: true });
    }
    return false;
}

export function onMissionGenerateScheduledChange(value: any, controls, data, field: IFormField, formDefinition: Array<IFormField>) {
    if (value === true && controls['autoRenewOnBooking']) {
        controls['autoRenewOnBooking'].setValue(null, { onlySelf: false, emitModelToViewChange: true, emitEvent: true });
    }
    return false;
}

@Model({
    className: 'MissionGenerate',
    collectionName: 'missiongenerate',
    fields: ['*'],
    include: []
})
export class MissionGenerate extends Entity {

    //@Editable('MissionGenerate', { tabIndex: 1, title: 'TITLE', tab: 'CAMPAIGNS', type: FormFieldType.text, required: true })
    generateTitle: string;

    //@Editable('MissionGenerate', { tabIndex: 1, tab: 'CAMPAIGNS', header: 'SELECTCAMPAIGNS', type: FormFieldType.autocomplete, collectionName: 'missiondescriptions', multiple: true, required: true })
    @Editable('MissionGenerate', {
        tabIndex: 1,
        tab: 'CAMPAIGNS',
        name: 'campaigns',
        description: 'SELECTCAMPAIGNS',
        type: FormFieldType.grid,
        collectionName: 'missiondescriptions',
        multiple: false,
        required: true,
        gridOptions: {
            allowQuery: false,
            hiddenFields: ['type', 'public', 'archived'],
            filters: [
                [
                    { field: 'type', operator: { _id: 'inq' }, value: ['mission', 'poll'] },
                    { field: 'archived', operator: { _id: 'neq' }, value: true }
                ]
            ]
        },
        onChange: onMissionGenerateCampaignsChange
    })
    campaigns: Array<MissionDescription> | { selection: Array<MissionDescription> };

    @Editable('MissionGenerate', {
        tabIndex: 1,
        tab: 'CAMPAIGNS',
        description: 'SELECTCAMPAIGNSMULTI',
        type: FormFieldType.toggle,
        onChange: onMissionGenerateMultipleChange
    })
    multiple: boolean;

    // @Editable('MissionGenerate', { tabIndex: 1, tab: 'CAMPAIGNS', visible: false, filterable: false, type: 'complex' })
    //  missionDescription: any;

    @Editable('MissionGenerate', { tabIndex: 2, title: 'MISSIONTITLE', tab: 'OPTIONS', header: 'MISSIONINFORMATION', type: FormFieldType.text, condition: conditions.isSingle })
    title: string;

    @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', tooltip: 'MISSIONDUEDATE', type: FormFieldType.datetime, condition: conditions.notService })
    duedate: any;

    @Editable('MissionGenerate', {
        tabIndex: 2, tab: 'OPTIONS', header: 'MISSIONSETTINGS', type: FormFieldType.checkbox, condition: [conditions.notPollOrService], flex: 100,
        onChange: onMissionGenerateAutorenewOnBookingChange
    })  //, readonly: conditions.isScheduled
    autoRenewOnBooking: boolean;

    // @Editable('MissionGenerate', {
    //     tabIndex: 2, tab: 'OPTIONS', type: FormFieldType.checkbox, condition: [conditions.notPollOrService], flex: 100,
    //     onChange: onMissionGenerateScheduledChange
    // }) //readonly: conditions.isAutorenew,
    // scheduled: boolean;

    @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', type: FormFieldType.schedule, hideLabel: true, condition: conditions.isScheduled, flex: 100 })
    schedule: boolean;

    @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', title: 'MISSIONVALIDFROMTOOLTIP', type: FormFieldType.datetime, condition: conditions.notService, flex: 50 })
    validFrom: any;

    @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', title: 'MISSIONVALIDUNTILTOOLTIP', type: FormFieldType.datetime, condition: conditions.notService, flex: 50 })
    validUntil: any;

    @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', required: false, title: 'MISSIONDURATION', type: FormFieldType.number, flex: 50, condition: conditions.isPublic, advanced: true })
    duration: string;

    @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', required: false, type: FormFieldType.number, flex: 50, condition: conditions.notPollOrServiceAndPublic, advanced: true })
    bookingDuration: string;

    // @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', type: FormFieldType.number, condition: conditions.notPollOrServiceAndPublic, flex: 50 })
    // startDistance: any;

    @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', title: 'GROUPS', type: 'autocomplete', collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, allowCustomTag: true, tag: false, advanced: true })
    group: any;

    @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', type: FormFieldType.number, required: conditions.isPublic, condition: conditions.isPublic })
    price: any;

    @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', type: FormFieldType.autocomplete, values: range(1, 5), condition: conditions.notPublic, advanced: true })
    priority: any;

    // @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', type: FormFieldType.number, condition: conditions.notService, flex: 100, advanced: true })
    // versionmin: any;

    @Editable('MissionGenerate', { tabIndex: 2, tab: 'OPTIONS', type: FormFieldType.checkbox, condition: conditions.notPollOrService, flex: 100, advanced: true })
    autoRenew: boolean;

    @Editable('MissionGenerate', { tabIndex: 3, tab: 'NOTIFICATIONS', type: FormFieldType.toggle, condition: conditions.notService })
    notify: boolean;

    @Editable('MissionGenerate', { tabIndex: 3, tab: 'NOTIFICATIONS', title: 'NOTIFICATION', required: true, condition: 'notify == 1', type: FormFieldType.textarea })
    notifyBody: string;

    @Editable('MissionGenerate', { tabIndex: 3, tab: 'NOTIFICATIONS', title: 'SCHEDULEDDATE', required: false, condition: 'notify == 1', type: FormFieldType.datetime })
    notifyScheduledDate: boolean;

    @Editable('MissionGenerate', { tabIndex: 3, tab: 'NOTIFICATIONS', type: FormFieldType.toggle, title: 'Workplace', condition: ROLES_CONDITIONS.isWorkplace })
    workplace: boolean;

    @Editable('MissionGenerate', { tabIndex: 3, tab: 'NOTIFICATIONS', title: 'COMMENTS', required: true, condition: 'workplace == 1', type: FormFieldType.textarea })
    workplaceBody: string;

    @Editable('MissionGenerate', { tabIndex: 3, tab: 'NOTIFICATIONS', title: 'GROUPS', required: true, type: FormFieldType.autocomplete, collectionName: 'workplace_groups', multiple: true, condition: 'workplace == 1' })
    workplaceGroups: Array<{ _id: string }>;

    @Editable('MissionGenerate', {
        tabIndex: 4,
        tab: 'LOCATIONS',
        tabCondition: conditions.notPollOrService,
        name: 'locationOptions',
        title: 'CHECK',
        clearable: true,
        type: FormFieldType.select,
        values: ['CHECKAVAILABLE', 'CHECKEXISTING'],
        translate: true,
        advanced: true,
        condition: conditions.isSingle + ' and ' + conditions.notPollOrService,
        onChange: onMissionGenerateLocationOptionsChange
    })
    locationOptions: string;

    @Editable('MissionGenerate', {
        tabIndex: 4, tab: 'LOCATIONS', title: 'LOCATIONS', name: 'locations', type: FormFieldType.grid, condition: conditions.notPollOrService, collectionName: 'locations', multiple: true, required: true, gridOptions: {
            showMap: true
        }
    })
    locations: { selection: Array<Location>; query: any; subQuery: any; total: number };

    type: string;
    public: boolean;
    count?: number;
}

export function onMissionNotifyCampaignsChange(value: any, controls, data, field: IFormField, formDefinition: Array<IFormField>) {
    let index = findIndex(formDefinition, (f => f.name === 'locations'));
    let locationsField: IFormField = formDefinition[index];

    if (value && value.selection) {
        locationsField.gridOptions.subQuery = {
            collectionName: 'missions',
            field: '_id',
            values: 'locationRef',
            where: {
                descriptionRef: { 'inq': [].concat(value.selection).map(c => c._id) },
                status: { nin: ['booked', 'finished', 'archived'] }
            }
        };
    } else {
        locationsField.gridOptions.subQuery = null;
    }
    if (data['locations']) {
        data['locations'].query = data['locations'].query || {};
        data['locations'].query.subQuery = locationsField.gridOptions.subQuery;
    }

    formDefinition[index].gridOptions = Object.assign({}, locationsField.gridOptions);
}

@Model({ className: 'MissionNotify' })
export class MissionNotify extends Entity {

    @Editable('MissionNotify', {
        tabIndex: 1,
        tab: 'CAMPAIGNS',
        name: 'campaigns',
        type: FormFieldType.grid,
        collectionName: 'missiondescriptions',
        multiple: true,
        required: true,
        gridOptions: {
            allowQuery: false,
            hiddenFields: ['type', 'public', 'archived'],
            filters: [
                [
                    { field: 'public', operator: { _id: 'neq' }, value: true },
                    { field: 'type', operator: { _id: 'inq' }, value: ['mission'] },
                    { field: 'archived', operator: { _id: 'neq' }, value: true }
                ]
            ]
        },
        onChange: onMissionNotifyCampaignsChange
    })
    campaigns: Array<MissionDescription> | { selection: Array<MissionDescription> };

    @Editable('MissionNotify', { tabIndex: 2, tab: 'LOCATIONS', title: 'LOCATIONS', name: 'locations', type: FormFieldType.grid, condition: conditions.notPollOrService, collectionName: 'locations', multiple: true, required: true, gridOptions: { showMap: true } })
    locations: { selection: Array<Location>; query: any; subQuery: any; total: number };

    // @Editable('MissionNotify', { tabIndex: 3, tab: 'USERS', title: 'USERS', name: 'users', type: FormFieldType.grid, condition: conditions.notPollOrService, collectionName: 'user', multiple: true, required: true }) users: { selection: Array<User>; query: any; subQuery: any; total: number };

    @Editable('MissionNotify', { tabIndex: 3, tab: 'NOTIFY', type: FormFieldType.autocomplete, translate: true, values: ['email', 'notification', 'allnotification'], required: true })
    mode: 'email' | 'notification' | 'allnotification';

    @Editable('MissionNotify', { tabIndex: 3, tab: 'NOTIFY', type: FormFieldType.text, required: true })
    title: string;

    @Editable('MissionNotify', { tabIndex: 3, tab: 'NOTIFY', type: FormFieldType.textarea, required: true })
    body: string;

    @Editable('MissionNotify', { tabIndex: 3, tab: 'NOTIFY', type: FormFieldType.datetime, minDate: new Date() })
    scheduledDate?: Date;

}

@Model({ className: 'MissionCalendarGenerate' })
export class MissionCalendarGenerate extends Entity {

    @Editable('MissionCalendarGenerate', {
        type: FormFieldType.autocomplete,
        title: 'CAMPAIGN',
        collectionName: 'missiondescriptions',
        required: true,
        columnDefinition: { name: 'title' },
        icon: 'yo-bicycle',
        filters: [[
            { field: 'type', operator: { _id: 'inq' }, value: ['mission', 'poll'] },
            { field: 'archived', operator: { _id: 'neq' }, value: true }
        ]],
        hiddenFields: ['type', 'archived']
    })
    missiondescription: MissionDescription;

    @Editable('MissionCalendarGenerate', { type: FormFieldType.location, required: true, condition: conditions.calendarIsMission })
    location: Location;

    @Editable('MissionCalendarGenerate', { type: FormFieldType.datetime, required: true })
    date: Date;

    @Editable('MissionCalendarGenerate', { type: FormFieldType.textarea })
    comments: string;

    @Editable('MissionCalendarGenerate', { type: FormFieldType.toggle })
    addToCalendar: boolean;
}

@Model({ className: 'MissionPdfGenerateBase' })
export class MissionPdfGenerateBase extends Entity {
    @Editable('MissionPdfGenerateBase', { type: FormFieldType.autocomplete, translate: true, values: ['portrait', 'landscape'], clearable: true })
    format: string;

    @Editable('MissionPdfGenerateBase', { type: FormFieldType.autocomplete, translate: true, values: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'], clearable: true })
    pageSize: string;
}

@ModelExtended({ baseClass: 'MissionPdfGenerateBase', extendedClass: 'MissionPdfGenerateClassic' })
export class MissionPdfGenerateClassic extends MissionPdfGenerateBase {

    // @Editable('MissionPdfGenerateClassic', { type: FormFieldType.toggle })
    // use1ColumnLayout: boolean;

    @Editable('MissionPdfGenerateClassic', { type: FormFieldType.toggle })
    photosInAppendix: boolean;

    @Editable('MissionPdfGenerateClassic', { type: FormFieldType.toggle })
    photosSmall: boolean;

    @Editable('MissionPdfGenerateClassic', { type: FormFieldType.toggle })
    hidePageTitle: boolean;

    @Editable('MissionPdfGenerateClassic', { type: FormFieldType.toggle })
    includeFieldDescription: boolean;

    @Editable('MissionPdfGenerateClassic', { type: FormFieldType.toggle, condition: ROLES_CONDITIONS.isAdmin })
    forceCustomTranslations?: boolean;

    hideUser?: boolean;

    setting?: string;
}

@ModelExtended({ baseClass: 'MissionPdfGenerateBase', extendedClass: 'MissionPdfGeneratePhotoReport' })
export class MissionPdfGeneratePhotoReport extends MissionPdfGenerateBase {

    @Editable('MissionPdfGeneratePhotoReport', { type: FormFieldType.autocomplete, values: ['ALLPHOTOS', 'FLAGGEDPHOTOS', 'UNFLAGGEDPHOTOS'], translate: true })
    photosOnlyOptions: string;

    @Editable('MissionPdfGeneratePhotoReport', { type: FormFieldType.select, values: [1, 2, 3], translate: true })
    photosPerRow: number;

    hideUser?: boolean;

    setting?: string;
}

@ModelExtended({ baseClass: 'MissionPdfGenerateClassic', extendedClass: 'MissionPdfGenerateAuditReport' })
export class MissionPdfGenerateAuditReport extends MissionPdfGenerateClassic {

    @Editable('MissionPdfGenerateAuditReport', { type: FormFieldType.autocomplete, values: ['ALL', 'UNSATISFACTORYANSWER', 'ACTIONPLAN'], translate: true })
    auditOptions: string;
}

@ModelExtended({ baseClass: 'MissionPdfGenerateBase', extendedClass: 'MissionPdfGenerateContractReport' })
export class MissionPdfGenerateContractReport extends MissionPdfGenerateBase {

    @Editable('MissionPdfGenerateContractReport', { type: FormFieldType.toggle })
    includeFieldDescription: boolean;

    hideUser?: boolean;

    setting?: string;
}

@Model({ className: 'MissionPdfGenerateBase' })
export class MissionPdfMultipleGenerate extends Entity {

    @Editable('MissionPdfMultipleGenerate', { type: FormFieldType.autocomplete, values: ['SINGLEFILE', 'SINGLEFILEWITHTAGS', 'NOSUBFOLDERS', 'USETAGFORFOLDERS'], translate: true })
    mode: string;

    @Editable('MissionPdfMultipleGenerate', { type: FormFieldType.autocomplete, collectionName: 'tagGroups', mode: 'text', condition: 'mode=="USETAGFORFOLDERS" or mode=="SINGLEFILEWITHTAGS"' })
    locationTags?: TagGroup;
}
