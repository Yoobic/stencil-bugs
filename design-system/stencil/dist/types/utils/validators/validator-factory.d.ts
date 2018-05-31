import { Validator, ValidatorEntry } from '@shared/interfaces';
export declare const VALIDATORS: any;
export declare function validatorFactory(entry: ValidatorEntry): Validator<any>;
export declare function getValidator<A>(validator: Validator<A> | ValidatorEntry): Validator<A>;
export declare function combineValidators<A>(x: Validator<A>, y: Validator<A>): Validator<A>;
export declare function getReducedValidator<A>(validators: Array<Validator<A> | ValidatorEntry>): Validator<A>;
