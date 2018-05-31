import { Pipe } from '../pipe';
export declare class FileSizePipe extends Pipe<number, string> {
    transform(value: number): string;
}
export declare const fileSizePipe: FileSizePipe;
