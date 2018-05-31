import { Injectable } from '@angular/core';
import { Translate, PolyglotPipe } from '@shared/translate';
import { Broker, MissionDescription, Scoring, Session, Models, User, DashboardCore, ChartDefinition, ResponseObject, Dashboard as IDashboard } from '@shared/data-core';
import { FormFieldType, IFormField, Filters, SubQuery, moment } from '@shared/interfaces';

import { BaseKpi } from '../../interfaces/kpi/kpi.interface';
import { Mission } from '../../interfaces/mission/mission.interface';
import { Feed } from '../../interfaces/feed/feed.interface';

import { Observable } from 'rxjs';
import { map as mapRxjs } from 'rxjs/operators';

import { map, forEach, keys, assign, maxBy, uniq, pick } from 'lodash-es';

@Injectable()
export class DashboardService extends DashboardCore {

    protected polyglot: PolyglotPipe;
    constructor(protected broker: Broker, protected translate: Translate, protected session: Session) {
        super(broker, translate, session);
        this.polyglot = new PolyglotPipe(this.translate);
    }

    getTimelineFilter() {
        return this.getFinishedFilter();
    }

    getFinishedFilter() {
        return [
            [{ field: 'status', operator: { _id: 'inq' }, value: ['finished'] }]
        ];
    }

    getMissionFinishedFilter(missiondescriptionId?: string) {
        let filters: Filters = [
            [
                { field: 'status', operator: { _id: 'inq' }, value: ['finished'] },
                { field: 'type', operator: { _id: 'inq' }, value: ['mission'] }
            ]
        ];
        if (missiondescriptionId) {
            filters[0].push({ field: 'descriptionRef', operator: { _id: 'inq' }, value: [{ _id: missiondescriptionId }] });
        }

        return filters;
    }

    getMissionFilter(validatedOnly: boolean = false, hideArchived: boolean = false) {
        let filters: Filters = [
            [{ field: 'type', operator: { _id: 'inq' }, value: ['mission'] }]
        ];
        if (validatedOnly) {
            filters[0].push({ field: 'validated', operator: { _id: 'eq' }, value: true });
        }
        if (hideArchived) {
            filters[0].push({ field: 'status', operator: { _id: 'nin' }, value: ['archived'] });
        }
        return filters;
    }

    getNoAdminFilter() {
        return [
            [{ field: '_id', operator: { _id: 'nin' }, value: [{ _id: '53fb03c6546847ee0536386a' }] }]
        ];
    }

    getOwnerFilter(userId, states?: Array<any>) {
        let retVal: Filters = [
            [{ field: 'ownerRef', operator: { _id: 'inq' }, value: [{ _id: userId }] }]
        ];
        this.addStatesToFilter(retVal, states);
        return retVal;
    }

    getLocationFilter(locationId, states?: Array<any>) {
        let retVal: Filters = [
            [{ field: 'locationRef', operator: { _id: 'inq' }, value: [{ _id: locationId }] }]
        ];
        this.addStatesToFilter(retVal, states);
        return retVal;
    }

    getMissiondescriptionFilter(missiondescriptionId, states?: Array<any>) {
        let retVal: Filters = [
            [{ field: 'descriptionRef', operator: { _id: 'inq' }, value: [{ _id: missiondescriptionId }] }]
        ];
        this.addStatesToFilter(retVal, states);
        return retVal;
    }

    getMissiondescriptionTypeFilter(types: Array<string>) {
        return [
            [
                { field: 'archived', operator: { _id: 'neq' }, value: true },
                { field: 'type', operator: { _id: 'inq' }, value: types }
            ]
        ];
    }

    getInboxFilter(missionDescriptionId: string, title: string, states?: Array<any>): Filters {
        let retVal: Filters = [
            []
        ];
        if (missionDescriptionId) {
            retVal[0].push(<any>{ field: 'descriptionRef', operator: { _id: 'inq' }, value: [{ _id: missionDescriptionId, title: title }] });
        }
        this.addStatesToFilter(retVal, states);
        return retVal;
    }

    addStatesToFilter(filters: Filters, states?: Array<any>) {
        if (states && states.length > 0) {
            let validations = [];
            let status = [];

            if (states.indexOf('tobevalidated') >= 0) { validations.push('undefined'); }
            if (states.indexOf('validated') >= 0) { validations.push(true); }
            if (states.indexOf('rejected') >= 0) { validations.push(false); }
            if (validations.length > 0) {
                validations = uniq(validations);
                filters[0].push(<any>{ field: 'validated', operator: { _id: 'inq' }, value: validations, handleUndefined: true });
                status.push('finished');
                //retVal[0].push(<any>{ field: 'status', operator: { _id: 'inq' }, value: ['finished'], handleUndefined: true });
            }

            if (states.indexOf('finished') >= 0) { status.push('finished'); }
            if (states.indexOf('booked') >= 0) { status.push('booked'); }
            if (states.indexOf('available') >= 0) {
                status.push('undefined');
                status.push('scheduled');
            }
            if (status.length > 0) {
                status = uniq(status);
                filters[0].push({ field: 'status', operator: { _id: 'inq' }, value: status, handleUndefined: true });
            }
        }
    }

    getCampaignFilter(missionDescriptionId: string, title: string, field = 'descriptionRef', validatedOnly: boolean = false): Filters {
        let retVal: Filters = [[]];
        if (missionDescriptionId) {
            retVal[0].push({ field: field, operator: { _id: 'inq' }, value: [{ _id: missionDescriptionId, title: title }] });
        }
        if (validatedOnly) {
            retVal[0].push({ field: 'validated', operator: { _id: 'eq' }, value: true });
        }
        return retVal;
    }

