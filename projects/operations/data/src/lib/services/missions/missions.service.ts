import { Injectable, EventEmitter } from '@angular/core';

import { CoreConfig, IPosition, GeoLocation, LocalForageService, Network, PromiseService } from '@shared/common';
import { Requestor, Broker, Session, Authentication, ResponseObject, UsernamePipe, MissionDescription, Slide, TodoTaskSimple, Models, Notification, User, Todo } from '@shared/data-core';
import { Translate } from '@shared/translate';
import { FormDynamicBuilder, CACHE_KEYS } from '@shared/data-form';
import { FormFieldType, Query, SubQuery, Filters, moment } from '@shared/interfaces';

import { MissionCreator } from '../mission-creator/mission-creator.service';
import { Missiondatas } from '../missiondatas/missiondatas.service';
import { Mission, MissionValidate, MissionReject } from '../../interfaces/mission/mission.interface';
import { Geofilter } from '../../interfaces/geofilter/geofilter.interface';
import { MissionDataField } from '../../interfaces/missiondata/missiondata.interface';
import { MissionGenerate, MissionNotify, MissionPdfGenerateClassic, MissionPdfGeneratePhotoReport, MissionPdfGenerateAuditReport, MissionPdfMultipleGenerate } from '../../interfaces/mission-generate/mission-generate.interface';

import { Observable, Observer, of, from, forkJoin } from 'rxjs';
import { map as $map, flatMap, mergeMap } from 'rxjs/operators';

import * as uuid from 'uuid';

import { assign, uniq, isNaN, isNumber, cloneDeep, keys, isArray, map, isEmpty, orderBy, forEach, take, some, parseInt } from 'lodash-es';

export interface MissionsData {
    missionsCount: number;
    missions: Array<Mission>;
    pollsCount: number;
    polls: Array<Mission>;
    servicesCount: number;
    services: Array<Mission>;
    todosCount: number;
    todos: Array<Mission>;
}

@Injectable()
export class Missions {

    private usernamePipe: UsernamePipe = new UsernamePipe();
    private _offlinePrefix = 'offline_';
    private _missionDataImageFields = ['.value', '.edit', '.value.fieldValue', '.value.fieldExtra.edit'];

    constructor(private broker: Broker, private rq: Requestor, private session: Session, private authentication: Authentication, private promise: PromiseService, private geoloc: GeoLocation, private network: Network, private translate: Translate, private localForage: LocalForageService, private missionCreator: MissionCreator, private missionDatas: Missiondatas, private formDynamicBuilder: FormDynamicBuilder, private coreConfig: CoreConfig) { }

    isValid(mission: Mission) {
        let retVal = true;
        if (mission.status !== 'finished') {
            if (mission.validFrom) {
                retVal = moment(mission.validFrom).isBefore(moment());
            }
            if (mission.validUntil) {
                retVal = retVal && moment().isBefore(moment(mission.validUntil));
            }
        }
        return retVal;
    }

    //not used anymore, maybe we ll use it again if we want to get the counts
    getAvailable(position: IPosition, language = 'en', radius = 400) {
        let url = this.broker.getApiUrl() + 'businesslogic/getAvailableMissions';
        return this.rq.post(url, {
            params: { geoloc: [position.longitude, position.latitude], radius: radius, language: language }
        }).pipe($map(res => res.data));
    }

    getAvailableFilter(type: string, position?: IPosition, maxDistance?: number, excludeGeoloc = false, missionsPending: Array<Mission> = [], showMyTodos: boolean = false) {
        let and = [];
        let userId = '';
        if (this.session && this.session.user && this.session.user._id) {
            userId = this.session.user._id;
        }

        if (missionsPending && missionsPending.length > 0) {
            and.push({ _id: { nin: missionsPending.map(m => m._id) } });
        }
        if (type !== 'poll') {
            maxDistance = parseInt(<any>maxDistance, null);
            if (!isNumber(maxDistance) || isNaN(maxDistance)) {
                maxDistance = 40000;
            }
            if (!excludeGeoloc && position && isNumber(position.latitude)) {
                and.push({ _geoloc: { nearSphere: { $geometry: { type: 'Point', coordinates: [position.longitude, position.latitude] }, $maxDistance: maxDistance } } });
            }
            if (type === 'todo' && showMyTodos) {
                and.push({ and: [{ ownerRef: { inq: [userId] } }, { status: { nin: ['finished'] } }] });
            }
            and.push({
                or: [
                    { and: [{ status: { inq: ['booked'] } }, { type: { inq: [type] } }, { ownerRef: userId }] },
                    { and: [{ status: { nin: ['finished', 'booked', 'archived', 'scheduled'] } }, { type: { inq: [type] } }] }
                ]
            });
        } else {
            and.push({
                or: [{
                    and: [
                        { status: { nin: ['finished', 'booked', 'archived', 'scheduled'] } },
                        { type: { inq: [type] } },
                        { language: { inq: ['all', this.translate.getCurrentLanguage()] } }
                    ]
                }, {
                    and: [
                        { ownerRef: { inq: [userId] } },
                        { status: { inq: ['booked'] } },
                        { type: { inq: [type] } },
                        { language: { inq: ['all', this.translate.getCurrentLanguage()] } }
                    ]
                }]
            });
        }
        return { and };
    }

