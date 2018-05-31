import { getNumberValidator } from './number.validator';

describe('Stencil Number Validator ', () => {
    let results = [
        {min: null, max: 10, value: 11, result: false},
        {min: 20, max: null, value: 19, result: false},
        {min: 10, max: 20, value: 700, result: false},
        {min: 10, max: 20, value: 3, result: false},
        {min: null, max: 10, value: 5, result: true},
        {min: null, max: 10, value: 10, result: true},
        {min: 20, max: null, value: 25, result: true},
        {min: 20, max: null, value: 20, result: true},
        {min: 10, max: 20, value: 15, result: true},
        {min: 10, max: 20, value: 10, result: true},
        {min: 10, max: 20, value: 20, result: true}
    ];

    results.forEach(i => {
        it(`${i.value} should ${i.result ? 'success' : 'fail'} with min: ${i.min} and max: ${i.max} `, () => {
            expect(getNumberValidator({min: i.min, max: i.max})(i.value)).toEqual(i.result);
        });
    });
});