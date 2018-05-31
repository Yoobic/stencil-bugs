import { combineValidators, getReducedValidator } from './validator-factory';
import { Validator } from '@shared/interfaces';

describe('Validator Factory methods', () => {
    describe('Combine validators', () => {
        describe('Should combine two validators', () => {
            let v1: Validator<number> = (x: number) =>  x > 5;
            let v2: Validator<number> = (x: number) => x < 10;
            let combined: Validator<number> = combineValidators(v1, v2);

            let results = [
                {value: 7, result: true},
                {value: 4, result: false},
                {value: 42, result: false}
            ];
            results.forEach(i => {
                it(`${i.value} should ${i.result ? 'success' : 'fail'} with ${v1} and ${v2} combined`, () => {
                    expect(combined(i.value)).toEqual(i.result);
                });
            });
        });
    });

    describe('Should reduce an array of validator', () => {

        describe('Should reduce an empty array to the default validator', () => {
            let validator: Validator<any> = getReducedValidator([]);
            let results = [
                {value: 1, result: true},
                {value: 10000, result: true},
                {value: 'qsdf', result: true},
                {value: [], result: true},
                {value: [1, 'zrg'], result: true},
                {value: {}, result: true}
            ];

            results.forEach(i => {
                it(`${i.value} should ${i.result ? 'success' : 'fail'}`, () => {
                    expect(validator(i.value)).toEqual(i.result);
                });
            });
        });

        describe('Should reduce an array with one element', () => {
            let validator: Validator<any> = getReducedValidator([(x: number) => x > 5]);
            let results = [
                {value: 1, result: false},
                {value: 10000, result: true},
                {value: 'qsdf', result: false},
                {value: [], result: false},
                {value: [1, 'zrg'], result: false},
                {value: {}, result: false}
            ];

            results.forEach(i => {
                it(`${i.value} should ${i.result ? 'success' : 'fail'}`, () => {
                    expect(validator(i.value)).toEqual(i.result);
                });
            });
        });
    });
});