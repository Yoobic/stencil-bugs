import { Injectable, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { BasePageBaseComponent } from '../base-page/base-page.component';
import { Feeds, Feed, FeedComment, Activity } from '@operations/data';
import { IEntityAction } from '@shared/interfaces';
import { AppGridComponent } from '@app/common-base';
import { UtilsService } from '../../services/utils/utils.service';

@Injectable()
export class FeedCommentsPageBaseComponent extends BasePageBaseComponent implements OnInit {
    @ViewChild('grid') grid: AppGridComponent;
    @ViewChild('inputBar') inputBar: ElementRef;

    @Input() feed: Feed;
    public icons: Array<IEntityAction>;
    public bottomActions: Array<IEntityAction>;
    public secondaryActions: Array<IEntityAction>;
    public replyToUser: any;

    protected feeds: Feeds;
    protected activity: Activity;

    protected replyToComment: FeedComment;

    initExtraProviders() {
        super.initExtraProviders();
        this.feeds = this.injector.get<Feeds>(Feeds);
        this.activity = this.injector.get<Activity>(Activity);
    }

    ngOnInit() {
        this.mapTransform = this.feeds.getTransformCommentsAsync();
        this.filters = [
            [{ field: 'feedRef', operator: { _id: 'inq' }, value: [{ _id: this.feed._id }] }]
        ];
        this.sorts = [{ colId: 'likesCount', sort: 'desc' }, { colId: 'date', sort: 'asc' }];

        this.icons = [{
            icon: (comment: FeedComment) => comment.isLikedByMe ? 'yo-heart-solid danger' : 'yo-heart',
            isVisible: (comment: FeedComment) => true,
            handler: (comment: FeedComment) => {
                let action;
                if (comment.isLikedByMe) {
                    action = this.activity.unlikeFeedComment(comment);
                } else {
                    action = this.activity.likeFeedComment(comment, this.feed);
                }
                action.subscribe((count) => {
                    comment.likesCount = count;
                    comment.isLikedByMe = comment.isLikedByMe === true ? false : true;
                    this.grid.insert(comment, false);
                });
            }
        }];
        this.bottomActions = [{
            text: (comment: FeedComment) => comment.likesCount + ' ' + this.translate.get('LIKES'),
            isVisible: (comment: FeedComment) => comment.likesCount ? true : false,
            handler: (comment: FeedComment) => (this.utils as UtilsService).showEntityActionPage(comment, 'like', this.translate.get('LIKES'))
        },
        {
            text: (comment: FeedComment) => this.translate.get('REPLY'),
            isVisible: (comment: FeedComment) => comment.isChild ? false : true,
            handler: (comment: FeedComment) => {
                this.replyToComment = comment;
                this.replyToUser = comment.user;
                this.cd.markForCheck();
                let yooInput = this.inputBar.nativeElement;
                yooInput.focusInputField();
            }
        }];
        this.secondaryActions = [{
            text: (comment: FeedComment) => null,
            icon: (comment: FeedComment) => 'yo-delete-solid',
            cssClass: (comment: FeedComment) => 'danger',
            isVisible: (comment: FeedComment) => {
                return comment.user ? this.session.userId === comment.user._id : false;
            },
            handler: (comment: FeedComment) => {
                let removeChildren = true;
                this.feed.comments = [...this.feed.comments.filter(c => c._id !== comment._id)];
                this.grid.remove(comment, removeChildren);
                this.grid.closeItemsSliding();
                this.feeds.deleteComment(comment).subscribe(() => { });
                this.replyToComment = null;
                this.replyToUser = null;
                this.cd.markForCheck();
            }
        }];
    }

    onSendText(ev) {
        if (ev.detail) {
            this.feeds.sendComment(this.feed, ev.detail, this.replyToComment).subscribe((feedComment) => {
                this.grid.insert(feedComment, false);
                let previousComment = feedComment;
                (feedComment.comments || []).forEach((subCom, index) => {
                    subCom.isChild = true;
                    subCom.parentRef = feedComment._id;
                    if (index + 1 === feedComment.comments.length) {
                        this.grid.insertAfter(subCom, previousComment);
                    } else {
                        this.grid.insert(subCom);
                        previousComment = subCom;
                    }
                });
            });
        }
    }

}
