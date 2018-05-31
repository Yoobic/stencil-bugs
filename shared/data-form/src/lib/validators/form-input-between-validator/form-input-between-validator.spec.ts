import { FormControl } from '@angular/forms';

import { formInputBetweenValidatorRequired } from './form-input-between-validator';

describe('shared:data-core:validators:form-input-between', () => {
    const current = [{name: 'test'}];
    let tests = [
        {value: 1, valid: false},
        {value: 'a', valid: false},
        {value: undefined, valid: false},
        {value: [], valid: false},
        {value: [1], valid: false},
        {value: 0, valid: false},
        {value: [1, 10], valid: true},
        {value: [0, 0], valid: false},
        {value: [0, -1], valid: false},
        {value: [0, 10], valid: true},
        {value: ['a', 'b'], valid: true},
        {value: [1, 'a'], valid: false},
        {value: [undefined, 1], valid: false},
        {value: [1, undefined], valid: false},
        {value: [undefined, 'a'], valid: false},
        {value: ['a', undefined], valid: false}
    ];
    tests.forEach(t => {
        it(`${JSON.stringify(t.value)} should ${t.valid ? '' : 'not '}be valid`, () => {
                expect(formInputBetweenValidatorRequired()(
                    new FormControl(t.value)
            )).toEqual(t.valid ? null : {formFilterFieldValidator: {valid: false}});
        });
    });
});