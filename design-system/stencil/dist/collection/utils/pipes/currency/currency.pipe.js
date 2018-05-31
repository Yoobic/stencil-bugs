import { Pipe } from '../pipe';
export class CurrencyPipe extends Pipe {
    transform(value, options = 'EUR') {
        return value.toString() + ' ' + options;
    }
}
export const currencyPipe = new CurrencyPipe();
