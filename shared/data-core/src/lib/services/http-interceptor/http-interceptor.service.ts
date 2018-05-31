import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config/config.service';
import { ConfigConstants } from '@shared/common';
@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {
    constructor(protected config: Config, protected configConstants: ConfigConstants) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (req.url && req.url.indexOf(this.config.serverUrl) >= 0) {
        //     const authReq = req.clone({ headers: req.headers.set('Yoobic-Client-Version', this.configConstants.appVersion) });
        //     return next.handle(authReq);
        // } else {
        return next.handle(req);
        //}
    }
}
