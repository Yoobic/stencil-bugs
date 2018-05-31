import { Pipe } from '../base';

import { orderBy } from 'lodash-es';

export class OrderByPipe extends Pipe<Array<any>, Array<any>> {
    transform(value: Array<any>, options: string[]) {
        let keys = options.map((k) => k.replace('-', ''));
        let orders = options.map((k) => k.indexOf('-') === 0 ? 'desc' : 'asc');
        return orderBy(value, keys, orders);
    }
}
