import { Injectable } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class Workplace {

    private get apiUrl() {
        return this.config.apiUrl + 'workplace/';
    }

    constructor(private rq: Requestor, private config: Config) { }

    getAllGroups() {
        let url = this.apiUrl + 'getGroups';
        return this.rq.post(url, {
            query: {
                limit: 20,
                fields: 'icon, name, cover, description'
            }
        }).pipe(map(res => {
            res.data.forEach(g => g._id = g.id);
            return res;
        }));
    }

    postOnGroup(groupIds: Array<string>, options: any): Observable<any> {
        let url = this.apiUrl + 'post';
        return this.rq.post(url, {
            groupIds,
            options
        });
    }
}
