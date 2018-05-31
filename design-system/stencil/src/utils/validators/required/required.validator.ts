import { Validator } from '@shared/interfaces';

export const requiredValidator: Validator<string> =  (text: string) => {
    if (!text) {
        return false;
    } else if (text === '') {
        return false;
    }
    return true;
};
