import { PromiseService } from './promise.service';
import { async } from '@angular/core/testing';

describe('Service: PromiseService', () => {

    let promiseService: PromiseService = new PromiseService();

    describe('sequential', () => {

        it('should return a promise which can be resolved with an array of results when passed an array of promises', () => {

            let promise1 = new Promise((resolve, reject) => {
                resolve('promiseResult1');
            });

            let promise2 = new Promise((resolve, reject) => {
                resolve('promiseResult2');
            });

            let promiseArray: Array<Promise<any>> = [promise1, promise2];

            promiseService.sequential(promiseArray)
                .then((values) => {
                    expect(values[0]).toEqual('promiseResult1');
                    expect(values[1]).toEqual('promiseResult2');
                }).catch((err) => { });
        });
    });
});