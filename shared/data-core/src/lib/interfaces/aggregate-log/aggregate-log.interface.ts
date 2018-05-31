import { Model } from '../../decorators/model/model.decorator';
import { IAggregateLog } from '@shared/interfaces';

@Model({
    className: 'AggregateLog',
    collectionName: 'aggregateLogs',
    fields: ['*'],
    include: []
})

export class AggregateLog extends IAggregateLog {

}
