import { Injectable } from '@angular/core';
import { Translate } from '@shared/translate';
import { Filters} from '@shared/interfaces';
import { Config, Requestor, Broker, Push } from '@shared/data-core';

import { Payment } from '../../interfaces/payment/payment.interface';
import { PharmaoneNotification } from '../../interfaces/pharmaone/pharmaone.interface';

import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class Payments {

    constructor(protected broker: Broker, protected config: Config, protected rq: Requestor, protected push: Push, protected translate: Translate) { }

    isValid(payment: Payment) {
        return payment && payment.details && payment.details.indexOf('Success') >= 0;
    }

    getBalance(userId: string) {
        let filters: Filters = [
            [
                { field: 'status', operator: { _id: 'inq' }, value: ['finished'] },
                { field: 'ownerRef', operator: { _id: 'inq' }, value: [userId] },
                { field: 'validated', operator: { _id: 'inq' }, value: [true] }
            ]
        ];

        let options = [{ $group: { _id: 0, total: { $sum: '$price' } } }];
        let total = 0;
        let paid = 0;
        return this.broker.aggregateQuery('missions', filters, options).pipe(mergeMap((retVal: any) => {
            if (retVal && retVal.length > 0) {
                let data = retVal[0];
                total = data.total;
            }

            filters = [
                [{ field: 'userId', operator: { _id: 'eq' }, value: userId }]
            ];
            options = [{ $group: { _id: 0, total: { $sum: '$amount' } } }];
            return this.broker.aggregateQuery('payments', filters, options).pipe(map((retVal2: any) => {
                if (retVal2 && retVal2.length > 0) {
                    let data = retVal2[0];
                    paid = -data.total;
                }
                return total - paid;
            }));
        }));
    }

    getBalancePharmaone(userId: string) {
        let filters = [[
            { field: 'userId', operator: { _id: 'eq' }, value: userId },
            { field: 'type', operator: { _id: 'eq' }, value: 'pharmaone' }
        ]];
        let options = [{ $group: { _id: 0, total: { $sum: '$amount' } } }];
        return this.broker.aggregateQuery('payments', filters, options).pipe(map((retVal2: any) => {
            if (retVal2 && retVal2.length > 0) {
                let data = retVal2[0];
                return data.total;
            }
            return 0;
        }));
    }

    massPay(userId: string): Observable<any> {
        let url = this.config.apiUrl + 'businesslogic/masspay';
        return this.rq.post(url, { userId });
    }

    verifyPaypalEmail(userId: string, paypalEmail: string): Observable<any> {
        let url = this.config.apiUrl + 'businesslogic/verifyPaypalEmail';
        return this.rq.post(url, { userId, paypalEmail });
    }

    getUserFilter(userId, type?: string): Filters {
        let filters = [
            [{ field: 'userId', operator: { _id: 'eq' }, value: userId }]
        ];
        if (type) {
            filters[0].push({ field: 'type', operator: { _id: 'eq' }, value: type });
        }
        return filters;
    }

    getPharmaoneFilter() {
        let filters = [
            [{ field: 'type', operator: { _id: 'eq' }, value: 'pharmaone' }]
        ];
        return filters;
    }

    stripeCharge(clientToken: Object, amount: number, currency: string, email: string, metadata?: any): Observable<any> {
        let url = this.config.apiUrl + 'businesslogic/stripeCharge';
        return this.rq.post(url, { clientToken, amount, currency, email, metadata });
    }

    sendPharmaonePayment(notif: PharmaoneNotification) {
        let payment: Payment = {
            _acl: notif.user._acl,
            amount: notif.amount,
            userId: notif.user._id,
            type: 'pharmaone',
            transactionDate: notif.date || new Date(),
            details: notif.comments,
            title: notif.title
        };
        //payment._acl.users = { r: [notif.user._id], w: ['admin'] };
        this.broker.setAcl(payment, null, null, null, [notif.user._id]);
        return this.broker.create('payments', payment).pipe(mergeMap(() => {
            return this.push.notifyUserById(notif.user._id, {
                mode: 'notification',
                title: notif.title,
                body: this.translate.get('PHARMAONEPAYMENT', { amount: notif.amount }),
                data: { type: 'pharmaone' }
            });
        }));
    }
}
