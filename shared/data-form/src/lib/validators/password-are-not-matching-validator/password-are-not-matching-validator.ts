import { FormGroup, ValidatorFn } from '@angular/forms';

export function passwordAreNotMatchingValidatorRequired(): ValidatorFn {
    return (form: FormGroup) => {
        if (!form || !form.controls) {
            return null;
        }
        let password = form.controls['password'].value;
        let confirmpassword = form.controls['confirmpassword'].value;

        if (password === confirmpassword) {
            return null;
        } else {
            let error = { passwordAreNotMatching: true };
            form.controls['confirmpassword'].setErrors(error);
            return error;
        }
    };
}
