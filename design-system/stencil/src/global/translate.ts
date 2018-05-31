
export default (function () {
    //const privateInstance = ...

    return {
        get: (val: string) => {
            const translateService = (window as any).translateService;
            if (translateService) {
                return translateService.get(val);
            }
            return val;
        },
        polyglot: (val: string) => {
            const translateService = (window as any).translateService;
            if (translateService) {
                return translateService.polyglot(val);
            }
            return val;
        }
    };
})();