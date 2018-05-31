import { Injectable } from '@angular/core';

import { Entity } from '../../interfaces/entity/entity.interface';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';

import { Observable } from 'rxjs';

@Injectable()
export class Activity {
    constructor(protected broker: Broker, protected rq: Requestor) { }

    protected _viewOrLike(entity: Entity, entityName: string, action: string): Observable<any> {
        let url = this.broker.getApiUrl() + 'activity/' + action;
        return this.rq.post(url, { entityRef: entity._id, entityName });
    }

    getActionFilter(entityId: string, action: string = 'view') {
        return [[
            { field: 'action', operator: { _id: 'eq' }, value: action },
            { field: 'entityRef', operator: { _id: 'inq' }, value: [entityId] }
        ]];
    }

    getUserTransform() {
        return (res: ResponseObject) => {
            if (res.data) {
                res.data = res.data.map(r => r.user);
            }
            return res;
        };
    }

    getActionAggregateOptions() {
        return (start, limit) => [
            { '$lookup': { 'from': 'user', 'localField': 'userRef', 'foreignField': '_id', 'as': 'user' } },
            { '$unwind': '$user' },
            ...(start > 0 ? [{ '$skip': start }] : []),
            ...(limit > 0 ? [{ '$limit': limit }] : [])
        ];
    }


}