    getBookedOfflineId(id: string) {
        return uuid.v4() + '_' + this._offlinePrefix + id;
    }

    getBookedOfflineOriginalId(id: string) {
        return id.substr(id.indexOf(this._offlinePrefix) + this._offlinePrefix.length);
    }

    isBookedOffline(id: string) {
        return id.indexOf(this._offlinePrefix) >= 0;
    }

    book(mission: Mission) {
        if (this.network.isOffline()) {
            let data = cloneDeep(mission);
            data.status = 'booked';
            data.owner = this.session.user;
            data.ownerRef = this.session.userId;
            data._id = this.getBookedOfflineId(data._id);
            return of(data);
        } else {
            let url = this.broker.getApiUrl() + 'businesslogic/missionBook';
            return this.rq.post(url, {
                params: {
                    id: mission._id,
                    isCalendar: mission.isCalendar,
                    bookedUntil: mission.bookedUntil,
                    originalId: mission.originalId,
                    republishedWithAnswers: mission.republishedWithAnswers
                }
            }).pipe(flatMap(res => {
                if (res.data) {
                    res.data.distance = mission.distance;
                }
                let data = {};
                if (res.data && res.data.republishedWithAnswers || mission.republishedWithAnswers && res.data.originalData) {
                    data = this.cleanupOriginalData(res.data.originalData);
                    this.addMissionDataToCache(res.data, data);
                    delete res.data.originalData;
                }
                return this.updateChecklists(res && res.data && res.data.description ? res.data.description.slides : [], data, res.data);
            }));
        }
    }

    assign(mission: Mission, user: User) {
        mission.status = 'booked';
        mission.owner = user;
        mission.ownerRef = user._id;
        return this.update(mission);
    }

    schedule(mission: Mission, date: Date) {
        mission.status = 'booked';
        mission.owner = this.session.user;
        mission.ownerRef = this.session.userId;
        mission.duedate = date;
        return this.update(mission);
    }

    cleanupOriginalData(missiondata) {
        forEach(missiondata, function (field: any, name: string) {
            if (field.fieldType === 'todo' && field.value && field.value._id) {
                delete field.value._id;
            }
        });
        return missiondata;
    }

    bookFromOffline(mission: Mission) {
        mission._id = this.getBookedOfflineOriginalId(mission._id);
        return this.book(mission);
    }

    unbook(mission: Mission) {
        return from(this.cleanupMissionCacheById(mission._id, mission.descriptionRef)).pipe(mergeMap(() => {
            if (this.isBookedOffline(mission._id)) {
                delete mission.status;
                delete mission.owner;
                delete mission.ownerRef;
                return of(mission);
            } else {
                let url = this.broker.getApiUrl() + 'businesslogic/missionUnbook';
                return this.rq.post(url, { params: { id: mission._id } }).pipe($map(res => {
                    res.data.distance = mission.distance;
                    res.data.description = mission.description;
                    return res.data;
                }));
            }
        }));

    }

    isBookable(mission: Mission, showActions?: boolean) {
        let retVal = showActions !== false && !mission.ownerRef || mission.ownerRef === this.session.user._id;
        if (mission && mission.type === 'service' && mission.serviceGroups && mission.serviceGroups.length > 0) {
            retVal = retVal && (this.authentication.hasGroups(mission.serviceGroups) || this.authentication.isAdmin());
        }
        return retVal;
    }

    update(mission: Mission) {
        return this.broker.upsert('missions', mission).pipe(mergeMap(retVal => {
            return this.broker.getById('missions', retVal._id);
        }));
    }

    saveData(mission: Mission, missiondata: { [key: string]: MissionDataField }) {
        let url = this.broker.getApiUrl() + 'businesslogic/missionSaveData';
        delete missiondata._id;
        delete missiondata.mission;
        delete missiondata.location;
        delete missiondata.missiondescription;
        delete missiondata.user;
        return from(this.broker.uploadEntityFiles(missiondata, this._missionDataImageFields)).pipe(
            flatMap(() => {
                return this.rq.post(url, { params: { id: mission._id, missiondata } });
            }));
    }

