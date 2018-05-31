import { Component, Element, Event, Prop, EventEmitter, State, Method } from '@stencil/core';
import { IUser } from '@shared/interfaces';
import { getUserDisplayName } from '../../../utils/helpers';
import { services } from '../../../services';

@Component({
    tag: 'yoo-input-bar',
    styleUrl: 'input-bar.scss',
    scoped: true
})
export class YooInputBarComponent {

    @Prop() icon: string = 'yo-camera-solid';
    @Prop() iconAction: string = 'yo-gallery';
    @Prop() actionText: string = 'Post';
    @Prop({ mutable: true }) value: string = '';
    @Prop() placeholder: string = 'Add comment';
    @Prop() topIndication: string = null;
    @Prop() replyToUser: IUser = null;

    @Event() sendText: EventEmitter<string>;
    @Event() iconClicked: EventEmitter<boolean>;
    @Event() browseLibrary: EventEmitter<boolean>;
    @Event() rowNumberChanged: EventEmitter<boolean>;

    @Element() host: HTMLStencilElement;

    @State() rows: number = 1;
    @State() hasTextInside: boolean;
    @State() charPerLine: number = 60;

    updateState(): void {
        let previousRows: number = this.rows;
        this.hasTextInside = this.value && this.value !== '' ? true : false;
        if (this.value && this.value.length) {
            this.rows = Math.ceil(this.value.length / this.charPerLine);
            this.rows += (this.value.split(/\r\n|\r|\n/).length - 1) || 0;
            this.rows = Math.min(this.rows, 5);
        } else {
            this.rows = 1;
        }
        if (this.rows !== previousRows) {
            this.rowNumberChanged.emit(true);
        }

    }

    componentWillLoad() {
        this.updateState();
    }

    // componentDidUpdate() {
    //     this.charPerLine = this.host.querySelector('textarea') && this.host.querySelector('textarea').clientWidth ? Math.ceil(this.host.querySelector('textarea').clientWidth / 6) : 60;
    // }

    // componentWillUpdate() {
    //     this.updateState();
    // }

    @Method()
    focusInputField() {
        let textArea = this.host.querySelector('textarea');
        textArea.focus();
    }

    onActionClick() {
        this.hasTextInside = this.value && this.value !== '' ? true : false;
        if (this.hasTextInside) {
            this.sendText.emit(this.value);
            this.value = null;
        } else {
            this.browseLibrary.emit(true);
        }
    }

    onInput(ev: Event) {
        this.value = (ev.target as any).value;
        this.updateState();
    }

    render(): JSX.Element {

        return (
            <div class="outer-container" attr-layout="column">
                {this.topIndication || this.replyToUser ?
                    <div class="indications-container">
                        <span>
                            {this.topIndication ?
                                this.topIndication
                                : this.replyToUser ?
                                    <span>
                                        {services.translate.get('REPLY_TO') + ' '}<span class="user-indication">{getUserDisplayName(this.replyToUser)}</span>
                                    </span>
                                    : null}
                        </span>
                    </div>
                    : null}
                <div class="input-container" attr-layout="row">
                    <div class="icon-container">
                        <div class="capture-icon" attr-layout="row" onClick={() => this.iconClicked.emit(true)}>
                            <i class={this.icon} />
                        </div>
                    </div>
                    <div class="input-zone">
                        <textarea value={this.value} rows={this.rows} placeholder={this.placeholder} onInput={(ev) => this.onInput(ev)}></textarea>
                        <div class="input-action" onClick={() => this.onActionClick()}>
                            <div>
                                <span>{this.hasTextInside ? this.actionText : <i class={this.iconAction} />}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
