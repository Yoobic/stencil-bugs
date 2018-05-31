import { Component, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import { getBackImageStyle, cloudinary, resizeObserve, debounce } from '../../../utils/helpers'; //intersectionObserve
//import { setAnimation, animations } from '../../../utils/anim';
import { IBadgeEntry } from '@shared/interfaces';
const MAX_AVATAR_DISPLAY: number = 4;

@Component({
    tag: 'yoo-card',
    styleUrl: 'card.scss',
    scoped: true
})
export class YooCardComponent {

    @Prop() heading: string;
    @Prop() subheadings: string[];
    @Prop() imgSrc: string = '../../assets/empty-states/empty.svg';
    @Prop() topLeftBadge: string;
    @Prop() topRightBadge: string;
    @Prop() bottomLeftBadge: string;
    @Prop() bottomRightBadge: string;
    @Prop() avatarImgs: string[] = [];
    @Prop() isActivable: boolean = false;
    @Prop() isUserCard: boolean = false;
    @Prop() date: string;
    @Prop() badges: IBadgeEntry[];
    @Prop() avatarShape: string = 'rectangle';
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

    private resizeObserver: ResizeObserver;
    //private intersectionObserver: IntersectionObserver;

    componentWillLoad() {
        // if (this.type === 'list') {
        //     this.host.classList.add('list-mode');
        // }
        this.horizontal = this.host.classList.contains('horizontal');
    }

    componentDidLoad() {
        let image = this.host.querySelector('.image');

        this.resizeObserver = resizeObserve(image, (target, width, height, left, top, entry) => {
            debounce(this.onImageResize.bind(this), 1000)(target, width, height, left, top, entry);
        });

        //let container = this.host.querySelector('.outer-container');
        // this.intersectionObserver = intersectionObserve(this.host, (entries, observer) => {
        //     entries.forEach(entry => {
        //         if (entry.intersectionRatio > 0) {
        //             //entry.target.classList.add('in-view');
        //            this.animationName ? setAnimation(this.animationName, [container], {open: true}) : setAnimation(animations.slideInStaggered, [container]);
        //         } else {
        //             //entry.target.classList.add('in-view');
        //             this.animationName ? setAnimation(this.animationName, [container], {open: false}) : setAnimation(animations.fade, [container], {open: false});
        //         }
        //     });
        // }, {
        //     rootMargin: '30px',
        //     threshold: [0, 0.25, 0.75, 1]
        // });
        // this.intersectionObserver.observe(this.host);
    }

    componentDidUnload() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        // if (this.intersectionObserver) {
        //     this.intersectionObserver.disconnect();
        // }
    }

    onCheckboxToggled(event): void {
        event.detail === 'checked' ? this.isActive = true : this.isActive = false;
        this.active.emit(this.isActive);
    }

    onActionButtonClick(): void {
        this.actionPress.emit(true);
    }

    renderCardImage(): JSX.Element {
        if (this.avatarShape === 'rectangle') {
            return (
                <div class="image" style={getBackImageStyle(cloudinary(this.imgSrc, this.imageWidth, this.imageHeight))} ></div>
            );
        } else if (this.avatarShape === 'circle') {
            return (
                <yoo-avatar class="large" img-src={this.imgSrc}></yoo-avatar>
            );
        }
    }

    onImageResize(target, width, height, left, top, entry) {
        // this.imageWidth = width;
        // this.imageHeight = height;
    }

    renderImageContainerContent(): JSX.Element {
        return (
            [this.topLeftBadge ? (
                <div class={'top-left' + (this.isActivable ? ' active' : '')}>
                    <yoo-badge text={this.topLeftBadge} class={this.host.className}>
                    </yoo-badge></div>) : null,
            this.topRightBadge ? (
                <div class="top-right">
                    <yoo-badge text={this.topRightBadge} class={this.host.className}>
                    </yoo-badge></div>) : null,
            this.bottomLeftBadge ? (
                <div class="bottom-left">
                    <yoo-badge text={this.bottomLeftBadge} class={this.host.className}>
                    </yoo-badge></div>) : null,
            this.bottomRightBadge ? (
                <div class="bottom-right">
                    <yoo-badge text={this.bottomRightBadge} class={this.host.className}>
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
                {this.heading ? <span class="card-heading">{this.heading}</span> : null}
                {this.date ? <span class="date-card">{this.date}</span> : null}
                {this.hasMenu ?
                    <yoo-context-menu>
                        <div slot="trigger"><span class="menu-icon"><i class="yo-more-v"></i></span></div>
                        <div class="context-container">
                            <slot name="menu-slot" />
                        </div>
                    </yoo-context-menu>
                    : null}
            </div>,
            (this.subheadings ? this.subheadings.map((item) =>
                <div class="subheading-container" innerHTML={item}></div>
            ) : null),
            (this.badges ?
                <div class="badges-container">
                    {this.badges.map((item) =>
                        <yoo-tag class="round outline dark" icon={item.iconLeft} text={item.text} closable={item.closable} ></yoo-tag>)}
                </div>
                : null)
            ]
        );
    }

    renderBottomContent(): JSX.Element {
        return (
            [<div class="avatar-container" attr-layout="row">
                {this.avatarImgs.map((avatarSrc, index) => {
                    if (index < MAX_AVATAR_DISPLAY) {
                        return (<yoo-avatar class="medium" img-src={avatarSrc}></yoo-avatar>);
                    }
                })}
            </div>,
            this.actionButtonTitle ?
                <div class="action-button-container" attr-layout="row">
                    <yoo-button text={this.actionButtonTitle} class={this.host.className + ' squared'} onClick={() => this.onActionButtonClick()}></yoo-button>
                </div> : null]
        );
    }

    render(): JSX.Element {
        return (
            this.horizontal ? (
                <div class={'outer-container ' + ((this.isActive) ? 'active' : '')} attr-layout="row">
                    <div class="image-container" attr-layout="row">
                        {this.renderImageContainerContent()}
                    </div>
                    <div class="status-container"></div>
                    <div class={'content-container ' + (this.heading === undefined && this.subheadings === undefined ? 'center' : '')} attr-layout="column">
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
            ) :
                (
                    <div class={'outer-container' + ((this.isActive) ? ' active' : '')}>
                        <div class="image-container" attr-layout="columns">
                            {this.renderImageContainerContent()}
                        </div>
                        <div class="status-container"></div>
                        <div class="content-container">
                            {this.renderHeadingContainerContent()}
                            <div class="slot-container" attr-layout="row">
                                <slot name="content-slot" />
                            </div>
                            {this.renderBottomContent()}
                        </div>
                    </div>
                )
        );
    }
}