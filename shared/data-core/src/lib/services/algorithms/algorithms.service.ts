import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class Algorithms {

    constructor(private config: Config, private rq: Requestor) { }

    process(imageUrl: string, algorithmId: string): Observable<any> {
        let url = this.config.apiUrl + 'algorithm/process';
        return this.rq.post(url, { image_url: imageUrl, algorithm_id: algorithmId }).pipe(map(retVal => {
            return retVal && retVal.results ? (retVal.results || {}) : {};
        }));
    }

    processMultiple(imageUrls: Array<string>, algorithmId: string): Observable<any> {
        let url = this.config.apiUrl + 'algorithm/process';
        return this.rq.post(url, { image_url: imageUrls, algorithm_id: algorithmId }).pipe(map(retVal => {
            return retVal && retVal.results ? (retVal.results || {}) : {};
        }));
    }
}
