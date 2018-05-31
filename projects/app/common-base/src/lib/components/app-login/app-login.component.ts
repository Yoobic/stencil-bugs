import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreConfig, Network, Utils as CommonUtils } from '@shared/common';
import { Authentication, Version } from '@shared/data-core';
import { Translate } from '@shared/translate';

import { DialogService } from '../../services/dialog/dialog.service';
import { UtilsService } from '../../services/utils/utils.service';


@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLoginComponent implements OnInit {

  @Input() public menuPath: string;

  constructor(protected versionService: Version, protected authentication: Authentication, protected network: Network, protected coreConfig: CoreConfig, protected translate: Translate, protected router: Router, protected route: ActivatedRoute, protected cd: ChangeDetectorRef, protected dialog: DialogService, protected utils: UtilsService, protected commonUtils: CommonUtils, protected ngZone: NgZone) {

  }

  ngOnInit() {
    console.log('AppLoginComponent --> ngOnInit');
    this.onLoginSuccessfull();
  }

  onLoginSuccessfull() {
    console.log('AppLoginComponent --> onLoginSuccessfull');
    this.router.navigate(['/' + this.menuPath + '/']);
  }
}
