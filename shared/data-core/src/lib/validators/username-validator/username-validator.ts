import { Injector } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
//import { Users } from '../../services/users/users.service';
import { Requestor } from '../../services/requestor/requestor.service';
//import { Config } from '../../services/config/config.service';
import { isPresent } from '@shared/common';
import { map } from 'rxjs/operators';

function getValidator(isValid) {
    return isValid ? null : {
        usernameValidator: {
            valid: false
        }
    };
}

export function usernameValidatorRequired(injector: Injector): ValidatorFn {
    let requestor: Requestor = injector.get<Requestor>(Requestor) || null;
    return (c: FormControl) => {
        return new Promise((resolve, reject) => {
            let isValid = c.pristine;
            if (isPresent(c.value) && !c.pristine) {

                return requestor.post(this.broker.getApiUrl() + 'businesslogic/isUsernameTaken', { params: { username: c.value } })
                    .pipe(map(res => res.data)).subscribe(present => {
                        isValid = !present;
                        resolve(getValidator(isValid));
                    }, err => resolve(getValidator(false)));
            } else {
                resolve(getValidator(isValid));
            }
        });
    };
}
