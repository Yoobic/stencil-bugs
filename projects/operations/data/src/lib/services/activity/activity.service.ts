import { Injectable } from '@angular/core';

import { Activity as ActivityCore, Broker, File, Requestor, Push, Session, User } from '@shared/data-core';
import { Translate } from '@shared/translate';

import { Feed, FeedComment } from '../../interfaces/feed/feed.interface';

import { Observable } from 'rxjs';

@Injectable()
export class Activity extends ActivityCore {
    constructor(protected broker: Broker, protected rq: Requestor, protected push: Push, protected translate: Translate, protected session: Session) {
        super(broker, rq);
    }

    likeFeed(feed: Feed): Observable<any> {
        if (feed && feed.userRef) {
            this.push.notifyUsersById([feed.userRef], {
                title: this.translate.get('FEED'),
                body: User.getDisplayName(this.session.user) + this.translate.get('LIKEDYOURFEED') + feed.title,
                mode: 'notification',
                data: {
                    entityId: feed._id,
                    entityType: 'Feed'
                },
                pendingBadgePath: 'pendingBadges.feeds'
            });
        }
        return this._viewOrLike(feed, 'feeds', 'like');
    }

    unlikeFeed(feed: Feed): Observable<any> {
        return this._viewOrLike(feed, 'feeds', 'unlike');
    }

    viewFeed(feed: Feed): Observable<any> {
        return this._viewOrLike(feed, 'feeds', 'view');
    }

    likeFeedComment(comment: FeedComment, feed: Feed): Observable<any> {
        if (feed && feed.userRef && this.session.user) {
            this.push.notifyUsersById([feed.userRef], {
                title: this.translate.get('FEED'),
                body: User.getDisplayName(this.session.user) + this.translate.get('LIKEDYOURFEEDCOMMENT') + comment.text,
                mode: 'notification',
                data: {
                    entityId: feed._id,
                    entityType: 'Feed'
                },
                pendingBadgePath: 'pendingBadges.feeds'
            });
        }
        return this._viewOrLike(comment, 'feedsComments', 'like');
    }

    unlikeFeedComment(comment: FeedComment): Observable<any> {
        return this._viewOrLike(comment, 'feedsComments', 'unlike');
    }

    likeFile(file: File): Observable<any> {
        return this._viewOrLike(file, 'files', 'like');
    }

    unlikeFile(file: File): Observable<any> {
        return this._viewOrLike(file, 'files', 'unlike');
    }

    viewFile(file: File): Observable<any> {
        return this._viewOrLike(file, 'files', 'view');
    }
}
