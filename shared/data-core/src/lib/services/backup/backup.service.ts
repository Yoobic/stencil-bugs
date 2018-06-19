import { Injectable } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { moment } from '@shared/interfaces';


@Injectable()
export class BackupService {

    private get apiUrl() {
        return this.config.apiUrl + 'AdminDashboard/';
    }

    constructor(protected rq: Requestor, protected config: Config) { }

    getAll(date?: Date) {
        let url = this.apiUrl + 'listBackup';
        return this.rq.post(url, {
            clusterName: 'rs-ds039424',
            date: moment(date || new Date()).toISOString()
        }).pipe(map((res: Array<string>) => {
            if (res && res.map) {
                res = res.map((name: string) => {
                    let backup: any = { _id: name };
                    let lastIndex = name.lastIndexOf('_');
                    let dateStr = name.substr(lastIndex + 1).replace('.tgz', '');
                    backup.title = moment(dateStr, 'YYYY-MM-DDTHHmmss.sssZ').fromNow();
                    backup.badge = moment(dateStr, 'YYYY-MM-DDTHHmmss.sssZ').format('L LT');
                    backup.description = name;
                    return backup;
                }).reverse();
            }
            return res;
        }));
    }

    restore(backupName: string, collections?: Array<string>): Observable<any> {
        let url = this.apiUrl + 'restoreBackup ';
        return this.rq.post(url, {
            s3Key: backupName,
            collections
        });
    }

}
