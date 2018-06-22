type Validator<A> = (x: A) => boolean;

export const requiredValidator: Validator<string> =  (text: string) => {
    if (!text) {
        return false;
    } else if (text === '') {
        return false;
    }
    return true;
};
