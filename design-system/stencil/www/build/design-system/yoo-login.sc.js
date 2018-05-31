/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { d as getElementDimensions } from './chunk-75914b41.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';

const MODAL_ANIMATION_TIME = 220;
const MIN_LEFT_PANEL_SCREEN_SIZE = 900;
class YooLoginComponent {
    constructor() {
        // Testing the Stencil queue
        // @Prop({context: 'queue'}) queue: QueueController;
        this.leftPanelMobileHeaderIcon = './assets/logo/operations_simple.svg';
        this.leftPanelWebHeaderIcon = './assets/logo/operations_landscape_light.svg';
        this.backgroundColor = 'dark';
        this.leftPanelFooterText = 'Powered by';
        this.webTitleText = 'Operations';
        this.webSubtitleText = ['Manage your stores easily', 'your workflow - all in one place'];
        this.webLoginFormTitle = 'Log In to Operations.';
        this.webLoginFormSubtitle = 'Enter your details below';
        this.rememberMeText = 'Remember me';
        this.forgotPasswordText = 'Forgot Password?';
        this.emailLabel = 'Email Address';
        this.passwordLabel = 'Password';
        this.borderClass = 'success';
        this.magicLinkButtonText = 'Send me a magic link';
        this.resetPasswordButtonText = 'Reset password';
        this.loginButtonText = 'Log In';
        this.showRememberMe = false;
        this.showLeftPanel = true;
        this.language = 'EN';
        this.passwordInputChanged = false;
        this.hideMobileLoginTitleAndFooter = false;
        this.coreConfig = window.coreConfigService;
        // private deviceHeight: number;
        this.rememberMe = false;
    }
    //private eventSelector: string;
    onLanguageSelected(event) {
        this.language = event.detail;
        this.languageSelectedParent.emit(event.detail);
    }
    onActionSelected(ev) {
        setTimeout(() => {
            if (ev.detail === 'Reset password') {
                this.passwordResetModalRequested.emit(true);
            }
            else {
                this.magicLinkModalRequested.emit(true);
            }
        }, MODAL_ANIMATION_TIME);
    }
    componentWillLoad() {
        this.coreConfig ? this.isMobile = this.coreConfig.isIonic() : this.isMobile = false;
    }
    onAlertClosed() {
        this.error = '';
    }
    onAlertActionSelected() {
        this.error = '';
        window.location.href = 'mailto:support@yoobic.com';
    }
    onRadioClicked(event) {
        event.detail === 'checked' ? this.rememberMe = true : this.rememberMe = false;
    }
    onInputChanged(ev, type) {
        this.validateLoginInputs();
        if (type === 'email') {
            this.userEmail = ev.detail;
        }
        if (type === 'password') {
            this.userPassword = ev.detail;
        }
    }
    onAdvancedLogin() {
        this.advancedLoginRequested.emit(true);
    }
    validateLoginInputs() {
        let emailInput = this.host.querySelector('#email-input');
        let passwordInput = this.host.querySelector('#password-input');
        let loginBtn = this.host.querySelector('#login-btn');
        let isValidEmail = emailInput.isValid();
        let isValidPassword = passwordInput.isValid();
        isValidEmail && isValidPassword ? loginBtn.disabled = false : loginBtn.disabled = true;
    }
    onInputFocused(type) {
        let errorAlert = this.host.querySelector('#error-alert');
        if (errorAlert) {
            errorAlert.setAttribute('style', 'display: none;');
        }
        if (this.isMobile) {
            this.hideMobileLoginTitleAndFooter = true;
        }
    }
    onInputBlurred() {
        this.validateLoginInputs();
        if (this.isMobile) {
            this.hideMobileLoginTitleAndFooter = false;
        }
    }
    onPasswordClear(ev) {
        if (ev.detail === 'clear') {
            this.validateLoginInputs();
        }
    }
    componentDidLoad() {
        this.resizePage();
        window.addEventListener('resize', () => this.resizePage());
        // this.deviceHeight = window.innerHeight;
        this.resizeLanguageSelectorWidth();
    }
    componentDidUpdate() {
        this.resizeLanguageSelectorWidth();
    }
    resizeLanguageSelectorWidth() {
        let languageSelector = this.host.querySelector('.language-container.mobile');
        if (languageSelector) {
            this.host.querySelector('.space-fill').setAttribute('style', `width: ${languageSelector.clientWidth}px`);
        }
        this.language = this.currentLanguage;
    }
    resizePage() {
        const windowWidth = getElementDimensions(this.host.querySelector('.outer-container')).width;
        this.showLeftPanel = !(windowWidth < MIN_LEFT_PANEL_SCREEN_SIZE);
    }
    onLogin() {
        if (this.userEmail && this.userPassword) {
            let loginDetails = { username: this.userEmail, password: this.userPassword };
            this.doLogin.emit(loginDetails);
            this.rememberMeSelected.emit(this.rememberMe);
            let errorAlert = this.host.querySelector('#error-alert');
            if (errorAlert) {
                errorAlert.setAttribute('style', 'display: block;');
            }
        }
    }
    onForgotPassword() {
        this.isMobile ? (this.presentActionSheet()) :
            this.passwordResetModalRequested.emit(true);
    }
    presentActionSheet() {
        let modalCtrl = document.querySelector('yoo-modal-controller');
        modalCtrl.greyContent = true;
        modalCtrl.generateActionSheet({
            heading: this.forgotPasswordText,
            buttons: [
                { text: this.resetPasswordButtonText },
                { text: this.magicLinkButtonText }
            ],
            cssClass: this.borderClass
        });
        modalCtrl.showActionSheet();
    }
    generateLanguageModal() {
        let modalCtrl = this.host.querySelector('yoo-modal-controller');
        modalCtrl.greyContent = false;
        modalCtrl.generateLanguageSelector({
            currentLanguage: this.currentLanguage,
            languages: this.languages
        });
        modalCtrl.show();
        let modal = this.host.querySelector('yoo-language-selector');
        modal.setAttribute('style', `position: absolute; top: ${this.isMobile ? '4.5625rem' : '4.6875rem'}; right: ${this.isMobile ? '1rem' : '1.875rem'};`);
    }
    renderLoginForm() {
        return [
            this.hideMobileLoginTitleAndFooter ? null :
                h("div", { class: 'login-title' + (this.isMobile ? ' mobile' : ''), "attr-layout": "row" },
                    h("div", { class: "inner-title" }, this.webLoginFormTitle)),
            h("div", { class: this.isMobile ? 'login-container-mobile' : 'login-container', "attr-layout": "column" },
                this.isMobile ? null :
                    h("div", { class: "login-subtitle" }, this.webLoginFormSubtitle),
                h("yoo-form-input-container", { label: this.emailLabel },
                    h("yoo-form-input", { id: "email-input", validators: [{ name: 'email' }, { name: 'required' }], type: "email", class: "simple", "border-color": this.borderClass, onInputChanged: (event) => this.onInputChanged(event, 'email'), onInputFocused: () => this.onInputFocused('email'), onInputBlurred: () => this.onInputBlurred() })),
                h("div", { class: "password-container" },
                    h("yoo-form-input-container", { label: this.passwordLabel },
                        h("yoo-form-input", { id: "password-input", validators: [{ name: 'required' }], class: "simple", type: "password", "show-password-toggle": "true", "show-input-clear": "true", "border-color": this.borderClass, onInputChanged: (event) => this.onInputChanged(event, 'password'), onInputFocused: () => this.onInputFocused('password'), onInputBlurred: () => this.onInputBlurred(), onIconClicked: (ev) => this.onPasswordClear(ev) }))),
                h("div", { class: 'inner-container' + (this.isMobile ? ' mobile' : ''), "attr-layout": "row" },
                    h("div", { class: "radio" }, this.showRememberMe ? h("yoo-form-radio", { text: this.rememberMeText, class: 'stable ' + this.borderClass, onRadioClicked: (event) => this.onRadioClicked(event) })
                        : null),
                    h("yoo-button", { text: this.forgotPasswordText, onClick: () => this.onForgotPassword(), class: 'link-transparent-' + (this.borderClass) })),
                h("div", { class: "login-button", "attr-layout": "row", "attr-layout-align": this.isMobile ? 'center' : 'flex-end' },
                    h("yoo-button", { id: "login-btn", text: this.loginButtonText, class: (this.isMobile ? 'large ' : '') + (this.buttonClass || ''), disabled: true, onButtonClicked: () => this.onLogin() })),
                this.isMobile ? this.renderPoweredBy() : null)
        ];
    }
    renderLanguageSelector() {
        return (h("yoo-button", { class: 'clear squared small', onClick: () => this.generateLanguageModal(), text: this.language, icon: "yo-down" }));
    }
    renderPoweredBy() {
        return (h("div", { class: "powered-by", "attr-layout": "row" },
            this.leftPanelFooterText,
            h("div", { class: "powered-img" },
                h("img", { src: this.isMobile || !this.showLeftPanel ? './assets/logo/yoobic_simple_grey.svg' : './assets/logo/yoobic_simple_white.svg', height: "12.8" })),
            h("div", { class: "yoobic-text" }, "YOOBIC")));
    }
    renderFooter() {
        return (this.isMobile ? h("yoo-button", { text: "Advanced Log In", onClick: () => this.onAdvancedLogin(), class: 'block stable' })
            : this.renderPoweredBy());
    }
    renderLeftPanel() {
        let backStyle = {
            backgroundImage: 'url(' + this.backgroundSrc + ')'
        };
        return (h("div", { class: 'left-panel' + (this.isMobile ? ' mobile' : ''), "attr-layout": "column" },
            [(this.backgroundSrc ?
                    h("div", { class: "background", style: backStyle }) : ''),
                h("div", { class: 'background-overlay ' + 'bg-' + (this.backgroundColor || 'dark') })],
            h("div", { class: "content-container", "attr-layout": "column" },
                h("div", { class: "header", "attr-layout": "row" },
                    this.isMobile ? h("div", { class: "space-fill" }) : null,
                    h("div", { class: "logo" },
                        h("img", { src: this.isMobile ? this.leftPanelMobileHeaderIcon : this.leftPanelWebHeaderIcon, height: this.isMobile ? '25' : '32', alt: "Yoobic Logo" })),
                    h("div", { class: 'language-container' + (this.isMobile ? ' mobile' : '') }, this.renderLanguageSelector())),
                h("div", { class: "left-body", "attr-layout": "column", "attr-layout-align": "center center" },
                    h("div", { class: "title-container", "attr-layout": "row" }, this.webTitleText),
                    this.webSubtitleText.map((text) => h("div", { class: "subtitle-container", "attr-layout": "row" }, text))),
                h("div", { class: "footer", "attr-layout": "row", "attr-layout-align": "center center" }, this.renderFooter()))));
    }
    renderRightPanel() {
        return (h("div", { class: 'right-panel' + (this.isMobile ? ' mobile' : ''), "attr-layout": "column", "justify-content": "flex-start" },
            this.error ?
                h("yoo-alert", { id: "error-alert", animationName: "sticky_up", class: "danger embedded centered", text: this.error, closeable: !this.isMobile, link: !this.isMobile ? `Problems? We're here to help` : '', onAlertActionSelected: () => this.onAlertActionSelected(), onAlertClosed: () => this.onAlertClosed() }) : '',
            h("div", { class: "right-panel-content", "attr-layout": "column", "justify-content": "space-between" },
                h("div", { class: 'header' + (this.isMobile || !this.showLeftPanel ? ' mobile' : ''), "attr-layout": "row" }, this.isMobile || !this.showLeftPanel ? [
                    h("div", { class: "space-fill" }),
                    h("div", { class: "logo" },
                        h("img", { src: this.leftPanelMobileHeaderIcon, height: '25', alt: "Yoobic Logo" })),
                    h("div", { class: 'language-container mobile' }, this.renderLanguageSelector())
                ] :
                    (this.renderLanguageSelector())),
                h("div", { class: 'content ' + (this.isMobile ? 'mobile' : ''), "attr-layout": "column", "justify-content": "center" }, this.renderLoginForm()),
                this.hideMobileLoginTitleAndFooter ? null :
                    h("div", { class: 'footer' + (this.isMobile ? '' : ' web'), "attr-layout": "row", "attr-layout-align": "center center" }, this.isMobile || !this.showLeftPanel ? this.renderFooter() : h("yoo-button", { text: "Advanced Log In", onClick: () => this.onAdvancedLogin(), class: 'small link-transparent-' + (this.borderClass) })))));
    }
    render() {
        return (h("div", { class: "outer-container", "attr-layout": "row" },
            this.loading ? h("yoo-loader", { class: "absolute large backdrop" }) : '',
            h("yoo-modal-controller", null),
            this.isMobile ? null : (this.showLeftPanel ? this.renderLeftPanel() : null),
            this.renderRightPanel()));
    }
    static get is() { return "yoo-login"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "backgroundColor": {
            "type": String,
            "attr": "background-color"
        },
        "backgroundSrc": {
            "type": String,
            "attr": "background-src"
        },
        "borderClass": {
            "type": String,
            "attr": "border-class"
        },
        "buttonClass": {
            "type": String,
            "attr": "button-class"
        },
        "currentLanguage": {
            "type": String,
            "attr": "current-language"
        },
        "emailLabel": {
            "type": String,
            "attr": "email-label"
        },
        "error": {
            "type": String,
            "attr": "error",
            "mutable": true
        },
        "forgotPasswordText": {
            "type": String,
            "attr": "forgot-password-text"
        },
        "hideMobileLoginTitleAndFooter": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "language": {
            "state": true
        },
        "languages": {
            "type": "Any",
            "attr": "languages"
        },
        "leftPanelFooterText": {
            "type": String,
            "attr": "left-panel-footer-text"
        },
        "leftPanelMobileHeaderIcon": {
            "type": String,
            "attr": "left-panel-mobile-header-icon"
        },
        "leftPanelWebHeaderIcon": {
            "type": String,
            "attr": "left-panel-web-header-icon"
        },
        "loading": {
            "type": Boolean,
            "attr": "loading"
        },
        "loginButtonText": {
            "type": String,
            "attr": "login-button-text"
        },
        "magicLinkButtonText": {
            "type": String,
            "attr": "magic-link-button-text"
        },
        "pageWidthSize": {
            "state": true
        },
        "passwordInputChanged": {
            "state": true
        },
        "passwordLabel": {
            "type": String,
            "attr": "password-label"
        },
        "rememberMeText": {
            "type": String,
            "attr": "remember-me-text"
        },
        "resetPasswordButtonText": {
            "type": String,
            "attr": "reset-password-button-text"
        },
        "showLeftPanel": {
            "state": true
        },
        "showRememberMe": {
            "type": Boolean,
            "attr": "show-remember-me"
        },
        "showSupport": {
            "state": true
        },
        "webLoginFormSubtitle": {
            "type": String,
            "attr": "web-login-form-subtitle"
        },
        "webLoginFormTitle": {
            "type": String,
            "attr": "web-login-form-title"
        },
        "webSubtitleText": {
            "type": "Any",
            "attr": "web-subtitle-text"
        },
        "webTitleText": {
            "type": String,
            "attr": "web-title-text"
        }
    }; }
    static get events() { return [{
            "name": "doLogin",
            "method": "doLogin",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "languageSelectedParent",
            "method": "languageSelectedParent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "rememberMeSelected",
            "method": "rememberMeSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "passwordResetModalRequested",
            "method": "passwordResetModalRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "magicLinkModalRequested",
            "method": "magicLinkModalRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "advancedLoginRequested",
            "method": "advancedLoginRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "languageSelected",
            "method": "onLanguageSelected"
        }, {
            "name": "actionSelected",
            "method": "onActionSelected"
        }]; }
    static get style() { return "[data-yoo-login-host]   .outer-container[data-yoo-login] {\n  position: absolute;\n  top: 0rem;\n  right: 0rem;\n  min-height: 25rem;\n  height: 100%;\n  width: 100%; }\n  [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login] {\n    position: relative;\n    min-width: 25rem;\n    background-color: var(--light, #FFFFFF);\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n    [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel.mobile[data-yoo-login] {\n      width: 100%;\n      min-width: 0 !important; }\n    [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .content-container[data-yoo-login] {\n      z-index: 2;\n      -webkit-box-pack: justify;\n      -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      height: 100%; }\n      [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .content-container[data-yoo-login]   .header[data-yoo-login] {\n        padding: 1.875rem;\n        -webkit-box-pack: justify;\n        -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n        justify-content: space-between;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .content-container[data-yoo-login]   .header[data-yoo-login]   .language-container[data-yoo-login] {\n          display: none;\n          padding-right: 2.5rem; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .content-container[data-yoo-login]   .header[data-yoo-login]   .language-container.mobile[data-yoo-login] {\n            display: -webkit-box !important;\n            display: -webkit-flex !important;\n            display: -ms-flexbox !important;\n            display: flex !important;\n            padding-right: 0rem !important; }\n      [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .content-container[data-yoo-login]   .left-body[data-yoo-login] {\n        color: var(--light, #FFFFFF);\n        font-variant-caps: all-petite-caps;\n        font-weight: 600; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .content-container[data-yoo-login]   .left-body[data-yoo-login]   .title-container[data-yoo-login] {\n          letter-spacing: 0.225rem;\n          padding-bottom: 1.25rem;\n          font-size: 0.75rem; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .content-container[data-yoo-login]   .left-body[data-yoo-login]   .subtitle-container[data-yoo-login] {\n          letter-spacing: 0.125rem;\n          text-align: center;\n          padding: 0 2rem; }\n      [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .content-container[data-yoo-login]   .footer[data-yoo-login]   .powered-by[data-yoo-login] {\n        font-size: 0.6875rem;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        color: var(--stable, #adadad);\n        padding-bottom: 1.375rem;\n        letter-spacing: 0.0625rem; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .content-container[data-yoo-login]   .footer[data-yoo-login]   .powered-by[data-yoo-login]   .powered-img[data-yoo-login] {\n          -webkit-box-align: center;\n          -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center;\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          padding-left: 0.3125rem;\n          padding-right: 0.25rem; }\n      [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .content-container[data-yoo-login]   .footer[data-yoo-login]   .powered-by[data-yoo-login] {\n        color: var(--light, #FFFFFF); }\n    [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .text-container[data-yoo-login] {\n      padding-top: 2rem;\n      font-weight: 600;\n      font-size: 1.25rem;\n      text-align: center; }\n    [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .background[data-yoo-login] {\n      background-repeat: no-repeat;\n      background-size: cover;\n      background-position-x: 50%;\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      z-index: 1; }\n    [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .background-overlay[data-yoo-login] {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      z-index: 2;\n      opacity: 0.7; }\n  [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login] {\n    color: var(--text-color, #807f83);\n    background-color: var(--light, #FFFFFF);\n    position: relative;\n    overflow: hidden;\n    width: 100%;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center; }\n    [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]     yoo-alert {\n      width: 100%;\n      margin-bottom: 5px; }\n      [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]     yoo-alert .container {\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center; }\n    [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel.mobile[data-yoo-login]     yoo-alert .container {\n      padding: 0; }\n      [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel.mobile[data-yoo-login]     yoo-alert .container .inner-container .text-container .value {\n        font-size: 0.625rem; }\n    [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login] {\n      -webkit-box-pack: justify;\n      -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n      -ms-flex-align: center;\n      align-items: center;\n      height: 100%;\n      width: 100%; }\n      [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .header[data-yoo-login] {\n        padding-top: 1.875rem;\n        padding-right: 1.875rem;\n        padding-left: 1.875rem;\n        z-index: 3;\n        width: 100%;\n        -webkit-box-pack: end;\n        -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n        justify-content: flex-end; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .header.reset[data-yoo-login] {\n          -webkit-box-pack: justify;\n          -webkit-justify-content: space-between;\n          -ms-flex-pack: justify;\n          justify-content: space-between; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .header.mobile[data-yoo-login] {\n          -webkit-box-pack: justify;\n          -webkit-justify-content: space-between;\n          -ms-flex-pack: justify;\n          justify-content: space-between;\n          padding-right: 1rem;\n          padding-left: 1rem;\n          padding-top: 2.1875rem; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .header[data-yoo-login]   .close[data-yoo-login] {\n          opacity: 0;\n          height: 1.875rem;\n          width: 1.875rem;\n          border-radius: 0.9375rem;\n          border: solid 0.0625rem var(--stable, #adadad); }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .header[data-yoo-login]   .close[data-yoo-login]:hover {\n            cursor: pointer; }\n      [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login] {\n        z-index: 3;\n        max-width: 460px;\n        width: 100%; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content.mobile[data-yoo-login] {\n          width: 100%;\n          height: 100%;\n          -webkit-box-pack: center;\n          -webkit-justify-content: center;\n          -ms-flex-pack: center;\n          justify-content: center; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-title[data-yoo-login] {\n          font-size: 1.5rem;\n          padding-bottom: 0.75rem; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-title.mobile[data-yoo-login] {\n            height: 25%;\n            -webkit-box-align: end;\n            -webkit-align-items: flex-end;\n            -ms-flex-align: end;\n            align-items: flex-end;\n            -webkit-box-pack: center;\n            -webkit-justify-content: center;\n            -ms-flex-pack: center;\n            justify-content: center; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container[data-yoo-login] {\n          padding-top: 2.8125rem; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container[data-yoo-login]   .password-container[data-yoo-login] {\n            padding: 1.25rem 0; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container[data-yoo-login]   .login-subtitle[data-yoo-login] {\n            padding-bottom: 2.8125rem; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container[data-yoo-login]   .inner-container[data-yoo-login] {\n            -webkit-box-pack: justify;\n            -webkit-justify-content: space-between;\n            -ms-flex-pack: justify;\n            justify-content: space-between; }\n            [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container[data-yoo-login]   .inner-container[data-yoo-login]   .radio[data-yoo-login] {\n              display: -webkit-box;\n              display: -webkit-flex;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-pack: center;\n              -webkit-justify-content: center;\n              -ms-flex-pack: center;\n              justify-content: center;\n              -webkit-box-align: center;\n              -webkit-align-items: center;\n              -ms-flex-align: center;\n              align-items: center; }\n            [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container[data-yoo-login]   .inner-container[data-yoo-login]     yoo-button .container .value {\n              display: -webkit-box;\n              display: -webkit-flex;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-pack: end;\n              -webkit-justify-content: flex-end;\n              -ms-flex-pack: end;\n              justify-content: flex-end; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container[data-yoo-login]   .login-button[data-yoo-login] {\n            -webkit-box-pack: center;\n            -webkit-justify-content: center;\n            -ms-flex-pack: center;\n            justify-content: center;\n            padding-top: 2.5rem; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container-mobile[data-yoo-login] {\n          padding-right: 2rem;\n          padding-left: 2rem;\n          -webkit-box-pack: center;\n          -webkit-justify-content: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n          height: 100%;\n          -webkit-box-flex: 0;\n          -webkit-flex-grow: 0;\n          -ms-flex-positive: 0;\n          flex-grow: 0; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container-mobile[data-yoo-login]   .password-container[data-yoo-login] {\n            padding-top: 1rem; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container-mobile[data-yoo-login]   .inner-container[data-yoo-login] {\n            -webkit-box-pack: justify;\n            -webkit-justify-content: space-between;\n            -ms-flex-pack: justify;\n            justify-content: space-between;\n            margin-top: 1rem; }\n            [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container-mobile[data-yoo-login]   .inner-container[data-yoo-login]   .radio[data-yoo-login] {\n              display: -webkit-box;\n              display: -webkit-flex;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-pack: center;\n              -webkit-justify-content: center;\n              -ms-flex-pack: center;\n              justify-content: center;\n              -webkit-box-align: center;\n              -webkit-align-items: center;\n              -ms-flex-align: center;\n              align-items: center; }\n            [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container-mobile[data-yoo-login]   .inner-container.mobile[data-yoo-login]     yoo-form-radio .container .text-container {\n              font-size: 0.75rem !important; }\n            [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container-mobile[data-yoo-login]   .inner-container.mobile[data-yoo-login]     yoo-button .container .value {\n              font-size: 0.875rem !important;\n              display: -webkit-box;\n              display: -webkit-flex;\n              display: -ms-flexbox;\n              display: flex;\n              -webkit-box-pack: end;\n              -webkit-justify-content: flex-end;\n              -ms-flex-pack: end;\n              justify-content: flex-end; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container-mobile[data-yoo-login]   .login-button[data-yoo-login] {\n            margin-top: 3.125rem;\n            margin-bottom: 0.9375rem; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container-mobile[data-yoo-login]   .powered-by[data-yoo-login] {\n            font-size: 0.6875rem;\n            -webkit-box-pack: center;\n            -webkit-justify-content: center;\n            -ms-flex-pack: center;\n            justify-content: center;\n            -webkit-box-align: center;\n            -webkit-align-items: center;\n            -ms-flex-align: center;\n            align-items: center;\n            color: var(--stable, #adadad);\n            padding-bottom: 1.375rem;\n            letter-spacing: 0.0625rem; }\n            [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .content[data-yoo-login]   .login-container-mobile[data-yoo-login]   .powered-by[data-yoo-login]   .powered-img[data-yoo-login] {\n              -webkit-box-align: center;\n              -webkit-align-items: center;\n              -ms-flex-align: center;\n              align-items: center;\n              display: -webkit-box;\n              display: -webkit-flex;\n              display: -ms-flexbox;\n              display: flex;\n              padding-left: 0.3125rem;\n              padding-right: 0.25rem; }\n      [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .footer[data-yoo-login] {\n        width: 100%; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .footer[data-yoo-login]   .powered-by[data-yoo-login] {\n          font-size: 0.6875rem;\n          -webkit-box-pack: center;\n          -webkit-justify-content: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n          -webkit-box-align: center;\n          -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center;\n          color: var(--stable, #adadad);\n          padding-bottom: 1.375rem;\n          letter-spacing: 0.0625rem; }\n          [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .footer[data-yoo-login]   .powered-by[data-yoo-login]   .powered-img[data-yoo-login] {\n            -webkit-box-align: center;\n            -webkit-align-items: center;\n            -ms-flex-align: center;\n            align-items: center;\n            display: -webkit-box;\n            display: -webkit-flex;\n            display: -ms-flexbox;\n            display: flex;\n            padding-left: 0.3125rem;\n            padding-right: 0.25rem; }\n        [data-yoo-login-host]   .outer-container[data-yoo-login]   .right-panel[data-yoo-login]   .right-panel-content[data-yoo-login]   .footer.web[data-yoo-login] {\n          padding-bottom: 1.25rem; }\n\n\@media only screen and (max-width: 370px) {\n  [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .header[data-yoo-login] {\n    padding: 29px 8px 8px;\n    display: -webkit-box !important;\n    display: -webkit-flex !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end; }\n  [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .text-container[data-yoo-login] {\n    padding-top: .5rem; }\n  [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .login-container[data-yoo-login]   .inner-container[data-yoo-login] {\n    display: -webkit-box !important;\n    display: -webkit-flex !important;\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  [data-yoo-login-host]   .outer-container[data-yoo-login]   .left-panel[data-yoo-login]   .login-container[data-yoo-login]   .login-button[data-yoo-login] {\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; } }"; }
}

export { YooLoginComponent as YooLogin };
