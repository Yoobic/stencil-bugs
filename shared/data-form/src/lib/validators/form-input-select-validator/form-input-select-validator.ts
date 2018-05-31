import { FormControl, ValidatorFn } from '@angular/forms';

export function formInputSelectValidatorRequired(): ValidatorFn {
    return (c: FormControl) => {
        if (!c.value || c.value.length === 0) {
            return {
                formInputSelectValidator: {
                    valid: false
                }
            };
        }
        return null;
    };
}
