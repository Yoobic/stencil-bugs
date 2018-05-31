export function getNumberValidator(options) {
    return (val) => {
        if (val === null) {
            return false;
        }
        if (options.min && options.max) {
            return val < options.min || val > options.max ? false : true;
        }
        else if (options.min) {
            return val < options.min ? false : true;
        }
        else if (options.max) {
            return val > options.max ? false : true;
        }
        else {
            return false;
        }
    };
}
