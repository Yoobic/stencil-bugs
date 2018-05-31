/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { b as getBackImageStyle, c as cloudinary, h as getUserDisplayName, d as getElementDimensions } from './chunk-75914b41.js';
import { a as pipes } from './chunk-7a5da8d2.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';
import './chunk-b8bd1aac.js';
import './chunk-e9552ef3.js';

class YooFeedDetailComponent {
    constructor() {
        this.MAX_LINE_HEIGHT = 100;
        this.imageWidth = 520;
        this.imageHeight = 260;
        this.hasMoreBtn = false;
        this.textVisible = false;
        this.translate = window.translateService;
        this.coreConfig = window.coreConfigService;
    }
    componentWillLoad() {
        this.coreConfig ? this.isMobile = this.coreConfig.isIonic() : this.isMobile = false;
        this.isTextOverflowing();
    }
    componentWillUpdate() {
    }
    componentDidLoad() {
        let dim = getElementDimensions(this.host);
        this.imageWidth = dim ? dim.width : this.imageWidth;
    }
    renderInteraction(icon, count, click = () => { }, cssClass = '') {
        return (h("div", { class: 'interaction ' + (cssClass ? cssClass : ''), onClick: () => click() },
            icon ? h("i", { class: icon }) : null,
            " ",
            h("span", { class: "interaction-counter" }, count)));
    }
    isTextOverflowing() {
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
    toggleText(ev) {
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
            }
            else {
                this.queue.write(() => {
                    this.host.classList.remove('scroll-display');
                    this.textVisible = !this.textVisible;
                });
            }
        });
    }
    renderHeader() {
        return (h("div", { class: "feed-header", "attr-layout": "row" },
            h("yoo-avatar", { class: "small", user: this.feed ? this.feed.user : null }),
            h("div", { class: "feed-heading", "attr-layout": "column" },
                this.feed && this.feed.user ? h("span", null, getUserDisplayName(this.feed.user)) : null,
                h("div", null,
                    this.feed && this.feed.date ?
                        h("span", { class: "feed-date" },
                            pipes.timeAgo.transform(this.feed._ect),
                            ".")
                        : null,
                    this.feed && this.feed.group && this.feed.group.length ?
                        h("span", { class: "feed-subheading" },
                            " ",
                            'Shared in',
                            typeof this.feed.group === 'string' ?
                                [h("span", null, " "), h("span", { class: "feed-group", onClick: () => this.groupClicked.emit(this.feed.group) }, this.feed.group)]
                                : this.feed.group.length ?
                                    this.feed.group.slice(0, 1).map(g => [h("span", null, " "), h("span", { class: "feed-group", onClick: () => this.groupClicked.emit(g) }, g)])
                                    : null)
                        : null))));
    }
    renderText() {
        return (h("div", { class: "feed-text", "attr-layout": "column" },
            this.feed && this.feed.description ? h("div", { class: "feed-description" },
                h("div", { class: "description-content", innerHTML: this.translate.polyglot(this.feed.description) }),
                this.hasMoreBtn && this.isMobile ? h("span", { class: "more", onClick: (ev) => this.toggleText(ev) }, !this.textVisible ? '...' : '') : '') : null,
            this.feed && this.feed.tags ?
                h("div", { class: "feed-hashtags" }, this.feed && this.feed.tags.map(a => h("span", { class: "hashtag", innerHTML: `#${a.toLowerCase()} ` }))) : null));
    }
    render() {
        return (h("div", { class: "feed-details-container", "attr-layout": "column" },
            this.renderHeader(),
            h("div", { class: "feed-image" }, this.feed && this.feed.image && this.feed.image._downloadURL ?
                h("div", { class: "image", onClick: () => this.imageClicked.emit(true), style: getBackImageStyle(cloudinary(this.feed.image._downloadURL, this.imageWidth, this.imageHeight)) })
                : null),
            h("div", { class: "feed-image-actions" }),
            h("div", { class: "feed-interactions", "attr-layout": "row" }, this.feed ?
                [this.feed.disableLikes ? null : this.renderInteraction(this.feed.isLikedByMe ? 'yo-heart-solid liked' : 'yo-heart', '', () => this.likeClicked.emit(true)),
                    this.feed.disableComments ? null : this.renderInteraction('yo-comment', '', () => this.commentClicked.emit(true)),
                    this.feed.disableLikes ? null : this.renderInteraction(null, this.feed.likesCount + ' ' + this.translate.get('LIKES'), () => this.likeCountClicked.emit(true)),
                    this.feed.disableComments ? null : this.renderInteraction(null, this.feed.comments ? this.translate.get('VIEWALLCOMMENTS', { count: this.feed.comments.length }) : this.translate.get('FIRSTCOMMENT'), () => this.commentCountClicked.emit(true), 'stable') //,
                    //this.renderInteraction('yo-eye', this.feed.viewsCount ? this.feed.viewsCount : 0)
                ] : null),
            this.renderText(),
            h("div", { class: 'overlay ' + (!this.isMobile || (this.isMobile && !this.textVisible) ? 'overlay-hidden' : ''), onClick: (ev) => { this.toggleText(ev); } },
                h("div", { class: "scroll-content" },
                    h("yoo-slim-scroll", null,
                        h("div", null,
                            this.renderHeader(),
                            this.renderText()))))));
    }
    static get is() { return "yoo-feed-detail"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "feed": {
            "type": "Any",
            "attr": "feed"
        },
        "hasMoreBtn": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "imageHeight": {
            "state": true
        },
        "imageWidth": {
            "state": true
        },
        "queue": {
            "context": "queue"
        },
        "textVisible": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "groupClicked",
            "method": "groupClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "commentClicked",
            "method": "commentClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "likeClicked",
            "method": "likeClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "likeCountClicked",
            "method": "likeCountClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "commentCountClicked",
            "method": "commentCountClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "imageClicked",
            "method": "imageClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-feed-detail-host] {\n  height: 100%; }\n  [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail] {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    height: 100%;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    padding: 22px 35px;\n    color: var(--black, #000000); }\n    [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-header[data-yoo-feed-detail] {\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n      -ms-flex-align: center;\n      align-items: center; }\n      [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-header[data-yoo-feed-detail]   yoo-avatar[data-yoo-feed-detail] {\n        margin-right: 0.8rem;\n        -webkit-transform: translateY(3px);\n                transform: translateY(3px); }\n      [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-header[data-yoo-feed-detail]   .feed-heading[data-yoo-feed-detail] {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1;\n        -ms-flex: 1;\n        flex: 1;\n        font-size: 0.875rem;\n        font-weight: 700; }\n        [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-header[data-yoo-feed-detail]   .feed-heading[data-yoo-feed-detail]   .feed-subheading[data-yoo-feed-detail] {\n          font-size: 0.75rem;\n          font-weight: 400;\n          color: var(--stable, #adadad); }\n          [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-header[data-yoo-feed-detail]   .feed-heading[data-yoo-feed-detail]   .feed-subheading[data-yoo-feed-detail]   .feed-group[data-yoo-feed-detail] {\n            color: var(--dark, #444); }\n    [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .overlay.overlay-hidden[data-yoo-feed-detail] {\n      display: none; }\n    [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-image[data-yoo-feed-detail] {\n      height: 260px;\n      margin-top: 13px;\n      margin-bottom: 30px; }\n      [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-image[data-yoo-feed-detail]   .image[data-yoo-feed-detail] {\n        height: 100%;\n        width: 100%;\n        border-radius: 3px; }\n    [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-interactions[data-yoo-feed-detail] {\n      margin-bottom: 1rem; }\n      [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-interactions[data-yoo-feed-detail]   .interaction[data-yoo-feed-detail] {\n        display: inline-block;\n        margin: 0rem 1rem 0rem 0rem;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center; }\n        [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-interactions[data-yoo-feed-detail]   .interaction[data-yoo-feed-detail]   i[data-yoo-feed-detail] {\n          font-size: 1.2rem; }\n          [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-interactions[data-yoo-feed-detail]   .interaction[data-yoo-feed-detail]   i.liked[data-yoo-feed-detail] {\n            color: var(--danger, #ff625f); }\n        [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-interactions[data-yoo-feed-detail]   .interaction.stable[data-yoo-feed-detail] {\n          color: var(--stable, #adadad); }\n    [data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-text[data-yoo-feed-detail]   .feed-hashtags[data-yoo-feed-detail] {\n      line-height: 1.2rem;\n      color: var(--success, #2EDBB7);\n      display: block; }\n\n.mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail] {\n  background: var(--black, #000000);\n  color: var(--light, #FFFFFF) !important;\n  font-weight: 400;\n  padding: 0.9375rem 0.9375rem; }\n  .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-header[data-yoo-feed-detail] {\n    -webkit-box-ordinal-group: 3;\n    -webkit-order: 2;\n    -ms-flex-order: 2;\n    order: 2;\n    margin-top: 2rem;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end; }\n    .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-header[data-yoo-feed-detail]   .feed-heading[data-yoo-feed-detail]   .feed-subheading[data-yoo-feed-detail] {\n      color: var(--light, #FFFFFF); }\n      .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-header[data-yoo-feed-detail]   .feed-heading[data-yoo-feed-detail]   .feed-subheading[data-yoo-feed-detail]   .feed-group[data-yoo-feed-detail] {\n        color: var(--light, #FFFFFF); }\n  .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-image[data-yoo-feed-detail] {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n    -ms-flex-order: 1;\n    order: 1;\n    margin: 0px -35px 0px -35px; }\n    .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-image[data-yoo-feed-detail]   .image[data-yoo-feed-detail] {\n      border-radius: 0px; }\n  .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-interactions[data-yoo-feed-detail] {\n    -webkit-box-ordinal-group: 5;\n    -webkit-order: 4;\n    -ms-flex-order: 4;\n    order: 4;\n    margin-top: 15px; }\n  .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-text[data-yoo-feed-detail] {\n    margin-top: 15px;\n    -webkit-box-ordinal-group: 4;\n    -webkit-order: 3;\n    -ms-flex-order: 3;\n    order: 3; }\n    .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-text[data-yoo-feed-detail]   .feed-description[data-yoo-feed-detail] {\n      white-space: normal;\n      line-height: 1.2rem;\n      overflow: hidden;\n      position: relative;\n      color: var(--light, #FFFFFF); }\n      .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-text[data-yoo-feed-detail]   .feed-description.short-text[data-yoo-feed-detail] {\n        height: 100px;\n        max-height: 100px;\n        margin: 0;\n        padding-right: 50px;\n        white-space: nowrap; }\n        .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-text[data-yoo-feed-detail]   .feed-description.short-text[data-yoo-feed-detail]   .description-content[data-yoo-feed-detail] {\n          font-size: inherit;\n          line-height: inherit;\n          text-overflow: ellipsis;\n          overflow: hidden;\n          white-space: normal;\n          color: inherit; }\n        .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-text[data-yoo-feed-detail]   .feed-description.short-text[data-yoo-feed-detail]   .more[data-yoo-feed-detail] {\n          font-size: 1.2rem;\n          position: absolute;\n          bottom: 0px;\n          right: 38px; }\n      .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-text[data-yoo-feed-detail]   .feed-description.long-text[data-yoo-feed-detail]   .more[data-yoo-feed-detail] {\n        color: var(--text-color, #807f83); }\n      .mobile[data-yoo-feed-detail-host]   .feed-details-container[data-yoo-feed-detail]   .feed-text[data-yoo-feed-detail]   .feed-description[data-yoo-feed-detail]    p {\n        margin: 0;\n        overflow: hidden;\n        font-size: inherit;\n        line-height: 1.2rem;\n        white-space: normal;\n        color: inherit; }\n\n.mobile.scroll-display[data-yoo-feed-detail-host]   .overlay[data-yoo-feed-detail] {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.6);\n  padding: 0 0.9375rem;\n  bottom: 60px;\n  margin: 0 -0.9375rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex; }\n  .mobile.scroll-display[data-yoo-feed-detail-host]   .overlay[data-yoo-feed-detail]   .scroll-content[data-yoo-feed-detail] {\n    -webkit-align-self: flex-end;\n    -ms-flex-item-align: end;\n    align-self: flex-end;\n    height: 60%; }\n    .mobile.scroll-display[data-yoo-feed-detail-host]   .overlay[data-yoo-feed-detail]   .scroll-content[data-yoo-feed-detail]   yoo-slim-scroll[data-yoo-feed-detail] {\n      position: relative; }\n    .mobile.scroll-display[data-yoo-feed-detail-host]   .overlay[data-yoo-feed-detail]   .scroll-content[data-yoo-feed-detail]   .feed-text[data-yoo-feed-detail]   .description-content[data-yoo-feed-detail] {\n      opacity: 1; }\n    .mobile.scroll-display[data-yoo-feed-detail-host]   .overlay[data-yoo-feed-detail]   .scroll-content[data-yoo-feed-detail]   .feed-text[data-yoo-feed-detail]   .feed-hashtags[data-yoo-feed-detail] {\n      opacity: 1; }\n    .mobile.scroll-display[data-yoo-feed-detail-host]   .overlay[data-yoo-feed-detail]   .scroll-content[data-yoo-feed-detail]   .feed-header[data-yoo-feed-detail] {\n      margin-top: 0 !important;\n      opacity: 1; }\n\n.mobile.scroll-display[data-yoo-feed-detail-host]   .feed-text[data-yoo-feed-detail]   .description-content[data-yoo-feed-detail] {\n  opacity: 0; }\n\n.mobile.scroll-display[data-yoo-feed-detail-host]   .feed-text[data-yoo-feed-detail]   .feed-hashtags[data-yoo-feed-detail] {\n  opacity: 0; }\n\n.mobile.scroll-display[data-yoo-feed-detail-host]   .feed-header[data-yoo-feed-detail] {\n  opacity: 0; }"; }
}

export { YooFeedDetailComponent as YooFeedDetail };
