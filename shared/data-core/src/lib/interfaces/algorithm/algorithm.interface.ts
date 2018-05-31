
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IAlgorithm } from '@shared/interfaces';

@Model({
    className: 'Algorithm',
    collectionName: 'algorithm',
    fields: ['name', '_id'],
    include: []
})

export class Algorithm extends  IAlgorithm {

    @Editable('Algorithm', { required: true, type: FormFieldType.text })
    @Searchable('Algorithm') name: string;

}
