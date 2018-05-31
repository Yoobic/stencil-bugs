import { Pipe } from '../base';

export class DecimalPipe extends Pipe<number, string> {
    transform(value: number) {
        return value.toString();
    }
}