import { Injectable, OnInit, Input } from '@angular/core';

import { BasePageBaseComponent } from '../base-page/base-page.component';
import { Feed, Activity } from '@operations/data';
import { UtilsService } from '../../services/utils/utils.service';

@Injectable()
export class FeedDetailPageBaseComponent extends BasePageBaseComponent implements OnInit {
    @Input() public feed: Feed;

    public activity: Activity;
    public imageOnly: boolean;
    public imageSrc: string;

    initExtraProviders() {
        super.initExtraProviders();
        this.activity = this.injector.get<Activity>(Activity);
    }

    ngOnInit() {
        this.imageOnly = false;
        this.imageSrc = this.feed.image._downloadURL;
        this.cd.markForCheck();
    }

    onCommentClicked() {
      (this.utils as UtilsService).showFeedComments(this.feed);
    }

    onLikeClicked() {
      let action;
      if (this.feed.isLikedByMe) {
          action = this.activity.unlikeFeed(this.feed);
      } else {
          action = this.activity.likeFeed(this.feed);
      }
      action.subscribe((count) => {
          this.feed.likesCount = count;
          this.feed.isLikedByMe = this.feed.isLikedByMe === true ? false : true;
          this.feed = {...this.feed};
          this.cd.markForCheck();
      });
    }

    onCommentCountClicked() {
        (this.utils as UtilsService).showFeedComments(this.feed).then(rep => {
            if (rep && rep.data && rep.data.feed) {
                this.feed = {...rep.data.feed};
                this.feed.comments = [...this.feed.comments];
                this.cd.markForCheck();
            }
        });
    }

    onImageClicked() {
        this.imageOnly = !this.imageOnly;
        this.cd.markForCheck();
    }

    onLikeCountClicked() {
        (this.utils as UtilsService).showEntityActionPage(this.feed, 'like', this.translate.get('LIKES'));
    }

}
