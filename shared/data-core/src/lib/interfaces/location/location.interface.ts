import { IProperties } from '../entity/entity.interface';
import { FormFieldType, ILocation } from '@shared/interfaces';
import { LocationType } from '../location-type/location-type.interface';
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { Mapping } from '../../decorators/mapping/mapping.decorator';
import { ROLES_CONDITIONS } from '../condition/condition.interface';
import { Tenant } from '../tenant/tenant.interface';

export const LOCATION_GEOCODESTATUS = ['file', 'geocoder', 'place', 'prediction', 'error'];

export function onAddressChange(value, controls, data: Location, field) {
    if (value && value._geoloc) {
        data._geoloc = value._geoloc;
        (<any>field)._geoloc = value._geoloc;
        //data.address = value.address;
        setTimeout(() => {
            controls.address.setValue(value.address, { onlySelf: true, emitModelToViewChange: false, emitEvent: false });
        });
    }
}

export function onTypeChange(value: LocationType, controls, data: Location) {
    if (value && value._id) {
        data.typeRef = value._id;
    }
}

@Model({
    className: 'Location',
    collectionName: 'locations',
    fields: ['*', 'type.name'],
    include: ['type', '_tenant']
})
export class Location implements ILocation {

    @Mapping('Location', { order: 12 })
    @Editable('Location', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 13, filterable: false })
    _id: string;

    @Mapping('Location', { order: 11 })
    @Editable('Location', { type: FormFieldType.text, condition: ROLES_CONDITIONS.isNotTrial, columnDefinition: { width: 100 }, exportOrder: 12 })
    @Searchable('Location') clientid: string;

    @Mapping('Location', { order: 0 })
    @Editable('Location', { required: true, type: FormFieldType.text, exportOrder: 1 })
    @Searchable('Location') title: string;

    @Mapping('Location', { order: 1 })
    @Editable('Location', { required: true, type: FormFieldType.address, filterName: '_geoloc', columnDefinition: { width: 350 }, showMap: true, exportOrder: 2, onChange: onAddressChange })
    @Searchable('Location')
    address: string;

    @Mapping('Location', { order: 13 })
    @Editable('Location', { type: FormFieldType.checkbox, condition: ROLES_CONDITIONS.isNotTrial, columnDefinition: { width: 40 }, exportOrder: 14 })
    vip: boolean;

    @Mapping('Location', { order: 9 })
    @Editable('Location', { title: 'LOCATIONTAGS', condition: ROLES_CONDITIONS.isNotTrial, type: FormFieldType.autocomplete, tag: true, collectionName: 'locations', multiple: true, subQuery: { field: 'locationRef', values: '_id' }, icon: 'yo-tag', exportOrder: 10 })
    tags: Array<string>;

    @Mapping('Location', { order: 2 })
    @Editable('Location', { type: FormFieldType.autocomplete, collectionName: 'locationtypes', required: true, condition: ROLES_CONDITIONS.isNotTrial, columnDefinition: { name: 'name' }, exportOrder: 3, filterableAdvanced: true, onChange: onTypeChange })
    type: LocationType;
    typeRef: string;

    @Mapping('Location', { order: 14 })
    @Editable('Location', {
        type: FormFieldType.autocomplete, condition: ROLES_CONDITIONS.isNotTrial, collectionName: 'missiondescriptions', clearable: true, multiple: true, filterable: false, sortable: false, suppressExport: true,
        filters: [
            [{ field: 'archived', operator: { _id: 'neq' }, value: true }]
        ],
        hiddenFields: ['archived']
    })
    missiondescriptions;
    missiondescriptionsRef: Array<string>;

    @Mapping('Location', { order: 10 })
    @Editable('Location', { title: 'NOTIFICATIONEMAILS', type: FormFieldType.emailreport, condition: ROLES_CONDITIONS.isNotTrial, showUsers: true, stateful: false, tab: 'INFORMATION', exportOrder: 11, filterableAdvanced: true })
    notificationemail: Array<string>;

    @Mapping('Location', { order: 5 })
    @Editable('Location', { type: FormFieldType.text, tab: 'INFORMATION', exportOrder: 6, filterableAdvanced: true })
    @Searchable('Location') contactname: string;

    @Mapping('Location', { order: 6 })
    @Editable('Location', { type: FormFieldType.email, tab: 'INFORMATION', exportOrder: 7, filterableAdvanced: true })
    contactemail: string;

    @Mapping('Location', { order: 7 })
    @Editable('Location', { type: FormFieldType.text, tab: 'INFORMATION', exportOrder: 8, filterableAdvanced: true })
    contactphone: string;

    @Mapping('Location', { order: 8 })
    @Editable('Location', { type: FormFieldType.textarea, tab: 'INFORMATION', exportOrder: 9, filterableAdvanced: true })
    info: string;

    @Editable('Location', { readonly: true, type: FormFieldType.autocomplete, values: LOCATION_GEOCODESTATUS, clearable: false, filterableAdvanced: true, suppressExport: true })
    status: string;

    @Mapping('Location', { order: 4 })
    @Editable('Location', { visible: false, exportOrder: 5, forceExport: true, filterable: false, sortable: false })
    placesearch: string;

    @Mapping('Location', { order: 3 })
    @Editable('Location', { visible: false, forceExport: true, exportOrder: 4, filterable: false, sortable: false })
    _geoloc: [number, number];

    @Editable('Location', { type: FormFieldType.json, tab: 'PROPERTIES', filterable: false, sortable: false, suppressExport: true, condition: ROLES_CONDITIONS.isAdmin })
    properties: IProperties;

    distance: number;
    stats: Array<{ title: string; value: number; color: string }>;

    @Editable('Location', { required: true, title: 'TENANT', type: FormFieldType.autocomplete, condition: [ROLES_CONDITIONS.isAdmin], collectionName: 'tenants', multiple: false, columnDefinition: { name: 'name' } })
    _tenant: Tenant;
    _tenantRef?: string;
}
