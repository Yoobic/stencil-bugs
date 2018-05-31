import { Component, Element, Prop, Event, State, EventEmitter } from '@stencil/core';
//import { resizeObserve, debounce } from '../../../utils/helpers'; //intersectionObserve
//import { setAnimation, animations } from '../../../utils/anim';
import { execHandlerAndStopEvent } from '../../../utils/helpers'; //intersectionObserve, resizeObserve, debounce
import { IUser, ICardListEntry } from '@shared/interfaces';

const MAX_AVATAR_DISPLAY: number = 4;

@Component({
    tag: 'yoo-card-list',
    styleUrl: 'card-list.scss',
    scoped: true
})
export class YooCardListComponent {

    @Prop() entry: ICardListEntry;

    @Prop() avatarImgs: string[] = [];
    @Prop() isActivable: boolean = false;
    @Prop() actionButtonTitle: string;
    @Prop() animationName: string;
    @Prop() hasMenu: boolean = false;

    @Event() active: EventEmitter<boolean>;
    @Event() actionPress: EventEmitter<boolean>;

    @State() isActive: boolean = false;
    @State() horizontal: boolean;
    @State() imageWidth: number = 340;
    @State() imageHeight: number = 160;

     @Element() host: HTMLStencilElement;

    //private resizeObserver: ResizeObserver;

    componentWillLoad() {
        // if (this.entry && !this.entry.imgSrc) {
        //     this.entry.imgSrc = '../../assets/empty-states/empty.svg';
        // }
    }

    componentDidLoad() {
        // let image = this.host.querySelector('.image');

        // this.resizeObserver = resizeObserve(image, (target, width, height, left, top, entry) => {
        //     debounce(this.onImageResize.bind(this), 1000)(target, width, height, left, top, entry);
        // });
    }

    componentDidUnload() {
        // if (this.resizeObserver) {
        //     this.resizeObserver.disconnect();
        // }
    }

    onImageResize(target, width, height, left, top, entry) {
        // this.imageWidth = width;
        // this.imageHeight = height;
    }

    onCheckboxToggled(event): void {
        event.detail === 'checked' ? this.isActive = true : this.isActive = false;
        this.active.emit(this.isActive);
    }

    onActionButtonClick(): void {
        this.actionPress.emit(true);
    }

    renderCardImage(): JSX.Element {
        let orderUser = this.entry.users ? this.entry.users.sort((a: IUser, b: IUser) => {
            return a.imageData && b.imageData ? 0 : !b.imageData ? -1 : 1;
        }) : [];
        return (this.entry && (!this.entry.users || !this.entry.users.length) ?
            <yoo-avatar class={'main ' + (this.entry && this.entry.avatarSize ? this.entry.avatarSize : 'list-small')} img-src={this.entry.imgSrc} icon={this.entry.icon} icon-text={this.entry.iconText}></yoo-avatar>
            : this.entry && this.entry.users && this.entry.users.length === 1 ?
                <yoo-avatar class={'main ' + (this.entry && this.entry.avatarSize ? this.entry.avatarSize : 'list-small')} img-src={this.entry.imgSrc} user={this.entry.users[0]}></yoo-avatar>
                : this.entry && this.entry.users ?
                    <div class="multiple-avatar-container" attr-layout="column">
                        <div attr-layout="row" class="top-avatars">
                            {orderUser.slice(0, 2).map((user, index) => {
                                return <yoo-avatar class="xsmall" user={user}></yoo-avatar>;
                            })}
                        </div>
                        <div attr-layout="row">
                            {orderUser.slice(2, 3).map((user, index) => {
                                return <yoo-avatar class="xsmall" user={user}></yoo-avatar>;
                            })}
                            {this.entry.users.length > 3 ?
                                <div class="avatar-hidden" attr-layout="row">
                                    <span>+{this.entry.users.length - 3}</span>
                                </div>
                                : null}
                        </div>
                    </div>
                    : null);
    }

    renderBottomContent(): JSX.Element {
        return (
            [
                this.avatarImgs && this.avatarImgs.length > 0 ?
                    <div class="avatar-container" attr-layout="row">
                        {this.avatarImgs.map((avatarSrc, index) => {
                            if (index < MAX_AVATAR_DISPLAY) {
                                return (<yoo-avatar class="xsmall" img-src={avatarSrc}></yoo-avatar>);
                            }
                        })}
                    </div> : null,
                this.actionButtonTitle ?
                    <div class="action-button-container" attr-layout="row">
                        <yoo-button text={this.actionButtonTitle} class={this.host.className + ' squared'} onClick={() => this.onActionButtonClick()}></yoo-button>
                    </div> : null]
        );
    }

