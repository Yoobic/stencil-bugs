import { Component, Element, Prop, State, Event, EventEmitter } from '@stencil/core';
import { IFeed } from '@shared/interfaces';
import { getBackImageStyle, cloudinary, getUserDisplayName, getElementDimensions, showModal } from '../../../utils/helpers'; //intersectionObserve
import { pipes } from '../../../utils/pipes';
import { services } from '../../../services';
import { QueueController } from '@ionic/core';

@Component({
    tag: 'yoo-feed-detail',
    styleUrl: 'feed-detail.scss',
    scoped: true
})
export class YooFeedDetailComponent {
    MAX_LINE_HEIGHT = 20;

    @Prop() feed: IFeed;

    @Prop({ context: 'queue' }) queue: QueueController;

    @Event() groupClicked: EventEmitter<any>;
    @Event() commentClicked: EventEmitter<boolean>;
    @Event() likeClicked: EventEmitter<boolean>;
    @Event() likeCountClicked: EventEmitter<boolean>;
    @Event() commentCountClicked: EventEmitter<boolean>;
    @Event() imageClicked: EventEmitter<boolean>;

    @Element() host: HTMLStencilElement;

    @State() imageWidth: number = 520;
    @State() imageHeight: number = 260;
    @State() hasMoreBtn: boolean = false;
    @State() textVisible: boolean = false;

    componentWillLoad() {
        this.isTextOverflowing();
    }

    componentWillUpdate() {
    }

    componentDidLoad() {
        let dim = getElementDimensions(this.host);
        this.imageWidth = dim ? dim.width : this.imageWidth;
    }

    onDocumentClick() {
        let modal = document.createElement('yoo-form-document-dialog');
        modal.document = this.feed.document;
        modal.readonly = true;
        showModal(modal).then(ret => {});
    }

    renderInteraction(icon: string, count: string, click: () => void = () => { }, cssClass: string = ''): JSX.Element {
        return (
            <div class={'interaction ' + (cssClass ? cssClass : '')} onClick={() => click()}>
                {icon ? <i class={icon} /> : null} <span class="interaction-counter">{count}</span>
            </div>
        );
    }

    isTextOverflowing(): void {
        this.queue.read(() => {
            let descriptionContainer = this.host.querySelector('.feed-description');
            let descriptionHeight = getElementDimensions(descriptionContainer) ? getElementDimensions(descriptionContainer).height : 0;

            if (descriptionHeight > this.MAX_LINE_HEIGHT) {
                this.queue.write(() => {
                    descriptionContainer.classList.add('short-text');
                    if (!this.hasMoreBtn) {
                        this.hasMoreBtn = true;
                    }
                });
            }
        });
    }

    toggleText(ev: MouseEvent) {
        ev.stopPropagation();
        this.queue.read(() => {
            let slim = this.host.querySelector('yoo-slim-scroll');
            if (!this.textVisible) {
                this.queue.write(() => {
                    this.host.classList.add('scroll-display');
                    this.textVisible = !this.textVisible;
                    if (slim) {
                        setTimeout(() => {
                            slim.refresh();
                        }, 100);
                    }
                });
            } else {
                this.queue.write(() => {
                    this.host.classList.remove('scroll-display');
                    this.textVisible = !this.textVisible;
                });
            }
        });
    }

    renderHeader(): JSX.Element {
        return (<div class="feed-header" attr-layout="row">
            <yoo-avatar class="small" user={this.feed ? this.feed.user : null}></yoo-avatar>
            <div class="feed-heading" attr-layout="column">
                {this.feed && this.feed.user ? <span>{getUserDisplayName(this.feed.user)}</span> : null}
                <div>
                    {this.feed && this.feed.date ?
                        <span class="feed-date">{pipes.timeAgo.transform(this.feed._ect)}.</span>
                        : null}
                    {this.feed && this.feed.group && this.feed.group.length ?
                        <span class="feed-subheading"> {'Shared in'}
                            {typeof this.feed.group === 'string' ?
                                [<span> </span>, <span class="feed-group" onClick={() => this.groupClicked.emit(this.feed.group)}>{this.feed.group}</span>]
                                : this.feed.group.length ?
                                    (this.feed.group as string[]).slice(0, 1).map(g => [<span> </span>, <span class="feed-group" onClick={() => this.groupClicked.emit(g)}>{g}</span>])
                                    : null}
                        </span>
                        : null}
                </div>
            </div>
        </div>
        );
    }

    renderText(): JSX.Element {
        return (
            <div class="feed-text" attr-layout="column">
                {this.feed && this.feed.description ? <div class="feed-description">
                    <div class="description-content" innerHTML={services.translate.polyglot(this.feed.description)}></div>
                    {this.hasMoreBtn && services.coreConfig.isIonic() ? <span class="more" onClick={(ev) => this.toggleText(ev)}>{!this.textVisible ? '...' : ''}</span> : ''}
                </div> : null}
                {this.feed && this.feed.tags ?
                    <div class="feed-hashtags">
                        {this.feed && this.feed.tags.map(a => <span class="hashtag" innerHTML={`#${a.toLowerCase()} `}></span>)}
                    </div> : null}
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div class="feed-details-container" attr-layout="column">
                {this.renderHeader()}
                <div class="feed-image">
                    {this.feed && this.feed.image && this.feed.image._downloadURL ?
                        <div class="image" onClick={() => this.imageClicked.emit(true)} style={getBackImageStyle(cloudinary(this.feed.image._downloadURL, this.imageWidth, this.imageHeight))} />
                        : null}
                </div>
                <div class="feed-image-actions">
                    {/* TO IMPLEMENT */}
                </div>
                <div class="feed-interactions" attr-layout="row">
                    {/* CHANGE ICONS */}
                    {this.feed ?
                        [this.feed.disableLikes ? null : this.renderInteraction(this.feed.isLikedByMe ? 'yo-heart-solid liked' : 'yo-heart', '', () => this.likeClicked.emit(true)),
                        this.feed.disableComments ? null : this.renderInteraction('yo-comment', '', () => this.commentClicked.emit(true)),
                        this.feed.disableLikes ? null : this.renderInteraction(null, this.feed.likesCount + ' ' + services.translate.get('LIKES'), () => this.likeCountClicked.emit(true)),
                        this.feed.disableComments ? null : this.renderInteraction(null, this.feed.comments ? services.translate.get('VIEWALLCOMMENTS', { count: this.feed.comments.length }) : services.translate.get('FIRSTCOMMENT'), () => this.commentCountClicked.emit(true), 'stable')//,
                            //this.renderInteraction('yo-eye', this.feed.viewsCount ? this.feed.viewsCount : 0)
                        ] : null}
                </div>
                {this.renderText()}
                {this.feed && this.feed.document ?
                    <div class="feed-file">
                        <yoo-form-document class="dark" document={this.feed.document} readonly={true} onClick={() => this.onDocumentClick()}></yoo-form-document>
                    </div>
                : null}
                <div class={'overlay ' + (!services.coreConfig.isIonic() || (services.coreConfig.isIonic() && !this.textVisible) ? 'overlay-hidden' : '')} onClick={(ev) => { this.toggleText(ev); }}>
                    <div class="scroll-content">
                        <yoo-slim-scroll>
                            <div>
                                {this.renderHeader()}
                                {this.renderText()}
                            </div>
                        </yoo-slim-scroll>
                    </div>
                </div>
            </div>
        );
    }

}
