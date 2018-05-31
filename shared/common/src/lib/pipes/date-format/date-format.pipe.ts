import { Pipe, PipeTransform } from '@angular/core';
import { moment } from '@shared/interfaces';


@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
    constructor() { }

    transform(value: string | number | Date, ...args: string[]): any {
        if (value) {
            let isTime = /^\d\d:\d\d/.test(value.toString());
            if (args[0] === 'fromNow') {
                return moment(value, isTime ? 'HH:mm' : '').fromNow();
            }
            return moment(value, isTime ? 'HH:mm' : '').format(args[0]);
        }
        return value;
    }
}
