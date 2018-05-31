import { Component, Event, EventEmitter, Prop, Element } from '@stencil/core';

@Component({
    tag: 'yoo-form-radio',
    styleUrl: 'form-radio.scss',
    scoped: true
})
export class YooFormRadioComponent {

    @Prop() text: string;
    @Prop({ mutable: true }) state: string = 'unchecked';
    @Prop() disabled: boolean;

    @Event() radioClicked: EventEmitter;

    @Element() host: HTMLStencilElement;

    onRadioCheck(): void {
        if ( this.state === 'unchecked') {
            this.state = 'checked';
        } else if ( this.state === 'checked') {
            this.state = 'unchecked';
        }
        this.radioClicked.emit(this.state);
    }

    render(): JSX.Element {
        return (
            <div class="container">
                {this.disabled ?
                    <div class={this.state === 'unchecked' ? 'icon-container empty disabled' : 'icon-container disabled'} attr-layout="row">
                        <div class={this.state === 'unchecked' ? 'icon empty' :  'icon disabled'}></div>
                    </div>
                    :
                    <div class={this.state === 'unchecked' ? 'icon-container empty enabled' : 'icon-container enabled'} attr-layout="row" onClick={() => this.onRadioCheck()}>
                        <div class={this.state === 'unchecked' ? 'icon empty' : 'icon'}><i class="yo-check"></i></div>
                    </div>
                }
                {this.disabled ?
                    <div class="text-container disabled">
                        {this.text}
                    </div> :
                    <div class="text-container enabled" onClick={() => this.onRadioCheck()}>
                        {this.text}
                    </div>
                }
            </div>
        );
    }
}
