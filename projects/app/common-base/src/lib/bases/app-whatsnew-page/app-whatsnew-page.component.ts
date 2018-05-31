import { Injectable, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BasePageBaseComponent } from '../base-page/base-page.component';
import { Blog } from '@shared/data-core';
import { YooModalComponent } from '@shared/design-system/types';

@Injectable()
export class AppWhatsNewBasePageComponent extends BasePageBaseComponent implements OnInit {
    @ViewChild('modal') modalEl: ElementRef<YooModalComponent>;

    public items: Array<any>;
    protected blog: Blog;

    initExtraProviders() {
        super.initExtraProviders();
        this.blog = this.injector.get<Blog>(Blog);
    }

    ngOnInit() {
        let url = this.blog.getUrl();
        this.blog.get(url, 20, 0).subscribe(items => {
            this.items = items;
            this.isLoading = false;
            this.cd.markForCheck();
            setTimeout(() => {
                if (this.modalEl && this.modalEl.nativeElement) {
                    this.modalEl.nativeElement.resize();
                }
            }, 300);
        });
    }

    onBlogSelect(blog) {
        this.dialog.frame(blog.link, blog.title);
    }

}
