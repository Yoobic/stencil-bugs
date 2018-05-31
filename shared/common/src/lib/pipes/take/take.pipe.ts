import { Pipe, PipeTransform } from '@angular/core';

import { take as _take } from 'lodash-es';

@Pipe({ name: 'take' })
export class TakePipe implements PipeTransform {
    constructor() {}

    transform(value: Array <any> , ...args: any[]): any {
        let [count] = args;
        return _take(value, count);
    }
}
