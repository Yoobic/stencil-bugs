import { FormControl, ValidatorFn } from '@angular/forms';
import { isArray, reduce } from 'lodash-es';

export function formInputChecklistValidatorRequired(): ValidatorFn {
    return (c: FormControl) => {
        if (c.value && c.value.previousTasks && isArray(c.value.previousTasks) && c.value.previousTasks.length > 0) {
            let unfinished = reduce(c.value.previousTasks, (count, i) =>
                (i.validated !== true && i.validated !== false) ? count += 1 : count
            , 0);
            if (unfinished > 0) {
                return {
                    formInputChecklistValidator: {
                        valid: false
                    }
                };
            }
        }
        if (!c.value || !c.value.currentTasks || !(c.value.currentTasks.length > 0)) {
            return {
                formInputChecklistValidator: {
                    valid: false
                }
            };
        }
        return null;
    };
}
