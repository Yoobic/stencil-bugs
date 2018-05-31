import { Component, Prop, Element, Method, State, Event, EventEmitter } from '@stencil/core';
import { YooSlimScrollComponent } from '../../core/slim-scroll/slim-scroll';
import { IChatMessage } from '@shared/interfaces';
import { getBackImageStyle, cloudinary, getUserDisplayName, resizeWindow, decreaseMaxHeight, getSizeModal } from '../../../utils/helpers';
import { pipes } from '../../../utils/pipes';

@Component({
    tag: 'yoo-chat',
    styleUrl: 'chat.scss',
    scoped: true
})
export class YooChatComponent {

    @Prop() heading: string;
    @Prop() messages: IChatMessage[] = []; // suppose that messages are ordered to most recent to the older one
    @Prop() displayLoadMore: boolean;

    @Event() loadMoreClicked: EventEmitter<boolean>;
    @Event() sendText: EventEmitter<string>;

    @Element() host: HTMLStencilElement;

    @State() scrollHeight: string;
    @State() loaded: boolean = false;

    @Method()
    scrollToBottom(): void {
        let slim = this.host.querySelector('yoo-slim-scroll');
        if (slim) {
            if (this.loaded) {
                slim.scrollToBottom();
            } else {
                setTimeout(() => this.scrollToBottom(), 200);
            }
        }
    }

    @Method()
    scrollToTop(): void {
        let slim = this.host.querySelector('yoo-slim-scroll');
        if (slim) {
            if (this.loaded) {
                slim.scrollToTop();
            } else {
                setTimeout(() => this.scrollToTop(), 200);
            }
        }
    }

    @Method()
    resize(windowEvent: boolean = false) {
        let slim: YooSlimScrollComponent = this.host.querySelector('yoo-slim-scroll') as any;
        if (slim) {
            if (slim.height === this.getSizeContainer().height && windowEvent) {
                setTimeout(() => this.scrollToBottom(), 250);
            }
            this.scrollHeight = this.getSizeContainer().height;
        }
    }

    componentDidLoad() {
        resizeWindow(() => this.resize(true));
        this.resize();
        this.loaded = true;
    }

    componentDidUpdate() {
        this.resize();
    }

    getSizeContainer() {
        let maxHeight = window.innerHeight;
        maxHeight = getSizeModal(this.host, maxHeight);
        maxHeight = decreaseMaxHeight(maxHeight, '.load-more', this.host);
        maxHeight = decreaseMaxHeight(maxHeight, '.input-container', this.host);
        return { height: maxHeight + 'px' };
    }

    getLastMessage(index: number): boolean {
        if (index === (this.messages.length - 1)) {
            return true;
        } else if (this.messages[index].author !== this.messages[index + 1].author) {
            return true;
        } else {
            return false;
        }
    }

    onSendText(ev: CustomEvent) {
        ev.stopPropagation();
        this.sendText.emit(ev.detail);
    }

    render(): JSX.Element {
        return (
            <div class="outer-container">
                <div class="chat-header">
                    <span>{this.heading}</span>
                </div>
                {this.displayLoadMore ?
                    <div class="load-more" onClick={() => this.loadMoreClicked.emit(true)} attr-layout="row">
                        <span>{'Load More'}</span>
                    </div>
                    : null}
                <div class="scroll-container">
                    <yoo-slim-scroll height={this.scrollHeight}>
                        <div class="messages-container" attr-layout="column">
                            {(this.messages.map((m, index) =>
                                <div class={'message ' + ((m.isAlternate) ? 'user-message' : 'other-message')} attr-layout="column">
                                    <div class={'message-content' + (this.getLastMessage(index) ? ' last' : '')} attr-layout="column">
                                        {m.img ?
                                            (<div class="image-container">
                                                <div class="image" style={getBackImageStyle(cloudinary(m.img))}></div> <br />
                                            </div>)
                                            : null}
                                        <span>{m.content}</span>
                                    </div>
                                    {this.getLastMessage(index) ? [
                                        <div class="speech-mark">
                                        </div>,
                                        <div class="speech-mark-negative">
                                        </div>
                                    ] : null}
                                    {(m.author || m.time) && this.getLastMessage(index) ?
                                        <div class="info-container">
                                            <yoo-avatar class="xsmall" user={m.author}></yoo-avatar>
                                            <span>{getUserDisplayName(m.author)} - {pipes.timeAgo.transform(m.time)}</span>
                                        </div>
                                        : null}
                                </div>
                            ))}
                        </div>
                    </yoo-slim-scroll>
                </div>
                <div class="input-container">
                    <yoo-input-bar onSendText={(ev) => this.onSendText(ev)}></yoo-input-bar>
                </div>
            </div>
        );
    }
}