    finish(originalMission: Mission, missiondata: { [key: string]: MissionDataField }, progressEmitter?: EventEmitter<any>) {
        if (progressEmitter) {
            progressEmitter.next(0);
        }
        return new Observable<ResponseObject>((observer: Observer<ResponseObject>) => {
            let obs;
            let originalMissionId;
            if (this.isBookedOffline(originalMission._id)) {
                originalMissionId = originalMission._id;
                obs = this.bookFromOffline(originalMission).pipe($map(retVal => {
                    originalMission._id = retVal._id;
                    return originalMission;
                }));
            } else {
                obs = of(originalMission);
            }
            obs.subscribe((mission: Mission) => {
                let url = this.broker.getApiUrl() + 'businesslogic/missionFinish';
                let missionId = mission._id;
                let tags = [missionId];
                if (this.missionDatas.hasScoring(mission.description)) {
                    this.missionDatas.calculateScoring(mission, missiondata);
                }
                if (mission.quizz || mission.description.quizz) {
                    this.missionDatas.calculateScoringQuizz(mission, mission.description.slides, missiondata);
                    if (mission.score.value < mission.score.total && (!mission.quizzMode || mission.quizzMode === 'ALLANSWERSVALID')) {
                        observer.error('QUIZZNOTVALID');
                        observer.complete();
                        return;
                    }
                }
                let score = mission.score;
                let extraScores = mission.extraScores;
                let validated = mission.validated;
                this.broker.uploadEntityFiles(missiondata, this._missionDataImageFields, progressEmitter, tags).then(() => {
                    this.createTodos(mission, missiondata).then(() => {
                        if (progressEmitter) {
                            progressEmitter.next(90);
                        }
                        this.rq.post(url, { params: { id: missionId, missiondata, score, extraScores, validated } }).subscribe(res => {
                            let promises = [];
                            if (mission.isService) {
                                this.notify(mission, mission.title, this.translate.get('SERVICEUPDATED'), mission.creatorRef);
                            }
                            if (originalMissionId) {
                                promises.push(() => this.cleanupMissionCacheById(originalMissionId, mission.descriptionRef));
                            }
                            promises.push(() => this.cleanupMissionCache(mission));

                            this.promise.sequential(promises).then(() => {
                                if (progressEmitter) {
                                    progressEmitter.next(100);
                                }
                                observer.next(res);
                                observer.complete();
                            }, err => {
                                observer.error(err);
                                observer.complete();
                            });
                        }, err => {
                            observer.error(err);
                            observer.complete();
                        });
                    }, err => {
                        observer.error(err);
                        observer.complete();
                    });
                }, err => {
                    observer.error(err);
                    observer.complete();
                });
            });
        });
    }

    finishService(campaign, missiondata, progressEmitter?: EventEmitter<any>) {
        if (progressEmitter) {
            progressEmitter.next(0);
        }
        return from(this.broker.uploadEntityFiles(missiondata, this._missionDataImageFields, progressEmitter)).pipe(mergeMap(() => {
            return this.missionCreator.createFromService(campaign, missiondata).pipe(mergeMap(mission => {
                let url = this.broker.getApiUrl() + 'businesslogic/missionSaveServiceData';
                if (progressEmitter) {
                    progressEmitter.next(90);
                }
                return this.rq.post(url, { params: { mission, missiondata } }).pipe($map((res) => {
                    if (progressEmitter) {
                        progressEmitter.next(100);
                    }
                    return res;
                }));
            }));
        }));
    }

    notify(mission: Mission, title: string, body: string, userId: string) {
        this.missionCreator.notify(mission, title, body, userId);
    }

    notifyByLocation(mission: Mission, title: string, body: string, locationId: string) {
        this.missionCreator.notifyByLocation(mission, title, body, locationId);
    }

    notifyUsersById(title: string, body: string, userIds: Array<string>, scheduledDate?: any, mode?: 'email' | 'notification' | 'allnotification', entityId?: string, entityType?: string, senderGroupsHaveAccess?: boolean, extraData?: any) {
        this.missionCreator.notifyUsersById(userIds, title, body, scheduledDate, mode, entityId, entityType, senderGroupsHaveAccess, extraData);
    }

    notifyUsersById$(title: string, body: string, userIds: Array<string>, scheduledDate?: any, mode?: 'email' | 'notification' | 'allnotification', entityId?: string, entityType?: string, senderGroupsHaveAccess?: boolean, extraData?: any) {
        return this.missionCreator.notifyUsersById$(userIds, title, body, scheduledDate, mode, entityId, entityType, senderGroupsHaveAccess, extraData);
    }

    notifyAnnotate(title: string, missionId: string, userId: string, mode?: 'email' | 'notification' | 'allnotification') {
        this.missionCreator.notifyAnnotate(title, missionId, userId, mode);
    }

    notifyLocations(options: MissionNotify) {
        let locationQuery: Query = {};
        let obs: Observable<any>;

        locationQuery = options.locations.query || {};
        if (options.locations.selection && options.locations.selection.length > 0) {
            obs = of(map(options.locations.selection, '_id'));
        } else {
            locationQuery.fields = ['_id'];
            locationQuery.limit = 0;
            obs = this.broker.getAllQuery('locations', locationQuery).pipe($map(retVal => {
                return retVal.data.map(l => l._id);
            }));
        }
        return obs.pipe(mergeMap(locationIds => {
            let where = { _id: { inq: locationIds } };
            let geofilterQuery: Query = {
                limit: 0,
                fields: ['userRef'],
                subQuery: <SubQuery>{
                    collectionName: 'locations', field: 'locationsRef', values: '_id', where: where
                }
            };
            return this.broker.getAllQuery('geofilters', geofilterQuery).pipe(mergeMap((geofilters) => {
                let userIds = map(geofilters.data, (geofilter: Geofilter) => geofilter.userRef);
                userIds = uniq(userIds);
                if (userIds.length > 0) {
                    return this.notifyUsersById$(this.translate.get('MISSIONS'), this.translate.get(options.body), userIds, options.scheduledDate, options.mode);
                } else {
                    return of({ pushRecipients: 0, mailRecipients: 0 });
                }
            }));
        }));
    }

    notifyMissionReminderGetUserIds(descriptionRef: string) {
        let url = this.broker.getApiUrl() + 'businesslogic/getReminderUsers';
        return this.rq.post(url, { descriptionRef }).pipe($map((users) => map(users, '_id')));
    }

