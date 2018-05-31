import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreConfig, Network, Persistent, Utils as CommonUtils } from '@shared/common';
import { Authentication, Version } from '@shared/data-core';
import { Translate } from '@shared/translate';
import { ILanguage, FormFieldType } from '@shared/interfaces';

import { DialogService } from '../../services/dialog/dialog.service';
import { UtilsService } from '../../services/utils/utils.service';

import { isArray } from 'lodash-es';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLoginComponent implements OnInit {
  @Persistent('login.hideWalkthrough') public hideWalkthrough: boolean;

  @Input() public cssClass: string;
  @Input() public backgroundColor: string;
  @Input() public buttonClass: string;
  @Input() public borderClass: string;
  @Input() public leftPanelMobileHeaderIcon: string;
  @Input() public leftPanelWebHeaderIcon: string;
  @Input() public roles: Array<string>;
  @Input() public backgroundSrc: string;
  @Input() public menuPath: string = 'menu';
  @Input() public resetPasswordModal: any;
  @Input() public webTitleText: string;
  @Input() public webLoginFormTitle: string;

  @Output() onResetPassword = new EventEmitter<boolean>();

  public rightPanelFooterText: string = 'POWEREDBY';
  public rememberMeText: string = 'REMEMBERME';
  public forgotPasswordText: string = 'FORGOTPASSWORD';
  public resetPasswordButtonText: string = 'RESETPASSWORD';
  public magicLinkButtonText: string = 'MAGICLINK';
  public loginButtonText: string = 'LOGIN';
  public loginFormSubtitle: string = 'LOGINSUBTITLE';
  public webSubtitleText: string[] = ['LOGINBASELINE1', 'LOGINBASELINE2'];

  public version: string;
  public loading: boolean;
  public loginError: string;
  public languages: Array<ILanguage>;
  public language: ILanguage;
  public isFreshdeskSSO: boolean = false;
  public hostUrl: string;

  constructor(protected versionService: Version, protected authentication: Authentication, protected network: Network, protected coreConfig: CoreConfig, protected translate: Translate, protected router: Router, protected route: ActivatedRoute, protected cd: ChangeDetectorRef, protected dialog: DialogService, protected utils: UtilsService, protected commonUtils: CommonUtils, protected ngZone: NgZone) {
    this.version = versionService.get();
    this.language = this.translate.getCurrentLanguage().toUpperCase();
    this.languages = Translate.availablesLanguage.map(l => ({
      icon: this.translate.getIcon(l),
      value: l,
      title: this.translate.get(l.toUpperCase()).toUpperCase().substring(0, 3)
    }));
    if (location && location.href && location.href.indexOf('freshdesksso') >= 0) {
      this.isFreshdeskSSO = true;
      this.hostUrl = this.commonUtils.getUrlParameterByName('host_url');
    }

    (window as any).handleOpenURL = (url: string) => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.handleOpenURL(url);
        });
      }, 0);
    };

    // check if app was opened by custom url scheme
    const lastUrl: string = (window as any).handleOpenURL_LastURL || '';
    if (lastUrl && lastUrl !== '') {
      delete (window as any).handleOpenURL_LastURL;
      this.handleOpenURL(lastUrl);
    }
  }

  ngOnInit() {
    if (this.authentication.isLoggedIn()) {
      this.onLoginSuccessfull();
    } else if (location && location.href && location.href.indexOf('accessToken') >= 0) {
      let token = this.commonUtils.getUrlParameterByName('accessToken');
      this.onLoginAdvancedSuccessful(token);
    } else if (this.route && this.route.params && this.route.params['accessToken']) {
      let token = this.route.params['accessToken'];
      this.onLoginAdvancedSuccessful(token);
    }
  }

  onLogin(ev: { detail: { username: string; password: string } }) {
    let username = ev.detail.username;
    let password = ev.detail.password;

    this.loading = true;

    this.authentication.login(username, password, this.roles).subscribe(
      res => {
        this.loading = false;
        this.loginError = '';
        this.cd.markForCheck();
        this.onLoginSuccessfull();
      },
      err => {
        this.loading = false;
        this.loginError = (err || { message: 'REQUESTERROR' }).message;
        this.cd.markForCheck();
      }
    );

  }

  onAdvancedLoginRequested() {
    this.utils.showFormDynamic<{ tenant: string }>({}, { formDefinition: [{ type: FormFieldType.text, name: 'tenant', required: true }] }).then(retVal => {
      if (retVal && retVal.data && retVal.data.tenant) {
        let tenant = retVal.data.tenant.trim().toLowerCase();
        this.authentication.getTenantAdvancedLoginMethods(retVal.data.tenant.trim().toLowerCase()).subscribe((methods: any) => {
          if (isArray(methods) && methods.length === 1) {
            this.onAfterAdvancedLogin(tenant, methods[0]);
          } else if (isArray(methods) && methods.length > 1) {
            this.utils.showFormDynamic<{ method: string }>({}, {
              formDefinition: [{ type: FormFieldType.select, name: 'method', values: methods, translate: true, required: true }]
            }).then(retVal2 => {
              if (retVal2 && retVal2.data && retVal2.data.method) {
                this.onAfterAdvancedLogin(tenant, retVal2.data.method);
              }
            });
          }
        });
      }
    });
  }

  onAfterAdvancedLogin(tenant: string, method: string) {
    let host = location.host;
    if (this.coreConfig.isCordova()) {
      host = 'dashboard-debug.yoobic.com/sso.html';
    }
    let loginUrl = this.authentication.getLoginAdvancedUrl(tenant, method, host);
    if (this.coreConfig.isCordova()) {
      window.open(loginUrl, '_system');
    } else {
      window.location.replace(loginUrl);
    }
  }

  onLoginAdvancedSuccessful(token) {
    this.loading = true;
    this.cd.markForCheck();
    let decodedToken = this.authentication.getTenantFromToken(token);
    this.authentication.setToken(token, decodedToken.sub).subscribe(() => {
      this.onLoginSuccessfull();
    });
  }
  handleOpenURL(url) {
    if (url.startsWith('yoobic://token')) {
      let token = this.commonUtils.getUrlParameterByName('access_token', url);
      this.onLoginAdvancedSuccessful(token);
    }
  }

  onShowWalkthrough() {
    if (!this.hideWalkthrough) {
      this.hideWalkthrough = true;
      return this.utils.showWalkthrough();
    } else {
      return Promise.resolve(null);
    }
  }

  onLoginSuccessfull() {
    this.onShowWalkthrough().then(() => {
      this.router.navigate(['/' + this.menuPath + '/']);
    });
  }

  onLanguageSelectedParent(ev: { detail: string }) {
    this.translate.setLanguage(ev.detail);
    this.language = this.translate.getCurrentLanguage().toUpperCase();
  }

  onPasswordResetModal() {
    this.dialog.modal(this.resetPasswordModal, { buttonClass: this.buttonClass, borderClass: this.borderClass, subheading: 'EMAILPLACEHOLDER' });
  }

  onMagicLinkModal() {
    this.dialog.modal(this.resetPasswordModal, { buttonClass: this.buttonClass, borderClass: this.borderClass, subheading: 'MAGICLINK' });
  }

}
