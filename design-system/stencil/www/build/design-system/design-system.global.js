/*! Built with http://stenciljs.com */
(function(namespace,resourcesUrl){"use strict";
(function(resourcesUrl){
    /** DesignSystem global **/

    var translate = (function () {
        //const privateInstance = ...
        return {
            get: (val) => {
                const translateService = window.translateService;
                if (translateService) {
                    return translateService.get(val);
                }
                return val;
            },
            polyglot: (val) => {
                const translateService = window.translateService;
                if (translateService) {
                    return translateService.polyglot(val);
                }
                return val;
            }
        };
    })();

    Context.translate = translate;
})(resourcesUrl);


(function(resourcesUrl){
    /** @ionic/core global **/

    function configFromURL() {
        const config = {};
        const win = window;
        win.location.search.slice(1)
            .split('&')
            .filter(entryText => entryText.startsWith('ionic:'))
            .map(entryText => entryText.split('='))
            .forEach(entry => {
            config[entry[0].slice(6)] = decodeURIComponent(entry[1]);
        });
        return config;
    }

    function isIOS(win) {
        return testUserAgent(win, /iPad|iPhone|iPod/i);
    }
    function testUserAgent(win, expr) {
        return expr.test(win.navigator.userAgent);
    }

    class Config {
        constructor(configObj) {
            this.m = new Map(Object.entries(configObj));
        }
        get(key, fallback) {
            const value = this.m.get(key);
            return (value !== undefined) ? value : fallback;
        }
        getBoolean(key, fallback = false) {
            const val = this.m.get(key);
            if (val === undefined) {
                return fallback;
            }
            if (typeof val === 'string') {
                return val === 'true';
            }
            return !!val;
        }
        getNumber(key, fallback) {
            const val = parseFloat(this.m.get(key));
            return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
        }
        set(key, value) {
            this.m.set(key, value);
        }
    }

    const Ionic = window.Ionic = window.Ionic || {};
    // queue used to coordinate DOM reads and
    // write in order to avoid layout thrashing
    Object.defineProperty(Ionic, 'queue', {
        get: () => Context.queue
    });
    // create the Ionic.config from raw config object (if it exists)
    // and convert Ionic.config into a ConfigApi that has a get() fn
    const config = Ionic.config = Context.config = new Config(Object.assign({}, Ionic.config, configFromURL()));
    // first see if the mode was set as an attribute on <html>
    // which could have been set by the user, or by prerendering
    // otherwise get the mode via config settings, and fallback to md
    const documentElement = document.documentElement;
    const mode = config.get('mode', documentElement.getAttribute('mode') || (isIOS(window) ? 'ios' : 'md'));
    Ionic.mode = Context.mode = mode;
    config.set('mode', mode);
    documentElement.setAttribute('mode', Ionic.mode);
})(resourcesUrl);
})("DesignSystem");