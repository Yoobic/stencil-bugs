import { TimerPipe } from './timer.pipe';

describe('Module: common', () => {
    describe('Pipe: TimerPipe', () => {
        let pipe: TimerPipe = new TimerPipe();

        it('should be defined', () => {
            expect(pipe).toBeDefined();
        });

        it('transforms to seconds as default', () => {
            expect(pipe.transform(10000)).toEqual('02:46:40');
        });

        it('transforms to seconds', () => {
            expect(pipe.transform(10000, 'seconds')).toEqual('02:46:40');
        });

        it('transforms to minutes', () => {
            expect(pipe.transform(10000, 'minutes')).toEqual('02:46');
        });

        it('transforms to hours', () => {
            expect(pipe.transform(10000, 'hours')).toEqual('02');
        });
        it('returns 00 for small number', () => {
            expect(pipe.transform(10, 'hours')).toEqual('00');
        });
        it('returns number of hours for over a day', () => {
            let overDay = 60 * 60 * 24 * 7;
            expect(pipe.transform(overDay, 'hours')).toEqual('168');
        });

    });
});