    notifyMissionReminder(descriptionRef: string, missionDescription: MissionDescription, { mode = 'all', comment = '', type = 'manual' }: any = {}) {
        let notificationOptions = { tab: missionDescription.type, entityId: descriptionRef };
        let url = this.broker.getApiUrl() + 'businesslogic/sendMissionReminders';
        return this.rq.post(url, { descriptionRef, mode, comment, type, notificationOptions });
    }

    getLastNotificationSimpleDate(missiondescriptionId: string): Observable<Array<{ date: any, sender: any }>> {
        return this.broker.getAll('notifications', null, null, null, [[{
            field: 'data.entityId',
            operator: { _id: 'eq' },
            value: missiondescriptionId
        }]], [{ 'colId': '_ect', 'sort': 'desc' }]).pipe($map((res: { data: Array<Notification> }) => {
            if (res && res.data && res.data.length > 0) {
                return res.data.map(r => ({ date: r._ect, sender: r.sender }));
            }
            return null;
        }));
    }

    savePending(mission: Mission) {
        mission.status = 'pending';
        return this.addMissionToCache(mission);
    }

    removePending(mission: Mission) {
        mission.status = 'booked';
        return this.addMissionToCache(mission);
    }

    sendPending(mission: Mission, progressEmitter?: EventEmitter<any>) {
        return this.getMissionDataFromCache(mission._id).pipe(mergeMap(data => {
            return this.finish(mission, data, progressEmitter);
        }));
    }

    validate(missionId: string, missionValidate: MissionValidate) {
        let url = this.broker.getApiUrl() + 'businesslogic/missionValidate';
        return this.rq.post(url, {
            params: { id: missionId, status: true, reason: missionValidate.comments, rating: missionValidate.rating }
        }).pipe($map(res => {
            let mission: Mission = res.data;
            if (mission && !mission.isService && mission.ownerRef) {
                this.notify(mission, mission.title, this.translate.get('MISSIONVALIDATED') + ': ' + mission.title + ', ' + (mission.address || ''), mission.ownerRef);
            }
            return mission;
        }));
    }

    reject(missionId: string, missionReject: MissionReject) {
        let url = this.broker.getApiUrl() + 'businesslogic/missionValidate';
        let reason = missionReject.comments || '';
        let reasonKey: string;
        if (missionReject.reason) {
            reason = this.translate.get(missionReject.reason.key) + ' ' + reason;
            reasonKey = missionReject.reason.key;
        }
        return this.rq.post(url, {
            params: { id: missionId, status: false, reason, reasonKey, rating: 0, republish: missionReject.republish, republishWithAnswers: missionReject.republishWithAnswers }
        }).pipe($map(res => {
            let mission: Mission = res.data;
            if (mission && !mission.isService && mission.ownerRef) {
                this.notify(mission, mission.title, this.translate.get('MISSIONREJECTED') + ': ' + mission.title + ', ' + (mission.address || ''), mission.ownerRef);
            }
            return mission;
        }));
    }

    createTodos(mission: Mission, missiondata: { [key: string]: MissionDataField }) {
        let promises: Array<() => Promise<any>> = [];
        let tasks: Array<TodoTaskSimple> = [];

        let fields = [];
        if (mission && mission.description && mission.description.slides) {
            fields = Models.getFieldsFromSlides(mission.description.slides);
        }

        keys(missiondata).forEach(key => {
            let d = missiondata[key];
            if (d && d.fieldType === FormFieldType.todo && d.value && d.value.values && d.value.values.length > 0 && !d.value._id) {
                promises.push(() => this.missionCreator.createFromTodo(key, d.value, mission).toPromise());
            }
            if (d && d.tasks && d.tasks.length > 0 && d.fieldType !== FormFieldType.task) {
                d.tasks.forEach(t => {
                    t.originalFieldName = key;
                    t.fieldValue = d.value;
                    t.field = fields.find(f => f.name === key);
                    if (d.edit || d.texts) {
                        t.fieldExtra = { edit: d.edit, texts: d.texts };
                    } else if ((<any>d).extraData) {
                        t.fieldExtra = (<any>d).extraData;
                    }
                    if (t.field) {
                        delete t.field.allowAnnotate;
                    }
                });
                tasks = tasks.concat(d.tasks);
            }
            if (d && d.fieldType === FormFieldType.task && d.value && d.value.length > 0) {
                d.value.forEach(t => {
                    t.originalFieldName = key;
                });
                tasks = tasks.concat(d.value);
            }
        });

        if (tasks.length > 0) {
            promises = promises.concat(this.missionCreator.createFromTasks(tasks, mission));
        }
        return this.promise.sequential(promises);
    }

    getMemoSlides(readonly?: boolean) {
        return [{ title: 'MEMO', items: this.getMemoForm(readonly) }];
    }

    getMemoForm(readonly?: boolean) {
        return [{
            type: FormFieldType.text,
            name: 'title',
            required: true,
            readonly: readonly
        }, {
            type: FormFieldType.datetime,
            name: 'duedate',
            required: false,
            readonly: readonly
        }, {
            type: FormFieldType.checklist,
            name: 'checklist',
            hideLabel: true,
            required: !readonly
        }];
    }

