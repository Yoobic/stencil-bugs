import { Pipe } from '../pipe';
export declare class RoundPipe extends Pipe<number, number> {
    transform(value: number): number;
}
export declare const roundPipe: RoundPipe;
