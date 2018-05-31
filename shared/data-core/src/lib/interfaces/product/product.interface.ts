import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { IProduct, FormFieldType } from '@shared/interfaces';
import { FORM_FILES_IMAGE_FILTER } from '../constants/constants.interface';

@Model({
    className: 'Product',
    collectionName: 'products',
    fields: ['*'],
    include: ['catalog']
})

export class Product extends IProduct {
    @Editable('Product', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 1 })
    _id: string;

    @Editable('Product', { required: true, type: FormFieldType.text, exportOrder: 3 })
    @Searchable('Product') title: string;

    @Editable('Product', { type: FormFieldType.text, exportOrder: 4 })
    @Searchable('Product') reference: string;

    @Editable('Product', { flex: 50, type: FormFieldType.text, exportOrder: 10 })
    color: string;

    @Editable('Product', { required: false, flex: 50, type: FormFieldType.number, exportOrder: 9 })
    price: number;

    @Editable('Product', { flex: 50, type: FormFieldType.number, min: 0, exportOrder: 8 })
    step: number;

    @Editable('Product', { type: FormFieldType.checkbox, flex: 50, columnDefinition: { width: 40 }, exportOrder: 11 })
    outofstock: boolean;

    @Editable('Product', { type: FormFieldType.autocomplete, isImage: true, filters: FORM_FILES_IMAGE_FILTER, forceModal: true, hiddenFields: ['mimeType'], mode: 'tile', pageSize: 20, fixedPosition: true, maxWidth: 600, maxHeight: 300, crop: 'square', collectionName: 'files', title: 'PHOTO', required: true, columnDefinition: { name: '_downloadURL' }, filterable: false, exportOrder: 7 })
    image: any;

    @Editable('Product', { type: FormFieldType.textarea, exportOrder: 5 })
    description: string;

    @Editable('Product', { type: FormFieldType.textarea, exportOrder: 6 })
    shortdescription: string;

    @Editable('Product', { type: FormFieldType.autocomplete, tag: true, allowCustomTag: true, collectionName: 'products', multiple: true, icon: 'yo-flag', subQuery: { field: 'fileRef', values: '_id' }, exportOrder: 12 })
    @Searchable('Product')
    tags?: Array<string>;

    @Editable('Product', { type: FormFieldType.text, visible: false, forceExport: true, exportOrder: 2, columnDefinition: { name: 'title' } })
    catalog: any;
}
