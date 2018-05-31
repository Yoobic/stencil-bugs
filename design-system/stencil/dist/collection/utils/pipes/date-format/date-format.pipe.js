import { Pipe } from '../pipe';
import * as moment from 'moment';
export class DateFormatPipe extends Pipe {
    transform(value, options) {
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
export const dateFormatPipe = new DateFormatPipe();
