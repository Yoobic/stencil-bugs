import { Pipe } from '../pipe';
import * as moment from 'moment';
export class TimeAgoPipe extends Pipe {
    transform(value) {
        if (value) {
            return moment(value).fromNow();
        }
        return value;
    }
}
