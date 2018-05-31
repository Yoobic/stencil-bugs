import { combineAsyncValidators, getReducedAsyncValidator } from './async-validator';
import { AsyncValidator } from '@shared/interfaces';

fdescribe('Async Validator', () => {
    describe('Combine Async Validator', () => {
        describe('Should combine async validator in a valid validator', async () => {
            let v1: AsyncValidator<number> = async (x: number) => x > 5;
            let v2: AsyncValidator<number> = async (x: number) => x < 10;
            let combined: AsyncValidator<number> = combineAsyncValidators(v1, v2);

            let results = [
                { value: 7, result: true },
                { value: 4, result: false },
                { value: 42, result: false }
            ];
            results.forEach(i => {
                it(`${i.value} should ${i.result ? 'success' : 'fail'} with ${v1} and ${v2} combined`, async () => {
                    expect(await combined(i.value)).toEqual(i.result);
                });
            });
        });
    });

    describe('Should reduce an array of async validator', () => {

        describe('Should reduce an empty array to the default validator', () => {
            let validator: AsyncValidator<any> = getReducedAsyncValidator([]);
            let results = [
                { value: 1, result: true },
                { value: 10000, result: true },
                { value: 'qsdf', result: true },
                { value: [], result: true },
                { value: [1, 'zrg'], result: true },
                { value: {}, result: true }
            ];

            results.forEach(i => {
                it(`${i.value} should ${i.result ? 'success' : 'fail'}`, async () => {
                    expect(await validator(i.value)).toEqual(i.result);
                });
            });
        });

        describe('Should reduce an array with one element', () => {
            let validator: AsyncValidator<any> = getReducedAsyncValidator([async (x: number) => x > 5]);
            let results = [
                { value: 1, result: false },
                { value: 10000, result: true },
                { value: 'qsdf', result: false },
                { value: [], result: false },
                { value: [1, 'zrg'], result: false },
                { value: {}, result: false }
            ];

            results.forEach(i => {
                it(`${i.value} should ${i.result ? 'success' : 'fail'}`, async () => {
                    expect(await validator(i.value)).toEqual(i.result);
                });
            });
        });
    });
});