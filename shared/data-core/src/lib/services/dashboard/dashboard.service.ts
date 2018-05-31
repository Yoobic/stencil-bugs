import { Injectable } from '@angular/core';

import { Filters, SubQuery, IFormField, moment } from '@shared/interfaces';
import { Translate } from '@shared/translate';

import { ChartDefinition } from '../../interfaces/chart-definition/chart-definition.interface';
import { Dashboard as IDashboard } from '../../interfaces/dashboard/dashboard.interface';
import { User } from '../../interfaces/user/user.interface';
import { MissionDescription } from '../../interfaces/mission-description/mission-description.interface';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';

import { Broker } from '../broker/broker.service';
import { Session } from '../session/session.service';

import * as uuid from 'uuid';

import { cloneDeep, map } from 'lodash-es';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class Dashboard {

    constructor(protected broker: Broker, protected translate: Translate, protected session: Session) {
    }

    publish(dashboard: IDashboard, users: Array<User>) {
        let dashboards = users.filter(u => u._id !== this.session.user._id).map(user => {
            let dashboardCopy = cloneDeep(dashboard);
            // dashboardCopy.title += ' - ' + moment().format('L');
            dashboardCopy.originalRef = dashboard._id;
            delete dashboardCopy._id;

            dashboardCopy._acl = user._acl;
            this.broker.setAcl(dashboardCopy, null, null, null, [user._id]);
            //dashboardCopy._acl.users = { r: [user._id], w: [user._id] };
            dashboardCopy.creatorRef = user._id;
            //dashboardCopy._acl.creator = user._id;
            return dashboardCopy;
        });

        return this.broker.deleteAll('dashboards', { where: { 'originalRef': { 'inq': [dashboard._id] }, 'creatorRef': { 'inq': map(users, '_id') } } }).pipe(mergeMap(() => {
            return this.broker.upsertAll('dashboards', dashboards);
        }));
    }

    deletePublished(dashboard: IDashboard) {
        return this.broker.deleteAll('dashboards', { where: { 'originalRef': { 'inq': [dashboard._id] } } });
    }

    updatePublished(dashboard: IDashboard) {
        return this.broker.getAll('dashboards', ['_id', '_acl', '_ect', '_lmt'], null, null, [
            [{ field: 'originalRef', operator: { _id: 'inq' }, value: [dashboard._id] }]
        ], null, 0, -1).pipe(mergeMap(response => {
            let dashboards: Array<IDashboard> = response.data;
            dashboards.forEach(d => {
                d.title = dashboard.title + ' - ' + moment().format('L');
                d.description = dashboard.description;
                d.tabs = dashboard.tabs;
            });
            return this.broker.upsertAll('dashboards', dashboards);
        }));
    }

    copy(dashboard: IDashboard, title: string) {
        let newDashboard = cloneDeep(dashboard);
        newDashboard.title = title;
        delete newDashboard._id;
        if (newDashboard.tabs) {
            newDashboard.tabs.forEach(t => {
                if (t.items) {
                    t.items.forEach(c => {
                        c.definition._id = uuid.v4();
                    });
                }
            });
        }
        return this.broker.upsert('dashboards', newDashboard);
    }

    aggregateQuery(collectionName: string, filters?: Filters, options?: Array<any>, excludedFields?: Array<any>, customFilter?: any, subQuery?: SubQuery): Observable<any> { //, aggregateFormDefinition?: Array<IFormField>, aggregateData?: any) { //where ?: Filters, match?: Object, limit?: Number, lookup?: Object, projectBefore?: Object, group?: Object, projectAfter?: Object) {
        options = options || [];
        return this.broker.aggregateQuery(collectionName, filters, options, null, excludedFields, false, null, customFilter, subQuery);
    }

    setTimescale(filters: Filters, timescale: string, dateField = 'finishedDate', endDate?: Date | string) {
        return this.broker.setTimescale(filters, timescale, dateField, endDate);
    }

    getChartDefinition(title: string, filters: Array<any> = [[]], collectionName = 'missions', dateGrouping = 'day', groupByDate = true, timeScale = 'last7days') {
        let definition: ChartDefinition = <any>{
            title: this.translate.get(title), aggregateOptions: [], timescale: timeScale,
            collectionName: collectionName, dateGrouping: dateGrouping, filters: filters, groupByDate: groupByDate,
            palette: 'palette2', showAs: 'chart', type: 'areaspline', datetimeFormat: 'dd'
        };
        return definition;
    }

    getPhotos(missionDescription?: MissionDescription, fields?: Array<IFormField>, start = 0): Observable<ResponseObject> {
        let filters: Filters = [[]];
        if (missionDescription && missionDescription._id) {
            filters[0].push({ field: 'missiondescriptionRef', operator: { _id: 'inq' }, value: [missionDescription._id] });
        }
        if (fields) {
            fields = [].concat(fields);
            filters[0].push({ field: 'name', operator: { _id: 'inq' }, value: fields.map(f => f.name.replace('.value', '')) });
        }
        return this.broker.getAll('photos', null, null, null, filters, null, start, 10);
    }

    getFolderFolderStat(folderIds: Array<string>): Observable<Array<{ _id: string; folders: number }>> {
        let filters = [[{ field: 'parent', operator: { _id: 'inq' }, value: folderIds }]];
        let options = [{
            '$project': {
                _id: '$parent'
            }
        }, {
            '$group': {
                _id: '$_id', folders: { $sum: 1 }
            }
        }];
        return this.aggregateQuery('folders', filters, options);
    }

    getFolderFileStat(folderIds: Array<string>, keepHideMobile = true): Observable<Array<{ _id: string; files: number }>> {
        let filters: Filters = [[{ field: 'folder', operator: { _id: 'inq' }, value: folderIds }]];
        if (keepHideMobile === false) {
            filters[0].push({ field: 'hideMobile', operator: { _id: 'neq' }, value: true });
        }
        let options = [{
            '$project': {
                _id: '$folder'
            }
        }, {
            '$group': {
                _id: '$_id', files: { $sum: 1 }
            }
        }];
        return this.aggregateQuery('files', filters, options);
    }

}
