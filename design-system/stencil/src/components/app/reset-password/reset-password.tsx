import { Component, Element, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'yoo-reset-password',
    styleUrl: 'reset-password.scss',
    scoped: true
})

export class YooResetPasswordComponent {

    @Prop() heading: string;
    @Prop() subheading: string;
    @Prop() borderClass: string;
    @Prop() buttonClass: string;
    @Prop() buttonText: string;
    @Prop() inputLabel: string;
    @Prop() isMagicLink: boolean = false;
    @Prop() showTitle: boolean = true;

     @Element() host: HTMLStencilElement;

    @State() validateInput: boolean;

    @Event() passwordResetRequestSubmitted: EventEmitter<{email: string, isMagicLink: boolean}>;

    private userEmail: string;

    componentWillLoad() {
    }

    validateLoginInputs() {
        let emailInput = this.host.querySelector('yoo-form-input') as HTMLYooFormInputElement;
        let submitBtn = this.host.querySelector('yoo-button') as HTMLYooButtonElement;

        this.validateInput = emailInput.isValid();

        this.validateInput ? submitBtn.disabled = false : submitBtn.disabled = true;
    }

    onSubmit() {
        this.passwordResetRequestSubmitted.emit({email: this.userEmail, isMagicLink: this.isMagicLink});
    }

    onInputChanged(ev: CustomEvent) {
        this.userEmail = ev.detail;
    }

    onInputBlurred() {
        this.validateLoginInputs();
    }

    render(): JSX.Element {
        return (
            <div class={'container'} attr-layout="column" attr-layout-align="space-between">
                {this.showTitle ?
                    (<div class={'title'}>
                        {this.heading}
                    </div>)
                    : null}
                <div class={'subtitle'}>
                    {this.subheading}
                </div>
                <div class={'input'}>
                    <yoo-form-input-container label={this.inputLabel}>
                        <div >
                            <yoo-form-input class="simple" border-color={this.borderClass} validators={[{name: 'email' }, {name: 'required'} ]}
                            onInputChanged={(event) => this.onInputChanged(event)}
                            onInputBlurred={() => this.onInputBlurred()}>
                            </yoo-form-input>
                        </div>
                    </yoo-form-input-container>
                </div>
                <div class={'button'}>
                    <yoo-button onButtonClicked={() => this.onSubmit()} text={this.buttonText} class={this.buttonClass  + ' large'}></yoo-button>
                </div>
            </div>
        );
    }
}