    createMemo(memo: { title: string; duedate?: Date; checklist: any }) {
        return this.missionCreator.createFromMemo(memo).pipe(flatMap((mission: Mission) => {
            return this.saveData(mission, {
                title: { value: memo.title, fieldType: FormFieldType.text, fieldTitle: 'title' },
                duedate: { value: memo.duedate, fieldType: FormFieldType.datetime, fieldTitle: 'duedate' },
                checklist: { value: memo.checklist, fieldType: FormFieldType.checklist, fieldTitle: 'checklist' }
            });
        })).pipe($map(res => res.data && res.data.length > 0 ? res.data[0] : null));
    }

    createTodo(todo: Todo) {
        return this.missionCreator.createFromTodo('checklist', todo, null);
    }

    generate(missionGenerate: MissionGenerate, channel: string) {
        missionGenerate = Object.assign({}, missionGenerate);
        if (missionGenerate.validFrom) {
            missionGenerate.validFrom = moment(missionGenerate.validFrom).local().toISOString();
        }
        if (missionGenerate.validUntil) {
            missionGenerate.validUntil = moment(missionGenerate.validUntil).local().toISOString();
        }
        if (missionGenerate.duedate) {
            missionGenerate.duedate = moment(missionGenerate.duedate).local().toISOString();
        }

        let missionDescriptionIds;
        if (isArray(missionGenerate.campaigns)) {
            missionDescriptionIds = map(missionGenerate.campaigns, '_id');
        } else {
            missionDescriptionIds = map([].concat((<any>missionGenerate.campaigns).selection), '_id');
        }
        //delete missionGenerate.campaigns;

        let locationQuery: any;
        if (missionGenerate.locations) {
            locationQuery = missionGenerate.locations.query || {};
            if (missionGenerate.locations && missionGenerate.locations.selection && missionGenerate.locations.selection.length > 0) {
                locationQuery = { where: { _id: { inq: map(missionGenerate.locations.selection, '_id') } } };
            }
        }
        //delete missionGenerate.locations;

        let url = this.broker.getApiUrl() + 'businesslogic/generateMissions';
        let data: any;
        return this.rq.post(url, { params: { missionDescriptionIds, missionGenerate, locationQuery, channel } }).pipe(mergeMap(res => {
            data = res.data;
            if (missionGenerate.notify && missionGenerate.notifyBody && locationQuery) {
                let geofilterQuery: Query = {
                    fields: ['userRef'],
                    //limit: -1,
                    subQuery: <SubQuery>{
                        collectionName: 'locations', field: 'locationsRef', values: '_id', where: locationQuery.where
                    }
                };
                return this.broker.getAllQuery('geofilters', geofilterQuery);
            } else {
                return of({});
            }
        })).pipe($map(geofilters => {
            if (missionGenerate.notify && missionGenerate.notifyBody) {
                let userIds = map(geofilters.data, (geofilter: Geofilter) => geofilter.userRef);
                userIds = uniq(userIds);
                if (userIds.length > 0) {
                    this.notifyUsersById(this.translate.get('MISSIONS'), this.translate.get(missionGenerate.notifyBody), userIds, missionGenerate.notifyScheduledDate);
                }
            }
            return data;
        }));
    }

    archiveCampaigns(missionDescriptionIds: Array<string> = []) {
        let url = this.broker.getApiUrl() + 'businesslogic/archiveCampaigns';
        return this.rq.post(url, { params: { missionDescriptionIds } });
    }

    archive(missiondescriptionIds: Array<string>, archiveMission: boolean, archiveCampaign: boolean) {
        return this.broker.updateAll('missiondescriptions', { 'where': { '_id': { 'inq': missiondescriptionIds } } }, { 'archived': archiveCampaign }).pipe(mergeMap(res => {
            return archiveMission ? this.broker.updateAll('missions', { 'where': { 'descriptionRef': { 'inq': missiondescriptionIds }, 'status': { 'nin': ['finished'] } } }, { 'status': 'archived' }) : Promise.resolve(null);
        }));
    }

    unarchive(missiondescriptionIds: Array<string>, unarchiveMission: boolean) {
        return this.broker.updateAll('missiondescriptions', { 'where': { '_id': { 'inq': missiondescriptionIds } } }, { 'archived': false }).pipe(mergeMap(res => {
            return unarchiveMission ? this.broker.updateAll('missions', { 'where': { 'descriptionRef': { 'inq': missiondescriptionIds }, 'status': { 'in': ['archived'] } } }, { 'status': null }) : Promise.resolve(null);
        }));
    }

    getDistanceTransform(position: IPosition) {
        return (res: ResponseObject) => {
            res.data = res.data.map((mission: Mission) => {
                if (mission._geoloc && position && isNumber(position.latitude) && isNumber(position.longitude)) {
                    mission.distance = this.geoloc.getDistance(position.latitude, position.longitude, mission._geoloc[1], mission._geoloc[0]);
                }
                return mission;
            });
            return res;
        };
    }

