import { Component, Prop, Event, EventEmitter, State, Element } from '@stencil/core';

@Component({
    tag: 'yoo-badge',
    styleUrl: 'badge.scss',
    scoped: true
})
export class YooBadgeComponent {

    @Prop() text: string;
    @Prop() closable: boolean;
    @Prop() iconLeft: string;
    @Prop() iconRight: string;

    @Event() tagClosed: EventEmitter<boolean>;
    @Event() rightIconClicked: EventEmitter<boolean>;
    @Event() leftIconClicked: EventEmitter<boolean>;

    @State() closed: boolean = false;

    @Element() host: HTMLStencilElement;

    onClose(): void {
        this.tagClosed.emit(true);
        this.closed = true;
    }

    onLeftIconClicked(): void {
        this.leftIconClicked.emit(true);
    }

    onRightIconClicked(): void {
        this.rightIconClicked.emit(true);
    }

    render(): JSX.Element {
        return (
            <div class={'outer-container' + ((this.closed) ? ' closed' : '')}>
                <div class="inner-container" attr-layout="row">
                    {this.iconLeft ? <i class={'icon-left ' + this.iconLeft} onClick={this.onLeftIconClicked.bind(this)}></i> : null }
                    {this.text ? <span class="inner-text">{this.text}</span> : null}
                    {this.iconRight ? <i class={'icon-right ' + this.iconRight} onClick={this.onRightIconClicked.bind(this)}></i> : null}
                    {this.closable ? <i class="icon-close yo-close" onClick={this.onClose.bind(this)}></i> : null}
                </div>
            </div>
        );
    }
}
