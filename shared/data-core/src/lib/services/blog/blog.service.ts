import { Injectable } from '@angular/core';
import { CoreConfig } from '@shared/common';
import { Translate } from '@shared/translate';

import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class Blog {

    constructor(protected coreConfig: CoreConfig, protected config: Config, protected rq: Requestor, protected translate: Translate) { }

    getUrl() {
        let url: string;

        if (this.translate.getCurrentLanguage() === 'fr') {
            if (this.coreConfig.isIonic()) {
                url = 'https://yoobic.blogin.co/rss.xml?mt=e071877c1c01a7ee3f9b70868c0acf7c57790243&c=20417&public_link=true';
            } else {
                url = 'https://yoobic.blogin.co/rss.xml?mt=e071877c1c01a7ee3f9b70868c0acf7c57790243&c=20415&public_link=true';
            }
        } else if (this.translate.getCurrentLanguage() === 'it') {
            if (this.coreConfig.isIonic()) {
                url = 'https://yoobic.blogin.co/rss.xml?mt=e071877c1c01a7ee3f9b70868c0acf7c57790243&c=21144&public_link=true';
            } else {
                url = 'https://yoobic.blogin.co/rss.xml?mt=e071877c1c01a7ee3f9b70868c0acf7c57790243&c=21143&public_link=true';
            }
        } else {
            if (this.coreConfig.isIonic()) {
                url = 'https://yoobic.blogin.co/rss.xml?mt=e071877c1c01a7ee3f9b70868c0acf7c57790243&c=20416&public_link=true';
            } else {
                url = 'https://yoobic.blogin.co/rss.xml?mt=e071877c1c01a7ee3f9b70868c0acf7c57790243&c=20414&public_link=true';
            }
        }
        return url;
    }

    get(blogUrl: string, limit?: number, skip?: number): Observable<any> {
        let url = this.config.apiUrl + 'businesslogic/getBlog';
        return this.rq.post(url, { url: blogUrl, limit, skip }).pipe(map(retVal => {
            let items = [];
            if (retVal && retVal.rss && retVal.rss.channel && retVal.rss.channel.item && retVal.rss.channel.item.length > 0) {
                items = [].concat(retVal.rss.channel.item);
            }
            items.forEach(b => {
                try {
                    if (b && b.enclosure && b.enclosure.$ && b.enclosure.$.url) {
                        b.background = b.enclosure.$.url;
                    } else {
                        let content = b['content:encoded'];
                        let re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
                        let results = re.exec(content);
                        if (results) {
                            b.background = results[1];
                        }
                    }
                    if (b.background) {
                        b.background = b.background.replace('blog.yoobic.com', 'yoobic.blogin.co');
                    }
                } catch (err) { }
            });
            return items;
        }));
    }

    getLatestArticleDate(blogUrl: string) {
        let url = this.config.apiUrl + 'businesslogic/getBlog';
        return this.rq.post(url, { url: blogUrl, limit: 1 }).pipe(map(retVal => {
            let items = [];
            if (retVal && retVal.rss && retVal.rss.channel && retVal.rss.channel.item && retVal.rss.channel.item.length > 0) {
                items = [].concat(retVal.rss.channel.item);
            }
            if (items && items.length > 0 && items[0]) {
                return items[0].pubDate;
            }
            return null;
        }));
    }
}
