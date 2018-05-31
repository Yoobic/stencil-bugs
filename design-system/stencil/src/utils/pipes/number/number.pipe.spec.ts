import { pipes } from '../pipe';

describe('Pipe: Number', () => {

    let results = [
        {value: 37, result: '37'},
        {value: 370, result: '370'},
        {value: 3712, result: '4 K'},
        {value: 37123, result: '37 K'},
        {value: 37923, result: '38 K'},
        {value: 122343, result: '122 K'},
        {value: 1246899, result: '1 M'},
        {value: 1846899, result: '2 M'},
        {value: 12468992, result: '12 M'},
        {value: 312468992, result: '312 M'},
        {value: 312968992, result: '313 M'}
    ];

    results.forEach(i => {
        it(`${i.value} should return ${i.result}`, () => {
            expect(pipes.number.transform(i.value)).toEqual(i.result);
        });
    });
});