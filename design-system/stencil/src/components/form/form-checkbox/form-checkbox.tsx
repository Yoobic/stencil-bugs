import { Component, Prop, Event, EventEmitter, Method, Element } from '@stencil/core';

@Component({
    tag: 'yoo-form-checkbox',
    styleUrl: 'form-checkbox.scss',
    scoped: true
})
export class YooFormCheckboxComponent {

    @Prop() text: string;
    @Prop({ mutable: true }) state: string = 'unchecked';
    @Prop() disabled: boolean;
    @Prop() isIndeterminate: boolean;

    @Event() checkboxToggled: EventEmitter<string>;

    @Element() host: HTMLStencilElement;

    @Method()
    onCheckboxClick() {
        this.getNextState();
        this.checkboxToggled.emit(this.state);
    }

    getNextState() {
        const TRANSITIONS = {
            checked: 'unchecked',
            indeterminate: 'checked',
            unchecked: this.isIndeterminate ? 'indeterminate' : 'checked'
        };
        this.state = TRANSITIONS[this.state];
    }

    render(): JSX.Element {
        return (
            <div class="container">
                {this.disabled ?
                    <div class={this.state === 'unchecked' ? 'icon-container empty disabled' : 'icon-container disabled'} attr-layout="row">
                        <span class={this.state === 'unchecked' ? 'icon empty' :  'icon disabled'}><i class={this.state === 'indeterminate' ? 'yo-minus' : 'yo-check-solid'}></i></span>
                    </div>
                    :
                    <div class={this.state === 'unchecked' ? 'icon-container empty enabled' : 'icon-container enabled'} attr-layout="row" onClick={() => this.onCheckboxClick()}>
                        <span class={this.state === 'unchecked' ? 'icon empty' :  'icon'}><i class={this.state === 'indeterminate' ? 'yo-minus' : 'yo-check-solid'}></i></span>
                    </div>
                }
                {this.disabled ?
                    <div class="text-container disabled">
                        {this.text}
                    </div> :
                    <div class="text-container enabled" onClick={() => this.onCheckboxClick()}>
                        {this.text}
                    </div>
                }
            </div>
        );
    }
}