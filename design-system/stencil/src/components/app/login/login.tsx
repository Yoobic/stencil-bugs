import { Component, Element, State, Prop, Event, EventEmitter, Listen } from '@stencil/core';
import { ILanguage, ILoginDetails, ICoreConfig } from '@shared/interfaces';
import { getElementDimensions } from '../../../utils/helpers';

const MODAL_ANIMATION_TIME = 220;
const MIN_LEFT_PANEL_SCREEN_SIZE = 900;

@Component({
    tag: 'yoo-login',
    styleUrl: 'login.scss',
    scoped: true
})
export class YooLoginComponent {

    // Testing the Stencil queue
    // @Prop({context: 'queue'}) queue: QueueController;

    @Prop() leftPanelMobileHeaderIcon: string = './assets/logo/operations_simple.svg';
    @Prop() leftPanelWebHeaderIcon: string = './assets/logo/operations_landscape_light.svg';
    @Prop() backgroundSrc: string;
    @Prop() backgroundColor: string = 'dark';
    @Prop() buttonClass: string;
    @Prop({ mutable: true }) error: string;
    @Prop() loading: boolean;
    @Prop() leftPanelFooterText: string = 'Powered by';
    @Prop() webTitleText: string = 'Operations';
    @Prop() webSubtitleText: string[] = ['Manage your stores easily', 'your workflow - all in one place'];
    @Prop() webLoginFormTitle: string = 'Log In to Operations.';
    @Prop() webLoginFormSubtitle: string = 'Enter your details below';
    @Prop() rememberMeText: string = 'Remember me';
    @Prop() forgotPasswordText: string = 'Forgot Password?';
    @Prop() languages: ILanguage[];
    @Prop() currentLanguage: string;
    @Prop() emailLabel: string = 'Email Address';
    @Prop() passwordLabel: string = 'Password';
    @Prop() borderClass: string = 'success';
    @Prop() magicLinkButtonText: string = 'Send me a magic link';
    @Prop() resetPasswordButtonText: string = 'Reset password';
    @Prop() loginButtonText: string = 'Log In';
    @Prop() showRememberMe: boolean = false;

    @Event() doLogin: EventEmitter<ILoginDetails>;
    @Event() languageSelectedParent: EventEmitter<string>;
    @Event() rememberMeSelected: EventEmitter<boolean>;
    @Event() passwordResetModalRequested: EventEmitter<boolean>;
    @Event() magicLinkModalRequested: EventEmitter<boolean>;
    @Event() advancedLoginRequested: EventEmitter<boolean>;

    @State() showLeftPanel: boolean = true;
    @State() pageWidthSize: number;
    @State() language: string = 'EN';
    @State() passwordInputChanged: boolean = false;
    @State() hideMobileLoginTitleAndFooter: boolean = false;
    @State() showSupport: boolean;

    @Element() host: HTMLStencilElement;

    protected coreConfig: ICoreConfig = (window as any).coreConfigService;
    // private deviceHeight: number;
    private rememberMe: boolean = false;
    private userEmail: string;
    private userPassword: string;
    private emailFocused: boolean = false;
    private passwordFocused: boolean = false;
    //private eventSelector: string;

    @Listen('languageSelected')
    onLanguageSelected(event: CustomEvent) {
        this.language = event.detail;
        this.languageSelectedParent.emit(event.detail);
    }

    @Listen('actionSelected')
    onActionSelected(ev: CustomEvent) {
        setTimeout(() => {
            if (ev.detail === 'Reset Password') {
                this.passwordResetModalRequested.emit(true);
            } else {
                this.magicLinkModalRequested.emit(true);
            }
        }, MODAL_ANIMATION_TIME);
    }