    getCampaignsProgress(type?: string) {
        let options: any = [{
            $project: {
                descriptionRef: '$descriptionRef',
                booked: { $cond: { if: { $eq: ['$status', 'booked'] }, then: 1, else: 0 } },
                finished: { $cond: { if: { $eq: ['$status', 'finished'] }, then: 1, else: 0 } },
                validated: { $cond: { if: { $eq: ['$validated', true] }, then: 1, else: 0 } },
                rejected: { $cond: { if: { $eq: ['$validated', false] }, then: 1, else: 0 } },
                finishedDate: '$finishedDate'
            }
        }, {
            $group: {
                _id: { descriptionRef: '$descriptionRef' }, booked: { $sum: '$booked' }, finished: { $sum: '$finished' },
                validated: { $sum: '$validated' }, rejected: { $sum: '$rejected' }, latest: { $max: '$finishedDate' },
                count: { $sum: 1 }
            }
        }, {
            $project: { _id: '$_id.descriptionRef', booked: '$booked', finished: '$finished', validated: '$validated', rejected: '$rejected', latest: '$latest', count: '$count' }
        },
        { $lookup: { 'from': 'missiondescription', 'localField': '_id', 'foreignField': '_id', 'as': 'campaign' } },
        { $unwind: '$campaign' },
        { $project: { _id: '$_id', count: 1, booked: 1, finished: 1, validated: 1, rejected: 1, latest: 1, campaign: { title: 1, archived: 1, icon: 1, background: 1, type: 1 } } }
        ];

        if (type) {
            options.unshift({ $match: { type: type } });
        }

        return this.aggregateQuery('missions', [[]], options).pipe(mapRxjs((res: any) => {
            return map(res, (stat: any) => {
                return {
                    _id: stat._id,
                    title: stat.campaign.title,
                    archived: stat.campaign.archived,
                    icon: stat.campaign.icon,
                    type: stat.campaign.type,
                    background: stat.campaign.background,
                    count: stat.count || 0,
                    finished: stat.finished || 0,
                    latest: stat.latest || '0',
                    percentage: stat.count > 0 ? stat.validated / stat.count : 0,
                    overlay: { title: 'VIEWMISSIONS' },
                    stats: [
                        { color: 'balanced', title: 'VALIDATED', value: stat.validated || 0 },
                        { color: 'assertive', title: 'UNVALIDATED', value: stat.rejected || 0 },
                        { color: 'royal', title: 'TOBEVALIDATED', value: (stat.finished || 0) - (stat.validated || 0) - (stat.rejected || 0) }
                    ]
                };
            });
        }));
    }

    getCampaignsProgressTrial() {
        let options: any = [{
            $project: {
                descriptionRef: '$descriptionRef',
                booked: { $cond: { if: { $eq: ['$status', 'booked'] }, then: 1, else: 0 } },
                finished: { $cond: { if: { $eq: ['$status', 'finished'] }, then: 1, else: 0 } },
                finishedDate: '$finishedDate'
            }
        }, {
            $group: {
                _id: { descriptionRef: '$descriptionRef' }, booked: { $sum: '$booked' }, finished: { $sum: '$finished' },
                latest: { $max: '$finishedDate' },
                count: { $sum: 1 }
            }
        }, {
            $project: { _id: '$_id.descriptionRef', booked: '$booked', finished: '$finished', latest: '$latest', count: '$count' }
        },
        { $lookup: { 'from': 'missiondescription', 'localField': '_id', 'foreignField': '_id', 'as': 'campaign' } },
        { $unwind: '$campaign' },
        { $project: { _id: '$_id', count: 1, booked: 1, finished: 1, latest: 1, campaign: { title: 1, archived: 1, icon: 1, background: 1, type: 1, slides: 1 } } }
        ];

        return this.aggregateQuery('missions', [[]], options).pipe(mapRxjs((res: any) => {
            return map(res, (stat: any) => {
                return {
                    _id: stat._id,
                    title: stat.campaign.title,
                    archived: stat.campaign.archived,
                    icon: stat.campaign.icon,
                    type: stat.campaign.type,
                    background: stat.campaign.background,
                    count: stat.count || 0,
                    finished: stat.finished || 0,
                    latest: stat.latest || '0',
                    percentage: stat.count > 0 ? stat.validated / stat.count : 0,
                    overlay: { title: 'VIEWMISSIONS' },
                    slides: stat.campaign.slides,
                    stats: [
                        { color: 'balanced', title: 'FINISHED', value: stat.finished || 0 },
                        { color: 'energized', title: 'BOOKED', value: stat.booked || 0 },
                        { color: 'dark', title: 'TOTAL', value: (stat.count || 0) }
                    ]
                };
            });
        }));
    }

    getInboxMissionStats(filters?: Filters) {
        let options = [
            { $project: { booked: { $cond: { if: { $eq: ['$status', 'booked'] }, then: 1, else: 0 } }, finished: { $cond: { if: { $eq: ['$status', 'finished'] }, then: 1, else: 0 } }, archived: { $cond: { if: { $eq: ['$status', 'archived'] }, then: 1, else: 0 } }, scheduled: { $cond: { if: { $eq: ['$status', 'scheduled'] }, then: 1, else: 0 } }, validated: { $cond: { if: { $eq: ['$validated', true] }, then: 1, else: 0 } }, rejected: { $cond: { if: { $eq: ['$validated', false] }, then: 1, else: 0 } } } },
            { $group: { _id: 1, booked: { $sum: '$booked' }, finished: { $sum: '$finished' }, archived: { $sum: '$archived' }, scheduled: { $sum: '$scheduled' }, validated: { $sum: '$validated' }, rejected: { $sum: '$rejected' }, count: { $sum: 1 } } },
            { $project: { booked: '$booked', finished: '$finished', archived: '$archived', scheduled: '$scheduled', validated: '$validated', rejected: '$rejected', count: '$count' } }
        ];
        return this.aggregateQuery('missions', filters, options, ['status', 'validated']).pipe(mapRxjs((retVal: any) => {
            if (retVal && retVal.length > 0) {
                let data = retVal[0];
                delete data._id;
                return data;
            }
            return {};
        }));
    }

    getInboxMissionTimeStats(filters?: Filters, mode: string = 'week') {
        let endDate = new Date();
        let startDate = moment(endDate).add(<any>-1, mode);

        filters = filters || [[]];

        filters = filters.map(filter => {
            filter = filter.filter(f => f.field !== 'finishedDate');
            filter.push({ field: 'finishedDate', operator: { _id: 'gte' }, value: startDate.toISOString() });
            filter.push({ field: 'finishedDate', operator: { _id: 'lte' }, value: endDate.toISOString() });
            return filter;
        });

        let options = [
            { $match: { status: 'finished' } },
            { $project: { validated: { $cond: { if: { $eq: ['$validated', true] }, then: 1, else: 0 } }, rejected: { $cond: { if: { $eq: ['$validated', false] }, then: 1, else: 0 } } } },
            { $group: { _id: 1, finished: { $sum: 1 }, validated: { $sum: '$validated' }, rejected: { $sum: '$rejected' } } },
            { $project: { finished: '$finished', validated: '$validated', rejected: '$rejected' } }
        ];
        return this.aggregateQuery('missions', filters, options, ['status', 'validated']).pipe(mapRxjs((retVal: any) => {
            if (retVal && retVal.length > 0) {
                let data = retVal[0];
                return data;
            }
            return {};
        }));
    }