    renderImageContainerContent(): JSX.Element {
        return (
            [this.entry.topLeftBadge ? (
                <div class={'top-left' + (this.isActivable ? ' active' : '')}>
                    <yoo-badge text={this.entry.topLeftBadge} class="notification-medium danger">
                    </yoo-badge></div>) : null,
            this.entry.topRightBadge ? (
                <div class="top-right">
                    <yoo-badge text={this.entry.topRightBadge} class="notification-medium danger">
                    </yoo-badge></div>) : null,
            this.entry.bottomLeftBadge ? (
                <div class="bottom-left">
                    <yoo-badge text={this.entry.bottomLeftBadge} class="notification-medium danger">
                    </yoo-badge></div>) : null,
            this.entry.bottomRightBadge ? (
                <div class="bottom-right">
                    <yoo-badge text={this.entry.bottomRightBadge} class="notification-medium danger">
                    </yoo-badge></div>) : null,
            this.renderCardImage(),
            this.isActivable ?
                <yoo-form-checkbox class={this.host.className} onCheckboxToggled={(event) => this.onCheckboxToggled(event)}></yoo-form-checkbox>
                : null]
        );
    }

    renderHeadingContainerContent(): JSX.Element {
        return (
            [<div class="heading-container" attr-layout="row">
                {this.entry && this.entry.heading ? <span class="card-heading">{this.entry.heading}</span> : null}
                {this.entry && this.entry.date ? <span class="date-card">{this.entry.date}</span> : null}
                {this.hasMenu ?
                    <yoo-context-menu>
                        <div slot="trigger"><span class="menu-icon"><i class="yo-more-v"></i></span></div>
                        <div class="context-container">
                            <slot name="menu-slot" />
                        </div>
                    </yoo-context-menu>
                    : null}
            </div>,
            (this.entry && this.entry.topActions && this.entry.topActions.length ?
                <div>
                    {this.entry.topActions.map(a =>
                        <span onClick={(ev) => execHandlerAndStopEvent(ev, a.handler)}>{a.text}</span>
                    )}
                </div>
                 : null ),
            (this.entry && this.entry.subheadings ? this.entry.subheadings.map((item) =>
                <div class="subheading-container" innerHTML={item}></div>
            ) : null),
            (this.entry && (this.entry.badges || this.entry.tags || this.entry.icons || this.entry.bottomActions) ?
                <div class="badges-container" attr-layout="row">
                    {this.entry.badges ? this.entry.badges.map((item) =>
                        <yoo-badge class={item.cssClass ? item.cssClass : ''} icon-left={item.iconLeft} text={item.text} closable={item.closable} ></yoo-badge>)
                        : null}
                    {this.entry.tags ? this.entry.tags.map(a =>
                        <span class="hashtag" innerHTML={`#${a} `}></span>)
                        : null}
                    {this.entry.icons ? this.entry.icons.map(icon =>
                        icon && icon.icon ?
                            <span class="card-icon" attr-layout="row" onClick={(ev) => execHandlerAndStopEvent(ev, icon.handler)}>
                                <i class={icon.icon} />{' ' + icon.value ? icon.value : ''}
                            </span>
                            : null)
                        : null}
                    {this.entry && this.entry.bottomActions ?
                        <div attr-layout="row">
                            {this.entry.bottomActions.map(a =>
                                <span class="bottom-action" onClick={(ev) => execHandlerAndStopEvent(ev, a.handler)}>{a.text}</span>
                            )}
                        </div>
                    : null}
                </div>
                : null)
            ]
        );
    }

    render(): JSX.Element {
        return (
            <div class={'outer-container '} attr-layout="row">
                {this.entry && (this.entry.imgSrc || this.entry.users || this.entry.icon || this.entry.iconText)  ?
                    <div class="image-container" attr-layout="row">
                        {this.renderImageContainerContent()}
                    </div> : null}
                <div class={'content-container ' + (this.entry && this.entry.heading === undefined && this.entry.subheadings === undefined ? 'center' : '')} attr-layout="column">
                    <div class="top-container">
                        {this.renderHeadingContainerContent()}
                    </div>
                    <div class="slot-container" attr-layout="row">
                        <slot name="content-slot" />
                        <div class="inner-container" attr-layout="column">
                            {this.renderBottomContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
