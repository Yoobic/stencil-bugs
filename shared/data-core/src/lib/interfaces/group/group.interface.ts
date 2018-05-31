import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IGroup } from '@shared/interfaces';
import { Tenant } from '../tenant/tenant.interface';
import { ROLES_CONDITIONS } from '../condition/condition.interface';
import { FORM_FILES_GROUP_FILTER } from '../constants/constants.interface';

let conditions = {
    isUpdate: 'getAttributeValue("_ect")',
    isCreate: 'not getAttributeValue("_ect")',
    isNotRole: 'not (isRole == 1)'
};

@Model({
    className: 'Group',
    collectionName: 'groups',
    fields: ['*'],
    include: ['_tenant'] //
})

export class Group extends IGroup {
    @Editable('Group', { required: true, title: 'ID', type: FormFieldType.text, readonly: conditions.isUpdate, forceExport: true, exportOrder: 1 })
    @Searchable('Group')
    _id: string;

    @Editable('Group', { required: false, type: FormFieldType.text })
    @Searchable('Group')
    title: string;

    @Editable('Group', { required: false, type: FormFieldType.textarea })
    @Searchable('Group')
    description: string;

    @Editable('Group', { type: FormFieldType.autocomplete, filters: FORM_FILES_GROUP_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, clearable: true, fixedPosition: true, maxWidth: 160, maxHeight: 160, crop: 'circle', collectionName: 'files', title: 'ICON', columnDefinition: { name: '_downloadURL' }, filterable: false, sortable: false })
    icon: any;

    @Editable('Group', { required: true, title: 'TENANT', type: FormFieldType.autocomplete, condition: [ROLES_CONDITIONS.isAdmin, conditions.isNotRole], collectionName: 'tenants', multiple: false, columnDefinition: { name: 'name' } })
    _tenant: Tenant;

    @Editable('Group', { type: FormFieldType.toggle, condition: [conditions.isCreate, ROLES_CONDITIONS.isAdmin] })
    team?: boolean;

    @Editable('Group', { title: 'ROLE', type: FormFieldType.toggle, condition: [ROLES_CONDITIONS.isAdmin] })
    isRole?: boolean;

    @Editable('Group', { type: FormFieldType.toggle, condition: [conditions.isCreate, ROLES_CONDITIONS.isAdmin] })
    service?: boolean;

    @Editable('Group', { readonly: true, visible: false, forceExport: true, filterable: false, columnDefinition: { name: 'list.length' }, type: FormFieldType.number, exportOrder: 2 })
    users?: any;

    @Editable('Group', { readonly: true, visible: false, forceExport: true, filterable: false, columnDefinition: { name: 'length' }, type: FormFieldType.number, exportOrder: 3 })
    groups?: any;

    @Editable('Group', { name: '_ect', title: 'CREATIONDATE', type: FormFieldType.date, readonly: true })
    creationDate?: any;

}