    getCalendarMissionStats(statDates: Array<string>, users: Array<User>, tagsUser: Array<string>) {
        let filters = [[
            { field: 'bookedUntil', operator: { _id: 'between', interval: true }, value: statDates },
            { field: 'isCalendar', operator: { _id: 'eq' }, value: true }
        ]];
        let subQuery: SubQuery;
        if (!tagsUser || tagsUser.length === 0) {
            subQuery = null;
            if (users && users.length > 0) {
                filters[0].push(<any>{ field: 'ownerRef', operator: { _id: 'inq' }, value: users.map(u => u._id) });
            }
        } else {
            subQuery = this.getMissionByUserTagSubQuery(tagsUser);
        }

        let options = [
            { $group: { _id: { '$dateToString': { 'format': '%Y-%m-%d', 'date': '$bookedUntil' } }, count: { $sum: 1 } } }
        ];
        return this.aggregateQuery('missions', filters, options, null, null, subQuery);
    }

    getCalendarStoreMissionStats(statDates: Array<string>) {
        let startDate = statDates[0];
        let endDate = statDates[1];

        let locationRef = '';
        if (this.session && this.session.user && this.session.user.locationRef) {
            locationRef = this.session.user.locationRef;
        }

        let filters = [
            [
                { field: 'locationRef', operator: { _id: 'eq' }, value: locationRef },
                { field: 'status', operator: { _id: 'inq' }, value: ['undefined'], handleUndefined: true },
                { field: 'duedate', operator: { _id: 'gte' }, value: startDate },
                { field: 'validFrom', operator: { _id: 'exists' }, value: false }
            ],
            [
                { field: 'locationRef', operator: { _id: 'eq' }, value: locationRef },
                { field: 'status', operator: { _id: 'inq' }, value: ['undefined'], handleUndefined: true },
                { field: 'duedate', operator: { _id: 'gte' }, value: startDate },
                { field: 'validFrom', operator: { _id: 'lte' }, value: endDate }
            ],
            [
                { field: 'locationRef', operator: { _id: 'eq' }, value: locationRef },
                { field: 'ownerRef', operator: { _id: 'eq' }, value: this.session.userId },
                { field: 'status', operator: { _id: 'eq' }, value: 'booked', handleUndefined: true },
                { field: 'duedate', operator: { _id: 'gte' }, value: startDate },
                { field: 'validFrom', operator: { _id: 'exists' }, value: false }
            ],
            [
                { field: 'locationRef', operator: { _id: 'eq' }, value: locationRef },
                { field: 'ownerRef', operator: { _id: 'eq' }, value: this.session.userId },
                { field: 'status', operator: { _id: 'eq' }, value: 'booked', handleUndefined: true },
                { field: 'duedate', operator: { _id: 'gte' }, value: startDate },
                { field: 'validFrom', operator: { _id: 'lte' }, value: endDate }
            ]];

        return this.broker.getAll('missions', null, null, null, filters, null, 0, -1).pipe(mapRxjs(res => {
            let retVal = {};
            let days = [];
            let d = moment(startDate);
            while (d < moment(endDate)) {
                days.push(d.format('YYYY-MM-DD'));
                d = d.add(1, 'day');
            }
            forEach(days, day => {
                retVal[day] = 0;
                forEach(res.data, (mission: Mission) => {
                    if (moment(day) >= moment(mission.validFrom || mission._ect).startOf('day') && moment(day) <= moment(mission.duedate).endOf('day')) {
                        retVal[day] += 1;
                    }
                });
            });
            let markers = keys(retVal).map(day => {
                return { _id: day, count: retVal[day] };
            }).filter(s => s.count > 0);
            return markers;
        }));
    }

    getCalendarFeedStats(statDates: Array<string>) {
        let startDate = statDates[0];
        let endDate = statDates[1];

        let filters = [
            [
                { field: 'startDate', operator: { _id: 'lte' }, value: startDate },
                { field: 'endDate', operator: { _id: 'gte' }, value: startDate },
                { field: 'language', operator: { _id: 'inq' }, value: ['all', this.translate.getCurrentLanguage()] },
                { field: 'showCalendar', operator: { _id: 'eq' }, value: true }
            ],
            [
                { field: 'startDate', operator: { _id: 'lte' }, value: endDate },
                { field: 'endDate', operator: { _id: 'gte' }, value: endDate },
                { field: 'language', operator: { _id: 'inq' }, value: ['all', this.translate.getCurrentLanguage()] },
                { field: 'showCalendar', operator: { _id: 'eq' }, value: true }
            ],
            [
                { field: 'startDate', operator: { _id: 'gte' }, value: startDate },
                { field: 'endDate', operator: { _id: 'lte' }, value: endDate },
                { field: 'language', operator: { _id: 'inq' }, value: ['all', this.translate.getCurrentLanguage()] },
                { field: 'showCalendar', operator: { _id: 'eq' }, value: true }
            ]
        ];

        // let options = [
        //     { $group: { _id: { '$dateToString': { 'format': '%Y-%m-%d', 'date': '$bookedUntil' } }, count: { $sum: 1 } } } //,
        //     //{ $project: { booked: '$booked', finished: '$finished', validated: '$validated', rejected: '$rejected', count: '$count' } }
        // ];
        return this.broker.getAll('feeds', null, null, null, filters, null, 0, -1).pipe(mapRxjs(res => {
            let retVal = {};
            let days = [];
            let d = moment(startDate);
            while (d < moment(endDate)) {
                days.push(d.format('YYYY-MM-DD'));
                d = d.add(1, 'day');
            }
            forEach(days, day => {
                retVal[day] = 0;
                forEach(res.data, (feed: Feed) => {
                    if (moment(day) >= moment(feed.startDate).startOf('day') && moment(day) <= moment(feed.endDate).endOf('day')) {
                        retVal[day] += 1;
                    }
                });
            });
            let markers = keys(retVal).map(day => {
                return { _id: day, count: retVal[day] };
            });
            return markers;
        }));
    }

    getFinishedChartDefinition(missionDescriptionId?: string, title?: string, endDate?: Date, timescale?: string, type?: string): ChartDefinition {
        let definition: ChartDefinition = this.getChartDefinition('FINISHED');
        if (type) {
            definition.type = type;
        }
        if (missionDescriptionId) {
            definition.filters[0].push(<any>{ field: 'descriptionRef', operator: { _id: 'inq' }, value: [{ _id: missionDescriptionId, title: title }] });
        }
        if (timescale) {
            definition.timescale = timescale;
        }
        definition.endDate = endDate;
        definition.palette = 'palette0';
        return definition;
    }

