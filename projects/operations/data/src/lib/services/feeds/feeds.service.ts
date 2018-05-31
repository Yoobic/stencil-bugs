import { Injectable } from '@angular/core';

import { CoreConfig, HttpsPipe, Utils } from '@shared/common';
import { Broker, Models, Notification, Push, ResponseObject, Session, Files, User } from '@shared/data-core';
import { FormFieldType, IFormField } from '@shared/interfaces';
import { Translate } from '@shared/translate';

import { Feed, FeedComment } from '../../interfaces/feed/feed.interface';
import { DashboardService } from '../dashboard/dashboard.service';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { pick } from 'lodash-es';
import * as uuid from 'uuid';

@Injectable()
export class Feeds {

    private httpsPipe;

    constructor(private dashboard: DashboardService, private broker: Broker, private push: Push, private session: Session, private translate: Translate, private coreConfig: CoreConfig, private utils: Utils, protected files: Files) {
        this.httpsPipe = new HttpsPipe(this.coreConfig, this.utils);
    }

    sendComment(feed: Feed, commentText: string, selectedComment: FeedComment) {
        return new Observable<FeedComment>(observer => {
            let comment: FeedComment = {
                user: pick(this.session.user, User.getSimpleFields()),
                text: commentText,
                date: new Date()
            };
            if (selectedComment) {
                comment._id = uuid.v4();
                selectedComment.comments = selectedComment.comments || [];
                selectedComment.comments.push(comment);
            } else {
                comment = {
                    ...comment,
                    group: feed.group,
                    feedRef: feed._id
                };
            }
            this.broker.upsert('feedsComments', selectedComment ? selectedComment : comment).subscribe(c => {
                if (selectedComment) {
                    c.user = selectedComment.user;
                } else {
                    c.user = this.session.user;
                }
                feed.comments = feed.comments || [];
                feed.comments = feed.comments.filter(f => f._id !== c._id);
                feed.comments.push(c);
                if (feed.userRef && feed.userRef !== this.session.userId) {
                    this.push.notifyUsersById([feed.userRef], {
                        title: this.translate.get('FEED'),
                        body: User.getDisplayName(this.session.user) + this.translate.get('COMMENTEDYOURFEED') + feed.title,
                        mode: 'notification',
                        data: {
                            entityId: feed._id,
                            entityType: 'Feed'
                        },
                        pendingBadgePath: 'pendingBadges.feeds'
                    }).subscribe();
                }
                if (selectedComment && selectedComment.userRef && selectedComment.userRef !== feed.userRef && selectedComment.userRef !== this.session.userId) {
                    this.push.notifyUsersById([selectedComment.userRef], {
                        title: this.translate.get('FEED'),
                        body: User.getDisplayName(this.session.user) + this.translate.get('COMMENTEDYOURFEED') + feed.title,
                        mode: 'notification',
                        data: {
                            entityId: feed._id,
                            entityType: 'Feed'
                        },
                        pendingBadgePath: 'pendingBadges.feeds'
                    }).subscribe();
                }
                this.broker.upsert('feeds', feed).subscribe(f => {
                    observer.next(c);
                    observer.complete();
                });
            });
        });
    }

    deleteComment(comment: FeedComment) {
        return this.broker.delete('feedsComments', comment._id);
    }

    fixCommentImage(comment: FeedComment) {
        if (comment && comment.text) {
            comment.text = comment.text.replace('<ionic-chat-image', '<img').replace('</ionic-chat-image>', '');
            comment.text = this.httpsPipe.transform(comment.text);
        }
    }

    getTransformCommentsAsync() {
        return (res: ResponseObject, search, filters, start, pageSize) => {
            if (res && res.data && res.data.length > 0) {
                let ids = res.data.map((comment: FeedComment) => comment._id);
                return this.dashboard.getFeedCommentStat(ids).pipe(map((stats) => {
                    res.data.forEach((comment: FeedComment) => {
                        comment.likesCount = 0;
                        comment.isLikedByMe = false;
                        this.fixCommentImage(comment);
                        if (comment.comments) {
                            comment.comments.forEach(c => {
                                this.fixCommentImage(c);
                            });
                        }
                        stats.forEach(stat => {
                            if (stat._id._id === comment._id) {
                                comment[stat._id.action + 'sCount'] = stat.count || 0;
                                if (stat._id.action === 'like' && stat.users.indexOf(this.session.userId) >= 0) {
                                    comment.isLikedByMe = true;
                                }
                            }
                        });
                    });
                    res.data = res.data.map((comment: FeedComment) => {
                        return [comment, ...(comment.comments || []).map((subComment: FeedComment) => {
                            subComment.isChild = true;
                            subComment.parentRef = comment._id;
                            return subComment;
                        })];
                    }).reduce((a, b) => a.concat(b), []);
                    return res;
                }));
            } else {
                return of({ data: [] });
            }
        };
    }

    getTransformAsync() {
        return (res: ResponseObject, search, filters, start, pageSize) => {
            if (res && res.data && res.data.length > 0) {
                let ids = res.data.map((feed: Feed) => feed._id);
                return this.dashboard.getFeedStat(ids).pipe(map((stats) => {
                    res.data.forEach((feed: Feed) => {
                        feed.viewsCount = 0;
                        feed.likesCount = 0;
                        feed.isLikedByMe = false;
                        feed.isViewedByMe = false;
                        stats.forEach(stat => {
                            if (stat._id._id === feed._id) {
                                feed[stat._id.action + 'sCount'] = stat.count || 0;
                                if (stat._id.action === 'like' && stat.users.indexOf(this.session.userId) >= 0) {
                                    feed.isLikedByMe = true;
                                }
                                if (stat._id.action === 'view' && stat.users.indexOf(this.session.userId) >= 0) {
                                    feed.isViewedByMe = true;
                                }
                            }
                        });
                    });
                    return res;
                }));
            } else {
                return of({ data: [] });
            }
        };
    }

    getByDate(startDate, endDate) {
        let filters = [
            [
                { field: 'startDate', operator: { _id: 'lte' }, value: endDate },
                { field: 'endDate', operator: { _id: 'gte' }, value: startDate },
                { field: 'language', operator: { _id: 'inq' }, value: ['all', this.translate.getCurrentLanguage()] },
                { field: 'showCalendar', operator: { _id: 'eq' }, value: true }
            ]
        ];
        return this.broker.getAll('feeds', null, null, null, filters, null, 0, -1).pipe(map(retVal => retVal.data));
    }

    notify(feed: Feed) {
        let notification: Notification = {
            title: this.translate.get('FEED'),
            body: feed.title,
            mode: 'notification',
            data: {
                entityId: feed._id,
                entityType: 'Feed'
            },
            pendingBadgePath: 'pendingBadges.feeds'
        };
        this.push.notifyGroups(feed.group, notification).subscribe(() => { });
    }

    getFormDefinitionWithPhoto(): IFormField[] {
        let formDefinition = Models.getModel('Feed').formFields;
        let imageField = formDefinition.find(f => f.name === 'image');
        imageField.name = 'image._downloadURL';
        imageField.type = FormFieldType.photo;
        imageField.allowLibrary = true;
        delete imageField.values;
        return formDefinition;
    }

}
