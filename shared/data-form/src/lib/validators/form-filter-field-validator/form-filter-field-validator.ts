import { FormControl, ValidatorFn } from '@angular/forms';
import { isPresent } from '@shared/common';
import { isArray } from 'lodash-es';

export function formFilterFieldValidatorRequired(): ValidatorFn {
    return (c: FormControl) => {
        let isValid = isPresent(c.value) && isPresent(c.value.value) && (isPresent(c.value.operator) || isPresent(c.value.radius)); // && (c.value.value || c.value.value === false)
        if (isValid && c.value.operator && c.value.operator._id === 'between') {
            isValid = isPresent(c.value.value) && isArray(c.value.value) && c.value.value.length === 2 && c.value.value[0] < c.value.value[1];
        } else if (isValid && isArray(c.value.value)) {
            isValid = c.value.value.length > 0;
        }
        return isValid ? null : {
            formFilterFieldValidator: {
                valid: false
            }
        };
    };
}
