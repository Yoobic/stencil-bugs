import { Injector } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { Session } from '../../services/session/session.service';
import { Requestor } from '../../services/requestor/requestor.service';
import { Config } from '../../services/config/config.service';
import { isPresent } from '@shared/common';
import { map } from 'rxjs/operators';

function getValidator(isValid) {
    return isValid ? null : {
        passwordValidator: {
            valid: false
        }
    };
}

export function passwordValidatorRequired(injector: Injector): ValidatorFn {
    let requestor: Requestor = injector.get(Requestor);
    let config: Config = injector.get(Config);
    let session: Session = injector.get(Session);
    return (c: FormControl) => {
        return new Promise((resolve, reject) => {
            let isValid = c.pristine;
            if (isPresent(c.value) && !c.pristine) {
                let url = config.serverUrl + 'auth/login';
                requestor.post(url, { username: session.user.username, password: c.value })
                    .pipe(map(res => res.data))
                    .subscribe(() => {
                        resolve(getValidator(true));
                    }, err => resolve(getValidator(false)));
            } else {
                resolve(getValidator(isValid));
            }
        });
    };
}
