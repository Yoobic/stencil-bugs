import { FormControl, ValidatorFn } from '@angular/forms';

export function formInputMissionfieldValidatorRequired(): ValidatorFn {
    return (c: FormControl) => {
        if (!c.value || !c.value.selectedDescription || !c.value.fields) {
            return {
                FormInputMissionfieldValidator: {
                    valid: false
                }
            };
        }
        return null;
    };
}