    getLocationVisitedChartDefinition(): ChartDefinition {
        let definition: ChartDefinition = this.getChartDefinition('LOCATIONVISITED');
        definition.aggregateOptions = [
            { '$project': { 'title': '$locationRef', 'date': { '$dateToString': { 'format': '%Y-%m-%d', 'date': '$finishedDate' } } } },
            { '$group': { '_id': { 'date': '$date', 'title': '$title' }, 'value': { '$sum': 1 } } },
            { '$project': { '_id': '$_id.date', 'location': '$_id.title' } },
            { '$group': { '_id': '$_id', 'value': { '$sum': 1 } } }
        ];
        return definition;
    }

    getFinishedMissionByCampaignChartDefinition(timescale?: string): ChartDefinition {
        let definition: ChartDefinition = this.getChartDefinition('LOCATIONVISITED');
        definition.timescale = timescale || definition.timescale;
        definition.type = 'pie';
        definition.showLegend = true;
        definition.legendVerticalAlign = 'middle';
        definition.legendAlign = 'left';
        definition.legendWidth = 150;
        definition.showValues = true;
        definition.aggregateOptions = [
            { '$lookup': { 'from': 'missiondescription', 'localField': 'descriptionRef', 'foreignField': '_id', 'as': 'missiondescription' } },
            { '$unwind': '$missiondescription' },
            { '$project': { '_id': 1, 'title': '$missiondescription.title' } },
            { '$group': { '_id': { 'title': '$title' }, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } },
            { '$project': { '_id': '$_id.title', 'value': '$value', 'keys': '$keys' } },
            { '$sort': { 'value': -1, '_id': 1 } },
            { '$limit': 5 }
        ];
        definition.mapTransform = (res) => {
            if (res && res.forEach) {
                res.forEach(s => {
                    if (s._id && s._id.length > 30) {
                        s._id = s._id.substring(0, 30) + '...';
                    }
                });
            }
            return res;
        };
        return definition;
    }

    getPhotosTakenNumber(timescale: string = 'last7days'): Observable<ResponseObject> {
        let filters: Filters = [[]];
        this.setTimescale(filters, timescale, 'date');
        return this.broker.getCount('photos', null, filters);
    }

    getMissionsFinishedNumber(timescale: string = 'last7days'): Observable<ResponseObject> {
        let filters: Filters = [[
            { field: 'status', operator: { _id: 'eq' }, value: 'finished' }
        ]];
        this.setTimescale(filters, timescale);
        return this.broker.getCount('missions', null, filters);
    }

    getUsersActiveNumber(timescale: string = 'last7days'): Observable<ResponseObject> {
        let filters: Filters = [[]];
        this.setTimescale(filters, timescale, '_lmt');
        return this.broker.getCount('user', null, filters);
    }

    getUserInfoChartDefinition(info: string = 'version', type: string = 'column', title?: string): ChartDefinition {
        let definition: ChartDefinition = this.getChartDefinition(title || 'USERS', null, 'user', null, false);
        definition.type = type;
        definition.showLegend = true;
        definition.showValues = false;
        let match = {};
        match[info] = { '$exists': true };
        definition.aggregateOptions = [
            { '$match': match },
            { '$group': { '_id': '$' + info, 'value': { '$sum': 1 }, 'keys': { '$addToSet': '$_id' } } }
        ];
        if (info === 'device') {
            definition.aggregateOptions.push({ '$sort': { 'value': -1 } });
        } else {
            definition.aggregateOptions.push({ '$sort': { '_id': 1 } });
        }
        return definition;
    }

    getTrialAllowanceChartDefinition(): ChartDefinition {
        let definition: ChartDefinition = this.getChartDefinition('ALLOWANCE', null, 'missions', null, false);
        definition.type = 'pie';
        definition.showLegend = true;
        definition.aggregateOptions = [
            { '$match': { 'status': 'finished' } },
            { '$group': { '_id': { '$literal': this.translate.get('FINISHED') }, 'value': { '$sum': 1 } } }
        ];
        definition.mapTransform = (res) => {
            res.push({ _id: this.translate.get('REMAINING'), value: 500 - res[0].value });
            return res;
        };
        return definition;

    }

    // getAverageMissionPerDayChartDefinition(): ChartDefinition {
    //     let definition: ChartDefinition = this.getChartDefinition('AVERAGEMISSIONSPERDAY');
    //     definition.showAs = 'micro';
    //     definition.aggregateOptions = [
    //         { '$group': { '_id': '1', 'value': { '$sum': 1 } } },
    //         { '$project': { '_id': '$_id', 'value': { '$divide': ['$value', 7] } } }// { '$ceil':}
    //     ];
    //     return definition;
    // }

    // getAverageMissionPerUserChartDefinition(): ChartDefinition {
    //     let definition: ChartDefinition = this.getChartDefinition('AVERAGEMISSIONSPERUSER');
    //     definition.showAs = 'micro';
    //     definition.aggregateOptions = [
    //         { '$group': { '_id': '$ownerRef', 'value': { '$sum': 1 } } },
    //         { '$group': { '_id': '1', 'value': { '$avg': '$value' } } }
    //     ];
    //     return definition;
    // }

    getUserOrLocationWeeklyChartDefinition(id: string, mode: string, timescale: string) {
        let definition: ChartDefinition = this.getChartDefinition('FINISHED');
        definition.timescale = timescale;
        definition.filters[0].push(mode === 'location' ? { field: 'locationRef', operator: { _id: 'inq' }, value: [{ _id: id }] } : { field: 'ownerRef', operator: { _id: 'inq' }, value: [{ _id: id }] });
        return definition;
    }

    getFieldHistoryChartDefinition(data, type?: string) {
        let definition: ChartDefinition = this.getChartDefinition('HISTORY');
        if (type) {
            definition.type = type;
        }
        definition.data = data;
        return definition;
    }

    getUserOrLocationStat(id: string | Array<string>, mode: string, customFilter?: any): Observable<Array<{ _id: string; booked: number; count: number; finished: number; validated: number; rejected: number; tobevalidated: number; available: number; }>> {
        return this.broker.getUserOrLocationStat(id, mode, customFilter);
    }

    getFeedStat(feedIds: Array<string>): Observable<Array<{ _id: { _id: string; action: string }; count: number; users: Array<string> }>> {
        let filters = [[{ field: 'entityRef', operator: { _id: 'inq' }, value: feedIds }]];
        let options = [{
            '$group': { _id: { _id: '$entityRef', action: '$action' }, count: { $sum: 1 }, users: { '$addToSet': '$userRef' } }
        }];
        return this.aggregateQuery('activity', filters, options);
    }

