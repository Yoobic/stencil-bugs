import { FormControl } from '@angular/forms';
import { formInputSelectValidatorRequired } from './form-input-select-validator';

describe('shared:data-core:validators:form-input-select', () => {
    let tests = [
        {value: ['a', 'b'], valid: true},
        {value: [], valid: false},
        {value: null, valid: false},
    ];
    tests.forEach(t => {
        it(`${t.value} should ${t.valid ? '' : 'not '}be valid`, () => {
            expect(formInputSelectValidatorRequired()(new FormControl(t.value)))
                .toEqual(t.valid ? null : {formInputSelectValidator: {valid: false}});
        });
    });
});