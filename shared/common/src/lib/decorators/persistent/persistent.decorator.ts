import * as localForage from 'localforage';

export function Persistent(storageKey?: string, useAsync?: boolean, callback?: Function, forceReplace?: boolean) {

    function isValidJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    return (target: Object, decoratedPropertyName: string): void => {
        let options: { storageKey: string } = Object.assign({}, { storageKey: storageKey || decoratedPropertyName });
        let _value;
        if (useAsync) {
            localForage.getItem(options.storageKey).then(v => {
                _value = v;
                if (callback) {
                    callback(v);
                }
            }, () => { });
        } else {
            if (typeof window !== 'undefined') {
                _value = localStorage.getItem(options.storageKey) && isValidJson(localStorage.getItem(options.storageKey)) ? JSON.parse(localStorage.getItem(options.storageKey)) : null;
            }
        }
        let _isInitialised = false;

        let propertyObj = {
            get: function () {
                _isInitialised = true;
                return _value;
            },
            set: function (value) {
                if (!_isInitialised) {
                    _isInitialised = true;
                    if (forceReplace !== true) {
                        return;
                    }
                }
                if (typeof (value) !== 'undefined') {
                    _value = value;
                    try {
                        if (useAsync) {
                            localForage.setItem(options.storageKey, value).catch(() => { });
                        } else {
                            localStorage.setItem(options.storageKey, JSON.stringify(value));
                        }
                    } catch (e) {

                    }
                }
            },
            enumerable: false
        };
        Object.defineProperty(target, decoratedPropertyName, propertyObj);

    };
}
