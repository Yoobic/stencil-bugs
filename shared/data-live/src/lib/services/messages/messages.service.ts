/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import { Broker, Requestor } from '@shared/data-core';
import { Message } from '../../interfaces/message/message.model';
import { Observable } from 'rxjs';

@Injectable()
export class Messages {
    constructor(private broker: Broker, private rq: Requestor) { }

    getJsonMessage(message: Message) {
        return {
            to: message.to,
            content: {
                title: message.title,
                body: message.body,
                //footer: message.footer,
                actionURL: message.actionURL,
                actionText: message.actionText,
                action: message.actionURL ? true : false,
                thankyou: message.thankyou
            }
        };
    }

    sendMail(message: Message): any {
        return this.rq.post(this.apiUrl + 'mail', this.getJsonMessage(message));
    }

    unblockEmails(emails: Array<string>): Observable<any> {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/unblockEmails', { emails });
    }

    private get apiUrl() {
        return this.broker.getApiUrl() + 'Messages/';
    }
}
