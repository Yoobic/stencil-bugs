import { Pipe } from '../pipe';
import { orderBy } from 'lodash';
export class OrderByPipe extends Pipe {
    transform(value, options) {
        let keys = options.map((k) => k.replace('-', ''));
        let orders = options.map((k) => k.indexOf('-') === 0 ? 'desc' : 'asc');
        return orderBy(value, keys, orders);
    }
}
export const orderByPipe = new OrderByPipe();
