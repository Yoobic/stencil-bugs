type Validator<A> = (x: A) => boolean;

export function getNumberValidator(options: any): Validator<number> {
    return (val: number) => {

        if (val === null) {
            return false;
        }
        if (options.min && options.max) {
            return val < options.min || val > options.max ? false : true;
        } else if (options.min) {
            return val < options.min ? false : true;
        } else if (options.max) {
            return val > options.max ? false : true;
        } else {
            return false;
        }
    };
}