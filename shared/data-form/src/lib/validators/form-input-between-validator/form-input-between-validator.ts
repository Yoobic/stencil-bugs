import { FormControl, ValidatorFn } from '@angular/forms';
import { isPresent } from '@shared/common';
import { isArray } from 'lodash-es';

export function formInputBetweenValidatorRequired(): ValidatorFn {
    return (c: FormControl) => {
        let isValid = isPresent(c.value) && isArray(c.value) && c.value.length === 2 && c.value[0] < c.value[1];
        return isValid ? null : {
            formFilterFieldValidator: {
                valid: false
            }
        };
    };
}
