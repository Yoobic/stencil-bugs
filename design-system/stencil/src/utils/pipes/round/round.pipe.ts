import { Pipe } from '../base';

export class RoundPipe extends Pipe<number, number> {
    transform(value: number): number {
        return Math.round(value);
    }
}
