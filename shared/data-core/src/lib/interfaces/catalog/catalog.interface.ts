import { FormFieldType, ICatalog } from '@shared/interfaces';

import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FORM_FILES_IMAGE_FILTER } from '../constants/constants.interface';
import { getGroupsTransform } from '../condition/condition.interface';

@Model({
    className: 'Catalog',
    collectionName: 'catalogs',
    fields: ['*'],
    include: []
})

export class Catalog extends ICatalog {

    @Editable('Catalog', { required: true, type: 'text' })
    @Searchable('Catalog') title: string;

    @Editable('Catalog', { type: FormFieldType.autocomplete, maxWidth: 600, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, maxHeight: 300, crop: 'square', collectionName: 'files', title: 'PHOTO', required: true, columnDefinition: { name: '_downloadURL' } })
    image: any;

    @Editable('Catalog', { type: FormFieldType.textarea })
    description: string;

    @Editable('Catalog', { title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, required: true })
    group: string;
}
