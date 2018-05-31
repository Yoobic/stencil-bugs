import { getElementDimensions } from '../../../utils/helpers';
export class YooLoginComponent {
    constructor() {
        this.leftPanelHeaderIcon = './assets/logo/operations_simple.svg';
        this.rightPanelTitleIcon = './assets/logo/yoobic_landscape_full_light.svg';
        this.rightPanelFooterIcon = './assets/logo/yoobic_simple.svg';
        this.backgroundColor = 'dark';
        this.leftPanelFooterText = 'Powered by';
        this.rightPanelTitleText = 'Welcome';
        this.rightPanelFooterText = 'Powered by';
        this.rememberMeText = 'Remember me';
        this.forgotPasswordText = 'Forgot password?';
        this.isMobile = true;
        this.language = 'EN';
        this.passwordInputChanged = false;
        this.rememberMe = false;
        this.onPasswordReset = () => {
            if (this.userEmail) {
                this.passwordResetRequested.emit(this.userEmail);
            }
        };
    }
    onLanguageSelected(event) {
        this.language = event.detail;
        this.languageSelectedParent.emit(event.detail);
    }
    onRadioClicked(event) {
        event.detail === 'checked' ? this.rememberMe = true : this.rememberMe = false;
    }
    onInputChanged(ev, type) {
        if (type === 'email') {
            this.userEmail = ev.detail;
        }
        if (type === 'password') {
            this.userPassword = ev.detail;
        }
    }
    onInputFocused(type) {
        if (this.isMobile) {
            this.host.querySelector('.outer-container').setAttribute('style', `height: ${this.deviceHeight}px;`);
        }
    }
    onInputBlurred() {
        if (this.isMobile) {
            this.host.querySelector('.outer-container').setAttribute('style', `height: 100%;`);
        }
    }
    componentDidLoad() {
        this.resizePage();
        window.addEventListener('resize', () => this.resizePage());
        this.deviceHeight = getElementDimensions(this.host.parentElement).height;
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
        this.isMobile = (windowWidth < 801);
    }
    onLogin() {
        if (this.userEmail && this.userPassword) {
            let loginDetails = { username: this.userEmail, password: this.userPassword };
            this.doLogin.emit(loginDetails);
            this.rememberMeSelected.emit(this.rememberMe);
        }
    }
    onForgotPassword() {
        let modalCtrl = document.querySelector('yoo-modal-controller');
        let htmlElement = document.createElement('div');
        htmlElement.className = 'modal-content';
        htmlElement.innerHTML = `<div class="content-container" attr-layout="column" attr-layout-align="center center">
                                    <div style="text-align:center;">
                                        Please enter your email address to reset your password.
                                    </div>
                                    <div style="width: 100%; padding: 2rem 0;">
                                        <yoo-form-container label="Email" class="dark">
                                            <div slot="content">
                                                <yoo-form-input class="simple" border-color-on-focus="success"</yoo-form-input>
                                            </div>
                                        </yoo-form-container>
                                    </div>
                                    <yoo-button text="Submit" class="min-width round gradient-success"></yoo-button>
                                </div>`;
        modalCtrl.generateModal({ heading: 'Reset Password', hasFooter: false, content: htmlElement, animationName: (this.isMobile ? 'slide_vertical' : 'fade_in_scale'), animationProp: { open: true, up: true, distance: (window.innerWidth), duration: 200 }, cssClass: ('dark simple' + (this.isMobile ? ' fullscreen' : '')), primaryFn: this.onPasswordReset });
        htmlElement.addEventListener('inputChanged', () => {
            this.onInputChanged(event, 'email');
        });
        modalCtrl.show();
    }
    renderLeftPanel() {
        return (h("div", { class: 'left-panel' + (this.isMobile ? ' mobile' : ''), "attr-layout": "column" },
            h("div", { class: "header", "attr-layout": "row" },
                this.isMobile ? h("div", { class: "space-fill" }) : null,
                h("div", { class: "logo" },
                    h("img", { src: this.leftPanelHeaderIcon, height: "20", alt: "Image" })),
                h("div", { class: 'language-container' + (this.isMobile ? ' mobile' : '') }, this.renderLanguageSelector())),
            h("div", { class: "login-container", "attr-layout": "column", "attr-flex": true },
                h("yoo-form-container", { label: "Email", class: "dark" },
                    h("div", { slot: "content" },
                        h("yoo-form-input", { class: "simple", "border-color-on-focus": this.host.className, onInputChanged: (event) => this.onInputChanged(event, 'email'), onInputFocused: () => this.onInputFocused('email'), onInputBlurred: () => this.onInputBlurred() }))),
                h("div", { class: "password-container" },
                    h("yoo-form-container", { label: "Password", class: "dark" },
                        h("div", { slot: "content" },
                            h("yoo-form-input", { class: "simple success", type: "password", "show-password-toggle": "true", "show-input-clear": "true", "border-color-on-focus": this.host.className, onInputChanged: (event) => this.onInputChanged(event, 'password'), onInputFocused: () => this.onInputFocused('password'), onInputBlurred: () => this.onInputBlurred() })))),
                h("div", { class: 'inner-container' + (this.isMobile ? ' mobile' : ''), "attr-layout": "row" },
                    h("yoo-radio", { text: this.rememberMeText, class: "dark", onRadioClicked: (event) => this.onRadioClicked(event) }),
                    h("yoo-button", { text: this.forgotPasswordText, onClick: () => this.onForgotPassword(), class: 'link-transparent-' + (this.host.className) })),
                h("div", { class: "login-button", "attr-layout": "row", "attr-layout-align": this.isMobile ? 'center' : 'flex-end' },
                    h("yoo-button", { text: "Login", class: 'round min-width ' + (this.buttonClass || ''), onClick: () => this.onLogin() }))),
            this.error ?
                h("div", { class: "error-container" }, this.error) : '',
            h("div", { class: "footer", "attr-layout": "row" }, this.isMobile ? this.leftPanelFooterText : null)));
    }
    renderLanguageSelector() {
        return (h("yoo-button", { class: 'clear' + (this.isMobile ? ' small' : ''), onClick: () => this.generateLanguageModal(), text: this.language, icon: "yo-arrow-dropdown" }));
    }
    generateLanguageModal() {
        let modalCtrl = this.host.querySelector('yoo-modal-controller');
        let htmlElement = document.createElement('div');
        htmlElement.innerHTML = `<div class="modal-content">
            <yoo-language-selector></yoo-language-selector>
        </div>`;
        modalCtrl.generateModal({
            animationName: 'fade_in_scale',
            hasHeader: true,
            hasFooter: false,
            content: htmlElement,
            cssClass: 'yoo-modal-language fullscreen'
        });
        modalCtrl.show();
        let languageSelector = htmlElement.querySelector('yoo-language-selector');
        languageSelector['languages'] = this.languages;
        languageSelector['isMobile'] = this.isMobile;
    }
    renderRightPanel() {
        let backStyle = {
            backgroundImage: 'url(' + this.backgroundSrc + ')'
        };
        return (h("div", { class: 'right-panel' + (this.isMobile ? ' mobile' : ''), "attr-layout": "column", "justify-content": "space-between" },
            this.backgroundSrc ? h("div", { class: "background", style: backStyle }) : '',
            h("div", { class: 'background-overlay ' + 'bg-' + (this.backgroundColor || 'dark') }),
            h("div", { class: "header" }, this.isMobile ? null : this.renderLanguageSelector()),
            h("div", { class: "content", "attr-layout": "column", "justify-content": "center" },
                h("div", { class: "image-container", "attr-layout": "row" },
                    h("img", { src: this.rightPanelTitleIcon, alt: "Image", height: "60" })),
                h("div", { class: "text-container", "attr-layout": "row" }, this.rightPanelTitleText)),
            h("div", { class: "footer", "attr-layout": "row" },
                h("div", { class: "text" }, this.rightPanelFooterText),
                h("img", { src: this.rightPanelFooterIcon, height: "24", alt: "Image" }))));
    }
    render() {
        return (h("div", { class: "outer-container", "attr-layout": "row" },
            this.loading ? h("yoo-loader", { class: "absolute large backdrop" }) : '',
            h("yoo-modal-controller", null),
            this.renderLeftPanel(),
            this.renderRightPanel()));
    }
    static get is() { return "yoo-login"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "backgroundColor": { "type": String, "attr": "background-color" }, "backgroundSrc": { "type": String, "attr": "background-src" }, "buttonClass": { "type": String, "attr": "button-class" }, "currentLanguage": { "type": String, "attr": "current-language" }, "error": { "type": String, "attr": "error" }, "forgotPasswordText": { "type": String, "attr": "forgot-password-text" }, "host": { "elementRef": true }, "isMobile": { "state": true }, "language": { "state": true }, "languages": { "type": "Any", "attr": "languages" }, "leftPanelFooterText": { "type": String, "attr": "left-panel-footer-text" }, "leftPanelHeaderIcon": { "type": String, "attr": "left-panel-header-icon" }, "loading": { "type": Boolean, "attr": "loading" }, "pageWidthSize": { "state": true }, "passwordInputChanged": { "state": true }, "rememberMeText": { "type": String, "attr": "remember-me-text" }, "rightPanelFooterIcon": { "type": String, "attr": "right-panel-footer-icon" }, "rightPanelFooterText": { "type": String, "attr": "right-panel-footer-text" }, "rightPanelTitleIcon": { "type": String, "attr": "right-panel-title-icon" }, "rightPanelTitleText": { "type": String, "attr": "right-panel-title-text" } }; }
    static get events() { return [{ "name": "doLogin", "method": "doLogin", "bubbles": true, "cancelable": true, "composed": true }, { "name": "languageSelectedParent", "method": "languageSelectedParent", "bubbles": true, "cancelable": true, "composed": true }, { "name": "rememberMeSelected", "method": "rememberMeSelected", "bubbles": true, "cancelable": true, "composed": true }, { "name": "passwordResetRequested", "method": "passwordResetRequested", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get listeners() { return [{ "name": "languageSelected", "method": "onLanguageSelected" }]; }
    static get style() { return "/**style-placeholder:yoo-login:**/"; }
}
