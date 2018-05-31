import { FormControl, ValidatorFn } from '@angular/forms';
import { reduce } from 'lodash-es';

export function formInputCatalogValidatorRequired(): ValidatorFn {
    return (c: FormControl) => {
        return reduce (c.value || {}, (total, k) => {
            return k > 0 ? total + k : total;
        }, 0) <= 0 ? { formInputCatalogValidator: {valid: false}} : null;
    };
}