    getProgressTransformAsync(position?: IPosition, sortByPosition: boolean = true) {
        return (res: ResponseObject) => {
            return new Observable<ResponseObject>((observer: Observer<ResponseObject>) => {
                if (!res || !res.data || res.data.length === 0 || !res.data.map) {
                    observer.next(res);
                    observer.complete();
                } else {
                    forkJoin(res.data.map((mission: Mission) => {
                        return this.getMissionProgressFromCache(mission._id).pipe($map(progress => {
                            if (progress) {
                                mission.progress = progress;
                            }
                            if (position && mission._geoloc) {
                                mission.distance = this.geoloc.getDistance(position.latitude, position.longitude, mission._geoloc[1], mission._geoloc[0]);
                            }
                            return mission;
                        }));
                    })).subscribe((data: Array<any>) => {
                        if (sortByPosition) {
                            data.forEach(d => d.priority = d.priority || 6);
                            data = orderBy(data, position ? ['distance', 'priority', 'title'] : ['priority', 'title'], position ? ['asc', 'asc', 'asc'] : ['asc', 'asc']);
                            data.forEach(d => {
                                if (d.priority === 6) {
                                    delete d.priority;
                                }
                            });

                        }
                        observer.next({ count: res.count, data: <any>data });
                        observer.complete();
                    });
                }
            });
        };
    }

    getWithSlides(mission: Mission): any {
        if (mission.description && mission.description.slides && mission.description.slides.length > 0) {
            return of(mission);
        }
        if (mission.type === 'memo') {
            mission.description = <any>{
                slides: this.getMemoSlides()
            };
            return of(mission);
        }
        if (!this.network.isOffline()) {
            return this.broker.getById('missions', mission._id, ['*']);
        }
        return this.getMissionDescriptionFromCache(mission.descriptionRef).pipe(mergeMap(data => {
            if (!isEmpty(data)) {
                mission.description = data;
                return of(mission);
            } else {
                return this.broker.getById('missions', mission._id, ['*']);
            }
        }));
    }

    sendResult(missionId: string, emails: Array<string>, comment?: string) {
        let url = this.broker.getApiUrl() + 'businesslogic/missionResult';
        return this.rq.post(url, { params: { id: missionId, emails, comment, hideUser: this.authentication.isDashboard() ? true : false } }).pipe($map(res => res.results));
    }

    downloadPdf(missionId: string, fileName: string, missionPdfGenerate: MissionPdfGenerateClassic | MissionPdfGeneratePhotoReport | MissionPdfGenerateAuditReport) {
        let url = this.broker.getApiUrl() + 'businesslogic/missionPdf';
        if (this.authentication.isDashboard()) {
            missionPdfGenerate.hideUser = true;
        }
        let body = { params: { id: missionId, options: missionPdfGenerate } };

        return this.rq.downloadFile((fileName || 'mission') + '.pdf', 'application/pdf', url, { method: 'post', headers: { 'Content-Type': 'application/json' }, body });
    }

    getPdf(missionId: string, missionPdfGenerate: MissionPdfGenerateClassic | MissionPdfGeneratePhotoReport | MissionPdfGenerateAuditReport) {
        let url = this.broker.getApiUrl() + 'businesslogic/missionPdf';
        if (this.authentication.isDashboard()) {
            missionPdfGenerate.hideUser = true;
        }
        let body = { params: { id: missionId, options: missionPdfGenerate } };
        return this.rq.fetch(url, { method: 'post', headers: { 'Content-Type': 'application/json' }, body })
            .then(res => res && res.blob ? res.blob() : null);
    }

    getPdfs(missionIds: Array<string>, fileName: string, missionPdfGenerate: MissionPdfGenerateClassic | MissionPdfGeneratePhotoReport | MissionPdfGenerateAuditReport, missionPdfMultipleGenerate: MissionPdfMultipleGenerate) {
        let url = this.broker.getApiUrl() + 'businesslogic/missionsPdf';
        if (this.authentication.isDashboard()) {
            missionPdfGenerate.hideUser = true;
        }
        // merge missionPdfGenerate and missionPdfMultipleGenerate
        let body = { params: { ids: missionIds, options: assign({}, missionPdfGenerate, missionPdfMultipleGenerate) } };
        return this.rq.downloadFile((fileName || 'mission') + '.pdf', 'application/pdf', url, { method: 'post', headers: { 'Content-Type': 'application/json' }, body });
    }

    getMarkers(missions: Array<Mission>) {
        if (missions && missions.filter) {
            return missions.filter((m: Mission) => m._geoloc && m._geoloc.length > 1 && m.status !== 'archived').map((m: Mission) => {
                return {
                    _id: m._id,
                    address: m.address,
                    status: m.validated === true ? 'validated' : (m.validated === false ? 'rejected' : (m.status === 'finished' ? 'tobevalidated' : m.status || 'available')),
                    validated: m.validated,
                    locationRef: m.locationRef,
                    latitude: m._geoloc[1],
                    longitude: m._geoloc[0],
                    title: m.title,
                    missionRef: (<any>m).missionRef,
                    color: m.validated === true ? 'balanced' : (m.validated === false ? 'assertive' : (m.status === 'finished' ? 'royal' : (m.status === 'booked' ? 'positive' : 'energized')))
                };
            });
        }
        return [];
    }

    getMarkersData(collectionName: string, maxPoints: number = 5000, fields?: Array<string>, filters?: Filters, subQuery?: SubQuery) {
        return this.broker.getAll(collectionName, fields || ['_id', 'title', '_geoloc', 'status', 'validated', 'address', 'locationRef', 'missionRef'], null, null, filters, null, 0, maxPoints, false, subQuery).pipe($map(retVal => {
            let markers;
            if (collectionName === 'missiondatas') {
                markers = this.missionDatas.getMarkers(retVal.data);
            } else {
                markers = this.getMarkers(retVal.data);
            }
            let legendColors = { available: 'energized', booked: 'positive', validated: 'balanced', rejected: 'assertive', tobevalidated: 'royal', archived: 'dark' };
            return { markers, legendColors };
        }));
    }

