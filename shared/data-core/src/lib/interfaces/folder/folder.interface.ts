import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { getGroupsTransform } from '../condition/condition.interface';

import { FormFieldType, IFolder, IFileOrFolder } from '@shared/interfaces';

@Model({
    className: 'Folder',
    collectionName: 'folders',
    fields: ['*'],
    include: []
})

export class Folder extends IFolder {
    @Editable('Folder', { title: 'TITLE', required: true, type: FormFieldType.text })
    @Searchable('Folder') name: string;

    @Editable('Folder', { title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, required: true }) group: string;
}

@Model({
    className: 'FileOrFolder',
    collectionName: 'filesFolders',
    fields: ['*'],
    include: []
})

export class FileOrFolder extends IFileOrFolder {

    @Searchable('FileOrFolder') name?: string;
    @Searchable('FileOrFolder') _filename?: string;

    @Searchable('FileOrFolder') mimeType?: string;

}
