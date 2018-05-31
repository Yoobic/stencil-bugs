import { Pipe } from '../pipe';
export declare class CurrencyPipe extends Pipe<number, string> {
    transform(value: number, options?: string): string;
}
export declare const currencyPipe: CurrencyPipe;
