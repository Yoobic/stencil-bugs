import { Injectable, OnInit, OnDestroy, ChangeDetectorRef, Injector, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreConfig } from '../../services/core-config/core-config.service';

import { DialogService } from '../../services/dialog/dialog.service';
import { UtilsService } from '../../services/utils/utils.service';

import { NavParams, Refresher, Content } from '@ionic/angular';

import { takeWhile } from 'rxjs/operators';

@Injectable()
export class BasePageBaseComponent implements OnInit, OnDestroy {
    @ViewChild('content') contentEl: ElementRef<Content>;
    public isCordova: boolean = false;
    public isModal: boolean;
    public isLoading: boolean;
    public isAlive: boolean = true;
    public closeIcon: string;

    public sorts: Array<any>;
    public filters: any;
    public hiddenFields: Array<string>;
    public aggregateOptions: (skip, limit) => Array<any>;
    public mapTransform: any;
    protected navParams: NavParams;

    constructor(
        protected route: ActivatedRoute, protected cd: ChangeDetectorRef, protected coreConfig: CoreConfig,
        protected dialog: DialogService, protected utils: UtilsService, protected injector: Injector) {
        this.isCordova = this.coreConfig.isCordova();
        try {
            //in case we are in a modal mode, this is how we retrieve the params passed by the modal caller.
            this.navParams = this.injector.get<NavParams>(NavParams);
            if (this.navParams && this.navParams.data) {
                Object.assign(this, this.navParams.data);
            }
        } catch (err) { }
        this.utils.scrollToTop$.pipe(takeWhile(() => this.isAlive)).subscribe(() => this.onScrollToTop());
        this.initExtraProviders();
    }

    initExtraProviders() { }

    ngOnInit() { }

    ngOnDestroy() {
        this.isAlive = false;
    }

    closeModal(data?: any, role?: string, id?: number) {
        if (this.isModal) {
            this.dialog.modalDismiss(data, role, id);
        }
    }

    onScrollToTop() {
        if (this.contentEl) {
            this.contentEl.nativeElement.scrollToTop();
        }
    }

    onPullToRefresh(grid, refresher: Refresher) {
        grid.onPullToRefresh(refresher);
    }

}