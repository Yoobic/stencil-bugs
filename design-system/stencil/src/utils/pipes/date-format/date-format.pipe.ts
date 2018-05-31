import { Pipe } from '../base';

import { moment } from '@shared/interfaces';


export class DateFormatPipe extends Pipe<string | number | Date, any> {

    transform(value: string | number | Date, options: string = ''): any {
        if (value) {
            let isTime = /^\d\d:\d\d/.test(value.toString());
            if (options === 'fromNow') {
                return moment(value, isTime ? 'HH:mm' : '').fromNow();
            }
            return moment(value, isTime ? 'HH:mm' : '').format(options);
        }
        return value;
    }
}
