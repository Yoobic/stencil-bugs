import { FormGroup, FormControl } from '@angular/forms';
import { passwordAreNotMatchingValidatorRequired } from './password-are-not-matching-validator';

describe('shared:data-core:validators:form-input-base-email', () => {
    const password = '123456';
    let tests = [
        {password, confirm: password, valid: true},
        {password , confirm: '', valid: false},
        {password, confirm: undefined, valid: false},
        {password: undefined , confirm: password, valid: false},
        {password: undefined , confirm: undefined, valid: true},
        {password: undefined , confirm: null, valid: true},

        {password: '' , confirm: '', valid: true}
    ];
    tests.forEach(t => {
        it(`${t.password} should ${t.valid ? '' : 'not '} match ${t.confirm}`, () => {
            expect(passwordAreNotMatchingValidatorRequired()(
                new FormGroup({
                    password: new FormControl(t.password),
                    confirmpassword: new FormControl(t.confirm)
                })
            )).toEqual((t.valid ? null : {passwordAreNotMatching: true})) ;
        });
    });
});