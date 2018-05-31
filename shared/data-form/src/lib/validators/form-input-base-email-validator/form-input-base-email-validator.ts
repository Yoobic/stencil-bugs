import { FormControl, ValidatorFn } from '@angular/forms';

export function formInputBaseEmailValidatorRequired(): ValidatorFn {
    return (c: FormControl) => {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (c.value && (c.value.length <= 5 || !EMAIL_REGEXP.test(c.value))) {
            return { 'formInputBaseEmailValidator': true };
        }
        return null;
    };
}
