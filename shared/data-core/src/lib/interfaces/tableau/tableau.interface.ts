import { Editable } from '../../decorators/editable/editable.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { FormFieldType, ITableau } from '@shared/interfaces';
import { Model } from '../../decorators/model/model.decorator';
import { Tenant } from '../tenant/tenant.interface';

@Model({
    className: 'Tableau',
    collectionName: 'tableau',
    fields: ['*'],
    include: ['_tenant']
})

export class Tableau extends ITableau {

    @Editable('Tableau', { type: FormFieldType.text, required: true, title: 'DASHBOARDID' })
    @Searchable('Tableau')
    path: string;

    @Editable('Tableau', { required: true, title: 'TENANT', type: FormFieldType.autocomplete, collectionName: 'tenants', multiple: false })
    _tenant: Tenant;
}
