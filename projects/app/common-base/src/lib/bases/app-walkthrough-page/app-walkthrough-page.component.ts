import { Injectable, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BasePageBaseComponent } from '../base-page/base-page.component';
import { IWalkthroughEntry, IWalkthroughSlideEvent } from '@shared/interfaces';

import { YooWalkthroughComponent } from '@shared/design-system/types';

@Injectable()
export class AppWalkthroughBasePageComponent extends BasePageBaseComponent implements AfterViewInit {
    @Input() config: Array<IWalkthroughEntry>;
    @ViewChild('walkthrough') walkthroughEl: ElementRef<YooWalkthroughComponent>;

    ngAfterViewInit() {
        if (this.walkthroughEl) {
            this.walkthroughEl.nativeElement.update();
        }
    }

    onSlideChanged(ev: { detail: IWalkthroughSlideEvent }) {
        let type: string = ev.detail.slide.type;
        let promise = Promise.resolve(null);
        if (type) {
            this.walkthroughEl.nativeElement.lockSwipes(true);
        } else {
            this.walkthroughEl.nativeElement.lockSwipes(false);
        }
        if (type === 'geoloc') {
            promise = this.geoloc.getLocation(true);
        } else if (type === 'notifications' && this.session.user) {
            promise = this.push.registerOneSignal(this.session.user);
        }

        this.isLoading = true;
        this.cd.markForCheck();
        return promise.then(() => { }, () => { }).then(() => {
            this.isLoading = false;
            this.cd.markForCheck();
            if (this.walkthroughEl.nativeElement.isEnd()) {
                setTimeout(() => {
                    this.closeModal();
                }, 3000);
            } else {
                this.walkthroughEl.nativeElement.lockSwipes(false);
                //this.walkthroughEl.nativeElement.slideNext();
            }
        });
    }
}
