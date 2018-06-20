import { emailValidator } from './email/email.validator';
import { requiredValidator } from './required/required.validator';
import { getNumberValidator } from './number/number.validator';

type Validator<A> = (x: A) => boolean;
interface ValidatorEntry {
    name?: string;
    options?: any;
}

export const VALIDATORS: any = {
    email: 'email',
    number: 'number',
    required: 'required'
};

export function validatorFactory(entry: ValidatorEntry): Validator<any> {
    switch (entry.name) {
        case VALIDATORS.email:
            return emailValidator;
        case VALIDATORS.number:
            return getNumberValidator(entry.options);
        case VALIDATORS.required:
            return requiredValidator;
        default:
            return null;
    }
}

function isValidEntry(entry: ValidatorEntry): boolean {
    return entry && entry.name && typeof entry.name === 'string' && validatorFactory(entry) ? true : false;
}

export function getValidator<A>(validator: Validator<A> | ValidatorEntry): Validator<A> {
    return isValidEntry(validator as ValidatorEntry) ? validatorFactory(validator as ValidatorEntry) : validator as Validator<A>;
}

export function combineValidators<A>(x: Validator<A>, y: Validator<A>): Validator<A> {
    return (a: A) => x(a) && y(a);
}

export function getReducedValidator<A>(validators: Array<Validator<A> | ValidatorEntry>): Validator<A> {
    return (validators || []).map(item => getValidator(item)).reduce(combineValidators, (a: A) => true);
}
