import { ILocationType, FormFieldType } from '@shared/interfaces';
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { ROLES_CONDITIONS, getGroupsTransform } from '../condition/condition.interface';
import { Tenant } from '../tenant/tenant.interface';

@Model({
    className: 'LocationType',
    collectionName: 'locationtypes',
    fields: ['*'],
    include: ['_tenant']
})
export class LocationType extends ILocationType {
    // export class LocationType implements IEntity {
    @Editable('LocationType', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 1 })
    _id?: string;

    @Editable('LocationType', { type: FormFieldType.text, required: true, exportOrder: 2 })
    @Searchable('LocationType')
    name: string;

    @Editable('LocationType', {
        title: 'GROUPS', type: FormFieldType.autocomplete, allowCustomTag: true,
        collectionName: 'groups', multiple: true, clearable: false, required: true, idOnly: true,
        filters: [[{ field: 'type', operator: { _id: 'nin' }, value: ['plan'] }, { field: 'isRole', operator: { _id: 'neq' }, value: true }]],
        hiddenFields: ['isRole', 'type'],
        mapTransform: getGroupsTransform
    })
    group?: Array<any>;

    @Editable('LocationType', { type: FormFieldType.number, readonly: true, visible: false, forceExport: true, exportOrder: 4 })
    count?: number;

    @Editable('LocationType', { required: true, title: 'TENANT', type: FormFieldType.autocomplete, condition: [ROLES_CONDITIONS.isAdmin], collectionName: 'tenants', multiple: false, columnDefinition: { name: 'name' } })
    _tenant: Tenant;
    _tenantRef?: string;

}
