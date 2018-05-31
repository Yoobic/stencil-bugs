import { FormControl, ValidatorFn } from '@angular/forms';
import { IFormField } from '@shared/interfaces';
import { isArray, isNumber } from 'lodash-es';

export function formInputMultiphotosValidatorRequired(field: IFormField, range): ValidatorFn {
    return (c: FormControl) => {
        let minNum = isNumber(range.min) ? range.min : 1;
        let isValValid = (val) => {
            let isValueValid = true;
            for (let i = 0; i < minNum; i++) {
                if (!val[i]) {
                    isValueValid = false;
                    break;
                }
            }
            return isValueValid;
        };
        // minimum number of photos are taken and each photo value is valid
        let isValid = c.value && isArray(c.value) && c.value.length >= minNum && isValValid(c.value);
        if (field.isImageRecognition) {
            isValid = isValid && (<any>c).processed;
        }
        if (!isValid) {
            return {
                FormInputMultiphotosValidator: {
                    valid: false
                }
            };
        }
        return null;
    };
}
