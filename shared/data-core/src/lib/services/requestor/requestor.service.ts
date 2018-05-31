import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Session } from '../session/session.service';
import { Config } from '../config/config.service';
import { LoadingBar } from '../loading-bar/loading-bar.service';

import { CoreConfig, ConfigConstants } from '@shared/common';

import { moment } from '@shared/interfaces';

import * as FileSaver from 'file-saver';

import { keys } from 'lodash-es';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/* beautify ignore:start */
declare var fetch;
/* beautify ignore:end */

@Injectable()
export class Requestor {

    static unauthorizedEmitter = new EventEmitter<any>();
    static payloadTooBigEmitter = new EventEmitter<any>();

    constructor(protected http: HttpClient, public session: Session, protected config: Config, protected loadingBar: LoadingBar, protected coreConfig: CoreConfig, protected configConstants: ConfigConstants) { }

    fetch(url: string, options: any) {
        if (options.body && typeof options.body === 'object') {
            options.body = JSON.stringify(options.body);
        }
        if (options.noHeader !== true) {
            options.headers = this.buildFetchHeaders();
        }
        delete options.noHeader;
        this.slimbarStart();
        return fetch(url, options).then(res => {
            this.slimbarComplete();
            return res;
        }).catch(e => {
            this.slimbarComplete();
            return this.errorHandler(e, url);
        });
    }

