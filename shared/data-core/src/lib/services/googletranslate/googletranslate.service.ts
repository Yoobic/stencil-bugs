import { Injectable } from '@angular/core';
import { Translate } from '@shared/translate';
import { Requestor } from '../requestor/requestor.service';

import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class Googletranslate {

    static get(query: string, source: string, target: string, rq: Requestor): Observable<any> {
        let sourceLang = this.fixLanguage(source);
        let targetLang = this.fixLanguage(target);
        if (sourceLang === targetLang) {
            return of(query);
        } else {
            let url = 'businesslogic/translate';
            return rq.post(url, { query, sourceLang, targetLang }, null, null, null, null, true)
                .pipe(map(response => {
                    return response || query;
                }));
        }
    }

    static fixLanguage(language: string) {
        switch (language) {
            case 'us':
                return 'en';
            case 'zhs':
                return 'zh-CN';
            case 'zht':
                return 'zh-TW';
            case 'ua':
                return 'uk';
            case 'kr':
                return 'ko';
            case 'cz':
                return 'cs';
            case 'gr':
                return 'el';
            default:
                return language;
        }
    }

    static getAll(query: string, source: string, rq: Requestor) {
        let observables = Translate.availablesLanguage.filter(l => l !== source).map(l => {
            return this.get(query, source, l, rq).pipe(map(value => ({
                language: l,
                value: value || query
            })));
        });
        return forkJoin(observables);
    }

    constructor() { }

}
