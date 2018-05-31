import { Pipe } from '../pipe';
export declare class TimerPipe implements Pipe<number, string> {
    transform(value: number, options: 'seconds' | 'minutes' | 'hours'): string;
    secondParser(time: number, precision?: string): string;
    padder(num: number): string;
}
export declare const timerPipe: TimerPipe;