    post(url: string, body: any, token?: string, withCount: boolean = false, isTempToken: boolean = false, looseCount: boolean = false, partialUrl: boolean = false): Observable<any> {
        this.slimbarStart();
        if (partialUrl) {
            url = this.config.apiUrl + url;
        }
        return this.http.post(url, body ? JSON.stringify(body) : '', {
            headers: this.buildHeaders(withCount, token, null, isTempToken, false, looseCount),
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>): any => {
                this.slimbarComplete();
                this.updateToken(res);
                if (res['_body'] === '') {
                    return {};
                }
                return this.formatResponse(res, withCount);
            }),
            catchError(e => {
                this.slimbarComplete();
                return this.errorHandler(e, url);
            })
            );
    }

    patch(url: string, body: any, token?: string, withCount: boolean = false, isTempToken: boolean = false, looseCount: boolean = false, partialUrl: boolean = false): Observable<any> {
        this.slimbarStart();
        if (partialUrl) {
            url = this.config.apiUrl + url;
        }
        return this.http.patch(url, body ? JSON.stringify(body) : '', {
            headers: this.buildHeaders(withCount, token, null, isTempToken, false, looseCount),
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>): any => {
                this.slimbarComplete();
                this.updateToken(res);
                if (res['_body'] === '') {
                    return {};
                }
                return this.formatResponse(res, withCount);
            }),
            catchError(e => {
                this.slimbarComplete();
                return this.errorHandler(e, url);
            })
            );
    }

    postRaw(url: string, body: any, blob?: boolean, includeToken?: boolean) {
        this.slimbarStart();
        return this.http.post(url, body ? JSON.stringify(body) : '', {
            headers: this.buildHeaders(false, null, null, null, !includeToken),
            responseType: <any>(blob ? 'arraybuffer' : 'json'),
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>): any => {
                this.slimbarComplete();
                return res;
            }),
            catchError(e => {
                this.slimbarComplete();
                return this.errorHandler(e, url);
            })
            );
    }

    postMultiPart(url: string, data: Object) {
        this.slimbarStart();
        const formData = new FormData();
        keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        const headers = new HttpHeaders();
        return this.http.post(url, formData, { headers, observe: 'response', responseType: 'text' })
            .pipe(map((ret: HttpResponse<any>) => {
                this.slimbarComplete();
                return ret.body;
            })).pipe(
            catchError(e => {
                this.slimbarComplete();
                throw e;
            }));
    }

    postFile(url: string, file: File): Observable<any> {
        this.slimbarStart();
        return Observable.create(observer => {
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(xhr.response ? JSON.parse(xhr.response) : '');
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                    this.slimbarComplete();
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.session.token);
            xhr.send(formData);
        });
    }

    get(url: string, withCount: boolean = false, token?: string): Observable<any> {
        this.slimbarStart();
        return this.http.get(url, {
            headers: this.buildHeaders(withCount, token),
            observe: 'response'
        }).pipe(
            catchError(e => {
                this.slimbarComplete();
                return this.errorHandler(e, url);
            }),
            map((res: HttpResponse<any>) => {
                this.slimbarComplete();
                this.updateToken(res);
                return this.formatResponse(res, withCount);
            })
            );
    }

    getBinaryContent(url: string): Observable<any> {
        this.slimbarStart();
        return this.http.get(url, { responseType: 'arraybuffer' })
            .pipe(map(retVal => {
                this.slimbarComplete();
                return retVal;
            })).pipe(
            catchError(e => {
                this.slimbarComplete();
                return this.errorHandler(e, url);
            }));
    }

    put(url: string, body: any): Observable<any> {
        this.slimbarStart();
        return this.http.put(url, body ? JSON.stringify(body) : null, {
            headers: this.buildHeaders(),
            observe: 'response'
        }).pipe(
            map((res: HttpResponse<any>) => {
                this.updateToken(res);
                this.slimbarComplete();
                return res.body;
            }),
            catchError(e => {
                this.slimbarComplete();
                return this.errorHandler(e, url);
            })
            );
    }

    delete(url: string, body?: any): Observable<any> {
        this.slimbarStart();
        return this.http.request('delete', url, {
            headers: this.buildHeaders(),
            observe: 'response',
            body: body
        }).pipe(
            map((res: HttpResponse<any>) => {
                this.updateToken(res);
                this.slimbarComplete();
                return res.body;
            }),
            catchError(e => {
                this.slimbarComplete();
                return this.errorHandler(e, url);
            })
            );
    }

    downloadFile(filename: string, mediaType: string, url: string, options: any): Promise<any> {
        this.slimbarStart();
        return this.fetch(url, options)
            .then(res => {
                return res && res.blob ? res.blob() : null;
            }
            ).then(blob => {
                if (blob) {
                    FileSaver.saveAs(blob, filename);
                }
                this.slimbarComplete();
            }).catch(e => {
                this.slimbarComplete();
                return this.errorHandler(e, url);
            });
    }

    saveBlob(blob: Blob, filename: string) {
        FileSaver.saveAs(blob, filename);
    }

    saveArrayBuffer(array: ArrayBuffer, filename: string) {
        let blob = new Blob([new Uint8Array(array)]);
        FileSaver.saveAs(blob, filename);
    }

    getFilenameSuffix(): string {
        return '_' + moment().toISOString().replace('.', '_');
    }

    private errorHandler(e: any, url) {
        let isInvalidCredentials: boolean = false;
        if (e && e.status === 401 && url && url.indexOf(this.config.serverUrl) >= 0 && e.error && e.error.error && e.error.error.name === 'InvalidCredentials') {
            isInvalidCredentials = true;
        }
        if (e.status === 401 && url && url.indexOf(this.config.serverUrl) >= 0 && !isInvalidCredentials) {
            Requestor.unauthorizedEmitter.emit(e);
        } else if (e.status === 413) {
            Requestor.payloadTooBigEmitter.emit(e);
        } else if (e.status === 404) {
            return of(new HttpResponse<any>(<any>{ body: {}, status: 404 }));
        } else {
            throw e;
        }
        //return Observable.of(e);
    }

    private formatResponse(res: HttpResponse<any>, withCount: boolean = false) {
        return withCount ? { data: res.body, count: +(res.headers.get('x-total-count') || res.headers.get('X-Total-Count') || res.headers.get('x-loose-count') || res.headers.get('X-Loose-Count')) || 0 } : res.body;
    }

    private buildHeaders(withCount: boolean = false, token?: string, contentType?: string, isTempToken?: boolean, suppressToken?: boolean, looseCount?: boolean) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', contentType || 'application/json');
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('X-Application-Id', this.configConstants.appId);
        headers = headers.set('Yoobic-Client-Version', this.configConstants.appVersion);

        if (withCount) {
            if (looseCount) {
                headers = headers.set('x-loose-count', 'true');
            }
            headers = headers.set('x-total-count', 'true');
        }
        if (suppressToken !== true) {
            if (token) {
                if (isTempToken) {
                    headers = headers.set('token', token);
                } else {
                    headers = headers.set('Authorization', 'Bearer ' + token);
                }
            } else if (this.session.token) {
                headers = headers.set('Authorization', 'Bearer ' + this.session.token);
            }
        }
        return headers;
    }

    private buildFetchHeaders(withCount: boolean = false, token?: string, contentType?: string, isTempToken?: boolean, suppressToken?: boolean, looseCount?: boolean) {
        try {
            if (!this.coreConfig.isIE11() && Headers) {
                let headers = new Headers();
                headers.append('Content-Type', contentType || 'application/json');
                headers.append('Accept', 'application/json');
                headers.append('X-Application-Id', this.configConstants.appId);
                headers.append('Yoobic-Client-Version', this.configConstants.appVersion);

                if (withCount) {
                    if (looseCount) {
                        headers.append('x-loose-count', 'true');
                    }
                    headers.append('x-total-count', 'true');
                }
                if (suppressToken !== true) {
                    if (token) {
                        if (isTempToken) {
                            headers.append('token', token);
                        } else {
                            headers.append('Authorization', 'Bearer ' + token);
                        }
                    } else if (this.session.token) {
                        headers.append('Authorization', 'Bearer ' + this.session.token);
                    }
                }
                return headers;
            }
        } catch (err) { }
        return this.buildFetchHeadersFallback(withCount, token, contentType, isTempToken, suppressToken, looseCount);
    }

    private buildFetchHeadersFallback(withCount: boolean = false, token?: string, contentType?: string, isTempToken?: boolean, suppressToken?: boolean, looseCount?: boolean) {
        let headers = {};
        headers['Content-Type'] = [contentType || 'application/json'];
        headers['Accept'] = ['application/json'];
        headers['X-Application-Id'] = [this.configConstants.appId];
        headers['Yoobic-Client-Version'] = [this.configConstants.appVersion];

        if (withCount) {
            if (looseCount) {
                headers['x-loose-count'] = ['true'];
            }
            headers['x-total-count'] = ['true'];
        }
        if (suppressToken !== true) {
            if (token) {
                if (isTempToken) {
                    headers['token'] = [token];
                } else {
                    headers['Authorization'] = ['Bearer ' + token];
                }
            } else if (this.session.token) {
                headers['Authorization'] = ['Bearer ' + this.session.token];
            }
        }
        return headers;
    }

    private updateToken(res: HttpResponse<any>) {
        if (res && res.url && res.url.indexOf(this.config.serverUrl) >= 0 && res.headers && res.headers.get('authorization')) {
            this.session.token = res.headers.get('authorization');
        }
    }

    private slimbarStart() {
        if (this.coreConfig.isWeb() || this.coreConfig.isIonic()) {
            this.loadingBar.start();
        }
    }

    private slimbarComplete() {
        if (this.coreConfig.isWeb() || this.coreConfig.isIonic()) {
            this.loadingBar.complete();
        }
    }
}
