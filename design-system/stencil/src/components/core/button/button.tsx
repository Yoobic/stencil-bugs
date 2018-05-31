import { Component, Prop, Event, EventEmitter, Element } from '@stencil/core';

@Component({
    tag: 'yoo-button',
    styleUrl: 'button.scss',
    scoped: true
})
export class YooButtonComponent {

    @Prop() text: string;
    @Prop() disabled = false;
    @Prop() isLoading: boolean;
    @Prop() icon: string;

    @Event() buttonClicked: EventEmitter<boolean>;

    @Element() host: HTMLElement;

    click() {
        if (!this.disabled) {
            this.buttonClicked.emit(true);
        }
    }

    renderButtonContent(): JSX.Element {
        return (
            <div class="value">
                {this.text}
                {this.icon ? <span class="icon"><i class={this.icon}></i></span> : null}
                <slot></slot>
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <button class={'container ' + (this.disabled ? 'disabled' : '')} disabled={this.disabled} onClick={() => this.click()}>
                    {this.renderButtonContent()}
            </button>
        );
    }

}
