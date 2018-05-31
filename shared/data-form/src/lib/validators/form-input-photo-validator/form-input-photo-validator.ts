import { FormControl, ValidatorFn } from '@angular/forms';
import { IFormField } from '@shared/interfaces';
import { isEmpty } from 'lodash-es';

export function formInputPhotoValidatorRequired(field: IFormField): ValidatorFn {
    return (c: FormControl) => {
        let isValid = !isEmpty(c.value) || !field.required;
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
