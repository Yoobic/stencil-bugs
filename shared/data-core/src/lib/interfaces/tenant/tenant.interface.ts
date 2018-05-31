import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { FormFieldType, ITenant } from '@shared/interfaces';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FORM_FILES_IMAGE_FILTER } from '../constants/constants.interface';

@Model({
    className: 'Tenant',
    collectionName: 'tenants',
    fields: ['*'],
    include: []
})

export class Tenant extends ITenant {

    @Editable('Tenant', { required: true, type: FormFieldType.text })
    @Searchable('Tenant')
    name: string;

    @Editable('Tenant', { required: false, type: FormFieldType.text })
    @Searchable('Tenant')
    title: string;

    @Editable('Tenant', { required: false, type: FormFieldType.textarea })
    @Searchable('Tenant')
    description: string;

    @Editable('Tenant', { type: FormFieldType.autocomplete, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, clearable: true, fixedPosition: true, maxWidth: 160, maxHeight: 160, crop: 'circle', collectionName: 'files', title: 'ICON', columnDefinition: { name: '_downloadURL' }, filterable: false, sortable: false })
    icon: any;

}
