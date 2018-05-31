import { DateFormatPipe } from './date-format.pipe';
//let moment = require.requireActual('moment');
//jest.genMockFromModule('moment');
// jest.mock('moment', () => {
//     let m  = require.requireActual('moment');
//     console.log('MOMENT in SPEC', m());
//     return m.default;
// });
//import mock_moment from 'moment';
//jest.mock('moment');

xdescribe('Pipe: DateFormatPipe', () => {
    // jest.mock('moment', () => {
    //     console.log('MO', mock_moment);
    //     return mock_moment.default;
    // });

    let dateFormatPipe: DateFormatPipe = new DateFormatPipe();
    let date = new Date();
    it('should format a date correctly', () => {

        //expect(moment).toBeDefined();
        date.setFullYear(2020, 0, 14);
        expect(dateFormatPipe.transform(date)).toContain('2020-01-14T');
    });
});