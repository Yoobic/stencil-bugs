import { FormControl } from '@angular/forms';

import { formInputBaseNumberValidatorNumber } from './form-input-base-number-validator';

describe('shared:data-core:validators:form-input-base-number', () => {
    let tests = [
        {value: 10, min: 0, max: 10, valid: true},
        {value: 10, min: 0, max: undefined, valid: true},
        {value: 10, min: undefined, max: 10, valid: true},
        {value: 10, min: 20, max: undefined, valid: false},
        {value: 10, min: undefined, max: 5, valid: false},
        {value: 10, min: 10, max: 0, valid: false},
        {value: 10, min: undefined, max: undefined, valid: true},
        {value: 10, min: 'a', max: 20, valid: true},
        {value: 10, min: 0, max: 'a', valid: true},
        {value: undefined, min: 0, max: 10, valid: true},
        {value: 'a', min: 0, max: 10, valid: true}
    ];
    tests.forEach(t => {
        it(`${t.value} with min: ${t.min} and max: ${t.max} should ${t.valid ? '' : 'not '}be valid`, () => {
            expect(formInputBaseNumberValidatorNumber({min: t.min, max: t.max})(new FormControl(t.value)))
                .toEqual(t.valid ? null : {FormInputBaseNumberValidator: true});
        });
    });
});