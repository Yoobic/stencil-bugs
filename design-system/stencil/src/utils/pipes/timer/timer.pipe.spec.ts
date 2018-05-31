import { pipes } from '../pipe';

describe('Timer Pipe', () => {
    it('should be defined', () => {
        expect(pipes.timer).toBeDefined();
    });

    it('transforms to seconds as default', () => {
        expect(pipes.timer.transform(10000)).toEqual('02:46:40');
    });

    it('transforms to seconds', () => {
        expect(pipes.timer.transform(10000, 'seconds')).toEqual('02:46:40');
    });

    it('transforms to minutes', () => {
        expect(pipes.timer.transform(10000, 'minutes')).toEqual('02:46');
    });

    it('transforms to hours', () => {
        expect(pipes.timer.transform(10000, 'hours')).toEqual('02');
    });
    it('returns 00 for small number', () => {
        expect(pipes.timer.transform(10, 'hours')).toEqual('00');
    });
    it('returns number of hours for over a day', () => {
        let overDay = 60 * 60 * 24 * 7;
        expect(pipes.timer.transform(overDay, 'hours')).toEqual('168');
    });
});