    getPopupTemplate(collectionName) {
        return (properties: Array<any>) => {
            let retVal = '';
            if (collectionName === 'missions') {
                take(properties, 8).forEach(p => {
                    let status = ' - ' + this.translate.get((p.status || 'AVAILABlE').toUpperCase());
                    let validated = p.status !== 'finished' ? '' : ' - ' + this.translate.get((p.validated === true ? 'VALIDATED' : p.validated === false ? 'REJECTED' : 'TOBEVALIDATED').toUpperCase());
                    retVal += `<div class="popup-title">${this.translate.polyglot(p.title) || ''}${status}${validated}</div>`;
                });
            } else {
                retVal = `<div class="popup-title">${this.translate.polyglot(properties[0].title)}</div>`;
            }
            retVal += `<p class="popup-subtitle">${properties[0].address || ''}</p>`;
            return retVal;
        };
    }

    saveTodo(mission: Mission) {
        if (this.getTodoProgress(mission) === 100) {
            mission.status = 'finished';
            mission.finishedDate = new Date();
            mission.ownerDisplayName = this.usernamePipe.transform(this.session.user);
        } else {
            mission.status = null;
            mission.finishedDate = null;
        }
        return new Observable<ResponseObject>((observer: Observer<ResponseObject>) => {
            this.broker.uploadEntitiesFiles(mission.todo.values).then(() => {
                return this.broker.upsert('missions', mission).subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
            });
        });
    }

    getTodoProgress(mission: Mission): number {
        let retVal = 0;
        if (!mission) {
            return retVal;
        }
        if (mission.type === 'todo' && mission.todo && mission.todo.values && mission.todo.values.length > 0) {
            mission.todo.values.forEach(todo => {
                if (todo.finished && (todo.finished.value === true || todo.finished.value === false)) {
                    retVal += 1;
                }
            });
            retVal = Math.round(retVal * 100 / mission.todo.values.length);
        }
        return retVal;
    }

    getTodosData(originalFieldNames: Array<string>, originalMissionId: string) {
        return this.broker.getAll('missions', null, null, null, [[
            { field: 'originalFieldName', operator: { _id: 'inq' }, value: originalFieldNames },
            { field: 'originalMissionId', operator: { _id: 'eq' }, value: originalMissionId }
        ]]); //.map((res: any) => res.data.length > 0 ? res.data[0].todo : null);
    }

    updateDataFieldType(data, fields: Array<any>) {
        this.formDynamicBuilder.updateDataFieldType(data, fields);
    }

    getMemoData(mission: Mission) {
        let filters = [[
            { field: 'missionRef', operator: { _id: 'eq' }, value: mission._id }
        ]];
        return this.broker.getAll('missiondatas', null, null, null, filters).pipe($map(res => {
            if (res && res.data && res.data.length > 0) {
                let data = res.data[0];
                if (data && data.checklist && data.checklist.value && data.checklist.value.currentTasks) {
                    data.checklist.value.previousTasks = data.checklist.value.previousTasks || [];
                    data.checklist.value.previousTasks = data.checklist.value.previousTasks.concat(data.checklist.value.currentTasks.map(t => ({ text: t })));
                    data.checklist.value.currentTasks = [];
                }
                this.addMissionDataToCache(mission, data);
                return data;
            }
            return null;
        }));
    }

    updateChecklists(slides: Array<Slide>, data: any, mission: Mission): Observable<Mission> {
        if (!this.network.isOffline() && slides && slides.length > 0 && mission && mission.locationRef && mission.descriptionRef) {
            let checklistFields = [];
            slides.forEach(s => {
                if (s.items && s.items.forEach) {
                    s.items.forEach(f => {
                        if (f && f.type === FormFieldType.checklist) {
                            checklistFields.push(f);
                        }
                    });
                }
            });

            if (checklistFields.length > 0) {
                let filters = [[
                    { field: 'locationRef', operator: { _id: 'eq' }, value: mission.locationRef },
                    { field: 'missiondescriptionRef', operator: { _id: 'eq' }, value: mission.descriptionRef }
                ]];
                return this.broker.getAll('missiondatas', null, null, null, filters).pipe($map(res => {
                    if (res && res.data && res.data.length > 0) {
                        let previousData = res.data[0];
                        checklistFields.forEach(f => {
                            if (previousData[f.name] && previousData[f.name].value && previousData[f.name].value.currentTasks && previousData[f.name].value.currentTasks.length > 0) {
                                data = data || {};
                                data[f.name] = data[f.name] || {};
                                data[f.name].value = data[f.name].value || {};
                                if (!data[f.name].value.previousTasks || data[f.name].value.previousTasks.length === 0) {
                                    data[f.name].value.previousTasks = previousData[f.name].value.currentTasks.map(t => ({ text: t }));
                                }
                            }
                        });
                        this.addMissionDataToCache(mission, data);
                    }
                    return mission;
                }));
            }
        }
        return of(mission);
    }

    getData(missionId: string) {
        let filters = [[{ field: 'missionRef', operator: { _id: 'inq' }, value: [{ _id: missionId }] }]];
        return this.broker.getAll('missiondatas', ['*', 'mission.title', 'missiondescription.slides', 'location.title', 'location._geoloc'], ['mission', 'missiondescription', 'location'], null, filters, null, 0, 1).pipe($map(res => res && res.data && res.data.length > 0 ? res.data[0] : {}));
    }

