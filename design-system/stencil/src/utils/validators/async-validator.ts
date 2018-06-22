type AsyncValidator<A> = (x: A) => Promise<boolean>;

export function combineAsyncValidators<A>(x: AsyncValidator<A>, y: AsyncValidator<A>): AsyncValidator<A> {
    return async (a: A) => await x(a) && await y(a);
}

export function getReducedAsyncValidator<A>(validators: Array<AsyncValidator<A>>): AsyncValidator<A> {
    return (validators || []).reduce(combineAsyncValidators, async (a: A) => true);
}