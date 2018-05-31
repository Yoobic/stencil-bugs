import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
    constructor() { }

    transform(value: any, ...args: any[]): any {
        if (value) {
            return Object.keys(value).map((key) => ({ key, value: value[key] }));
        }
        return value;
    }
}
