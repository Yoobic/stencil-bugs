import { Pipe, PipeTransform } from '@angular/core';

import { orderBy } from 'lodash-es';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {

    constructor() {
    }

    transform(value: Array<any>, ...args: any[]): any {
        let keys = args[0].map((k) => k.replace('-', ''));
        let orders = args[0].map((k) => k.indexOf('-') === 0 ? 'desc' : 'asc');
        return orderBy(value, keys, orders);
    }
}
