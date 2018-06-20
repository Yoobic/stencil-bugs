import { Injectable, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DialogService } from '../../services/dialog/dialog.service';
import { UtilsService } from '../../services/utils/utils.service';

import { Device } from '@ionic-native/device/ngx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppMenuBasePageComponent implements OnInit {

    @Input() profilePage: any;
    public isCordova: boolean = false;

    constructor(
        protected dialog: DialogService, protected utils: UtilsService, protected router: Router, protected route: ActivatedRoute, protected device: Device
    ) {
        this.isCordova = false;
    }

    ngOnInit() {
    }

    ///router
    goTo(path: string, prefixByMenu: boolean = false) {
        if (this.router) {
            this.router.navigateByUrl('/menu/(' + path + ':' + path + ')');
        }
    }

    isActive(path: string) {
        return this.router.url === path;
    }

    getActivePath() {
        return this.router.url;
    }

    getParam(param: string) {
        if (this.route && this.route.snapshot) {
            return this.route.snapshot.params[param] || this.route.snapshot.data[param];
        }
        return null;
    }

    getParamAsync(param: string): Observable<any> {
        return this.route.params.pipe(
            map(params => params[param])
        );
    }

    ///profile
    onShowProfile() {
        if (this.profilePage) {
            this.dialog.modal(this.profilePage, {}, 'modal-full-screen');
        }
    }

    onProfileClicked(ev) {
        this.onShowProfile();
    }

    onPageClicked(ev) {
        if (ev.detail && ev.detail.name) {
            this.goTo(ev.detail.name, true);
        }
    }

    onActionClicked(ev) {
        if (ev.detail && ev.detail.handler) {
            ev.detail.handler();
        }
    }

}
