import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { getGroupsTransform } from '../condition/condition.interface';

import { FormFieldType, IFile } from '@shared/interfaces';

export function onUrlChange(doc, fieldControls, data) {
    if (doc && doc.name) {
        fieldControls._filename.markAsTouched();
        fieldControls._filename.setValue(doc.name);
    }
    if (doc && doc.size) {
        fieldControls.size.markAsTouched();
        fieldControls.size.setValue(doc.size);
    }
    if (doc && doc.type) {
        fieldControls.mimeType.markAsTouched();
        fieldControls.mimeType.setValue(doc.type);
    }
}

@Model({
    className: 'File',
    collectionName: 'files',
    fields: ['*'],
    include: ['container']
})

export class File extends IFile {
    @Editable('File', {
        type: FormFieldType.documentuploader,
        filterable: false,
        required: true,
        title: 'DOCUMENT',
        columnDefinition: { width: 52 },
        onChange: onUrlChange })

    @Editable('File', { title: 'TITLE', required: true, type: FormFieldType.text })
    @Searchable('File') _filename: string;

    @Editable('File', { visible: false, type: FormFieldType.number })

    @Editable('File', { visible: false, type: FormFieldType.text })
    @Searchable('File') mimeType: string;

    @Editable('File', { type: FormFieldType.toggle, columnDefinition: { width: 80 } })

    @Editable('File', {
        required: true,
        name: 'group',
        columnDefinition: { name: 'group', forceName: true },
        title: 'GROUPS',
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        multiple: true,
        clearable: false })

    @Editable('File', { type: FormFieldType.autocomplete, tag: true, allowCustomTag: true, collectionName: 'files', multiple: true, icon: 'yo-flag', subQuery: { field: 'fileRef', values: '_id' } })
    @Searchable('File') tags?: Array<string>;
}
