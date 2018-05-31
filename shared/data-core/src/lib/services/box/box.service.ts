import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Observable } from 'rxjs';
import { CoreConfig } from '@shared/common';
import { map } from 'rxjs/operators';

@Injectable()
export class Box {

    constructor(private config: Config, private rq: Requestor, private coreConfig: CoreConfig) { }

    upload(documentUrl: string): Observable<any> {
        let url = this.config.apiUrl + 'businesslogic/uploadToBox';
        return this.rq.post(url, { params: { documentUrl } }).pipe(map(retVal => {
            if (retVal && retVal.data) {
                return retVal.data.id;
            }
            return null;
        }));
    }

    createViewingSession(boxId: string): Observable<any> {
        let url = this.config.apiUrl + 'businesslogic/createViewingSessionBox';
        return this.rq.post(url, { params: { boxId } }).pipe(map(retVal => {
            if (retVal && retVal.data) {
                return retVal.data;
            }
            return null;
        }));
    }

    getViewingContent(contentUrl: string): Observable<any> {
        let url = this.config.apiUrl + 'businesslogic/getViewingContentBox';
        return this.rq.post(url, { params: { contentUrl } }).pipe(map(retVal => {
            if (retVal && retVal.data) {
                let content = retVal.data;
                let headIndex = content.indexOf('<head>') + 6;
                let overwriteStyle = '<style type="text/css">';
                overwriteStyle += '.controls-center .scroll-previous-btn, .controls-center .scroll-next-btn, .controls-right .zoom-in-btn, .controls-right .zoom-out-btn, .controls-right {';
                overwriteStyle += '  display: initial !important;';
                overwriteStyle += '}';
                overwriteStyle += '.fullscreen-btn {';
                overwriteStyle += '  display: none !important;';
                overwriteStyle += '}';
                overwriteStyle += '</style>';
                let protocol = this.coreConfig.getProtocol();
                content = [content.slice(0, headIndex), overwriteStyle, content.slice(headIndex)].join('');
                content = content.replace(new RegExp('href="//', 'g'), 'href="' + protocol + '//');
                content = content.replace(new RegExp('src="//', 'g'), 'src="' + protocol + '//');
                return content;
            }
            return null;
        }));
    }

}
