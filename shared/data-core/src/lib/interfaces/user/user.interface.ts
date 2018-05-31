import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { momentTimeZone, FormFieldType, IUser, IUserSettings, ISimpleUser } from '@shared/interfaces';
import { Location } from '../location/location.interface';
import { Tenant } from '../tenant/tenant.interface';
import { usernameValidatorRequired } from '../../validators/username-validator/username-validator';
import { ROLES_CONDITIONS, getGroupsTransform } from '../condition/condition.interface';

import { startCase } from 'lodash-es';

let conditions = {
    isCreate: 'not getAttributeValue("_ect")',
    isUpdate: 'getAttributeValue("_ect")',
    isNotUpdateMultiple: 'not (getAttributeValue("_id") == "multiple")',
    //isTeam: ' isTeam == 1',
    //isNotTeam: ' not (isTeam == 1)',
    isNotSarahMartin: 'not (username == "smartin@yoobic.com")',
    isNotYoobicAdmin: 'not (endsWith(getAttributeValue("username"),"@yoobic.com") == 1 and length("_acl.groups.r") == 0)'
};

export function onUserLocationChange(value, controls, data) {
    if (!value) {
        data.locationRef = null;
    }
}

@Model({
    className: 'User',
    collectionName: 'user',
    fields: ['*'],
    include: ['location', '_tenant']
})

export class User extends IUser {