    cleanupMissionCache(mission: Mission) {
        return this.cleanupMissionCacheById(mission._id, mission.descriptionRef);
    }

    cleanupMissionCacheById(missionId: string, descriptionRef: string) {
        let promises = [
            () => this.removeMissionFromCache(missionId).toPromise(),
            () => this.removeMissionDataFromCache(missionId).toPromise(),
            () => this.removeMissionProgressFromCache(missionId).toPromise(),
            () => this.removeMissionServiceFromCache(missionId).toPromise()
        ];
        return this.promise.sequential(promises)
            .then(() => {
                return this.getAllMissionsFromCache();
            }).then(missions => {
                if (!some(missions, (m: Mission) => m.descriptionRef === descriptionRef)) {
                    return this.removeMissionDescriptionFromCache(descriptionRef);
                }
            });
    }

    addMissionDescriptionToCache(missionDescription: MissionDescription) {
        return this._addGenericToCache(CACHE_KEYS.missiondescriptions, missionDescription._id, missionDescription);
    }

    getMissionDescriptionFromCache(missionDescriptionId: string) {
        return this._getGenericFromCache(CACHE_KEYS.missiondescriptions, missionDescriptionId);
    }

    removeMissionDescriptionFromCache(missionDescriptionId: string) {
        return this._removeGenericFromCache(CACHE_KEYS.missiondescriptions, missionDescriptionId);
    }

    addMissionDataToCache(mission: Mission, data: any) {
        return this._addGenericToCache(CACHE_KEYS.missiondatas, mission._id, data);
    }

    getMissionDataFromCache(missionId: string) {
        return this._getGenericFromCache(CACHE_KEYS.missiondatas, missionId);
    }

    removeMissionDataFromCache(missionId: string) {
        return this._removeGenericFromCache(CACHE_KEYS.missiondatas, missionId);
    }

    addMissionProgressToCache(mission: Mission, progress: { value: number; takenPhotos?: number; totalPhotos?: number; }) {
        return this._addGenericToCache(CACHE_KEYS.missionprogress, mission._id, progress);
    }

    getMissionProgressFromCache(missionId: string) {
        return this._getGenericFromCache(CACHE_KEYS.missionprogress, missionId);
    }

    removeMissionProgressFromCache(missionId: string) {
        return this._removeGenericFromCache(CACHE_KEYS.missionprogress, missionId);
    }

    addMissionToCache(mission: Mission) {
        return this._addGenericToCache(CACHE_KEYS.missions, mission._id, mission);
    }

    getMissionFromCache(missionId: string) {
        return this._getGenericFromCache(CACHE_KEYS.missions, missionId);
    }

    getAllMissionsFromCache(): Promise<Array<Mission>> {
        return this._getAllGenericFromCache(CACHE_KEYS.missions);
    }

    removeMissionFromCache(missionId: string) {
        return this._removeGenericFromCache(CACHE_KEYS.missions, missionId);
    }

    addMissionServiceToCache(mission: Mission) {
        return this._addGenericToCache(CACHE_KEYS.missionservices, mission._id, mission);
    }

    getMissionServiceFromCache(missionId: string) {
        return this._getGenericFromCache(CACHE_KEYS.missionservices, missionId);
    }

    getAllMissionsServiceFromCache(): Promise<Array<Mission>> {
        return this._getAllGenericFromCache(CACHE_KEYS.missionservices);
    }

    removeMissionServiceFromCache(missionId: string) {
        return this._removeGenericFromCache(CACHE_KEYS.missionservices, missionId);
    }

    getFilename(mission: Mission) {
        let filename = mission.title;
        if (this.coreConfig.isAndroid()) {
            if (filename.length > 20) {
                filename = filename.slice(0, 20);
            }
        } else {
            if (mission.location && mission.location.title) {
                filename += ' - ' + mission.location.title;
            } else if (mission.address) {
                filename += ' - ' + mission.address;
            }
            filename += ' - ' + moment().toISOString().replace('.', '_');
        }
        return filename;
    }

    private _addGenericToCache(cacheKey: string, entryKey: string, data: any) {
        return this.localForage.get(cacheKey).then((datas: any) => {
            datas = datas || {};
            if (entryKey) {
                datas[entryKey] = data;
            }
            return this.localForage.set(cacheKey, datas);
        });
    }

    private _getGenericFromCache(cacheKey: string, entryKey: string) {
        return from(this.localForage.get(cacheKey).then((datas) => {
            datas = datas || {};
            return datas[entryKey] || {};
        }));
    }

    private _getAllGenericFromCache(cacheKey: string) {
        return this.localForage.get(cacheKey).then((datas: any) => {
            datas = datas || {};
            let retVal = [];
            keys(datas).forEach(key => {
                if (datas[key]) {
                    retVal.push(datas[key]);
                }
            });
            return retVal;
        });
    }

    private _removeGenericFromCache(cacheKey: string, entryKey: string) {
        return from(this.localForage.get(cacheKey).then((datas) => {
            datas = datas || {};
            delete datas[entryKey];
            return this.localForage.set(cacheKey, datas);
        }));
    }

}
