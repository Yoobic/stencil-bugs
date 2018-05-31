import { Pipe } from '../pipe';
export class RoundPipe extends Pipe {
    transform(value) {
        return Math.round(value);
    }
}
export const roundPipe = new RoundPipe();
