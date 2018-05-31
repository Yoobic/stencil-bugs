import { FormControl } from '@angular/forms';
import { formInputBaseEmailValidatorRequired } from './form-input-base-email-validator';

describe('shared:data-core:validators:form-input-base-email', () => {
    let tests = [
        {email: 'admin@yoobic.com', valid: true},
        {email: 'admin', valid: false},
        {email: 'a@a.a', valid: false},
        {email: '', valid: true}
    ];
    tests.forEach(t => {
        it(`${t.email} should ${t.valid ? '' : 'not '}be valid`, () => {
            expect(formInputBaseEmailValidatorRequired()(new FormControl(t.email)))
                .toEqual(t.valid ? null : {formInputBaseEmailValidator: true});
        });
    });
});