    getFeedCommentStat(feedCommentIds: Array<string>): Observable<Array<{ _id: { _id: string; action: string }; count: number; users: Array<string> }>> {
        let filters = [[{ field: 'entityRef', operator: { _id: 'inq' }, value: feedCommentIds }]];
        let options = [{
            '$group': { _id: { _id: '$entityRef', action: '$action' }, count: { $sum: 1 }, users: { '$addToSet': '$userRef' } }
        }];
        return this.aggregateQuery('activity', filters, options);
    }

    getFollowUpOptions(timescale: string, mode: string, sort: string, filters: Filters): { filters: Filters, options: {}, transform: Function, getMax: Function } {
        filters = filters || [[]];
        filters = filters.map(f => f.filter(field => field.field !== 'finishedDate'));
        if (timescale !== 'all') { //mode !== 'todo') {
            filters = filters.map(f => f.concat([{ field: 'finishedDate', operator: { _id: 'between', interval: true }, value: BaseKpi.getStartAndEndDates(timescale) }]));
        }
        let options = (start, limit) => {
            let retVal = [];
            if (mode === 'todo') {
                retVal.push({ $match: { type: 'todo' } });
            }
            retVal.push(...[
                {
                    $project: {
                        booked: { $cond: { if: { $eq: ['$status', 'booked'] }, then: 1, else: 0 } },
                        finished: { $cond: { if: { $eq: ['$status', 'finished'] }, then: 1, else: 0 } },
                        archived: { $cond: { if: { $eq: ['$status', 'archived'] }, then: 1, else: 0 } },
                        validated: { $cond: { if: { $eq: ['$validated', true] }, then: 1, else: 0 } },
                        rejected: { $cond: { if: { $eq: ['$validated', false] }, then: 1, else: 0 } },
                        progress: '$progress.value',
                        finishedDate: '$finishedDate',
                        _id: mode === 'campaign' ? '$descriptionRef' : ((mode === 'location' || mode === 'todo') ? '$locationRef' : '$ownerRef')
                    }
                },
                { $group: { _id: '$_id', booked: { $sum: '$booked' }, finished: { $sum: '$finished' }, archived: { $sum: '$archived' }, validated: { $sum: '$validated' }, rejected: { $sum: '$rejected' }, latest: { $max: '$finishedDate' }, count: { $sum: 1 }, progress: { $avg: '$progress' } } },
                { $sort: { 'count': sort === 'desc' ? -1 : 1, 'latest': sort === 'desc' ? -1 : 1 } },
                ...(start > 0 ? [{ '$skip': start }] : []),
                ...(limit > 0 ? [{ '$limit': limit }] : []),
                { $lookup: { 'from': mode === 'campaign' ? 'missiondescription' : ((mode === 'location' || mode === 'todo') ? 'locations' : 'user'), 'localField': '_id', 'foreignField': '_id', 'as': 'foreign' } },
                { $unwind: '$foreign' },
                {
                    $project: {
                        _id: '$_id', totalCount: 1, booked: 1, finished: 1, archived: 1, validated: 1, rejected: 1, latest: 1, count: 1, progress: 1,
                        foreign: mode === 'campaign' ? { title: 1, description: 1, icon: 1, type: 1 } : (mode === 'location' || mode === 'todo') ? { title: 1, address: 1, _geoloc: 1 } : { username: 1, email: 1, firstName: 1, lastName: 1, imageData: 1 }
                    }
                }
            ]);
            return retVal;
        };
        let transform = (retVal) => {
            retVal.data = retVal.data && retVal.data.map ? retVal.data.map((stat) => {
                return assign(stat.foreign, {
                    _id: stat._id,
                    latest: stat.latest,
                    count: stat.count,
                    percentage: stat.validated / stat.finished,
                    stats: mode === 'todo' ? [
                        { color: 'balanced', tooltip: 'progress', value: Math.round(stat.progress) || 0, percentage: true }, //Math.round((100 * (stat.finished || 0) / (stat.count || 1)))
                        { color: 'dark', tooltip: 'finished', value: stat.finished || 0 },
                        { color: 'energized', tooltip: 'pending', value: (stat.count || 0) - (stat.finished || 0) }
                    ] :
                        [
                            { color: 'balanced', tooltip: 'validated', value: stat.validated || 0 },
                            { color: 'assertive', tooltip: 'unvalidated', value: stat.rejected || 0 },
                            { color: 'royal', tooltip: 'tobevalidated', value: Math.max(0, stat.finished - stat.validated - stat.rejected) }
                        ]
                });
            }) : [];
            return retVal;
        };

        let getMax = (max: number, retVal: Array<any>) => {
            return retVal && retVal.length > 0 ? Math.max(max, maxBy(retVal, 'count').count) : max;
        };
        return { filters: filters, options: options, transform: transform, getMax: getMax };
    }

    getFollowUpInactiveSubQuery(timescale, mode): SubQuery {
        return {
            collectionName: 'missions',
            exclude: true,
            field: '_id',
            values: mode === 'location' ? 'locationRef' : 'ownerRef',
            where: { 'finishedDate': { 'gte': BaseKpi.getStartAndEndDates(timescale)[0] } }
        };
    }

    getMissionByUserTagSubQuery(userTags): SubQuery {
        return {
            collectionName: 'user',
            field: 'ownerRef',
            values: '_id',
            where: { 'tags': { 'inq': userTags } }
        };
    }

