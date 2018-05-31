import { Pipe } from '../pipe';
export declare class DateFormatPipe extends Pipe<string | number | Date, any> {
    transform(value: string | number | Date, options: string): any;
}
export declare const dateFormatPipe: DateFormatPipe;
