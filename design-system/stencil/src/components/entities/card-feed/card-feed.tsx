import { Component, Element, Prop, State, Event, EventEmitter } from '@stencil/core';
import { getBackImageStyle, cloudinary, getElementDimensions, execHandlerAndStopEvent } from '../../../utils/helpers'; //intersectionObserve, resizeObserve, debounce
import { QueueController } from '@ionic/core';
import { ICardEntry } from '@shared/interfaces';
import { services } from '../../../services';

@Component({
    tag: 'yoo-card-feed',
    styleUrl: 'card-feed.scss',
    scoped: true
})
export class YooCardFeedComponent {
    MAX_LINE_HEIGHT = 40;

    @Prop({ context: 'queue' }) queue: QueueController;

    @Prop() entry: ICardEntry;

    @Event() groupClicked: EventEmitter<any>;
    @Event() bottomActionClicked: EventEmitter<boolean>;

     @Element() host: HTMLStencilElement;

    @State() imageWidth: number = 335;
    @State() imageHeight: number = 260;
    @State() hasMoreBtn: boolean = false;

    private hiddenText: boolean = false;
    //private resizeObserver: ResizeObserver;

    componentWillLoad() {
        this.isTextOverflowing();
    }

    componentDidLoad() {
        //let image = this.host.querySelector('.image');
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

    renderCardImage(): JSX.Element {
        return (this.entry && this.entry.imgSrc ?
            <div class="image" style={getBackImageStyle(cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight))} ></div>
            : null);
    }

    renderImageContainerContent(): JSX.Element {
        return (
            [this.entry && this.entry.topLeftBadge ? (
                <div class="badge-top-left">
                    <yoo-badge text={this.entry.topLeftBadge} class={this.host.className + 'transparent round'}>
                    </yoo-badge></div>) : null,
            this.entry && this.entry.topRightBadge ? (
                <div class="badge-top-right">
                    <yoo-badge text={this.entry.topRightBadge} class={this.host.className + 'transparent round'}>
                    </yoo-badge></div>) : null,
            this.entry && this.entry.bottomLeftBadge ? (
                <div class="badge-bottom-left">
                    <yoo-badge text={this.entry.bottomLeftBadge} class={this.host.className + 'transparent round'}>
                    </yoo-badge></div>) : null,
            this.entry && this.entry.bottomRightBadge ? (
                <div class="badge-bottom-right">
                    <yoo-badge text={this.entry.bottomRightBadge} class={this.host.className + 'transparent round'}>
                    </yoo-badge></div>) : null,
            this.entry && this.entry.bottomLeftIcon ? (
                <div><span class="bottom-left-icon inner-icon"><i class={this.entry.bottomLeftIcon}></i></span></div>
            ) : null,
            this.entry && this.entry.bottomRightIcon ? (
                <div><span class="bottom-right-icon inner-icon"><i class={this.entry.bottomRightIcon}></i></span></div>
            ) : null,
            this.entry && this.entry.topLeftIcon ? (
                <div><span class="top-left-icon inner-icon"><i class={this.entry.topLeftIcon}></i></span></div>
            ) : null,
            this.entry && this.entry.topRightIcon ? (
                <div><span class="top-right-icon inner-icon"><i class={this.entry.topRightIcon}></i></span></div>
            ) : null,
            this.renderCardImage()]
        );
    }

    isTextOverflowing(): void {
        this.queue.read(() => {
            let descriptionContainer = this.host.querySelector('.feed-description');
            let descriptionHeight = getElementDimensions(descriptionContainer) ? getElementDimensions(descriptionContainer).height : 0;

            if (descriptionHeight > this.MAX_LINE_HEIGHT) {
                this.queue.write(() => {
                    descriptionContainer.classList.add('short-text');
                    this.hasMoreBtn = true;
                });
            }
        });
    }

