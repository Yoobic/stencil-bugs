import { Component, Prop, Element } from '@stencil/core';

@Component({
    tag: 'yoo-button',
    styleUrl: 'button.scss',
    scoped: true
})
export class YooButtonComponent {

    @Prop() text: string;
    @Prop() disabled: boolean = false;
    @Prop() isLoading: boolean;
    @Prop() icon: string;

    @Element() host: HTMLStencilElement;

    renderLoadingContainer(): JSX.Element {
        return (
            <div class="container loading" >
                <span class="value"><img src="assets/loader/loading.svg" /></span>
            </div>
        );
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
            (this.isLoading ? this.renderLoadingContainer() :
                //button //disabled={this.disabled}
                <div class={'container ' + (this.disabled ? 'disabled' : '')} >
                    {this.renderButtonContent()}
                </div>
            )
        );
    }

}
