import { Injectable } from '@angular/core';
import { Location, Broker, UsernamePipe, Push, Notification, Todo, MissionDescription, TodoTaskSimple, User, Users } from '@shared/data-core';
import { Translate } from '@shared/translate';

import { Mission } from '../../interfaces/mission/mission.interface';
import { MissionCalendarGenerate } from '../../interfaces/mission-generate/mission-generate.interface';
import { Calendar } from '../calendar/calendar.service';
import { Session } from '../session/session.service';

import { moment } from '@shared/interfaces';


import * as uuid from 'uuid';
import { Observable, from, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { pick, isArray, keys, groupBy, uniq, compact, includes } from 'lodash-es';

@Injectable()
export class MissionCreator {

    private usernamePipe: UsernamePipe = new UsernamePipe();

    constructor(private session: Session, private broker: Broker, private calendar: Calendar, private push: Push, private translate: Translate, protected users: Users) { }

    setLocation(mission: Mission, location: Location, concatenateTitle: boolean = true) {
        mission._geoloc = location._geoloc;
        mission.address = (location.title && concatenateTitle ? location.title + ' - ' : '') + location.address;
        mission.vip = location.vip;
        mission.locationRef = location._id;
    }

    save(mission: Mission): Observable<Mission> {
        return this.broker.upsert('missions', mission).pipe(mergeMap(res => {
            return this.broker.getById('missions', res._id);
        }));
    }

    notify(mission: Mission, title: string, body: string, userId: string, scheduledDate?: any, mode: 'email' | 'notification' | 'allnotification' = 'notification') {
        this.notify$(mission, title, body, userId, scheduledDate, mode).subscribe(() => { });
    }

    notifyByLocation(mission: Mission, title: string, body: string, locationId: string, scheduledDate?: any, mode: 'email' | 'notification' | 'allnotification' = 'notification') {
        this.users.getGeofilterUsers(locationId).subscribe(geoUsers => {
            geoUsers.forEach(u => {
                if (u._id !== this.session.userId) {
                    this.notify$(mission, title, body, u._id, scheduledDate, mode).subscribe(() => { });
                }
            });
        });

    }

    notify$(mission: Mission, title: string, body: string, userId: string, scheduledDate?: any, mode: 'email' | 'notification' | 'allnotification' = 'notification') {

        let notification: Notification = {
            mode: mode || 'notification',
            title: this.translate.get(title),
            body: body,
            data: {
                entityType: 'Mission',
                entityId: mission._id
            }
        };
        let increaseBadge = false;

        if (body) {
            increaseBadge = !(includes([this.translate.get('MISSIONVALIDATED'), this.translate.get('MISSIONREJECTED')], body));

            if (body.indexOf(this.translate.get('SERVICECREATED')) >= 0) {
                increaseBadge = true;
            }
        }

        if (increaseBadge) {
            if (mission.creatorRef === userId) {
                notification.pendingBadgePath = 'pendingBadges.bookservice.myservices';
            } else {
                notification.pendingBadgePath = 'pendingBadges.available.' + (mission.type ? mission.type.toLowerCase() + 's' : 'missions');
            }
        } else {
            notification.notificationOptions = {
                ios_badgeType: 'None',
                ios_badgeCount: 0
            };
        }

        if (scheduledDate) {
            notification.scheduledDate = scheduledDate;
        }

        return this.push.notifyUserById(userId, notification);
    }

    notifyUsersById(userIds: Array<string>, title: string, body: string, scheduledDate?: any, mode: 'email' | 'notification' | 'allnotification' = 'notification', entityId?: string, entityType?: string, senderGroupsHaveAccess?: boolean, extraData?: any) {
        this.notifyUsersById$(userIds, title, body, scheduledDate, mode, entityId, entityType, senderGroupsHaveAccess, extraData).subscribe(() => { });
    }

    notifyUsersById$(userIds: Array<string>, title: string, body: string, scheduledDate?: any, mode: 'email' | 'notification' | 'allnotification' = 'notification', entityId?: string, entityType?: string, senderGroupsHaveAccess?: boolean, extraData?: any) {
        let notification: Notification = {
            mode: mode || 'notification',
            title: title,
            body: body,
            pendingBadgePath: 'pendingBadges.available.' + (entityType ? entityType.toLowerCase() + 's' : 'missions'),
            data: Object.assign(extraData || {}, {
                entityType,
                entityId
            }),
            senderGroupsHaveAccess
        };
        if (scheduledDate) {
            notification.scheduledDate = scheduledDate;
        }
        return this.push.notifyUsersById(userIds, notification);
    }

    notifyAnnotate(title: string, missionId: string, userId: string, mode: 'email' | 'notification' | 'allnotification' = 'notification') {
        this.notifyAnnotate$(title, missionId, userId, mode).subscribe(() => { });
    }

    notifyAnnotate$(title: string, missionId: string, userId: string, mode: 'email' | 'notification' | 'allnotification' = 'notification') {
        let notification: Notification = {
            mode: 'notification',
            title: title,
            body: this.translate.get('MISSIONANNOTATED'),
            data: {
                entityType: 'Mission',
                entityId: missionId
            }
        };
        return this.push.notifyUserById(userId, notification);
    }

    // notifyMissionReminder$(descriptionRef: string, mode: string, comment?: string, type?: string, options?: any) {
    //     return this.push.notifyMissionReminder(descriptionRef, mode, comment, type, options);
    // }

    createFromCalendar(data: MissionCalendarGenerate) {
        let missiondescription = data.missiondescription;
        let mission: Mission = <Mission>pick(missiondescription, ['title', 'language', 'skipValidation', 'versionmin']);
        if (missiondescription.missionTags) {
            mission.tags = missiondescription.missionTags;
        }
        mission.type = 'mission';
        mission.comments = data.comments;
        mission.isCalendar = true;
        mission.status = 'booked';
        mission.ownerDisplayName = this.usernamePipe.transform(this.session.user);
        mission.descriptionRef = missiondescription._id;
        mission.creatorRef = this.session.userId;
        mission.creatorDisplayName = this.usernamePipe.transform(this.session.user);
        mission.bookedUntil = moment(data.date).toDate();
        mission.ownerRef = this.session.userId;
        let group: Array<string> = missiondescription.group;
        if (!isArray(group)) {
            group = [<any>group];
        }
        group.push('admin');
        this.broker.setAcl(mission, group);

        if (data.location && data.location) {
            this.setLocation(mission, data.location);
        }
        let promise = data.addToCalendar ? this.calendar.createFromMission(mission) : Promise.resolve(true);
        return from(promise).pipe(mergeMap(() => {
            return this.save(mission);
        }));
    }

    createFromMemo(memo: { title: string; duedate?: Date; checklist: any }) {
        let mission: Mission = {
            _id: null,
            _acl: this.session.user._acl,
            type: 'memo',
            title: memo.title,
            duedate: memo.duedate,
            ownerRef: this.session.userId,
            status: 'booked'
        };
        this.setLocation(mission, this.session.user.location);
        this.broker.setAcl(mission, this.session.groups);
        return this.save(mission).pipe(map((m: Mission) => {
            return m;
        }));
    }

    createFromTodo(fieldName: string | Array<string>, todo: Todo, mission: Mission) {
        if (todo && todo.values && todo.values.length > 0 && todo.title && todo.user) {
            let missionTodo: Mission = <any>{
                title: todo.title,
                type: 'todo',
                creatorRef: this.session.userId,
                creatorDisplayName: this.usernamePipe.transform(this.session.user),
                originalFieldName: fieldName,
                progress: { value: 0 }
            };
            if (mission) {
                missionTodo = {
                    ...missionTodo,
                    descriptionRef: mission.descriptionRef,
                    originalMissionId: mission._id,
                    tags: mission.tags
                };

                if (mission.location) {
                    let location = mission.location;
                    location._geoloc = mission._geoloc;
                    location.address = mission.address;
                    location.vip = mission.vip;
                    this.setLocation(missionTodo, location, false);
                }
                missionTodo._acl = mission._acl;
            } else if (this.session && this.session.user && this.session.user.location) {
                this.setLocation(missionTodo, this.session.user.location, false);
                this.broker.setAcl(missionTodo, this.session.groups);
            }
            if (todo.user) {
                this.broker.setAcl(missionTodo, null, null, null, [todo.user._id, this.session.userId]);
                //missionTodo._acl.users = { r: [todo.user._id], w: [todo.user._id] };
                missionTodo.ownerRef = todo.user._id;
                missionTodo.ownerDisplayName = this.usernamePipe.transform(todo.user);
                todo.ownerDisplayName = missionTodo.ownerDisplayName;
            }
            if (todo.duedate) {
                missionTodo.bookedUntil = todo.duedate;
                missionTodo.isCalendar = true;
            }
            delete (<any>todo).group;
            todo.user = <any>pick(todo.user, User.getSimpleFields());
            missionTodo.todo = todo;
            return from(this.broker.uploadEntityFiles(missionTodo, ['.fieldValue'])).pipe(mergeMap(() => {
                return this.save(missionTodo).pipe(map((m: Mission) => {
                    if (todo && m) {
                        todo._id = m._id;
                    }
                    if (m.todo && m.todo.reminderdate) {
                        this.notify(m, 'REMINDER', m.title, m.ownerRef, m.todo.reminderdate, 'notification');
                    }
                    if (m.ownerRef !== this.session.userId) {
                        this.notify(m, 'TODO', m.title, m.ownerRef, null, 'notification');
                    }
                    return m;
                }));
            }));
        } else {
            return of(null);
        }
    }

    createFromTasks(tasks: Array<TodoTaskSimple>, mission: Mission) {
        let todoTasks: any = groupBy(tasks, (t: any) => t.user.value._id);
        let promises: Array<any> = [];
        keys(todoTasks).map(userRef => {
            let userTasks: Array<TodoTaskSimple> = todoTasks[userRef];
            let duedate = null;
            userTasks.forEach(t => {
                if (t.duedate && t.duedate.value && (t.duedate.value < duedate || !duedate)) {
                    duedate = t.duedate.value;
                }
            });
            let todo: Todo = {
                title: this.translate.get('TODO') + ' - ' + this.usernamePipe.transform(this.session.user) + ' - ' + moment().format('L'),
                user: userTasks[0].user.value,
                duedate: duedate,
                values: userTasks.map(t => {
                    t.user.value = <any>pick(t.user.value, User.getSimpleFields());
                    return t;
                })
            };
            promises.push(() => this.createFromTodo(uniq(compact(userTasks.map(t => t.originalFieldName))), todo, mission).toPromise());
        });
        return promises;
    }

    createFromService(description: MissionDescription, data) {
        let mission: Mission = this._createFromServiceCommon(description, data);
        return this.save(mission).pipe(map(m => {
            this.notifyByLocation(m, this.translate.get('SERVICE') + ' - ' + m.title, this.translate.get('SERVICECREATED'), m.locationRef);
            return m;
        }));
    }

    createFromServiceOffline(description: MissionDescription, data, id: string = null) {
        let mission: Mission = this._createFromServiceCommon(description, data, true);
        mission._id = id || 'offline_' + uuid.v4();
        return mission;
    }

    private _createFromServiceCommon(description: MissionDescription, data, isOffline = false) {
        let mission: Mission = <Mission>pick(description, ['title', 'language', 'skipValidation', 'versionmin']);
        if (description.missionTags) {
            mission.tags = description.missionTags;
        }
        mission.type = 'service';
        mission.serviceData = data;
        mission.isService = true;
        mission.description = description;
        mission.descriptionRef = description._id;
        mission.creatorRef = this.session.userId;
        mission.creatorDisplayName = this.usernamePipe.transform(this.session.user); //mission.creator ||
        mission.tags = description.missionTags;
        let group = description.group;
        group = [].concat(group);
        if (description.serviceGroups && description.serviceGroups.length > 0) {
            mission.serviceGroups = description.serviceGroups;
            group = group.concat(description.serviceGroups);
        }

        group.push('admin');
        this.broker.setAcl(mission, group);
        //we need to update the profile before we delete the location
        if (data.location && data.location.value && !isOffline) {
            this.setLocation(mission, data.location.value);
            delete data.location;
        }
        if (data.missiontitle && data.missiontitle.value) {
            mission.title += ' ' + data.missiontitle.value;
        }
        return mission;
    }

}
