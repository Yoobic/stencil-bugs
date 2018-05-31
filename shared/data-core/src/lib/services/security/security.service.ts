import { Injectable } from '@angular/core';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { User } from '../../interfaces/user/user.interface';
import { Group } from '../../interfaces/group/group.interface';
export * from '../../interfaces/group/group.interface';
import { ROLES as ROLES_LIST, ROLES_ASK } from '../../interfaces/condition/condition.interface';

import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { uniq, concat, map, difference } from 'lodash-es';

@Injectable()
export class Security {
    public static ROLES = ROLES_LIST;
    public static ROLES_ASK = ROLES_ASK;

    constructor(protected broker: Broker, protected rq: Requestor) { }
    /**
    Return the list of groups and roles for a specific user
    */
    getUserSession(userId: string): Observable<any> {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/getUserSession', { userId });
    }

    /**
    Add the specified users to the group
    */
    addGroupUsers(group, users): Observable<any> {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', { _id: group._id, '$addToSet': { 'users.list': { '$each': map(users, '_id') } } });
        } else {
            //not used
            group.users.list = uniq(concat(group.users.list, map(users, '_id')));
            return this.broker.create('groups', group);
        }
    }

    /**
    Remove the specified users to the group
    */
    removeGroupUsers(group, users): Observable<any> {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', { _id: group._id, '$pullAll': { 'users.list': map(users, '_id') } });
        } else {
            //not used
            group.users.list = uniq(difference(group.users.list, map(users, '_id')));
            return this.broker.create('groups', group);
        }
    }

    /**
       Add the specified groups to the group
       */
    addGroupGroups(group, groups): Observable<any> {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', { _id: group._id, '$addToSet': { 'groups': { '$each': map(groups, '_id') } } });
        } else {
            group.groups = uniq(concat(group.groups, map(groups, '_id')));
            return this.broker.create('groups', group);
        }
    }

    /**
   Remove the specified groups to the group
   */
    removeGroupGroups(group, groups): Observable<any> {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', { _id: group._id, '$pullAll': { 'groups': map(groups, '_id') } });
        } else {
            group.groups = uniq(difference(group.groups, map(groups, '_id')));
            return this.broker.create('groups', group);
        }
    }

    updateGroup(id: string, addedUsers: Array<User>, removedUsers: Array<User> = [], addedGroups: Array<Group> = [], removedGroups: Array<Group> = []): Observable<any> {
        return this.broker.patch('groups', {
            _id: id,
            '$pullAll': {
                'users.list': map(removedUsers, '_id'),
                'groups': map(removedGroups, '_id')
            }
        }).pipe(flatMap(() => {
            return this.broker.patch('groups', {
                _id: id,
                '$addToSet': {
                    'users.list': { '$each': map(addedUsers, '_id') },
                    'groups': { '$each': map(addedGroups, '_id') }
                }
            });
        }));
    }

    initGroup(group) {
        group.groups = group.groups || [];
        group.users = group.users || {};
        group.users.list = group.users.list || [];
    }

    /**
        Returns the subquery used in the group's tab user grid
        */
    getGroupUserSubQuery(group) {
        return { collectionName: 'group', where: { '_id': group._id }, field: '_id', values: 'users.list' };
    }

    /**
    Returns the subquery used in the group's tab sub group grid
    */
    getGroupGroupSubQuery(group) {
        return { collectionName: 'group', where: { '_id': group._id }, field: '_id', values: 'groups' };
    }
}
