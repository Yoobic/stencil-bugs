import { Model, Searchable, Editable, User, Location, LocationType, ROLES_CONDITIONS, Tenant } from '@shared/data-core';
import { FormFieldType, IGeofilter } from '@shared/interfaces';

export function onGeoFilterUserChange(user, fieldControls, data) {
    if (user && data) {
        data.username = user.username;
    }
}

@Model({
    className: 'Geofilter',
    collectionName: 'geofilters',
    fields: ['*'],
    include: ['locations', 'locationtypes', '_tenant']
})

export class Geofilter extends IGeofilter {

    @Editable('Geofilter', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 1 })
    _id: string;

    @Editable('Geofilter', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 2 })
    @Searchable('Geofilter')
    username: string;

    @Editable('Geofilter', {
        type: FormFieldType.autocomplete,
        collectionName: 'user',
        clearable: true,
        filterable: true,
        suppressExport: true,
        columnDefinition: {
            name: 'username'
        },
        subQueryOverride: { field: 'userRef', values: '_id' },
        onChange: onGeoFilterUserChange,
        required: true
    })
    user: User;

    @Editable('Geofilter', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 3, filterable: false })
    userRef: string;

    @Editable('Geofilter', { type: FormFieldType.autocomplete, collectionName: 'locations', clearable: true, multiple: true, suppressExport: true, filterable: false })
    locations: Array<Location>;

    @Editable('Geofilter', { type: FormFieldType.autocomplete, collectionName: 'locations', visible: false, forceExport: true, multiple: true, exportOrder: 4, filterable: false })
    locationsRef: Array<string>;

    @Editable('Geofilter', { type: FormFieldType.autocomplete, collectionName: 'locationtypes', clearable: true, multiple: true, suppressExport: true, filterable: false })
    locationtypes: Array<LocationType>;

    @Editable('Geofilter', { type: FormFieldType.autocomplete, collectionName: 'locationtypes', visible: false, forceExport: true, multiple: true, exportOrder: 5, filterable: false })
    locationtypesRef: Array<string>;

    @Editable('Geofilter', { required: true, title: 'TENANT', type: FormFieldType.autocomplete, condition: [ROLES_CONDITIONS.isAdmin], collectionName: 'tenants', multiple: false })
    _tenant: Tenant;
}
