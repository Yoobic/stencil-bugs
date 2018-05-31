import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { FormFieldType, ITagGroup} from '@shared/interfaces';
import { Editable } from '../../decorators/editable/editable.decorator';
import { getGroupsTransform } from '../condition/condition.interface';

@Model({
    className: 'TagGroup',
    collectionName: 'tagGroups',
    fields: ['*'],
    include: []
})

export class TagGroup extends ITagGroup {
    @Editable('TagGroup', { required: true, type: FormFieldType.text })
    @Searchable('TagGroup') title: string;

    @Editable('TagGroup', { title: 'LOCATIONTAGS', required: true, type: FormFieldType.autocomplete, tag: true, collectionName: 'locations', multiple: true, subQuery: { field: 'locationRef', values: '_id' }, fixedPosition: true })
    tags: Array<string>;

    @Editable('TagGroup', { title: 'GROUPS', type: FormFieldType.autocomplete, collectionName: 'groups', filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]], hiddenFields: ['isRole', 'type'], idOnly: true, mapTransform: getGroupsTransform, multiple: true, clearable: false, required: true, fixedPosition: true })
    group: string | Array<string>;

}
