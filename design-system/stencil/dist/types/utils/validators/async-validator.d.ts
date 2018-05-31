import { AsyncValidator } from '@shared/interfaces';
export declare function combineAsyncValidators<A>(x: AsyncValidator<A>, y: AsyncValidator<A>): AsyncValidator<A>;
export declare function getReducedAsyncValidator<A>(validators: Array<AsyncValidator<A>>): AsyncValidator<A>;