    getDashboardAuto(missionDescription: MissionDescription, validateOnly: boolean = false) {
        let dashboard = new IDashboard();
        dashboard.title = missionDescription.title;
        dashboard.tabs = [];
        if (missionDescription.slides) {
            dashboard.tabs = missionDescription.slides.map(slide => {
                let tab = { title: slide.title, items: [] };
                let col = 1; let row = 1; let palette = 0;
                if (slide.items) {
                    slide.items.forEach(field => {
                        if (Models.isChartableAutoField(field)) {
                            let definition = this.getMissionDataChartDefinition(missionDescription, field, validateOnly);
                            //definition.palette = 'palette' + palette;
                            definition.palette = 'palette0';
                            let item = { col: col, row: row, sizex: 1, size: 1, definition: definition };
                            if (field.type === FormFieldType.photo) {
                                item.sizex = 2;
                                if (col === 1) {
                                    col = 3;
                                } else if (col === 2) {
                                    col = 1; row += 1;
                                } else {
                                    item.col = 1;
                                    item.row += 1;
                                    col = 1;
                                    row += 2;
                                }
                            } else {
                                col += 1;
                                if (col > 3) {
                                    col = 1; row += 1;
                                }
                                palette += 1;
                                if (palette > 4) {
                                    palette = 0;
                                }
                            }
                            tab.items.push(item);
                        }
                    });
                }
                return tab;
            }).filter(t => t.items.length > 0);
        }
        let items = [];
        let skipValidation: boolean = missionDescription.skipValidation;
        let mainScore;
        if (missionDescription.scoring && missionDescription.scoring.length > 0) {
            mainScore = missionDescription.scoring.find(s => s.isActive === true) || missionDescription.scoring[0];
            if (Math.abs(mainScore.minValue) > 0) {
                skipValidation = false;
            }
        }

        if (!missionDescription.recurring) {
            items.push({
                col: 1, row: 1, sizex: skipValidation ? 3 : 1, sizey: 1, definition: this.getCampaignProgressChartDefinition(missionDescription)
            });
            if (!skipValidation) {
                items.push({
                    col: 2, row: 1, sizex: 1, sizey: 1, definition: this.getCampaignValidationProgressChartDefinition(missionDescription)
                });
                items.push({
                    col: 3, row: 1, sizex: 1, sizey: 1, definition: this.getCampaignConformityProgressChartDefinition(missionDescription)
                });
            }
        } else {
            items.push({
                col: 1, row: 1, sizex: !skipValidation ? 1 : 2, sizey: 1, definition: this.getMissionFinishedChartDefinition(missionDescription, 'column', true, false, false, 6, 'month', false, 'chart', validateOnly, 2)
            });
            items.push({
                col: !skipValidation ? 2 : 3, row: 1, sizex: 1, sizey: 1, definition: this.getCampaignsFreqencyPOSKpiChartDefinition(missionDescription)
            });
            if (!skipValidation) {
                items.push({
                    col: 3, row: 1, sizex: 1, sizey: 1, definition: this.getCampaignsTemporalLearningCurveKpiChartDefinition(missionDescription)
                });
            }

            if (mainScore) {
                items.push({
                    col: 1, row: 2, sizex: 1, sizey: 1, definition: this.getCampaignsAverageScoreKpiChartDefinition(missionDescription, mainScore)
                });
                items.push({
                    col: 2, row: 2, sizex: 2, sizey: 1, definition: this.getCampaignsCorrelationPOSKpiChartDefinition(missionDescription, 'SCORE')
                });
            }
        }
        if (!missionDescription.recurring) {
            items.push({ col: 1, row: missionDescription.recurring ? 1 : 2, sizex: 2, sizey: 1, definition: this.getMissionFinishedChartDefinition(missionDescription, null, false, false, false, 1, 'month', false, 'chart', validateOnly) });
        }
        items.push({ col: missionDescription.recurring ? 1 : 3, row: missionDescription.recurring && missionDescription.scoring && missionDescription.scoring.length > 0 ? 3 : 2, sizex: missionDescription.recurring ? 3 : 1, sizey: 1, definition: this.getMissionMapDefinition(missionDescription, null, null, null, null, validateOnly) });

        if (missionDescription.type === 'poll') {
            items = [
                { col: 1, row: missionDescription.recurring ? 1 : 2, sizex: 3, sizey: 2, definition: this.getMissionFinishedChartDefinition(missionDescription, null, false, false, false, 1, 'month', false, 'chart', validateOnly) }
            ];
        }
        dashboard.tabs.unshift({ title: this.translate.get('OVERVIEW'), items: items });
        return dashboard;
    }

    getMissionDataChartDefinition(missionDescription: MissionDescription, field: IFormField, validatedOnly?: boolean) {
        let definition: ChartDefinition;
        if (field.type === FormFieldType.photo || field.type === FormFieldType.multiphotos) {
            definition = <any>{
                title: field.title, collectionName: 'photos', missionfields: { fields: field, selectedDescription: missionDescription }, showAs: 'carousel'
            };
        } else {
            definition = <any>{
                title: field.title, kpi: true, kpiType: 'MissionDatasKpi',
                kpiFormValues: {
                    missionfields: { fields: field, selectedDescription: missionDescription },
                    chartType: field && (field.type === FormFieldType.number || field.type === FormFieldType.formula) ? 'areaspline' : 'bar',
                    validatedOnly,
                    accumulator: 'count',
                    numberPrecision: 2
                },
                palette: 'palette2', showAs: 'chart'
            };
        }
        definition.colorByPoint = true;
        return definition;
    }

    getMissionFinishedChartDefinition(missionDescription: MissionDescription, type?: string, showTimeSlider = false, groupByCampaign = false, showLegend = false, amount = 1, timescale = 'week', notsliding = false, showAs = 'chart', validatedOnly: boolean = false, groupBySlider: number = 0): ChartDefinition {
        let definition = <ChartDefinition>{
            title: this.translate.get('KPICAMPAIGNSTEMPORALPROGRESS') + ((amount === 6 && timescale === 'month') ? (' - ' + this.translate.get('6MONTHS')) : ''), kpi: true, kpiType: 'CampaignsTemporalProgressKpi',
            kpiFormValues: {
                campaigns: missionDescription ? [missionDescription] : [], groupBySlider,
                groupBy: 'GLOBAL', showValues: true, chartType: type, groupByCampaign, showAs, validatedOnly,
                showTimeSlider, dates: {
                    mode: 'dynamic', amount, timescale, notsliding,
                    showLegend: false
                },
                showLegend: false
            }
        };
        return definition;
    }

    getCampaignProgressChartDefinition(missionDescription: MissionDescription): ChartDefinition {
        let definition = <ChartDefinition>{
            title: this.translate.get('KPICAMPAIGNSPROGRESS'), kpi: true, kpiType: 'CampaignsProgressKpi',
            kpiFormValues: {
                campaigns: [missionDescription],
                groupBy: 'GLOBAL', showLevelSlider: true, showValues: true,
                showLegend: false
            }
        };
        return definition;
    }

    getCampaignValidationProgressChartDefinition(missionDescription: MissionDescription): ChartDefinition {
        let definition = <ChartDefinition>{
            title: this.translate.get('KPICAMPAIGNSVALIDATIONPROGRESS'), kpi: true, kpiType: 'CampaignsValidationProgressKpi',
            kpiFormValues: {
                campaigns: [missionDescription],
                groupBy: 'GLOBAL', showLevelSlider: true, showValues: true,
                showLegend: false
            }
        };
        return definition;
    }

    getCampaignConformityProgressChartDefinition(missionDescription: MissionDescription): ChartDefinition {
        let definition = <ChartDefinition>{
            title: this.translate.get('KPICAMPAIGNSCONFORMITYPROGRESS'), kpi: true, kpiType: 'CampaignsConformityProgressKpi',
            kpiFormValues: {
                campaigns: [missionDescription],
                groupBy: 'GLOBAL', showLevelSlider: true, showValues: true,
                showLegend: false
            }
        };
        return definition;
    }

