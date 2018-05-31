import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';

import { ITag } from '@shared/interfaces';

@Model({
    className: 'Tag',
    collectionName: 'tags',
    fields: ['*'],
    include: []
})

export class Tag extends ITag {
    @Searchable('Tag') tag: string;

}
