import { Pipe, PipeTransform } from '@angular/core';

import { isEmpty, isString, isArray, slice } from 'lodash-es';

@Pipe({    name: 'limitTo'})
export class LimitToPipe implements PipeTransform {
    static supportsObj(obj): boolean {
        return isString(obj) || isArray(obj);
    }

    constructor() { }

    supports(obj): boolean {
        return LimitToPipe.supportsObj(obj);
    }

    transform(value, ...args: any[]): any {
        if (!value) {
            return [];
        }
        if (isEmpty(args) || args.length === 0) {
            throw new Error('limitTo pipe requires one argument');
        }
        let limit: number = args[0];
        let left = 0,
            right = Math.min(limit, value.length);
        if (limit < 0) {
            left = Math.max(0, value.length + limit);
            right = value.length;
        }
        if (isString(value)) {
            return value.substring(left, right);
        }
        return slice(value, left, right);
    }

    onDestroy(): void {
        //
    }
}