    getCampaignsFreqencyPOSKpiChartDefinition(missionDescription: MissionDescription): ChartDefinition {
        let definition = <ChartDefinition>{
            title: this.translate.get('KPICAMPAIGNSFREQENCYPOS') + ' - ' + this.translate.get('6MONTHS'), kpi: true, kpiType: 'CampaignsFreqencyPOSKpi',
            kpiFormValues: {
                campaigns: [missionDescription],
                groupBy: 'GLOBAL', showLevelSlider: true, showValues: true,
                dates: { mode: 'dynamic', amount: 6, timescale: 'month', notsliding: false },
                showLegend: false
            }
        };
        return definition;
    }

    getCampaignsTemporalLearningCurveKpiChartDefinition(missionDescription: MissionDescription): ChartDefinition {
        let definition = <ChartDefinition>{
            title: this.translate.get('KPICAMPAIGNSLEARNINGCURVE') + ' - ' + this.translate.get('6MONTHS'), kpi: true, kpiType: 'CampaignsTemporalLearningCurveKpi',
            kpiFormValues: {
                campaigns: [missionDescription],
                groupBy: 'GLOBAL', showLevelSlider: true, showValues: true, groupBySlider: 2,
                dates: { mode: 'dynamic', amount: 6, timescale: 'month', notsliding: false },
                showLegend: false
            }
        };
        return definition;
    }

    getCampaignsAverageScoreKpiChartDefinition(missionDescription: MissionDescription, score: Scoring): ChartDefinition {
        let definition = <ChartDefinition>{
            title: this.translate.get('KPIAVERAGESCORE') + ' - ' + this.translate.get('6MONTHS'), kpi: true, kpiType: 'MissionDatasKpi',
            kpiFormValues: {
                accumulator: 'avg', chartType: 'column', groupBy: 'DATE', groupByDate: true, groupBySlider: 2,
                numberPrecision: 2,
                showLevelSlider: false, missionscores: {
                    selectedDescription: pick(missionDescription, ['_id', 'title', 'scoring']),
                    scores: pick(score, ['title', 'isActive'])
                },
                dates: { mode: 'dynamic', amount: 6, timescale: 'month', notsliding: false },
                showLegend: false
            }
        };
        return definition;
    }

    getCampaignsCorrelationPOSKpiChartDefinition(missionDescription: MissionDescription, mode: string = 'CONFORMITY'): ChartDefinition {
        let definition = <ChartDefinition>{
            title: this.translate.get('KPICAMPAIGNSCORRELATIONPOS') + ' - ' + this.translate.get('6MONTHS'), kpi: true, kpiType: 'CampaignsCorrelationPOSKpi',
            kpiFormValues: {
                campaigns: [missionDescription],
                accumulator: 'avg', groupBy: 'GLOBAL', showLevelSlider: true, showValues: true, groupBySlider: '0',
                mode: mode,
                dates: { mode: 'dynamic', amount: 6, timescale: 'month', notsliding: false },
                showLegend: false
            }
        };
        return definition;
    }

