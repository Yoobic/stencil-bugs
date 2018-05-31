import { Pipe } from '../base';

export class NumberPipe extends Pipe<number, string> {
    transform(value: number, options: string) {
        if (Math.abs(value) <= 999) {
            return value.toString();
        } else if (Math.abs(value) <= 999999) {
            return Math.round(value / 1000) + ' K';
        } else if (Math.abs(value) <= 999999999) {
            return Math.round(value / 1000000) + ' M';
        } else {
            return Math.round(value / 1000000) + ' M';
        }
    }
}
