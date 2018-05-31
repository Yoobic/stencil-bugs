import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';
import { setAnimation } from '../../../utils/anim';

@Component({
    tag: 'yoo-alert',
    styleUrl: 'alert.scss',
    scoped: true
})
export class YooAlertComponent {

    @Prop() text: string;
    @Prop() heading: string;
    @Prop() icon: string;
    @Prop() closeable: boolean;
    @Prop() animationName: string;
    @Prop() link: string;

    @Event() alertClosed: EventEmitter<boolean>;
    @Event() alertActionSelected: EventEmitter<boolean>;

    @State() closed: boolean;

     @Element() host: HTMLStencilElement;

    componentDidLoad() {
        setAnimation(this.animationName, this.host, {open: true});
    }

    onActionTextClick(): void {
        this.alertActionSelected.emit(true);
    }

    onDismissButtonClick(): void {
        this.alertClosed.emit(true);
        this.closed = true;
    }

    render(): JSX.Element {
        return (
            <div class={this.closed ? 'container closed' : 'container'}>
                <div class="link" onClick={() => this.onActionTextClick()}>
                    {this.link}
                </div>
                <div class = "inner-container">
                    {this.icon ? <span class="icon"><i class={this.icon}></i></span> : null}
                    <div class="text-container">
                        {this.heading ? <span class="heading">{this.heading}</span> : null}
                        <span class="value">{this.text}</span>
                    </div>
                </div>
                <div class="close-container">
                    {this.closeable ? <span class="close" onClick={() => this.onDismissButtonClick()}> <i class="yo-close"></i></span> : null}
                </div>

            </div>
        );
    }
}