    getMissionFinishedPivotDefinition(missionDescription: MissionDescription, status: Array<string> = ['finished'], amount = 1, timescale = 'week', notsliding = false): ChartDefinition {
        let definition = <ChartDefinition>{
            title: missionDescription ? missionDescription.title : ' ', kpi: true, kpiType: 'CampaignsPivotTableKpi',
            kpiFormValues: {
                campaigns: missionDescription ? [missionDescription] : [],
                groupBy: 'GLOBAL', dates: { mode: 'dynamic', amount, timescale, notsliding }
            }
        };

        definition.gridState = [
            //{ 'colId': '0', 'hide': true, 'rowGroupIndex': null },
            { 'colId': 'progress', 'hide': true, 'aggFunc': 'sum', 'width': 100, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': 'validationprogress', 'hide': true, 'aggFunc': 'sum', 'width': 100, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': 'conformityprogress', 'hide': true, 'aggFunc': 'sum', 'width': 104, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': 'conformityrelativeprogress', 'hide': true, 'aggFunc': 'sum', 'width': 152, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': 'status', 'hide': false, 'aggFunc': 'countValues', 'width': 104, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': 'validated', 'hide': false, 'aggFunc': 'countValues', 'width': 185, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': 'title', 'hide': true, 'aggFunc': null, 'width': 286, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': 0 },
            { 'colId': 'address', 'hide': false, 'aggFunc': null, 'width': 200, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': 'locationType', 'hide': true, 'aggFunc': null, 'width': 200, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': 'score', 'hide': false, 'aggFunc': 'avg', 'width': 200, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': 'finishedDate', 'hide': false, 'aggFunc': null, 'width': 200, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': 'owner', 'hide': false, 'aggFunc': null, 'width': 200, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null },
            { 'colId': '_id', 'hide': true, 'aggFunc': null, 'width': 200, 'pivotIndex': null, 'pinned': null, 'rowGroupIndex': null }];
        definition.gridSorts = [{ 'colId': 'status', 'sort': 'desc' }];
        return definition;
    }

    getMissionMapDefinition(missionDescription: MissionDescription, status?: Array<string>, amount?: number, timescale?: string, notsliding?: boolean, validatedOnly: boolean = false): ChartDefinition {
        let definition = <any>{
            title: this.translate.get('MAP'), kpi: true, kpiType: 'CampaignsMapKpi', //missionDescription ? missionDescription.title : ' '
            kpiFormValues: { campaigns: missionDescription ? [missionDescription] : [], useCluster: true, status, validatedOnly }
        };
        if (amount > 0 && timescale) {
            definition.kpiFormValues.dates = { mode: 'dynamic', amount, timescale, notsliding };
        }
        return definition;
    }

    getUserActiveChartDefinition(missionDescription: MissionDescription, type?: string, showTimeSlider = false, groupByCampaign = false, showLegend = false, amount = 1, timescale = 'week', notsliding = false, showAs = 'chart'): ChartDefinition {
        let definition = <ChartDefinition>{
            title: missionDescription ? missionDescription.title : ' ', kpi: true, kpiType: 'CampaignsTemporalUserKpi',
            showLegend, kpiFormValues: {
                campaigns: missionDescription ? [missionDescription] : [],
                groupBy: 'GLOBAL', showValues: false, chartType: type, groupByCampaign, showAs,
                showTimeSlider, dates: { mode: 'dynamic', amount, timescale, notsliding }
            }
        };
        return definition;
    }

    getUserActiveDelta2WeekChartDefinition(missionDescription: MissionDescription): ChartDefinition {
        let definition = this.getUserActiveChartDefinition(missionDescription, 'column', false, false, false, 2, 'week', false, 'micro');
        definition.title = this.translate.get('LAST7DAYS');
        definition.microInfo = this.translate.get('COMPAREDTOLAST7DAYS');
        definition.kpiFormValues.mapTransform = (retVal: Array<{ _id: string; serie?: string; value: number, keys?: Array<string> }>, cd: ChartDefinition, broker: Broker, component: any) => {
            let today = moment().endOf('day');
            let start = today.add(-7, 'day');
            let current: Array<string> = [];
            let previous: Array<string> = [];
            forEach(retVal, d => {
                let date = BaseKpi.fixDates(cd, d._id);
                if (moment(date).diff(start) > 0) {
                    current = current.concat(d.keys);
                } else {
                    previous = previous.concat(d.keys);
                }
            });
            current = uniq(current);
            previous = uniq(previous);

            return { value: current.length, delta: previous.length ? (current.length - previous.length) / previous.length : 0 };
        };
        return definition;
    }

    getMissionFinishedDelta2WeekChartDefinition(missionDescription: MissionDescription): ChartDefinition {
        let definition = this.getMissionFinishedChartDefinition(missionDescription, 'column', false, false, false, 2, 'week', false, 'micro');
        definition.title = this.translate.get('LAST7DAYS');
        definition.microInfo = this.translate.get('COMPAREDTOLAST7DAYS');
        definition.kpiFormValues.mapTransform = (retVal: Array<{ _id: string; serie?: string; value: number, keys?: Array<string> }>, cd: ChartDefinition, broker: Broker, component: any) => {
            let today = moment().endOf('day');
            let start = today.add(-7, 'day');
            let current = 0;
            let previous = 0;
            forEach(retVal, d => {
                let date = BaseKpi.fixDates(cd, d._id);
                if (moment(date).diff(start) > 0) {
                    current += d.value;
                } else {
                    previous += d.value;
                }
            });
            return { value: current, delta: previous ? Math.round((current - previous) / previous * 100) : 0 };
        };
        return definition;
    }

    getTimesheetOverview(userId: string, amountOfDays = 7) {
        let options = [
            { $project: { ownerRef: 1, diff: '$timer.diff' } },
            { $group: { _id: '$ownerRef', total: { $sum: '$diff' }, count: { $sum: 1 } } }
        ];

        let startDate = moment().endOf('day').add(-amountOfDays, 'day').toISOString();
        return this.aggregateQuery('timesheets', [[
            { field: 'ownerRef', operator: { _id: 'inq' }, value: [userId] },
            { field: 'timer.startDate', operator: { _id: 'gte' }, value: startDate }
        ]], options);
    }

    getPaymentsChartDefinition(paymentType?: string, type?: string, showTimeSlider = false, showLegend = true, amount = 1, timescale = 'year', notsliding = false, showAs = 'chart'): ChartDefinition {
        let definition = <ChartDefinition>{
            title: this.translate.get('PAYMENTS'), kpi: true, kpiType: 'PaymentsTemporalKpi',
            showLegend, kpiFormValues: {
                groupBy: 'GLOBAL', showValues: false, chartType: type, groupByCampaign: false, showAs,
                showTimeSlider, dates: { mode: 'dynamic', amount, timescale, notsliding },
                paymentType
            }
        };
        return definition;
    }

    getAuditRadarChartDefinition(missiondescriptionId: string, locationId: string, title?: string) {
        let filters: Filters = [[
            { field: 'status', operator: { _id: 'eq' }, value: 'finished' },
            { field: 'extraScores', operator: { _id: 'exists' }, value: true },
            { field: 'descriptionRef', operator: { _id: 'inq' }, value: [missiondescriptionId] },
            { field: 'locationRef', operator: { _id: 'inq' }, value: [locationId] }
        ]];
        return this.broker.getAll('missions', null, null, null, filters, [{ colId: 'finishedDate', sort: 'desc' }], 0, 2).pipe(mapRxjs(res => {
            let data: Array<any> = [];
            let scoreCount = 0;
            forEach(res.data, (mission: Mission, i: number) => {
                let mykeys = keys(mission.extraScores);
                scoreCount = Math.max(scoreCount, mykeys.length);
                mykeys.forEach(key => {
                    let score = mission.extraScores[key];
                    data.push({
                        _id: score.title,
                        value: score.value,
                        serie: i === 0 ? this.translate.get('LAST') : this.translate.get('PREVIOUS')//moment(mission.finishedDate).format('L')
                    });
                });
            });
            let definition: ChartDefinition = <any>{ title, data: data.reverse(), type: scoreCount > 2 ? 'radar' : 'column', showLegend: true, legendValue: 'avg', showValues: false, showLabelsY: false };
            return definition;
            //res.data
        }));
    }

    getAuditCampaignsFromLocation(locationId: string) {
        let options = [
            { $project: { descriptionRef: 1, title: 1 } },
            { $lookup: { 'from': 'missiondescription', 'localField': 'descriptionRef', 'foreignField': '_id', 'as': 'campaign' } },
            { $unwind: '$campaign' },
            { $match: { 'campaign.audit': true } },
            { $group: { _id: 0, 'keys': { '$addToSet': { '_id': '$campaign._id', title: '$campaign.title' } } } }
        ];
        return this.aggregateQuery('missions', [[
            { field: 'locationRef', operator: { _id: 'inq' }, value: [locationId] },
            { field: 'status', operator: { _id: 'inq' }, value: ['finished'] }
        ]], options).pipe(mapRxjs(res => {
            if (res && res.length > 0) {
                return res[0].keys;
            }
            return [];
        }));
    }

    getAuditScoreChartDefinition(missiondescription: MissionDescription, locationId: string, scoreTitle: string, score: any, amount = 1, timescale = 'year', notsliding = false): ChartDefinition {
        let definition = <ChartDefinition>{
            title: this.polyglot.transform(missiondescription.title) + ' - ' + this.polyglot.transform(scoreTitle), kpi: true, kpiType: 'MissionDatasKpi', colorByPoint: false, legendValue: 'avg',
            showLegend: true, useHighstock: true,
            kpiFormValues: <any>{
                accumulator: 'avg',
                groupBy: 'DATE', showValues: false, chartType: 'column',
                dates: { mode: 'dynamic', amount, timescale, notsliding },
                missionscores: { selectedDescription: missiondescription, scores: score },
                locations: [{ _id: locationId }]
            }
        };
        definition.showLabelsY = false;
        return definition;
    }
}
