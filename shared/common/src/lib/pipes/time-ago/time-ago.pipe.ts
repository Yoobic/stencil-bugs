import { Pipe, PipeTransform } from '@angular/core';
import { moment } from '@shared/interfaces';


@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
    constructor() {}

    transform(value: string, ...args: any[]): any {
        if (value) {
            return moment(value).fromNow();
        }
        return value;
    }
}