    componentWillLoad() {
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

    onInputChanged(ev: CustomEvent, type: string) {
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

    onEnterPressed() {
        this.validateLoginInputs();
        let loginBtn = this.host.querySelector('#login-btn') as HTMLYooButtonElement;
        if ( loginBtn.disabled === false ) {
            this.onLogin();
        }
    }

    validateLoginInputs() {
        let emailInput = this.host.querySelector('#email-input') as HTMLYooFormInputElement;
        let passwordInput = this.host.querySelector('#password-input') as HTMLYooFormInputElement;
        let loginBtn = this.host.querySelector('#login-btn') as HTMLYooButtonElement;

        let isValidEmail = emailInput.isValid();
        let isValidPassword = passwordInput.isValid();

        isValidEmail && isValidPassword ? loginBtn.disabled = false : loginBtn.disabled = true;
    }

    onInputFocused(type: string) {
        let errorAlert = this.host.querySelector('#error-alert') as HTMLYooAlertElement;
        if (errorAlert) {
            errorAlert.setAttribute('style', 'display: none;');
        }
        if (this.coreConfig.isIonic()) {
            type === 'password' ? (this.passwordFocused = true) : (this.emailFocused = true);
            this.hideTitleAndFooter();
        }
    }

    onInputBlurred(type: string) {
        this.validateLoginInputs();
        if (this.coreConfig.isIonic()) {
            setTimeout(() => {
                type === 'password' ? (this.passwordFocused = false) : (this.emailFocused = false);
                this.hideTitleAndFooter();
            }, 100);
        }
    }

    onPasswordClear(ev: CustomEvent) {
        if (ev.detail === 'clear') { this.validateLoginInputs(); }
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

    hideTitleAndFooter() {
        if (this.emailFocused || this.passwordFocused) {
            this.hideMobileLoginTitleAndFooter = true;
        } else {
            this.hideMobileLoginTitleAndFooter = false;
        }
    }

    resizeLanguageSelectorWidth() {
        let languageSelector = this.host.querySelector('.language-container.mobile');
        if (languageSelector) { this.host.querySelector('.space-fill').setAttribute('style', `width: ${languageSelector.clientWidth}px`); }
        this.language = this.currentLanguage;
    }

    resizePage() {
        const windowWidth = getElementDimensions(this.host.querySelector('.outer-container')).width;
        this.showLeftPanel = !(windowWidth < MIN_LEFT_PANEL_SCREEN_SIZE);
    }

    onLogin() {
        if (this.userEmail && this.userPassword) {
            let loginDetails: ILoginDetails = { username: this.userEmail, password: this.userPassword };
            this.doLogin.emit(loginDetails);
            this.rememberMeSelected.emit(this.rememberMe);
            let errorAlert = this.host.querySelector('#error-alert') as HTMLYooAlertElement;
            if (errorAlert) {
                errorAlert.setAttribute('style', 'display: block;');
            }
        }
    }

    onForgotPassword() {
        this.coreConfig.isIonic() ? (
            this.presentActionSheet()
        ) :
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
        modal.setAttribute('style', `position: absolute; top: ${this.coreConfig.isIonic() ? '4.5625rem' : '4.6875rem'}; right: ${this.coreConfig.isIonic() ? '1rem' : '1.875rem'};`);
    }

    renderLoginForm(): JSX.Element {
        return [
            this.hideMobileLoginTitleAndFooter ? null :
                <div class={'login-title' + (this.coreConfig.isIonic() ? ' mobile' : '')} attr-layout="row">
                    <div class="inner-title">
                        {this.webLoginFormTitle}
                    </div>
                </div>,
            <div class={this.coreConfig.isIonic() ? 'login-container-mobile' : 'login-container'} attr-layout="column">
                {this.coreConfig.isIonic() ? null :
                    <div class="login-subtitle">
                        {this.webLoginFormSubtitle}
                    </div>}
                <yoo-form-input-container field={{ title: this.emailLabel, required: true }}>
                    <yoo-form-input id="email-input" validators={[{ name: 'email' }, { name: 'required' }]} type="email" class="simple" border-color={this.borderClass}
                        onInputChanged={(event) => this.onInputChanged(event, 'email')}
                        onInputFocused={() => this.onInputFocused('email')}
                        onInputBlurred={() => this.onInputBlurred('email')}
                        onEnterPressed={() => this.onEnterPressed()}>
                    </yoo-form-input>
                </yoo-form-input-container>
                <div class="password-container">
                    <yoo-form-input-container field={{ title: this.passwordLabel, required: true }}>
                        <yoo-form-input id="password-input" validators={[{ name: 'required' }]} class="simple" type="password" show-password-toggle="true" show-input-clear="true" border-color={this.borderClass}
                            onInputChanged={(event) => this.onInputChanged(event, 'password')}
                            onInputFocused={() => this.onInputFocused('password')}
                            onInputBlurred={() => this.onInputBlurred('password')}
                            onIconClicked={(ev) => this.onPasswordClear(ev)}
                            onEnterPressed={() => this.onEnterPressed()}>
                        </yoo-form-input>
                    </yoo-form-input-container>
                </div>
                <div class={'inner-container' + (this.coreConfig.isIonic() ? ' mobile' : '')} attr-layout="row">
                    <div class="radio">
                        {this.showRememberMe ? <yoo-form-radio text={this.rememberMeText} class={'stable ' + this.borderClass} onRadioClicked={(event) => this.onRadioClicked(event)}></yoo-form-radio>
                            : null}
                    </div>
                    <yoo-button text={this.forgotPasswordText} onClick={() => this.onForgotPassword()} class={'link-transparent-' + (this.borderClass)}></yoo-button>
                </div>
                <div class="login-button" attr-layout="row" attr-layout-align={this.coreConfig.isIonic() ? 'center' : 'flex-end'}>
                    <yoo-button id="login-btn" text={this.loginButtonText} class={(this.coreConfig.isIonic() ? 'large ' : '') + (this.buttonClass || '')} disabled={true} onClick={() => this.onLogin()}></yoo-button>
                </div>
                {this.coreConfig.isIonic() && !this.hideMobileLoginTitleAndFooter ? this.renderPoweredBy() : null}
            </div>
        ];
    }

    renderLanguageSelector(): JSX.Element {
        return (
            <yoo-button class={'clear squared small'} onClick={() => this.generateLanguageModal()} text={this.language} icon="yo-down"></yoo-button>
        );
    }

    renderPoweredBy(): JSX.Element {
        return (
            <div class="powered-by" attr-layout="row">
                {this.leftPanelFooterText}
                <div class="powered-img">
                    <img src={this.coreConfig.isIonic() || !this.showLeftPanel ? './assets/logo/yoobic_simple_grey.svg' : './assets/logo/yoobic_simple_white.svg'} height="12.8"></img>
                </div>
                <div class="yoobic-text">
                    YOOBIC
                </div>
            </div>
        );
    }

    renderFooter(): JSX.Element {
        return (
            this.coreConfig.isIonic() ? <yoo-button text="Advanced Log In" onClick={() => this.onAdvancedLogin()} class={'block stable'}></yoo-button>
                : this.renderPoweredBy()
        );
    }

    renderLeftPanel(): JSX.Element {
        let backStyle = {
            backgroundImage: 'url(' + this.backgroundSrc + ')'
        };
        return (
            <div class={'left-panel' + (this.coreConfig.isIonic() ? ' mobile' : '')} attr-layout="column">
                {[(this.backgroundSrc ?
                    <div class="background" style={backStyle}></div> : ''),
                <div class={'background-overlay ' + 'bg-' + (this.backgroundColor || 'dark')}></div>]}
                <div class="content-container" attr-layout="column">
                    <div class="header" attr-layout="row">
                        {this.coreConfig.isIonic() ? <div class="space-fill"></div> : null}
                        <div class="logo">
                            <img src={this.coreConfig.isIonic() ? this.leftPanelMobileHeaderIcon : this.leftPanelWebHeaderIcon} height={this.coreConfig.isIonic() ? '25' : '32'} alt="Yoobic Logo" />
                        </div>
                        <div class={'language-container' + (this.coreConfig.isIonic() ? ' mobile' : '')}>
                            {this.renderLanguageSelector()}
                        </div>
                    </div>
                    <div class="left-body" attr-layout="column" attr-layout-align="center center">
                        <div class="title-container" attr-layout="row">
                            {this.webTitleText}
                        </div>
                        {this.webSubtitleText.map((text) =>
                            <div class="subtitle-container" attr-layout="row">
                                {text}
                            </div>
                        )}
                    </div>
                    <div class="footer" attr-layout="row" attr-layout-align="center center">
                        {this.renderFooter()}
                    </div>
                </div>
            </div>
        );
    }

    renderRightPanel(): JSX.Element {

        return (
            <div class={'right-panel' + (this.coreConfig.isIonic() ? ' mobile' : '')} attr-layout="column" justify-content="flex-start">
                {this.error ?
                    <yoo-alert id="error-alert" animationName="sticky_up" class="danger embedded centered"
                        text={this.error}
                        closeable={!this.coreConfig.isIonic()}
                        link={!this.coreConfig.isIonic() ? `Problems? We're here to help` : ''}
                        onAlertActionSelected={() => this.onAlertActionSelected()}
                        onAlertClosed={() => this.onAlertClosed()}>
                    </yoo-alert> : ''
                }
                <div class="right-panel-content" attr-layout="column" justify-content="space-between">
                    <div class={'header' + (this.coreConfig.isIonic() || !this.showLeftPanel ? ' mobile' : '')} attr-layout="row">
                        {this.coreConfig.isIonic() || !this.showLeftPanel ? [
                            <div class="space-fill"></div>,
                            <div class="logo">
                                <img src={this.leftPanelMobileHeaderIcon} height={'25'} alt="Yoobic Logo" />
                            </div>,
                            <div class={'language-container mobile'}>
                                {this.renderLanguageSelector()}
                            </div>
                        ] :
                            (this.renderLanguageSelector())}
                    </div>
                    <div class={'content ' + (this.coreConfig.isIonic() ? 'mobile' : '')} attr-layout="column" justify-content="center">
                        {this.renderLoginForm()}
                    </div>
                    {this.hideMobileLoginTitleAndFooter ? null :
                        <div class={'footer' + (this.coreConfig.isIonic() ? '' : ' web')} attr-layout="row" attr-layout-align="center center">
                            {this.coreConfig.isIonic() || !this.showLeftPanel ? this.renderFooter() : <yoo-button text="Advanced Log In" onClick={() => this.onAdvancedLogin()} class={'small link-transparent-' + (this.borderClass)}></yoo-button>}
                        </div>}
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div class="outer-container" attr-layout="row">
                {this.loading ? <yoo-loader class="absolute large backdrop"></yoo-loader> : ''}
                <yoo-modal-controller></yoo-modal-controller>
                {this.coreConfig.isIonic() ? null : (this.showLeftPanel ? this.renderLeftPanel() : null)}
                {this.renderRightPanel()}
            </div>
        );
    }
}