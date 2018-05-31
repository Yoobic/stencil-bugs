import { FormControl, ValidatorFn } from '@angular/forms';
import { isNumber } from 'lodash-es';

export function formInputBaseNumberValidatorNumber(range): ValidatorFn {
    return (c: FormControl) => {
        let val = c.value;
        if (isNaN(val) || val === null || val === '') {
            return null;
        } else if (isNumber(range.min) && isNumber(range.max)) {
            return val < range.min || val > range.max ? { FormInputBaseNumberValidator: true } : null;
        } else if (isNumber(range.min)) {
            return val < range.min ? { FormInputBaseNumberValidator: true } : null;
        } else if (isNumber(range.max)) {
            return val > range.max ? { FormInputBaseNumberValidator: true } : null;
        } else {
            return null;
        }
    };
}
