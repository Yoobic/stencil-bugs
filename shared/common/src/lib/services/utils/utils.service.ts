import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';

import postscribe from 'postscribe';

@Injectable()
export class Utils {
    constructor(protected coreConfig: CoreConfig) { }

    loadScript(url) {
        return new Promise((resolve, reject) => {
            if (this.coreConfig.isUniversal()) {
                resolve(true);
            } else {
                let element = document.getElementsByTagName('head')[0];
                let html = `<script async type=text/javascript src=${url}></script>`;
                postscribe(element, html, {
                    done: () => {
                        resolve(true);
                    }
                });
            }
        });
    }

    cleanupWKWebViewImagePath(value: string) {
        if (this.coreConfig.isWKWebView()) {
            return value.replace('file://', '');
        }
        return value;
    }

    getUrlParameterByName(key: string, url?: string) {
        if (!url) {
            url = window.location.href;
        }
        key = key.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)');
        let results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    removeParameterFromUrl(key: string, url: string) {
        let rtn = url.split('?')[0],
            param,
            paramsArr = [],
            queryString = (url.indexOf('?') !== -1) ? url.split('?')[1] : '';
        if (queryString !== '') {
            paramsArr = queryString.split('&');
            for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
                param = paramsArr[i].split('=')[0];
                if (param === key) {
                    paramsArr.splice(i, 1);
                }
            }
            rtn = rtn + '?' + paramsArr.join('&');
        }
        return rtn;
    }
}
