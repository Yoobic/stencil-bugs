import { pipes } from '../pipe';

describe('Pipe: DateFormatPipe', () => {

    let date = new Date();
    xit('should format a date correctly', () => {

        date.setFullYear(2020, 0, 14);
        expect(pipes.dateFormat.transform(date, '')).toContain('2020-01-14T');
    });
});