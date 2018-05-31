import { Injectable } from '@angular/core';

@Injectable()
export class PromiseService {

    wait(duration) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration);
        });
    }

    retryOnFailure = (functionToRetry, timesToRetry = 3, delay = 300) => {
        let retryCount = timesToRetry;
        let failureReason;
        let functionToIterate = (...args) => {
            if (retryCount < 1) {
                return Promise.reject(failureReason);
            } else {
                retryCount--;
                return functionToRetry(...args).catch((err) => {
                    failureReason = err;
                    return this.wait(delay).then(() => functionToIterate(...args));
                });
            }
        };
        return functionToIterate;
    }

    promiseTimeout(ms, promise) {
        // Create a promise that rejects in <ms> milliseconds
        let timeout = new Promise((resolve, reject) => {
            let id = setTimeout(() => {
            clearTimeout(id);
            reject('Timed out in ' + ms + 'ms.');
            }, ms);
        });

        // Returns a race between our timeout and the passed in promise
        return Promise.race([
            promise,
            timeout
        ]);
    }

    sequential(promises: Array<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!promises || promises.length === 0) {
                //throw new Error('First argument need to be an array of Promises');
                return resolve([]);
            }
            let count = 0;
            let results = [];
            const iterateeFunc = (previousPromise, currentPromise) => {
                return previousPromise
                    .then(function(result) {
                        if (count++ !== 0) {
                            results = results.concat(result);
                        }
                        return currentPromise(result, results, count);
                    })
                    .catch((err) => {
                        return reject(err);
                    });
            };
            promises = promises.concat(() => Promise.resolve());
            promises.reduce(iterateeFunc, Promise.resolve(false))
                .then(function(res) {
                    resolve(results);
                });
        });

        // let p = Promise.resolve();
        // return promises.reduce((pacc, fn) => {
        //     return pacc = pacc.then(fn);
        // }, p);
    }
}
