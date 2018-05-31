import { Pipe } from '../base';

export class CurrencyPipe extends Pipe<number, string> {
    transform(value: number, options: string = 'EUR'): string {
        return value.toString() + ' ' + options;
    }
}