    toggleText(ev: MouseEvent) {
        ev.stopPropagation();
        this.queue.read(() => {
            let descriptionContainer = this.host.querySelector('.feed-description');
            let span = this.host.querySelector('.more');
            if (!this.hiddenText) {
                this.queue.write(() => {
                    descriptionContainer.classList.remove('short-text');
                    descriptionContainer.classList.add('long-text');
                    span.innerHTML = services.translate.get('VIEWLESS'); //less '<i class="yo-up"></i>';
                    this.hiddenText = !this.hiddenText;
                });
            } else {
                this.queue.write(() => {
                    descriptionContainer.classList.add('short-text');
                    descriptionContainer.classList.remove('long-text');
                    span.innerHTML = '...'; //more
                    this.hiddenText = !this.hiddenText;
                });
            }
        });
    }

    render(): JSX.Element {
        return (
            <div class="outer-container">
                <div class="feed-top" attr-layout="row">
                    <yoo-avatar class="small" imgSrc={this.entry ? this.entry.icon : null} user={this.entry ? this.entry.user : null}></yoo-avatar>
                    <div class="feed-heading" attr-layout="column">
                        {this.entry && this.entry.heading ? <span>{this.entry.heading}</span> : null}
                        <div>
                            {this.entry && this.entry.subheadings && this.entry.subheadings.length ?
                                <span class="feed-subheading">{this.entry.subheadings[0]}.</span>
                                : null}
                            {this.entry && this.entry.groups && this.entry.groups.length ?
                                <span class="feed-subheading"> {this.entry.sharedIn ? this.entry.sharedIn : 'Shared in'}
                                    {this.entry.groups.slice(0, 1).map(g => [<span> </span>, <span class="feed-group" onClick={() => this.groupClicked.emit(g)}>{g}</span>])}
                                </span>
                                : null}
                        </div>
                    </div>
                    {this.entry && this.entry.actions ? <div class="feed-menu">
                        <i class="yo-more-v"></i>
                    </div> : null}
                </div>
                <div class="image-container" attr-layout="columns">
                    {this.renderImageContainerContent()}
                </div>
                <div class="feed-under-img" attr-layout="column">
                    <div>
                        {this.entry && this.entry.badges ?
                            <div class="feed-badges">
                                {this.entry.badges.map((item) =>
                                    <yoo-badge class={item.cssClass ? item.cssClass : ''} icon-left={item.iconLeft} text={item.text} closable={item.closable} ></yoo-badge>)}
                            </div>
                            : null}
                    </div>
                    <div>
                        {this.entry && this.entry.icons && this.entry.icons.length ? this.entry.icons.map(icon =>
                            <span class="feed-icon" onClick={(ev) => execHandlerAndStopEvent(ev, icon.handler)}>
                                <i class={icon.icon} />{icon.value ? ' ' + icon.value : null}
                            </span>)
                            : null}
                    </div>
                    {this.entry && (this.entry.topActions) ?
                        <div class="info-feed">
                            {this.entry.topActions.map(a =>
                                <span onClick={(ev) => execHandlerAndStopEvent(ev, a.handler)}>{a.text}</span>
                            )}
                            {/* {this.entry.likesCount ? <span>{this.entry.likesCount + ' likes'}</span> : null}
                            {this.entry.viewCount ? <span>{this.entry.viewCount + ' views'}</span> : null} */}
                        </div>
                        : null}
                    {this.entry && this.entry.description ? <div class="feed-description">
                        <div class="description-content" innerHTML={this.entry.description}></div>
                        {this.hasMoreBtn ? <span class="more" onClick={(ev) => this.toggleText(ev)}>...</span> : ''}
                    </div> : null}
                    {this.entry && this.entry.tags ?
                        <div class="feed-hashtags">
                            {this.entry && this.entry.tags.map(a => <span class="hashtag" innerHTML={`#${a.toLowerCase()} `}></span>)}
                        </div> : null}
                    {this.entry && this.entry.bottomAction && this.entry.bottomAction.name ?
                        <div class="feed-bottom-action">
                            <span id="action" onClick={(ev) => {
                                this.bottomActionClicked.emit(true);
                                execHandlerAndStopEvent(ev, this.entry.bottomAction.handler);
                            }}>{this.entry.bottomAction.name}</span>
                        </div> : null}
                </div>
            </div>
        );
    }
}
