import { Pipe } from '../pipe';
export declare class OrderByPipe extends Pipe<Array<any>, Array<any>> {
    transform(value: Array<any>, options: string[]): any;
}
export declare const orderByPipe: OrderByPipe;
