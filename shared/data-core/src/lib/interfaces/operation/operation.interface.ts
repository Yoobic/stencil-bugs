import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { IOperation, FormFieldType } from '@shared/interfaces';

@Model({
    className: 'Operation',
    collectionName: 'operation',
    fields: ['*'],
    include: []
})

export class Operation extends IOperation {

    @Searchable('Operation') operationId: string;
    @Searchable('Operation') operationName: string;
    @Searchable('Operation') methodName: string;
    @Searchable('Operation') modelName: string;

    @Editable('Operation', { type: FormFieldType.datetime, readonly: true })
    @Searchable('Operation') _createdAt: Date;

    @Editable('Operation', { type: FormFieldType.number, readonly: true })
    @Searchable('Operation') count: number;
}
