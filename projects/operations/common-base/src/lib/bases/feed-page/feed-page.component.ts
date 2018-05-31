import { Injectable, OnInit, ViewChild } from '@angular/core';
import { Refresher } from '@ionic/angular';
import { Feed, Feeds, Activity } from '@operations/data';
import { BasePageBaseComponent } from '../base-page/base-page.component';
import { UtilsService } from '../../services/utils/utils.service';
import { AppGridComponent } from '@app/common-base';
import { IEntityAction, Filters } from '@shared/interfaces';

@Injectable()
export class FeedPageBaseComponent extends BasePageBaseComponent implements OnInit {
    @ViewChild('gridSticky') gridSticky: AppGridComponent;
    @ViewChild('grid') grid: AppGridComponent;

    public stickyFilters: Filters;
    public mapTransform;
    public icons: Array<IEntityAction>;
    public topActions: Array<IEntityAction>;
    public bottomActions: Array<IEntityAction>;
    public secondaryActions: Array<IEntityAction>;

    protected feeds: Feeds;
    protected activity: Activity;

    initExtraProviders() {
        super.initExtraProviders();
        this.feeds = this.injector.get<Feeds>(Feeds);
        this.activity = this.injector.get<Activity>(Activity);
    }

    ngOnInit() {
        super.ngOnInit();
        this.mapTransform = this.feeds.getTransformAsync();
        this.hiddenFields = ['language'];
        this.sorts = [{ colId: 'date', sort: 'desc' }];
        this.stickyFilters = [[
            { field: 'sticky', operator: { _id: 'eq' }, value: true }
        ]];
        if (!this.coreConfig.isWeb()) {
            this.filters = [[
                { field: 'language', operator: { _id: 'inq' }, value: ['all', this.translate.getCurrentLanguage()] },
                { field: 'sticky', operator: { _id: 'neq' }, value: true }
            ]];
        }

        this.icons = [{
            icon: (item: Feed) => item.isLikedByMe ? 'yo-heart-solid danger' : 'yo-heart',
            isVisible: (item: Feed) => item.disableLikes ? false : true,
            handler: (feed: Feed) => {
                let action;
                if (feed.isLikedByMe) {
                    action = this.activity.unlikeFeed(feed);
                } else {
                    action = this.activity.likeFeed(feed);
                }
                action.subscribe((count) => {
                    feed.likesCount = count;
                    feed.isLikedByMe = feed.isLikedByMe === true ? false : true;
                    this.grid.insert(feed, false);
                });
            }
        }, {
            icon: (item: Feed) => 'yo-comment',
            isVisible: (item: Feed) => item.disableComments ? false : true,
            handler: (item: Feed) => this.showFeedComments(item)
        }];
        this.topActions = [{
            text: (item: Feed) => item.likesCount + ' ' + this.translate.get('LIKES'),
            isVisible: (item: Feed) => item.likesCount ? true : false,
            handler: (item: Feed) => (this.utils as UtilsService).showEntityActionPage(item, 'like', this.translate.get('LIKES'))
        }, {
            text: (item: Feed) => item.viewsCount + ' ' + this.translate.get('VIEWS'),
            isVisible: (item: Feed) => item.user ? this.session.userId === item.user._id : false,
            handler: (item: Feed) => (this.utils as UtilsService).showEntityActionPage(item, 'view', this.translate.get('VIEWS'))
        }];
        this.bottomActions = [{
            text: (item: Feed) => item.comments && item.comments.length ? this.translate.get('VIEWALLCOMMENTS', { count: item.comments.length }) : this.translate.get('FIRSTCOMMENT'),
            isVisible: (item: Feed) => true,
            handler: (item: Feed) => this.showFeedComments(item)
        }];

    }

    onPullToRefresh(grid, refresher: Refresher) {
        super.onPullToRefresh(grid, refresher);
        if (this.gridSticky) {
            this.gridSticky.onPullToRefresh(null);
        }
    }

    onFeedSelect(feed: Feed) {
        if (feed) {
            (this.utils as UtilsService).showFeedDetail(feed).then(rep => {
                // get back new feed on modal close
                if (rep && rep.data && rep.data.feed) {
                    if (this.grid.data.find(item => item._id === rep.data.feed._id)) {
                        this.grid.insert(rep.data.feed);
                    } else if (this.gridSticky.data.find(item => item._id === rep.data.feed._id)) {
                        this.gridSticky.insert(rep.data.feed);
                    }
                }
            });
        }
    }

    showFeedComments(item: Feed) {
        (this.utils as UtilsService).showFeedComments(item).then(rep => {
            // get back new feed on modal close
            if (rep && rep.data && rep.data.feed) {
                if (this.grid.data.find(a => a._id === rep.data.feed._id)) {
                    this.grid.insert(rep.data.feed);
                } else if (this.gridSticky.data.find(a => a._id === rep.data.feed._id)) {
                    this.gridSticky.insert(rep.data.feed);
                }
            }
        });
    }

}
