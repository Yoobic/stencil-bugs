/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooCardPlaceholderComponent {
    renderCardFeed() {
        return (h("div", { class: "outer-container card-feed" },
            h("div", { class: "animated-background" },
                h("div", { class: "feed-top" },
                    h("div", { class: "masker feed-heading-left" }),
                    h("div", { class: "masker feed-heading-middle" }),
                    h("div", { class: "masker feed-heading-right" }),
                    h("div", { class: "masker feed-heading-right-2" }),
                    h("div", { class: "masker feed-heading-bottom-2" }),
                    h("div", { class: "masker feed-heading-bottom" })),
                h("div", { class: "feed-under-img" },
                    h("div", { class: "masker feed-under-img-top" }),
                    h("div", { class: "masker feed-under-img-middle" }),
                    h("div", { class: "feed-icon" },
                        h("div", { class: "masker feed-icon-left" }),
                        h("div", { class: "masker feed-icon-left-2" }),
                        h("div", { class: "masker feed-icon-bottom" })),
                    h("div", { class: "feed-like" },
                        h("div", { class: "masker feed-like-left" }),
                        h("div", { class: "masker feed-like-bottom" })),
                    h("div", { class: "feed-description" },
                        h("div", { class: "masker feed-description-bottom" }))))));
    }
    renderCardList() {
        let entity = this.entityType;
        return (h("div", { class: 'outer-container card-list ' + entity },
            h("div", { class: "animated-background" },
                ((entity !== 'missions') && (entity !== 'environnement') ?
                    h("div", { class: "image-container" },
                        h("div", { class: "masker container-image" }),
                        (entity !== 'feedsComments' ?
                            h("div", { class: "masker container-image-2" })
                            : null))
                    : null),
                h("div", { class: "content-container" },
                    h("div", { class: "masker container-top" }),
                    ((entity !== 'missions') && (entity !== 'environnement') ?
                        h("div", { class: "masker container-left" })
                        : null),
                    ((entity !== 'folders') && (entity !== 'environnement') ?
                        h("div", { class: "masker container-middle" })
                        : null),
                    ((entity === 'feedsComments') ?
                        h("div", { class: "masker container-middle-2" })
                        : null),
                    ((entity === 'missions') || (entity === 'notifications') || (entity === 'folders') || (entity === 'environnement') ?
                        h("div", { class: "masker container-right" })
                        : null),
                    ((entity === 'missions') ?
                        h("div", { class: "masker container-right-2" })
                        : null),
                    h("div", { class: "masker container-bottom" })))));
    }
    renderCardListViews() {
        return (h("div", { class: "outer-container card-list views" },
            h("div", { class: "animated-background" },
                h("div", { class: "image-container" },
                    h("div", { class: "masker container-image" }),
                    h("div", { class: "masker container-image-2" })),
                h("div", { class: "content-container" },
                    h("div", { class: "masker container-top" }),
                    h("div", { class: "masker container-left" }),
                    h("div", { class: "masker container-right" }),
                    h("div", { class: "masker container-bottom" })))));
    }
    renderCardSticky() {
        return (h("div", { class: "outer-container card-sticky" },
            h("div", { class: "gradient-container animated-background" },
                h("div", { class: "text-container" },
                    h("div", { class: "category" },
                        h("div", { class: "masker category-content" })),
                    h("div", { class: "title" },
                        h("div", { class: "masker title-content" })),
                    h("div", { class: "button-card" },
                        h("div", { class: "masker button-content" }))))));
    }
    render() {
        switch (this.displayType) {
            case 'card-sticky': {
                return (this.renderCardSticky());
            }
            case 'card-list': {
                return (this.renderCardList());
            }
            case 'card-feed': {
                switch (this.entityType) {
                    case 'feeds': {
                        return (this.renderCardFeed());
                    }
                    case 'blog': {
                        return (this.renderCardFeed());
                    }
                }
                break;
            }
            default: {
                return (this.renderDefault());
            }
        }
    }
    renderDefault() {
        return (h("div", null));
    }
    static get is() { return "yoo-card-placeholder"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "displayType": {
            "type": String,
            "attr": "display-type"
        },
        "entityType": {
            "type": String,
            "attr": "entity-type"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return ":host {\n  display: block;\n  width: 100%; }\n  :host .outer-container {\n    background: var(--light, #FFFFFF);\n    width: 100%; }\n    :host .outer-container .masker {\n      background: var(--light, #FFFFFF);\n      position: absolute; }\n  :host .outer-container.card-sticky {\n    height: 209px; }\n    :host .outer-container.card-sticky .animated-background {\n      height: 100%; }\n      :host .outer-container.card-sticky .animated-background .masker.category-content,\n      :host .outer-container.card-sticky .animated-background .masker.title-content,\n      :host .outer-container.card-sticky .animated-background .masker.button-content {\n        left: 1.25rem; }\n      :host .outer-container.card-sticky .animated-background .masker.category-content {\n        top: 2.875rem;\n        height: 0.575rem;\n        width: 2.5rem; }\n      :host .outer-container.card-sticky .animated-background .masker.title-content {\n        top: 4.125rem;\n        height: 3.375rem;\n        width: 6.25rem; }\n      :host .outer-container.card-sticky .animated-background .masker.button-content {\n        top: 8.6875rem;\n        height: 1.5rem;\n        width: 4.625rem; }\n  :host .outer-container.card-feed {\n    height: 453px; }\n    :host .outer-container.card-feed .animated-background {\n      height: 100%; }\n      :host .outer-container.card-feed .animated-background .masker.feed-heading-left,\n      :host .outer-container.card-feed .animated-background .masker.feed-heading-middle {\n        left: 2.25rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-heading-left {\n        top: 0;\n        height: 2.25rem;\n        width: 0.59375rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-heading-middle {\n        top: 1.0625rem;\n        right: 0;\n        height: 0.1875rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-heading-right {\n        top: 0;\n        right: 0;\n        left: 11.8125rem;\n        height: 1.0625rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-heading-right-2 {\n        top: 1.25rem;\n        right: 0;\n        left: 21.1875rem;\n        height: 0.9375rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-heading-bottom-2 {\n        top: 2.1875rem;\n        left: 2.25rem;\n        right: 0;\n        height: 0.0625rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-heading-bottom {\n        top: 2.25rem;\n        left: 0;\n        right: 0;\n        height: 0.9375rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-under-img-top {\n        left: 0;\n        right: 0;\n        top: 19.4375rem;\n        height: 1rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-under-img-middle {\n        left: 2.0625rem;\n        top: 20.4375rem;\n        width: 0.9375rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-icon-left,\n      :host .outer-container.card-feed .animated-background .masker.feed-icon-left-2 {\n        top: 20.375rem;\n        height: 1.125rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-icon-left {\n        left: 1.125rem;\n        width: 0.9375rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-icon-left-2 {\n        left: 3.3125rem;\n        right: 0; }\n      :host .outer-container.card-feed .animated-background .masker.feed-icon-bottom {\n        top: 21.5rem;\n        left: 0;\n        right: 0;\n        height: 0.9375rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-like-bottom {\n        top: 23.5625rem;\n        right: 0;\n        left: 0;\n        height: 0.1875rem; }\n      :host .outer-container.card-feed .animated-background .masker.feed-description-bottom {\n        top: 27.3125rem;\n        right: 0;\n        left: 0;\n        bottom: 0; }\n  :host .outer-container.card-list .animated-background {\n    height: 100%;\n    margin-right: 1rem; }\n  :host .outer-container.feedsComment {\n    height: 107px; }\n    :host .outer-container.feedsComment .animated-background .container-image {\n      top: 2.875rem;\n      bottom: 0;\n      left: 0;\n      width: 2.25rem; }\n    :host .outer-container.feedsComment .animated-background .container-top {\n      top: 0;\n      left: 0;\n      right: 0;\n      height: 0.625rem; }\n    :host .outer-container.feedsComment .animated-background .container-left {\n      top: 0;\n      bottom: 0;\n      left: 2.25rem;\n      width: 0.625rem; }\n    :host .outer-container.feedsComment .animated-background .container-middle {\n      top: 1.75rem;\n      left: 2.25rem;\n      right: 0;\n      height: 0.5rem; }\n    :host .outer-container.feedsComment .animated-background .container-middle-2 {\n      top: 4.5rem;\n      left: 2.25rem;\n      right: 0;\n      height: 0.5rem; }\n    :host .outer-container.feedsComment .animated-background .container-bottom {\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 0.6875rem; }\n  :host .outer-container.channel .animated-background .container-image,\n  :host .outer-container.channels .animated-background .container-image,\n  :host .outer-container.views .animated-background .container-image {\n    top: 0;\n    height: 0.9375rem;\n    left: 0;\n    width: 2.8125rem; }\n  :host .outer-container.channel .animated-background .container-image-2,\n  :host .outer-container.channels .animated-background .container-image-2,\n  :host .outer-container.views .animated-background .container-image-2 {\n    bottom: 0;\n    height: 0.9375rem;\n    left: 0;\n    width: 2.8125rem; }\n  :host .outer-container.channel .animated-background .container-left,\n  :host .outer-container.channels .animated-background .container-left,\n  :host .outer-container.views .animated-background .container-left {\n    top: 0;\n    bottom: 0;\n    left: 2.8125rem;\n    width: 0.625rem; }\n  :host .outer-container.channel,\n  :host .outer-container.channels {\n    height: 75px; }\n    :host .outer-container.channel .animated-background .container-top,\n    :host .outer-container.channels .animated-background .container-top {\n      top: 0;\n      left: 0;\n      right: 0;\n      height: 0.4375rem; }\n    :host .outer-container.channel .animated-background .container-middle,\n    :host .outer-container.channels .animated-background .container-middle {\n      top: 1.75rem;\n      left: 2.8125rem;\n      right: 0;\n      height: 0.125rem; }\n    :host .outer-container.channel .animated-background .container-bottom,\n    :host .outer-container.channels .animated-background .container-bottom {\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 0.5625rem; }\n  :host .outer-container.views {\n    height: 65px; }\n    :host .outer-container.views .container-top {\n      top: 0;\n      left: 2.8125rem;\n      right: 0;\n      height: 1.5rem; }\n    :host .outer-container.views .container-bottom {\n      bottom: 0;\n      left: 2.8125rem;\n      right: 0;\n      height: 1.5rem; }\n    :host .outer-container.views .container-right {\n      top: 1.5rem;\n      left: 15.1875rem;\n      right: 0;\n      height: 1.0625rem; }\n  :host .outer-container.users .container-top,\n  :host .outer-container.notifications .container-top {\n    top: 0;\n    left: 2.8125rem;\n    right: 0;\n    height: 0.5625rem; }\n  :host .outer-container.users .container-left,\n  :host .outer-container.notifications .container-left {\n    top: 0;\n    bottom: 0;\n    left: 2.8125rem;\n    width: 0.625rem; }\n  :host .outer-container.users .container-middle,\n  :host .outer-container.notifications .container-middle {\n    top: 1.875rem;\n    left: 2.8125rem;\n    right: 0;\n    height: 0.2rem; }\n  :host .outer-container.users .container-bottom,\n  :host .outer-container.notifications .container-bottom {\n    bottom: 0;\n    left: 2.8125rem;\n    right: 0;\n    height: 0.5625rem; }\n  :host .outer-container.users {\n    height: 59px; }\n    :host .outer-container.users .container-image {\n      top: 0;\n      height: 0.625rem;\n      left: 0;\n      width: 2.8125rem; }\n    :host .outer-container.users .container-image-2 {\n      bottom: 0;\n      height: 0.625rem;\n      left: 0;\n      width: 2.8125rem; }\n  :host .outer-container.notifications {\n    height: 75px; }\n    :host .outer-container.notifications .container-image {\n      top: 0;\n      height: 1.0625rem;\n      left: 0;\n      width: 2.8125rem; }\n    :host .outer-container.notifications .container-image-2 {\n      bottom: 0;\n      height: 1.0625rem;\n      left: 0;\n      width: 2.8125rem; }\n    :host .outer-container.notifications .container-right {\n      top: 0.5625rem;\n      left: 9.6875rem;\n      right: 5.5rem;\n      height: 1.3125rem; }\n  :host .outer-container.missions {\n    height: 55px; }\n    :host .outer-container.missions .container-top {\n      top: 0;\n      left: 0;\n      right: 0;\n      height: 0.625rem; }\n    :host .outer-container.missions .container-right {\n      top: 0.625rem;\n      left: 10rem;\n      right: 4rem;\n      height: 1.125rem; }\n    :host .outer-container.missions .container-right-2 {\n      top: 2rem;\n      left: 3.5rem;\n      right: 0;\n      height: 1.125rem; }\n    :host .outer-container.missions .container-middle {\n      top: 1.75rem;\n      left: 0;\n      right: 0;\n      height: 0.25rem; }\n    :host .outer-container.missions .container-bottom {\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 0.3125rem; }\n  :host .outer-container.environnement {\n    height: 44px; }\n    :host .outer-container.environnement .container-top {\n      top: 0;\n      left: 0;\n      right: 0;\n      height: 0.6875rem; }\n    :host .outer-container.environnement .container-right {\n      top: 0.6875rem;\n      left: 9.6875rem;\n      right: 0;\n      height: 1.3125rem; }\n    :host .outer-container.environnement .container-bottom {\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 0.75rem; }\n  :host .outer-container.folders {\n    height: 43px; }\n    :host .outer-container.folders .container-image {\n      top: 0;\n      height: 0.4375rem;\n      left: 0;\n      width: 1.875rem; }\n    :host .outer-container.folders .container-image-2 {\n      bottom: 0;\n      height: 0.4375rem;\n      left: 0;\n      width: 1.875rem; }\n    :host .outer-container.folders .container-top {\n      top: 0;\n      left: 1.875rem;\n      right: 0;\n      height: 0.3125rem; }\n    :host .outer-container.folders .container-left {\n      top: 0;\n      bottom: 0;\n      left: 1.875rem;\n      width: 0.625rem; }\n    :host .outer-container.folders .container-right {\n      top: 0;\n      bottom: 0;\n      left: 9.6875rem;\n      right: 0; }\n    :host .outer-container.folders .container-bottom {\n      bottom: 0;\n      left: 1.875rem;\n      right: 0;\n      height: 1.0625rem; }\n\n\@-webkit-keyframes placeHolderShimmer {\n  0% {\n    background-position: -29.25rem 0; }\n  100% {\n    background-position: 29.25rem 0; } }\n\n\@keyframes placeHolderShimmer {\n  0% {\n    background-position: -29.25rem 0; }\n  100% {\n    background-position: 29.25rem 0; } }\n  :host .animated-background {\n    -webkit-animation-duration: 1s;\n            animation-duration: 1s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n    -webkit-animation-name: placeHolderShimmer;\n            animation-name: placeHolderShimmer;\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    background: #f6f7f8;\n    background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));\n    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);\n    background-size: 50rem 6.5rem;\n    position: relative; }"; }
}

export { YooCardPlaceholderComponent as YooCardPlaceholder };
