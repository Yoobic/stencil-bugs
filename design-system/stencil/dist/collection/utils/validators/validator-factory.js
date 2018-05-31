import { emailValidator } from './email/email.validator';
import { getNumberValidator } from './number/number.validator';
export const VALIDATORS = {
    email: 'email',
    number: 'number'
};
export function validatorFactory(entry) {
    switch (entry.name) {
        case VALIDATORS.email:
            return emailValidator;
        case VALIDATORS.number:
            return getNumberValidator(entry.options);
        default:
            return null;
    }
}
function isValidEntry(entry) {
    return entry && entry.name && typeof entry.name === 'string' && validatorFactory(entry) ? true : false;
}
export function getValidator(validator) {
    return isValidEntry(validator) ? validatorFactory(validator) : validator;
}
export function combineValidators(x, y) {
    return (a) => x(a) && y(a);
}
export function getReducedValidator(validators) {
    return validators.map(item => getValidator(item)).reduce(combineValidators, (a) => true);
}
