import { Injectable } from '@angular/core';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { User } from '../../interfaces/user/user.interface';
import { SubQuery, Query } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { uniq } from 'lodash-es';

@Injectable()
export class Users {

    public static adminIds: Array<any> = [{ _id: '53fb03c6546847ee0536386a' }];
    public static simplifiedFields: Array<string> = ['_id', 'imageData', 'firstName', 'lastName', 'email', 'telephone', 'username'];

    constructor(protected broker: Broker, protected rq: Requestor) { }

    getSimplifiedProfile(userId): Observable<{ _id?: string; imageData?: string; firstName?: string; lastName?: string; email?: string; telephone?: string; username?: string; }> {
        return this.broker.getById('user', userId, Users.simplifiedFields);
    }

    getFreshdeskUrl(options?: any) {
        let url = this.broker.getApiUrl() + 'endpoints/getFreshdeskUrl';
        return this.rq.post(url, options || {}).pipe(map(res => {
            return res;
        }));
    }

    setAcl(user: User, groups: Array<string>) {
        this.broker.setAcl(user, groups);
    }

    getCustomFilterNoAdmin(showMe: boolean = true) {
        let ids = Users.adminIds.map(i => i._id);
        if (!showMe) {
            ids.push(this.rq.session.userId);
        }
        return { _id: { nin: ids } };
    }

    isUsernameTaken(username: string) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/isUsernameTaken', { params: { username } })
            .pipe(map(res => res.data));
    }

    getStoreUsers(locationId: string) {
        return this.broker.getAll('user', Users.simplifiedFields, null, null, [[{ field: 'locationRef', operator: { _id: 'eq' }, value: locationId }]])
            .pipe(map(res => res.data));
    }

    getGeofilterUsers(locationId: string, userTags?: Array<string>) {
        let where = { _id: { inq: [locationId] } };
        let geofilterQuery: Query = {
            limit: 0,
            fields: ['userRef'],
            subQuery: <SubQuery>{
                collectionName: 'locations', field: 'locationsRef', values: '_id', where: where
            }
        };
        return this.broker.getAllQuery('geofilters', geofilterQuery).pipe(mergeMap(geofilters => {
            let userIds: Array<string> = geofilters.data.map(geofilter => geofilter.userRef);
            userIds = uniq(userIds);
            let userFilter = [[{ field: '_id', operator: { _id: 'inq' }, value: userIds }]];
            if (userTags && userTags.length > 0) {
                userFilter[0].push({ field: 'tags', operator: { _id: 'inq' }, value: userTags });
            }
            return this.broker.getAll('user', Users.simplifiedFields, null, null, userFilter).pipe(map(res => res.data));
        }));
    }
}
