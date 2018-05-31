import { Pipe } from '../base';

import { moment } from '@shared/interfaces';


export class TimeAgoPipe extends Pipe<string | number | Date, any> {

    transform(value: string | number | Date): any {
        if (value) {
            return moment(value).fromNow();
        }
        return value;
    }
}