    @Editable('User', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 11 })
    _id?: string;

    @Editable('User', { type: FormFieldType.photo, filterable: false, title: 'PHOTO', columnDefinition: { width: 52 }, exportOrder: 10, sortable: false, allowLibrary: true })
    imageData?: string;

    @Editable('User', { required: true, flex: 100, type: FormFieldType.email, disableAutocomplete: true, condition: conditions.isNotUpdateMultiple, readonly: conditions.isUpdate, asyncValidators: [usernameValidatorRequired], exportOrder: 1 })
    @Searchable('User')
    username: string;

    @Editable('User', { required: false, flex: 100, type: FormFieldType.email, disableAutocomplete: true, exportOrder: 6 })
    @Searchable('User')
    email?: string;

    @Editable('User', { required: true, type: FormFieldType.password, disableAutocomplete: true, condition: conditions.isCreate, filterable: false, sortable: false, exportOrder: 2 })
    password?: string;

    @Editable('User', { required: true, flex: 100, type: FormFieldType.text, exportOrder: 4 })
    @Searchable('User')
    firstName?: string;

    @Editable('User', { flex: 100, required: true, type: FormFieldType.text, exportOrder: 5 })
    @Searchable('User')
    lastName?: string;

    @Editable('User', { required: true, title: 'TENANT', type: FormFieldType.autocomplete, condition: [ROLES_CONDITIONS.isAdmin], collectionName: 'tenants', multiple: false, columnDefinition: { name: 'name' } })
    _tenant: Tenant;

    @Editable('User', { type: FormFieldType.toggle, flex: 100, title: 'TEAM', exportOrder: 12, condition: [conditions.isCreate, ROLES_CONDITIONS.isAdmin], filterableAdvanced: true })
    isTeam?: boolean;

    @Editable('User', { title: 'USERTAGS', type: FormFieldType.autocomplete, tag: true, collectionName: 'user', condition: ROLES_CONDITIONS.isAdmin, multiple: true, icon: 'yo-flag', subQuery: { field: 'ownerRef', values: '_id' }, exportOrder: 13 })
    tags?: Array<string>;

    @Editable('User', { flex: 100, required: true,  type: FormFieldType.autocomplete, exportOrder: 15, condition: [ROLES_CONDITIONS.isAdmin], values: ['ROLEADMIN', 'ROLEEDITOR', 'ROLEVIEWER', 'ROLEMANAGER', 'ROLEFIELD', 'ROLESTOREMANAGER', 'ROLESTORE'], translate: true, filterableAdvanced: true })
    role?: string;

    @Editable('User', { flex: 50, type: FormFieldType.tel, exportOrder: 7, filterableAdvanced: true, advanced: true })
    telephone?: string;

    @Editable('User', { flex: 50, type: FormFieldType.text, exportOrder: 8, filterableAdvanced: true, advanced: true })
    company?: string;

    //@Editable('User', { flex: 100, type: FormFieldType.text, exportOrder: 16, filterableAdvanced: true })
    position?: string;

    @Editable('User', { flex: 50, type: FormFieldType.date, suppressExport: true, filterableAdvanced: true, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    dateOfBirth?: string;

    @Editable('User', { flex: 50, type: FormFieldType.autocomplete, values: ['MALE', 'FEMALE'], translate: true, suppressExport: true, filterableAdvanced: true, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    gender?: string;

    //@Editable('User', { type: FormFieldType.email, condition: conditions.isNotTeam, exportOrder: 17, filterableAdvanced: true })

    @Editable('User', { type: FormFieldType.address, exportOrder: 9, condition: ROLES_CONDITIONS.isNotTrial, advanced: true })
    address?: any;

    @Editable('User', { title: 'LOCATION', type: FormFieldType.autocomplete, onChange: onUserLocationChange, collectionName: 'locations', deleteOnHidden: false, condition: [ROLES_CONDITIONS.isManager, ROLES_CONDITIONS.isNotTrial, conditions.isNotSarahMartin, conditions.isNotYoobicAdmin], suppressExport: true, clearable: true })
    location?: Location;

    @Editable('User', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 14, filterable: false })
    locationRef?: string;

    @Editable('User', {
        required: true, name: '_acl.groups.r', columnDefinition: { name: '_acl?.groups?.r', forceName: true },
        title: 'GROUPS', condition: <any>[ROLES_CONDITIONS.isAdminOrClientAdmin, <any>conditions.isNotSarahMartin, conditions.isNotYoobicAdmin, ROLES_CONDITIONS.isNotTrial],
        type: FormFieldType.autocomplete, allowCustomTag: true, collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'],
        idOnly: true, multiple: true, clearable: false, exportOrder: 3, deleteOnHidden: false,
        mapTransform: getGroupsTransform
    })
    _aclGroupsR?: any;

    @Editable('User', { type: FormFieldType.date, name: '_lmt', readonly: true, suppressExport: true, filterableAdvanced: true, advanced: true })
    lastSeen?: any;

    @Editable('User', { type: FormFieldType.text, readonly: true, suppressExport: false, filterableAdvanced: true, advanced: true })
    version?: any;

    @Editable('User', { type: FormFieldType.text, readonly: true, suppressExport: false, filterableAdvanced: true, advanced: true })
    mobileVersion?: any;

    @Editable('User', { type: FormFieldType.text, readonly: true, suppressExport: true, filterableAdvanced: true, advanced: true })
    platform?: any;

    @Editable('User', { type: FormFieldType.text, readonly: true, suppressExport: true, filterableAdvanced: true, advanced: true })
    language?: string;

    @Editable('User', { type: FormFieldType.text, readonly: true, suppressExport: true, filterable: false, advanced: true })
    device?: string;

    @Editable('User', { type: FormFieldType.text, readonly: true, suppressExport: true, filterable: false, advanced: true })
    uuid?: string;

    @Editable('User', { type: FormFieldType.text, readonly: true, suppressExport: true, filterable: false, advanced: true })
    target?: string;

    @Editable('User', { title: 'MAXWIDTH', type: FormFieldType.number, condition: ROLES_CONDITIONS.isAdmin, suppressExport: true, filterable: false })
    photoMaxWidth?: number;

    static getDisplayName(user: any): string {
        if (user) {
            let displayName = user.username;
            if (user.firstName && user.lastName) {
                displayName = startCase(user.firstName.toString().toLowerCase()) + ' ' + startCase(user.lastName.toString().toLowerCase());
            } else if (user.first_name && user.last_name) {
                displayName = startCase(user.first_name.toString().toLowerCase()) + ' ' + startCase(user.last_name.toString().toLowerCase());
            } else if (user._socialIdentity && user._socialIdentity.facebook && user._socialIdentity.facebook.name) {
                displayName = user._socialIdentity.facebook.name;
            } else if (user.email) {
                displayName = user.email;
            } else if (user._socialIdentity && user._socialIdentity.facebook && user._socialIdentity.facebook.email) {
                displayName = user._socialIdentity.facebook.email;
            }
            return displayName;
        }
        return '';
    }

    static getSimpleFields() {
        return ['_id', 'imageData', 'firstName', 'lastName', 'email', 'telephone', 'username'];
    }
}

@Model({ className: 'UserSettings' })
export class UserSettings extends IUserSettings {

    // @Editable('UserSettings', { title: 'Beta', header: 'APPEARANCE', type: FormFieldType.toggle, flex: 100, suppressExport: true, filterable: false, sortable: false })

    @Editable('UserSettings', { type: FormFieldType.toggle, header: 'APPEARANCE', flex: 100, suppressExport: true, filterable: false, sortable: false })
    viewlist: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, flex: 100, suppressExport: true, filterable: false, sortable: false })
    darkTheme: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, flex: 100, suppressExport: true, filterable: false, sortable: false })
    useBigFonts: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, flex: 100, suppressExport: true, filterable: false, sortable: false })
    showScrollbars: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, header: 'NOTIFICATIONS', flex: 100, title: 'DISABLEALLEMAILS', suppressExport: true, filterable: false, sortable: false })
    disableEmailNotifications: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, flex: 100, title: 'DISABLEALLPUSH', suppressExport: true, filterable: false, sortable: false })
    disablePushNotifications: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, flex: 100, title: 'DISABLEALLSMS', suppressExport: true, filterable: false, sortable: false })
    disableSmsNotifications: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, flex: 100, suppressExport: true, filterable: false, sortable: false })
    sendFinishedEmail: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, header: 'PHOTOS', flex: 100, title: 'DELETEPHOTOSINALBUM', suppressExport: true, filterable: false, sortable: false })
    deletePhotos: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, flex: 100, suppressExport: true, filterable: false, sortable: false })
    allowPhotoEdit: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, flex: 100, suppressExport: true, filterable: false, sortable: false })
    disablePhotoOrientationAutoFix: boolean;

    @Editable('UserSettings', { title: 'MAXWIDTH', type: FormFieldType.number, suppressExport: true, filterable: false, min: 600, max: 2048 })
    photoMaxWidth?: number;

    @Editable('UserSettings', { type: FormFieldType.toggle, flex: 100, header: 'SERVICES', suppressExport: true, filterable: false, sortable: false })
    orderServicesByDate: boolean;

    @Editable('UserSettings', { type: FormFieldType.toggle, header: 'MISSIONS', flex: 100, suppressExport: true, filterable: false, sortable: false })
    goToBasket: boolean;

    @Editable('UserSettings', { type: FormFieldType.range, min: 1, max: 400, suppressExport: true, filterableAdvanced: true })
    radius: any;

    @Editable('UserSettings', { type: FormFieldType.autocomplete, values: momentTimeZone.tz.names() })
    timezone: any;

    // @Editable('UserSettings', { type: FormFieldType.selectbuttons, flex: 100, suppressExport: true, filterable: false, sortable: false, values: ['YES', 'NO'] })
    // test;
}

@Model({ className: 'SimpleUser' })
export class SimpleUser extends ISimpleUser {
    // export class SimpleUser implements IEntity {
    @Editable('SimpleUser', { type: FormFieldType.text, visible: false })
    _id?: string;

    @Editable('SimpleUser', { visible: true, type: FormFieldType.photo, filterable: false, title: 'PHOTO', columnDefinition: { width: 52 } })
    imageData: string;

    @Editable('SimpleUser', { required: true, type: FormFieldType.email, asyncValidators: [usernameValidatorRequired] })
    @Searchable('SimpleUser') username: string;

    @Editable('SimpleUser', { visible: true, required: true, type: FormFieldType.email })
    @Searchable('SimpleUser') email: string;

    @Editable('SimpleUser', { required: true, type: FormFieldType.password, condition: conditions.isCreate, filterable: false, sortable: false })
    password: string;
}