
export type Validator<A> = (x: A) => boolean;

export type AsyncValidator<A> = (x: A) => Promise<boolean>;

export interface ValidatorEntry {
    name?: string;
    options?: any;
}