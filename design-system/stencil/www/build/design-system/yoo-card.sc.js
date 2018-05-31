/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { b as getBackImageStyle, c as cloudinary, e as resizeObserve, f as debounce, d as getElementDimensions, g as execHandlerAndStopEvent, h as getUserDisplayName } from './chunk-75914b41.js';
import { a as pipes } from './chunk-7a5da8d2.js';
import { b as isString } from './chunk-cdfb4b5d.js';
import './chunk-a7525511.js';
import './chunk-b8bd1aac.js';
import './chunk-e9552ef3.js';

const MAX_AVATAR_DISPLAY = 4;
class YooCardComponent {
    constructor() {
        this.imgSrc = '../../assets/empty-states/empty.svg';
        this.avatarImgs = [];
        this.isActivable = false;
        this.isUserCard = false;
        this.avatarShape = 'rectangle';
        this.hasMenu = false;
        this.isActive = false;
        this.imageWidth = 340;
        this.imageHeight = 160;
    }
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
    onCheckboxToggled(event) {
        event.detail === 'checked' ? this.isActive = true : this.isActive = false;
        this.active.emit(this.isActive);
    }
    onActionButtonClick() {
        this.actionPress.emit(true);
    }
    renderCardImage() {
        if (this.avatarShape === 'rectangle') {
            return (h("div", { class: "image", style: getBackImageStyle(cloudinary(this.imgSrc, this.imageWidth, this.imageHeight)) }));
        }
        else if (this.avatarShape === 'circle') {
            return (h("yoo-avatar", { class: "large", "img-src": this.imgSrc }));
        }
    }
    onImageResize(target, width, height, left, top, entry) {
        // this.imageWidth = width;
        // this.imageHeight = height;
    }
    renderImageContainerContent() {
        return ([this.topLeftBadge ? (h("div", { class: 'top-left' + (this.isActivable ? ' active' : '') },
                h("yoo-badge", { text: this.topLeftBadge, class: this.host.className }))) : null,
            this.topRightBadge ? (h("div", { class: "top-right" },
                h("yoo-badge", { text: this.topRightBadge, class: this.host.className }))) : null,
            this.bottomLeftBadge ? (h("div", { class: "bottom-left" },
                h("yoo-badge", { text: this.bottomLeftBadge, class: this.host.className }))) : null,
            this.bottomRightBadge ? (h("div", { class: "bottom-right" },
                h("yoo-badge", { text: this.bottomRightBadge, class: this.host.className }))) : null,
            this.renderCardImage(),
            this.isActivable ?
                h("yoo-form-checkbox", { class: this.host.className, onCheckboxToggled: (event) => this.onCheckboxToggled(event) })
                : null]);
    }
    renderHeadingContainerContent() {
        return ([h("div", { class: "heading-container", "attr-layout": "row" },
                this.heading ? h("span", { class: "card-heading" }, this.heading) : null,
                this.date ? h("span", { class: "date-card" }, this.date) : null,
                this.hasMenu ?
                    h("yoo-context-menu", null,
                        h("div", { slot: "trigger" },
                            h("span", { class: "menu-icon" },
                                h("i", { class: "yo-more-v" }))),
                        h("div", { class: "context-container" },
                            h("slot", { name: "menu-slot" })))
                    : null),
            (this.subheadings ? this.subheadings.map((item) => h("div", { class: "subheading-container", innerHTML: item })) : null),
            (this.badges ?
                h("div", { class: "badges-container" }, this.badges.map((item) => h("yoo-tag", { class: "round outline dark", icon: item.iconLeft, text: item.text, closable: item.closable })))
                : null)
        ]);
    }
    renderBottomContent() {
        return ([h("div", { class: "avatar-container", "attr-layout": "row" }, this.avatarImgs.map((avatarSrc, index) => {
                if (index < MAX_AVATAR_DISPLAY) {
                    return (h("yoo-avatar", { class: "medium", "img-src": avatarSrc }));
                }
            })),
            this.actionButtonTitle ?
                h("div", { class: "action-button-container", "attr-layout": "row" },
                    h("yoo-button", { text: this.actionButtonTitle, class: this.host.className + ' squared', onClick: () => this.onActionButtonClick() })) : null]);
    }
    render() {
        return (this.horizontal ? (h("div", { class: 'outer-container ' + ((this.isActive) ? 'active' : ''), "attr-layout": "row" },
            h("div", { class: "image-container", "attr-layout": "row" }, this.renderImageContainerContent()),
            h("div", { class: "status-container" }),
            h("div", { class: 'content-container ' + (this.heading === undefined && this.subheadings === undefined ? 'center' : ''), "attr-layout": "column" },
                h("div", { class: "top-container" }, this.renderHeadingContainerContent()),
                h("div", { class: "slot-container", "attr-layout": "row" },
                    h("slot", { name: "content-slot" }),
                    h("div", { class: "inner-container", "attr-layout": "column" }, this.renderBottomContent()))))) :
            (h("div", { class: 'outer-container' + ((this.isActive) ? ' active' : '') },
                h("div", { class: "image-container", "attr-layout": "columns" }, this.renderImageContainerContent()),
                h("div", { class: "status-container" }),
                h("div", { class: "content-container" },
                    this.renderHeadingContainerContent(),
                    h("div", { class: "slot-container", "attr-layout": "row" },
                        h("slot", { name: "content-slot" })),
                    this.renderBottomContent()))));
    }
    static get is() { return "yoo-card"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "actionButtonTitle": {
            "type": String,
            "attr": "action-button-title"
        },
        "animationName": {
            "type": String,
            "attr": "animation-name"
        },
        "avatarImgs": {
            "type": "Any",
            "attr": "avatar-imgs"
        },
        "avatarShape": {
            "type": String,
            "attr": "avatar-shape"
        },
        "badges": {
            "type": "Any",
            "attr": "badges"
        },
        "bottomLeftBadge": {
            "type": String,
            "attr": "bottom-left-badge"
        },
        "bottomRightBadge": {
            "type": String,
            "attr": "bottom-right-badge"
        },
        "date": {
            "type": String,
            "attr": "date"
        },
        "hasMenu": {
            "type": Boolean,
            "attr": "has-menu"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "horizontal": {
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
        "imgSrc": {
            "type": String,
            "attr": "img-src"
        },
        "isActivable": {
            "type": Boolean,
            "attr": "is-activable"
        },
        "isActive": {
            "state": true
        },
        "isUserCard": {
            "type": Boolean,
            "attr": "is-user-card"
        },
        "subheadings": {
            "type": "Any",
            "attr": "subheadings"
        },
        "topLeftBadge": {
            "type": String,
            "attr": "top-left-badge"
        },
        "topRightBadge": {
            "type": String,
            "attr": "top-right-badge"
        }
    }; }
    static get events() { return [{
            "name": "active",
            "method": "active",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "actionPress",
            "method": "actionPress",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-card-host]   .avatar[data-yoo-card] {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex; }\n  [data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], [data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], [data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card], [data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n    z-index: 1;\n    position: absolute;\n    background-color: var(--light, #FFFFFF);\n    border: 1px solid var(--dark-10, #ececec);\n    border-radius: 50%;\n    padding: 0.2em 0.45em; }\n  [data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], [data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], [data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], [data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n    font-size: 0.5rem;\n    height: auto;\n    width: auto; }\n  [data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n    top: 0rem;\n    right: 0rem; }\n  [data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n    top: 0rem;\n    left: 0rem; }\n  [data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n    bottom: 0rem;\n    right: 0rem; }\n  [data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n    bottom: 0rem;\n    left: 0rem; }\n  [data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card] {\n    position: absolute;\n    top: 48%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    color: var(--success, #2EDBB7); }\n  [data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n    background: var(--light, #FFFFFF);\n    border-radius: 50%;\n    height: 2.5rem;\n    width: 2.5rem;\n    color: var(--light, #FFFFFF); }\n    [data-yoo-card-host]   .avatar[data-yoo-card]   .image.initial-container[data-yoo-card], [data-yoo-card-host]   .avatar[data-yoo-card]   .image.icon-container[data-yoo-card] {\n      border: 1px solid var(--dark-10, #ececec); }\n    [data-yoo-card-host]   .avatar[data-yoo-card]   .image.icon-container[data-yoo-card] {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n      -ms-flex-align: center;\n      align-items: center;\n      color: var(--success, #2EDBB7); }\n\n.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  border-radius: 10%; }\n\n.xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  height: 1.375rem;\n  width: 1.375rem; }\n\n.xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  font-size: 0.5rem; }\n\n.xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.1875rem;\n  height: auto;\n  width: auto; }\n\n.xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.xsmall[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.xsmall.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .xsmall.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .xsmall.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .xsmall.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.1875rem;\n  height: auto;\n  width: auto; }\n\n.xsmall.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.xsmall.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.xsmall.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.xsmall.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.small[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  height: 2.25rem;\n  width: 2.25rem; }\n\n.small[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .small[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  font-size: 1rem; }\n\n.small[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .small[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .small[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .small[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.3125rem;\n  height: auto;\n  width: auto; }\n\n.small[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.small[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.small[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.small[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.3125rem;\n  height: auto;\n  width: auto; }\n\n.small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  height: 1.875rem;\n  width: 1.875rem; }\n\n.list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  font-size: 0.8rem; }\n\n.list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.list-small[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.list-small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .list-small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .list-small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .list-small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.list-small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.list-small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.list-small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.list-small.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  height: 2.8125rem;\n  width: 2.8125rem; }\n\n.xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  font-size: 1.375rem; }\n\n.xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.xmedium[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.xmedium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .xmedium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .xmedium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .xmedium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.xmedium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.xmedium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.xmedium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.xmedium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.medium[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  height: 3.125rem;\n  width: 3.125rem; }\n\n.medium[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .medium[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  font-size: 1.375rem; }\n\n.medium[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .medium[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .medium[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .medium[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.medium[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.medium[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.medium[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.medium[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.medium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .medium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .medium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .medium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.medium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.medium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.medium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.medium.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.large[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  height: 4.375rem;\n  width: 4.375rem; }\n\n.large[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .large[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  font-size: 2rem; }\n\n.large[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .large[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .large[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .large[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.64rem;\n  height: 1.4375rem;\n  width: 1.4375rem; }\n\n.large[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.large[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.large[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.large[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.large.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .large.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .large.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .large.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: 0.64rem;\n  height: 1.4375rem;\n  width: 1.4375rem; }\n\n.large.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.large.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.large.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.large.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  height: 5.625rem;\n  width: 5.625rem; }\n\n.xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  font-size: 3rem; }\n\n.xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: var(--font-size, 16px);\n  height: auto;\n  width: auto; }\n\n.xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.xlarge[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.xlarge.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card], .xlarge.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card], .xlarge.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card], .xlarge.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  font-size: var(--font-size, 16px);\n  height: auto;\n  width: auto; }\n\n.xlarge.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  top: -4%;\n  right: -4%; }\n\n.xlarge.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  top: -4%;\n  left: -4%; }\n\n.xlarge.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  bottom: -4%;\n  right: -4%; }\n\n.xlarge.squared[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  bottom: -4%;\n  left: -4%; }\n\n.profile[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  height: 25px;\n  width: 25px; }\n\n.profile[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card] {\n  font-size: 0.7rem; }\n\n.large-border[data-yoo-card-host]   .avatar[data-yoo-card]   span[data-yoo-card]:not(.user-initial) {\n  border: 2px solid var(--light, #FFFFFF) !important; }\n\n.accent[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--accent, #1FB6FF);\n  color: var(--light, #FFFFFF); }\n\n.accent[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--accent, #1FB6FF);\n  color: var(--light, #FFFFFF); }\n\n.accent[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--accent, #1FB6FF); }\n\n.accent[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--accent, #1FB6FF); }\n\n.accent[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--accent, #1FB6FF); }\n\n.accent[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .accent[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.dark[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--dark-40, #b4b4b4);\n  color: var(--light, #FFFFFF); }\n\n.dark[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--dark-40, #b4b4b4);\n  color: var(--light, #FFFFFF); }\n\n.dark[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--dark-40, #b4b4b4); }\n\n.dark[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--dark-40, #b4b4b4); }\n\n.dark[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--dark-40, #b4b4b4); }\n\n.dark[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .dark[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.success[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--success, #2EDBB7);\n  color: var(--light, #FFFFFF); }\n\n.success[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--success, #2EDBB7);\n  color: var(--light, #FFFFFF); }\n\n.success[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--success, #2EDBB7); }\n\n.success[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--success, #2EDBB7); }\n\n.success[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--success, #2EDBB7); }\n\n.success[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .success[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.danger[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n.danger[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n.danger[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--danger, #ff625f); }\n\n.danger[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--danger, #ff625f); }\n\n.danger[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--danger, #ff625f); }\n\n.danger[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .danger[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.warning[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--warning, #ff6402);\n  color: var(--light, #FFFFFF); }\n\n.warning[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--warning, #ff6402);\n  color: var(--light, #FFFFFF); }\n\n.warning[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--warning, #ff6402); }\n\n.warning[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--warning, #ff6402); }\n\n.warning[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--warning, #ff6402); }\n\n.warning[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .warning[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.info[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--info, #fc459e);\n  color: var(--light, #FFFFFF); }\n\n.info[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--info, #fc459e);\n  color: var(--light, #FFFFFF); }\n\n.info[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--info, #fc459e); }\n\n.info[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--info, #fc459e); }\n\n.info[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--info, #fc459e); }\n\n.info[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .info[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.gradient-accent[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-accent[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-accent[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n.gradient-accent[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n.gradient-accent[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n.gradient-accent[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .gradient-accent[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.gradient-info[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860));\n  color: var(--light, #FFFFFF); }\n\n.gradient-info[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860));\n  color: var(--light, #FFFFFF); }\n\n.gradient-info[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n.gradient-info[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n.gradient-info[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n.gradient-info[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .gradient-info[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.gradient-dark[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-dark[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-dark[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n.gradient-dark[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n.gradient-dark[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n.gradient-dark[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .gradient-dark[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.gradient-danger[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634));\n  color: var(--light, #FFFFFF); }\n\n.gradient-danger[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634));\n  color: var(--light, #FFFFFF); }\n\n.gradient-danger[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n.gradient-danger[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n.gradient-danger[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n.gradient-danger[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .gradient-danger[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.gradient-warning[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-warning[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-warning[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n.gradient-warning[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n.gradient-warning[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n.gradient-warning[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .gradient-warning[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n.gradient-success[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card] {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78));\n  color: var(--light, #FFFFFF); }\n\n.gradient-success[data-yoo-card-host]   .avatar[data-yoo-card]   .top-right[data-yoo-card] {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78));\n  color: var(--light, #FFFFFF); }\n\n.gradient-success[data-yoo-card-host]   .avatar[data-yoo-card]   .top-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n.gradient-success[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-right[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n.gradient-success[data-yoo-card-host]   .avatar[data-yoo-card]   .bottom-left[data-yoo-card] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n.gradient-success[data-yoo-card-host]   .avatar[data-yoo-card]   .user-initial[data-yoo-card], .gradient-success[data-yoo-card-host]   .avatar[data-yoo-card]   .image[data-yoo-card]   .icon-container[data-yoo-card] {\n  color: var(--dark, #444); }\n\n[data-yoo-card-host] {\n  display: block; }\n  [data-yoo-card-host]   .outer-container[data-yoo-card] {\n    width: 100%;\n    border: 1px solid var(--dark-10, #ececec);\n    border-radius: 2px;\n    -webkit-box-shadow: 0px 0px 3px 1px var(--dark-10, #ececec);\n    box-shadow: 0px 0px 3px 1px var(--dark-10, #ececec); }\n    [data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card] {\n      height: 10rem;\n      position: relative;\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .image[data-yoo-card] {\n        width: 100%;\n        height: 100%;\n        background: var(--light, #FFFFFF); }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   yoo-form-checkbox[data-yoo-card] {\n        position: absolute;\n        top: 0.5rem;\n        left: 0.5rem; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   yoo-avatar[data-yoo-card] {\n        -webkit-align-self: center;\n        -ms-flex-item-align: center;\n        align-self: center; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .bottom-left[data-yoo-card] {\n        position: absolute;\n        bottom: 0.5rem;\n        left: 0.5rem; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .bottom-right[data-yoo-card] {\n        position: absolute;\n        bottom: 0.5rem;\n        right: 0.5rem; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .top-left[data-yoo-card] {\n        position: absolute;\n        top: 0.5rem;\n        left: 0.5rem; }\n        [data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .top-left.active[data-yoo-card] {\n          top: 2rem; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .top-right[data-yoo-card] {\n        position: absolute;\n        top: 0.5rem;\n        right: 0.5rem; }\n    [data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n      background: var(--dark-10, #ececec);\n      height: 1px; }\n    [data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card] {\n      padding-left: 0.5rem;\n      padding-top: 0.3rem;\n      padding-right: 0.5rem;\n      padding-bottom: 0.5rem;\n      background: var(--light, #FFFFFF); }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .heading-container[data-yoo-card] {\n        font-size: 1rem;\n        color: var(--dark-120, #363636);\n        font-weight: 500; }\n        [data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .heading-container[data-yoo-card]   .card-heading[data-yoo-card] {\n          -webkit-box-flex: 1;\n          -webkit-flex: 1;\n          -ms-flex: 1;\n          flex: 1; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .subheading-container[data-yoo-card] {\n        font-size: 0.9rem;\n        color: var(--dark, #444);\n        font-weight: 400; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .badges-container[data-yoo-card]   yoo-badge[data-yoo-card] {\n        margin-right: 0.3rem; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .avatar-container[data-yoo-card] {\n        margin-top: 0.5rem;\n        -webkit-box-pack: end;\n        -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n        justify-content: flex-end;\n        padding-right: 0.5rem; }\n        [data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .avatar-container[data-yoo-card]   yoo-avatar[data-yoo-card] {\n          margin-right: 0.15rem;\n          margin-left: 0.15rem; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .action-button-container[data-yoo-card] {\n        -webkit-box-pack: end;\n        -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n        justify-content: flex-end; }\n      [data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .slot-container[data-yoo-card] {\n        font-size: 0.9rem;\n        color: var(--dark-60, #8f8f8f); }\n    [data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n      -webkit-box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n      box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n      border: 1px solid var(--accent, #1FB6FF); }\n\n.horizontal[data-yoo-card-host]   .outer-container[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card] {\n  max-width: 30rem; }\n  .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n    width: 0.0625em;\n    height: unset; }\n  .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card] {\n    width: 10rem;\n    position: relative; }\n    .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   yoo-form-checkbox[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   yoo-form-checkbox[data-yoo-card] {\n      position: absolute;\n      top: 0.5rem;\n      left: 0.5rem; }\n    .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   yoo-avatar[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   yoo-avatar[data-yoo-card] {\n      -webkit-align-self: center;\n      -ms-flex-item-align: center;\n      align-self: center; }\n    .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .bottom-left[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .bottom-left[data-yoo-card] {\n      position: absolute;\n      bottom: 0.5rem;\n      left: 0.5rem; }\n    .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .bottom-right[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .bottom-right[data-yoo-card] {\n      position: absolute;\n      bottom: 0.5rem;\n      right: 0.5rem; }\n    .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .top-left[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .top-left[data-yoo-card] {\n      position: absolute;\n      top: 0.5rem;\n      left: 0.5rem; }\n      .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .top-left.active[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .top-left.active[data-yoo-card] {\n        top: 2rem; }\n    .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .top-right[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   .top-right[data-yoo-card] {\n      position: absolute;\n      top: 0.5rem;\n      right: 0.5rem; }\n  .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card] {\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    width: 20rem;\n    padding: 0.5rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n    .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container.center[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container.center[data-yoo-card] {\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center; }\n    .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .slot-container[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .slot-container[data-yoo-card] {\n      -webkit-box-pack: justify;\n      -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n      justify-content: space-between; }\n      .horizontal[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .slot-container[data-yoo-card]   .inner-container[data-yoo-card], .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .slot-container[data-yoo-card]   .inner-container[data-yoo-card] {\n        -webkit-box-pack: end;\n        -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n        justify-content: flex-end;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center; }\n\n.list-mode[data-yoo-card-host]   .outer-container[data-yoo-card] {\n  max-width: none; }\n  .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card] {\n    width: unset; }\n    .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .image-container[data-yoo-card]   yoo-avatar[data-yoo-card] {\n      -webkit-transform: scale(0.7);\n              transform: scale(0.7); }\n  .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n    display: none; }\n  .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card] {\n    width: 100%; }\n    .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .top-container[data-yoo-card]   .heading-container[data-yoo-card]   .card-heading[data-yoo-card] {\n      font-weight: bold; }\n    .list-mode[data-yoo-card-host]   .outer-container[data-yoo-card]   .content-container[data-yoo-card]   .top-container[data-yoo-card]   .heading-container[data-yoo-card]   .date-card[data-yoo-card] {\n      color: var(--dark-60, #8f8f8f);\n      font-size: 0.9rem; }\n\n.active[data-yoo-card-host]   .outer-container[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  border: 1px solid var(--accent, #1FB6FF); }\n\n.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  border: 1px solid var(--accent, #1FB6FF); }\n\n.accent[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--accent, #1FB6FF); }\n\n.accent[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  border: 1px solid var(--accent, #1FB6FF); }\n\n.accent.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--accent, #1FB6FF);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF); }\n\n.dark[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--dark-40, #b4b4b4); }\n\n.dark[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--dark-40, #b4b4b4);\n  box-shadow: 0px 0px 3px 1px var(--dark-40, #b4b4b4);\n  border: 1px solid var(--dark-40, #b4b4b4); }\n\n.dark.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--dark-40, #b4b4b4);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--dark-40, #b4b4b4);\n  box-shadow: 0px 0px 3px 1px var(--dark-40, #b4b4b4); }\n\n.warning[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--warning, #ff6402); }\n\n.warning[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--warning, #ff6402);\n  box-shadow: 0px 0px 3px 1px var(--warning, #ff6402);\n  border: 1px solid var(--warning, #ff6402); }\n\n.warning.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--warning, #ff6402);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--warning, #ff6402);\n  box-shadow: 0px 0px 3px 1px var(--warning, #ff6402); }\n\n.success[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--success, #2EDBB7); }\n\n.success[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--success, #2EDBB7);\n  box-shadow: 0px 0px 3px 1px var(--success, #2EDBB7);\n  border: 1px solid var(--success, #2EDBB7); }\n\n.success.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--success, #2EDBB7);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--success, #2EDBB7);\n  box-shadow: 0px 0px 3px 1px var(--success, #2EDBB7); }\n\n.info[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--info, #fc459e); }\n\n.info[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--info, #fc459e);\n  box-shadow: 0px 0px 3px 1px var(--info, #fc459e);\n  border: 1px solid var(--info, #fc459e); }\n\n.info.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--info, #fc459e);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--info, #fc459e);\n  box-shadow: 0px 0px 3px 1px var(--info, #fc459e); }\n\n.danger[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--danger, #ff625f); }\n\n.danger[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--danger, #ff625f);\n  box-shadow: 0px 0px 3px 1px var(--danger, #ff625f);\n  border: 1px solid var(--danger, #ff625f); }\n\n.danger.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--danger, #ff625f);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--danger, #ff625f);\n  box-shadow: 0px 0px 3px 1px var(--danger, #ff625f); }\n\n.g[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--g, ); }\n\n.g[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--g, );\n  box-shadow: 0px 0px 3px 1px var(--g, );\n  border: 1px solid var(--g, ); }\n\n.g.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--g, );\n  -webkit-box-shadow: 0px 0px 3px 1px var(--g, );\n  box-shadow: 0px 0px 3px 1px var(--g, ); }\n\n.gradient-accent[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--accent, #1FB6FF); }\n\n.gradient-accent[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  border: 1px solid var(--accent, #1FB6FF); }\n\n.gradient-accent.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--accent, #1FB6FF);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF); }\n\n.gradient-dark[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--dark-40, #b4b4b4); }\n\n.gradient-dark[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--dark-40, #b4b4b4);\n  box-shadow: 0px 0px 3px 1px var(--dark-40, #b4b4b4);\n  border: 1px solid var(--dark-40, #b4b4b4); }\n\n.gradient-dark.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--dark-40, #b4b4b4);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--dark-40, #b4b4b4);\n  box-shadow: 0px 0px 3px 1px var(--dark-40, #b4b4b4); }\n\n.gradient-warning[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--warning, #ff6402); }\n\n.gradient-warning[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--warning, #ff6402);\n  box-shadow: 0px 0px 3px 1px var(--warning, #ff6402);\n  border: 1px solid var(--warning, #ff6402); }\n\n.gradient-warning.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--warning, #ff6402);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--warning, #ff6402);\n  box-shadow: 0px 0px 3px 1px var(--warning, #ff6402); }\n\n.gradient-success[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--success, #2EDBB7); }\n\n.gradient-success[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--success, #2EDBB7);\n  box-shadow: 0px 0px 3px 1px var(--success, #2EDBB7);\n  border: 1px solid var(--success, #2EDBB7); }\n\n.gradient-success.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--success, #2EDBB7);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--success, #2EDBB7);\n  box-shadow: 0px 0px 3px 1px var(--success, #2EDBB7); }\n\n.gradient-info[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--info, #fc459e); }\n\n.gradient-info[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--info, #fc459e);\n  box-shadow: 0px 0px 3px 1px var(--info, #fc459e);\n  border: 1px solid var(--info, #fc459e); }\n\n.gradient-info.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--info, #fc459e);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--info, #fc459e);\n  box-shadow: 0px 0px 3px 1px var(--info, #fc459e); }\n\n.gradient-danger[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--danger, #ff625f); }\n\n.gradient-danger[data-yoo-card-host]   .outer-container.active[data-yoo-card] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--danger, #ff625f);\n  box-shadow: 0px 0px 3px 1px var(--danger, #ff625f);\n  border: 1px solid var(--danger, #ff625f); }\n\n.gradient-danger.hoverable[data-yoo-card-host]:hover   .outer-container[data-yoo-card] {\n  border: 1px solid var(--danger, #ff625f);\n  -webkit-box-shadow: 0px 0px 3px 1px var(--danger, #ff625f);\n  box-shadow: 0px 0px 3px 1px var(--danger, #ff625f); }\n\n.no-status[data-yoo-card-host]   .outer-container[data-yoo-card]   .status-container[data-yoo-card] {\n  background: var(--dark-10, #ececec);\n  height: 1px; }"; }
}

class YooCardFeedComponent {
    constructor() {
        this.MAX_LINE_HEIGHT = 40;
        this.imageWidth = 335;
        this.imageHeight = 260;
        this.hasMoreBtn = false;
        this.hiddenText = false;
    }
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
    renderCardImage() {
        return (this.entry && this.entry.imgSrc ?
            h("div", { class: "image", style: getBackImageStyle(cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight)) })
            : null);
    }
    renderImageContainerContent() {
        return ([this.entry && this.entry.topLeftBadge ? (h("div", { class: "badge-top-left" },
                h("yoo-badge", { text: this.entry.topLeftBadge, class: this.host.className + 'transparent round' }))) : null,
            this.entry && this.entry.topRightBadge ? (h("div", { class: "badge-top-right" },
                h("yoo-badge", { text: this.entry.topRightBadge, class: this.host.className + 'transparent round' }))) : null,
            this.entry && this.entry.bottomLeftBadge ? (h("div", { class: "badge-bottom-left" },
                h("yoo-badge", { text: this.entry.bottomLeftBadge, class: this.host.className + 'transparent round' }))) : null,
            this.entry && this.entry.bottomRightBadge ? (h("div", { class: "badge-bottom-right" },
                h("yoo-badge", { text: this.entry.bottomRightBadge, class: this.host.className + 'transparent round' }))) : null,
            this.entry && this.entry.bottomLeftIcon ? (h("div", null,
                h("span", { class: "bottom-left-icon inner-icon" },
                    h("i", { class: this.entry.bottomLeftIcon })))) : null,
            this.entry && this.entry.bottomRightIcon ? (h("div", null,
                h("span", { class: "bottom-right-icon inner-icon" },
                    h("i", { class: this.entry.bottomRightIcon })))) : null,
            this.entry && this.entry.topLeftIcon ? (h("div", null,
                h("span", { class: "top-left-icon inner-icon" },
                    h("i", { class: this.entry.topLeftIcon })))) : null,
            this.entry && this.entry.topRightIcon ? (h("div", null,
                h("span", { class: "top-right-icon inner-icon" },
                    h("i", { class: this.entry.topRightIcon })))) : null,
            this.renderCardImage()]);
    }
    isTextOverflowing() {
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
    toggleText(ev) {
        ev.stopPropagation();
        this.queue.read(() => {
            let descriptionContainer = this.host.querySelector('.feed-description');
            let span = this.host.querySelector('.more');
            if (!this.hiddenText) {
                this.queue.write(() => {
                    descriptionContainer.classList.remove('short-text');
                    descriptionContainer.classList.add('long-text');
                    span.innerHTML = window.translateService.get('VIEWLESS'); //less '<i class="yo-up"></i>';
                    this.hiddenText = !this.hiddenText;
                });
            }
            else {
                this.queue.write(() => {
                    descriptionContainer.classList.add('short-text');
                    descriptionContainer.classList.remove('long-text');
                    span.innerHTML = '...'; //more
                    this.hiddenText = !this.hiddenText;
                });
            }
        });
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "feed-top", "attr-layout": "row" },
                h("yoo-avatar", { class: "small", imgSrc: this.entry ? this.entry.icon : null, user: this.entry ? this.entry.user : null }),
                h("div", { class: "feed-heading", "attr-layout": "column" },
                    this.entry && this.entry.heading ? h("span", null, this.entry.heading) : null,
                    h("div", null,
                        this.entry && this.entry.subheadings && this.entry.subheadings.length ?
                            h("span", { class: "feed-subheading" },
                                this.entry.subheadings[0],
                                ".")
                            : null,
                        this.entry && this.entry.groups && this.entry.groups.length ?
                            h("span", { class: "feed-subheading" },
                                " ",
                                this.entry.sharedIn ? this.entry.sharedIn : 'Shared in',
                                this.entry.groups.slice(0, 1).map(g => [h("span", null, " "), h("span", { class: "feed-group", onClick: () => this.groupClicked.emit(g) }, g)]))
                            : null)),
                this.entry && this.entry.actions ? h("div", { class: "feed-menu" },
                    h("i", { class: "yo-more-v" })) : null),
            h("div", { class: "image-container", "attr-layout": "columns" }, this.renderImageContainerContent()),
            h("div", { class: "feed-under-img", "attr-layout": "column" },
                h("div", null, this.entry && this.entry.badges ?
                    h("div", { class: "feed-badges" }, this.entry.badges.map((item) => h("yoo-badge", { class: item.cssClass ? item.cssClass : '', "icon-left": item.iconLeft, text: item.text, closable: item.closable })))
                    : null),
                h("div", null, this.entry && this.entry.icons && this.entry.icons.length ? this.entry.icons.map(icon => h("span", { class: "feed-icon", onClick: (ev) => execHandlerAndStopEvent(ev, icon.handler) },
                    h("i", { class: icon.icon }),
                    icon.value ? ' ' + icon.value : null))
                    : null),
                this.entry && (this.entry.topActions) ?
                    h("div", { class: "info-feed" }, this.entry.topActions.map(a => h("span", { onClick: (ev) => execHandlerAndStopEvent(ev, a.handler) }, a.text)))
                    : null,
                this.entry && this.entry.description ? h("div", { class: "feed-description" },
                    h("div", { class: "description-content", innerHTML: this.entry.description }),
                    this.hasMoreBtn ? h("span", { class: "more", onClick: (ev) => this.toggleText(ev) }, "...") : '') : null,
                this.entry && this.entry.tags ?
                    h("div", { class: "feed-hashtags" }, this.entry && this.entry.tags.map(a => h("span", { class: "hashtag", innerHTML: `#${a.toLowerCase()} ` }))) : null,
                this.entry && this.entry.bottomAction && this.entry.bottomAction.name ?
                    h("div", { class: "feed-bottom-action" },
                        h("span", { id: "action", onClick: (ev) => {
                                this.bottomActionClicked.emit(true);
                                execHandlerAndStopEvent(ev, this.entry.bottomAction.handler);
                            } }, this.entry.bottomAction.name)) : null)));
    }
    static get is() { return "yoo-card-feed"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "entry": {
            "type": "Any",
            "attr": "entry"
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
        }
    }; }
    static get events() { return [{
            "name": "groupClicked",
            "method": "groupClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "bottomActionClicked",
            "method": "bottomActionClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed] {\n  border: none;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  padding-bottom: 1rem; }\n  [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-top[data-yoo-card-feed] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-top[data-yoo-card-feed]   yoo-avatar[data-yoo-card-feed] {\n      margin-right: 0.8rem;\n      -webkit-transform: translateY(3px);\n              transform: translateY(3px); }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-top[data-yoo-card-feed]   .feed-heading[data-yoo-card-feed] {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n      -ms-flex: 1;\n      flex: 1;\n      font-size: 0.875rem;\n      font-weight: 700;\n      color: var(--dark, #444); }\n      [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-top[data-yoo-card-feed]   .feed-heading[data-yoo-card-feed]   .feed-subheading[data-yoo-card-feed] {\n        font-size: 0.75rem;\n        font-weight: 400;\n        color: var(--text-color, #807f83); }\n        [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-top[data-yoo-card-feed]   .feed-heading[data-yoo-card-feed]   .feed-subheading[data-yoo-card-feed]   .feed-group[data-yoo-card-feed] {\n          color: var(--dark, #444); }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-top[data-yoo-card-feed]   .feed-menu[data-yoo-card-feed] {\n      color: var(--stable, #adadad);\n      margin-right: 1px; }\n  [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed] {\n    position: relative;\n    height: 260px;\n    margin-top: 0.5rem;\n    margin-bottom: 0.8rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed]   .image[data-yoo-card-feed] {\n      border-radius: 6px;\n      -webkit-box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.15);\n      box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.15);\n      width: 100%;\n      height: 100%; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed]   .inner-icon[data-yoo-card-feed] {\n      background-color: var(--light, #FFFFFF);\n      border-radius: 50%;\n      padding: 0.2em 0.45em; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed]   .bottom-left-icon[data-yoo-card-feed] {\n      position: absolute;\n      bottom: 0.9375rem;\n      left: 0.9375rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed]   .bottom-right-icon[data-yoo-card-feed] {\n      position: absolute;\n      bottom: 0.9375rem;\n      right: 0.9375rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed]   .top-left-icon[data-yoo-card-feed] {\n      position: absolute;\n      top: 0.9375rem;\n      left: 0.9375rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed]   .top-right-icon[data-yoo-card-feed] {\n      position: absolute;\n      top: 0.9375rem;\n      right: 0.9375rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed]   .badge-bottom-left[data-yoo-card-feed] {\n      position: absolute;\n      bottom: 0.9375rem;\n      left: 0.9375rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed]   .badge-bottom-right[data-yoo-card-feed] {\n      position: absolute;\n      bottom: 0.9375rem;\n      right: 0.9375rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed]   .badge-top-left[data-yoo-card-feed] {\n      position: absolute;\n      top: 0.9375rem;\n      left: 0.9375rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .image-container[data-yoo-card-feed]   .badge-top-right[data-yoo-card-feed] {\n      position: absolute;\n      top: 0.9375rem;\n      right: 0.9375rem; }\n  [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .content-container[data-yoo-card-feed] {\n    padding: 0px; }\n  [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed] {\n    font-size: 0.875rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .feed-badges[data-yoo-card-feed] {\n      margin-bottom: 0.625rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .feed-icon[data-yoo-card-feed] {\n      margin-top: 0.2rem;\n      margin-right: 0.9375rem;\n      color: var(--black, #000000); }\n      [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .feed-icon[data-yoo-card-feed]   i[data-yoo-card-feed] {\n        font-size: 1.1rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .info-feed[data-yoo-card-feed] {\n      margin-top: 0.9375rem;\n      color: var(--dark, #444); }\n      [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .info-feed[data-yoo-card-feed]   span[data-yoo-card-feed] {\n        margin-right: 0.9375rem; }\n    [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .feed-description[data-yoo-card-feed] {\n      white-space: normal;\n      line-height: 1.2rem;\n      overflow: hidden;\n      position: relative;\n      color: var(--dark-110, #3d3d3d); }\n      [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .feed-description.short-text[data-yoo-card-feed] {\n        height: 40px;\n        max-height: 40px;\n        margin: 0;\n        padding-right: 50px;\n        white-space: nowrap; }\n        [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .feed-description.short-text[data-yoo-card-feed]   .description-content[data-yoo-card-feed] {\n          font-size: inherit;\n          line-height: inherit;\n          text-overflow: ellipsis;\n          overflow: hidden;\n          white-space: normal;\n          color: inherit; }\n        [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .feed-description.short-text[data-yoo-card-feed]   .more[data-yoo-card-feed] {\n          font-size: 1.2rem;\n          position: absolute;\n          top: 17px;\n          right: 38px; }\n      [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .feed-description.long-text[data-yoo-card-feed]   .more[data-yoo-card-feed] {\n        color: var(--text-color, #807f83); }\n      [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-under-img[data-yoo-card-feed]   .feed-description[data-yoo-card-feed]    p {\n        margin: 0;\n        overflow: hidden;\n        font-size: inherit;\n        line-height: 1.2rem;\n        white-space: normal;\n        color: inherit; }\n  [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-hashtags[data-yoo-card-feed] {\n    line-height: 1.2rem;\n    color: var(--success, #2EDBB7); }\n  [data-yoo-card-feed-host]   .outer-container[data-yoo-card-feed]   .feed-bottom-action[data-yoo-card-feed] {\n    line-height: 1.2rem;\n    color: var(--text-color, #807f83);\n    font-size: 0.8125rem;\n    cursor: pointer; }"; }
}

//import { resizeObserve, debounce } from '../../../utils/helpers'; //intersectionObserve
const MAX_AVATAR_DISPLAY$1 = 4;
class YooCardListComponent {
    constructor() {
        this.avatarImgs = [];
        this.isActivable = false;
        this.hasMenu = false;
        this.isActive = false;
        this.imageWidth = 340;
        this.imageHeight = 160;
    }
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
    onCheckboxToggled(event) {
        event.detail === 'checked' ? this.isActive = true : this.isActive = false;
        this.active.emit(this.isActive);
    }
    onActionButtonClick() {
        this.actionPress.emit(true);
    }
    renderCardImage() {
        let orderUser = this.entry.users ? this.entry.users.sort((a, b) => {
            return a.imageData && b.imageData ? 0 : !b.imageData ? -1 : 1;
        }) : [];
        return (this.entry && (!this.entry.users || !this.entry.users.length) ?
            h("yoo-avatar", { class: 'main ' + (this.entry && this.entry.avatarSize ? this.entry.avatarSize : 'list-small'), "img-src": this.entry.imgSrc, icon: this.entry.icon, "icon-text": this.entry.iconText })
            : this.entry && this.entry.users && this.entry.users.length === 1 ?
                h("yoo-avatar", { class: 'main ' + (this.entry && this.entry.avatarSize ? this.entry.avatarSize : 'list-small'), "img-src": this.entry.imgSrc, user: this.entry.users[0] })
                : this.entry && this.entry.users ?
                    h("div", { class: "multiple-avatar-container", "attr-layout": "column" },
                        h("div", { "attr-layout": "row", class: "top-avatars" }, orderUser.slice(0, 2).map((user, index) => {
                            return h("yoo-avatar", { class: "xsmall", user: user });
                        })),
                        h("div", { "attr-layout": "row" },
                            orderUser.slice(2, 3).map((user, index) => {
                                return h("yoo-avatar", { class: "xsmall", user: user });
                            }),
                            this.entry.users.length > 3 ?
                                h("div", { class: "avatar-hidden", "attr-layout": "row" },
                                    h("span", null,
                                        "+",
                                        this.entry.users.length - 3))
                                : null))
                    : null);
    }
    renderBottomContent() {
        return ([
            this.avatarImgs && this.avatarImgs.length > 0 ?
                h("div", { class: "avatar-container", "attr-layout": "row" }, this.avatarImgs.map((avatarSrc, index) => {
                    if (index < MAX_AVATAR_DISPLAY$1) {
                        return (h("yoo-avatar", { class: "xsmall", "img-src": avatarSrc }));
                    }
                })) : null,
            this.actionButtonTitle ?
                h("div", { class: "action-button-container", "attr-layout": "row" },
                    h("yoo-button", { text: this.actionButtonTitle, class: this.host.className + ' squared', onClick: () => this.onActionButtonClick() })) : null
        ]);
    }
    renderImageContainerContent() {
        return ([this.entry.topLeftBadge ? (h("div", { class: 'top-left' + (this.isActivable ? ' active' : '') },
                h("yoo-badge", { text: this.entry.topLeftBadge, class: "notification-medium danger" }))) : null,
            this.entry.topRightBadge ? (h("div", { class: "top-right" },
                h("yoo-badge", { text: this.entry.topRightBadge, class: "notification-medium danger" }))) : null,
            this.entry.bottomLeftBadge ? (h("div", { class: "bottom-left" },
                h("yoo-badge", { text: this.entry.bottomLeftBadge, class: "notification-medium danger" }))) : null,
            this.entry.bottomRightBadge ? (h("div", { class: "bottom-right" },
                h("yoo-badge", { text: this.entry.bottomRightBadge, class: "notification-medium danger" }))) : null,
            this.renderCardImage(),
            this.isActivable ?
                h("yoo-form-checkbox", { class: this.host.className, onCheckboxToggled: (event) => this.onCheckboxToggled(event) })
                : null]);
    }
    renderHeadingContainerContent() {
        return ([h("div", { class: "heading-container", "attr-layout": "row" },
                this.entry && this.entry.heading ? h("span", { class: "card-heading" }, this.entry.heading) : null,
                this.entry && this.entry.date ? h("span", { class: "date-card" }, this.entry.date) : null,
                this.hasMenu ?
                    h("yoo-context-menu", null,
                        h("div", { slot: "trigger" },
                            h("span", { class: "menu-icon" },
                                h("i", { class: "yo-more-v" }))),
                        h("div", { class: "context-container" },
                            h("slot", { name: "menu-slot" })))
                    : null),
            (this.entry && this.entry.topActions && this.entry.topActions.length ?
                h("div", null, this.entry.topActions.map(a => h("span", { onClick: (ev) => execHandlerAndStopEvent(ev, a.handler) }, a.text)))
                : null),
            (this.entry && this.entry.subheadings ? this.entry.subheadings.map((item) => h("div", { class: "subheading-container", innerHTML: item })) : null),
            (this.entry && (this.entry.badges || this.entry.tags || this.entry.icons || this.entry.bottomActions) ?
                h("div", { class: "badges-container", "attr-layout": "row" },
                    this.entry.badges ? this.entry.badges.map((item) => h("yoo-badge", { class: item.cssClass ? item.cssClass : '', "icon-left": item.iconLeft, text: item.text, closable: item.closable }))
                        : null,
                    this.entry.tags ? this.entry.tags.map(a => h("span", { class: "hashtag", innerHTML: `#${a} ` }))
                        : null,
                    this.entry.icons ? this.entry.icons.map(icon => icon && icon.icon ?
                        h("span", { class: "card-icon", "attr-layout": "row", onClick: (ev) => execHandlerAndStopEvent(ev, icon.handler) },
                            h("i", { class: icon.icon }),
                            ' ' + icon.value ? icon.value : '')
                        : null)
                        : null,
                    this.entry && this.entry.bottomActions ?
                        h("div", { "attr-layout": "row" }, this.entry.bottomActions.map(a => h("span", { class: "bottom-action", onClick: (ev) => execHandlerAndStopEvent(ev, a.handler) }, a.text)))
                        : null)
                : null)
        ]);
    }
    render() {
        return (h("div", { class: 'outer-container ', "attr-layout": "row" },
            this.entry && (this.entry.imgSrc || this.entry.users || this.entry.icon || this.entry.iconText) ?
                h("div", { class: "image-container", "attr-layout": "row" }, this.renderImageContainerContent()) : null,
            h("div", { class: 'content-container ' + (this.entry && this.entry.heading === undefined && this.entry.subheadings === undefined ? 'center' : ''), "attr-layout": "column" },
                h("div", { class: "top-container" }, this.renderHeadingContainerContent()),
                h("div", { class: "slot-container", "attr-layout": "row" },
                    h("slot", { name: "content-slot" }),
                    h("div", { class: "inner-container", "attr-layout": "column" }, this.renderBottomContent())))));
    }
    static get is() { return "yoo-card-list"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "actionButtonTitle": {
            "type": String,
            "attr": "action-button-title"
        },
        "animationName": {
            "type": String,
            "attr": "animation-name"
        },
        "avatarImgs": {
            "type": "Any",
            "attr": "avatar-imgs"
        },
        "entry": {
            "type": "Any",
            "attr": "entry"
        },
        "hasMenu": {
            "type": Boolean,
            "attr": "has-menu"
        },
        "horizontal": {
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
        "isActivable": {
            "type": Boolean,
            "attr": "is-activable"
        },
        "isActive": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "active",
            "method": "active",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "actionPress",
            "method": "actionPress",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-card-list-host] {\n  display: block; }\n  [data-yoo-card-list-host]   .outer-container[data-yoo-card-list] {\n    width: 100%;\n    border-bottom: 1px solid var(--dark-10, #ececec); }\n    [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list] {\n      position: relative;\n      margin-top: 0.2rem;\n      margin-bottom: 0.2rem; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   yoo-form-checkbox[data-yoo-card-list] {\n        position: absolute;\n        top: 0.5rem;\n        left: 0.5rem; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .bottom-left[data-yoo-card-list], [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .bottom-right[data-yoo-card-list], [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .top-left[data-yoo-card-list], [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .top-right[data-yoo-card-list] {\n        z-index: 1;\n        position: absolute; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .bottom-left[data-yoo-card-list] {\n        bottom: 0.5rem;\n        left: 0.5rem; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .bottom-right[data-yoo-card-list] {\n        bottom: 0.5rem;\n        right: 0.5rem; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .top-left[data-yoo-card-list] {\n        top: 0.5rem;\n        left: 0.5rem; }\n        [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .top-left.active[data-yoo-card-list] {\n          top: 2rem; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .top-right[data-yoo-card-list] {\n        top: -0.2rem;\n        right: 0.1rem; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   yoo-avatar.main[data-yoo-card-list], [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .multiple-avatar-container[data-yoo-card-list] {\n        margin-left: 0.8rem;\n        margin-right: 0.3rem;\n        -webkit-align-self: center;\n        -ms-flex-item-align: center;\n        align-self: center; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .multiple-avatar-container[data-yoo-card-list]   .top-avatars[data-yoo-card-list]   yoo-avatar[data-yoo-card-list] {\n        -webkit-transform: translateY(3px);\n                transform: translateY(3px); }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   .multiple-avatar-container[data-yoo-card-list]   .avatar-hidden[data-yoo-card-list] {\n        height: 22px;\n        width: 22px;\n        background-color: var(--stable, #adadad);\n        color: var(--light, #FFFFFF);\n        font-size: 0.6rem;\n        border-radius: 50%;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center; }\n    [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list] {\n      background: var(--light, #FFFFFF);\n      width: 100%;\n      -webkit-box-pack: justify;\n      -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      padding: 0.5rem;\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .heading-container[data-yoo-card-list] {\n        font-size: 1rem; }\n        [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .heading-container[data-yoo-card-list]   .card-heading[data-yoo-card-list] {\n          -webkit-box-flex: 1;\n          -webkit-flex: 1;\n          -ms-flex: 1;\n          flex: 1; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .subheading-container[data-yoo-card-list] {\n        font-size: 0.9rem;\n        color: var(--text-color, #807f83);\n        margin-top: 0.2rem; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .badges-container[data-yoo-card-list] {\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center; }\n        [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .badges-container[data-yoo-card-list]   yoo-badge[data-yoo-card-list], [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .badges-container[data-yoo-card-list]   .card-icon[data-yoo-card-list] {\n          margin-right: 0.625rem; }\n        [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .badges-container[data-yoo-card-list]   .hashtag[data-yoo-card-list] {\n          color: var(--text-color, #807f83);\n          font-size: 0.6875rem;\n          margin-right: 0.4375rem;\n          -webkit-transform: translateY(0.125rem);\n                  transform: translateY(0.125rem); }\n        [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .badges-container[data-yoo-card-list]   .card-icon[data-yoo-card-list] {\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-align: center;\n          -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center; }\n          [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .badges-container[data-yoo-card-list]   .card-icon[data-yoo-card-list]   i[data-yoo-card-list] {\n            margin-right: 0.4375rem;\n            font-size: 1.2rem; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .avatar-container[data-yoo-card-list] {\n        margin-top: 0.5rem;\n        -webkit-box-pack: end;\n        -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n        justify-content: flex-end;\n        padding-right: 0.5rem; }\n        [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .avatar-container[data-yoo-card-list]   yoo-avatar[data-yoo-card-list] {\n          margin-right: 0.15rem;\n          margin-left: 0.15rem; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .action-button-container[data-yoo-card-list] {\n        -webkit-box-pack: end;\n        -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n        justify-content: flex-end; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .slot-container[data-yoo-card-list] {\n        font-size: 0.9rem;\n        color: var(--text-color, #807f83);\n        -webkit-box-pack: justify;\n        -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n        justify-content: space-between; }\n        [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .slot-container[data-yoo-card-list]   .inner-container[data-yoo-card-list] {\n          -webkit-box-pack: end;\n          -webkit-justify-content: flex-end;\n          -ms-flex-pack: end;\n          justify-content: flex-end;\n          -webkit-box-align: center;\n          -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .top-container[data-yoo-card-list]   .heading-container[data-yoo-card-list]   .card-heading[data-yoo-card-list] {\n        font-size: 1.0625rem; }\n      [data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .top-container[data-yoo-card-list]   .heading-container[data-yoo-card-list]   .date-card[data-yoo-card-list] {\n        color: var(--text-color, #807f83);\n        font-size: 0.9rem; }\n    [data-yoo-card-list-host]   .outer-container.active[data-yoo-card-list] {\n      -webkit-box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n      box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n      border: 1px solid var(--accent, #1FB6FF); }\n\n.feedsComments[data-yoo-card-list-host]   .outer-container[data-yoo-card-list] {\n  padding-top: 0.625rem; }\n  .feedsComments[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .heading-container[data-yoo-card-list] {\n    font-size: 0.9375rem; }\n  .feedsComments[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .subheading-container[data-yoo-card-list] {\n    font-size: 0.9375rem;\n    color: var(--dark, #444); }\n  .feedsComments[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .top-container[data-yoo-card-list]   .badges-container[data-yoo-card-list] {\n    margin-top: 0.5rem;\n    font-size: 0.75rem; }\n    .feedsComments[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .top-container[data-yoo-card-list]   .badges-container[data-yoo-card-list]   .bottom-action[data-yoo-card-list] {\n      color: var(--text-color, #807f83);\n      margin-right: 1.25rem; }\n  .feedsComments[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   yoo-avatar.main[data-yoo-card-list] {\n    -webkit-align-self: normal;\n    -ms-flex-item-align: normal;\n    align-self: normal; }\n\n.active[data-yoo-card-list-host]   .outer-container[data-yoo-card-list] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  border: 1px solid var(--accent, #1FB6FF); }\n\n.hoverable[data-yoo-card-list-host]:hover   .outer-container[data-yoo-card-list] {\n  -webkit-box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  box-shadow: 0px 0px 3px 1px var(--accent, #1FB6FF);\n  border: 1px solid var(--accent, #1FB6FF); }\n\n.filesFolders[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   yoo-avatar.main[data-yoo-card-list], .files[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .image-container[data-yoo-card-list]   yoo-avatar.main[data-yoo-card-list] {\n  margin-left: 0; }\n\n.filesFolders[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list], .files[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list] {\n  padding: 0.3rem; }\n  .filesFolders[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .subheading-container[data-yoo-card-list], .files[data-yoo-card-list-host]   .outer-container[data-yoo-card-list]   .content-container[data-yoo-card-list]   .subheading-container[data-yoo-card-list] {\n    font-size: 0.625rem;\n    margin-top: 0; }"; }
}

class YooCardStickyComponent {
    constructor() {
        this.imageWidth = 335;
        this.imageHeight = 260;
    }
    render() {
        return (h("div", { class: "outer-container image", "attr-layout": "row", style: this.entry && this.entry.imgSrc ? getBackImageStyle(cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight)) : null },
            h("div", { class: "gradient-container" },
                h("div", { class: "text-container", "attr-layout": "column" },
                    this.entry && this.entry.category ?
                        h("div", { class: "category" },
                            h("span", null, this.entry.category))
                        : null,
                    this.entry && this.entry.title ?
                        h("div", { class: "title" },
                            h("span", null, this.entry.title))
                        : null,
                    this.entry && this.entry.buttonText ?
                        h("yoo-button", { class: "gradient-success small", text: this.entry.buttonText, onButtonClicked: () => this.entry.handler ? this.entry.handler() : {} })
                        : null))));
    }
    static get is() { return "yoo-card-sticky"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "entry": {
            "type": "Any",
            "attr": "entry"
        },
        "host": {
            "elementRef": true
        },
        "imageHeight": {
            "state": true
        },
        "imageWidth": {
            "state": true
        }
    }; }
    static get style() { return "[data-yoo-card-sticky-host]   .outer-container[data-yoo-card-sticky] {\n  height: 209px;\n  border-radius: 6px;\n  overflow: hidden;\n  -webkit-box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.15);\n  box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.15);\n  background-position: center;\n  width: 300px; }\n  [data-yoo-card-sticky-host]   .outer-container[data-yoo-card-sticky]   .gradient-container[data-yoo-card-sticky] {\n    width: 82%;\n    height: 100%;\n    background: -webkit-gradient(linear, left top, right top, from(var(--light, #FFFFFF)), color-stop(40%, var(--light, #FFFFFF)), to(rgba(255, 255, 255, 0)));\n    background: linear-gradient(90deg, var(--light, #FFFFFF), var(--light, #FFFFFF) 40%, rgba(255, 255, 255, 0)); }\n    [data-yoo-card-sticky-host]   .outer-container[data-yoo-card-sticky]   .gradient-container[data-yoo-card-sticky]   .text-container[data-yoo-card-sticky] {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      text-align: left;\n      margin-left: 1.25rem;\n      width: 40%;\n      height: 100%; }\n      [data-yoo-card-sticky-host]   .outer-container[data-yoo-card-sticky]   .gradient-container[data-yoo-card-sticky]   .text-container[data-yoo-card-sticky]   .category[data-yoo-card-sticky] {\n        color: var(--success, #2EDBB7);\n        font-size: 0.75rem; }\n      [data-yoo-card-sticky-host]   .outer-container[data-yoo-card-sticky]   .gradient-container[data-yoo-card-sticky]   .text-container[data-yoo-card-sticky]   .title[data-yoo-card-sticky] {\n        margin-top: 1.25rem;\n        font-size: 1rem; }\n      [data-yoo-card-sticky-host]   .outer-container[data-yoo-card-sticky]   .gradient-container[data-yoo-card-sticky]   .text-container[data-yoo-card-sticky]   .description[data-yoo-card-sticky] {\n        font-size: 0.625rem;\n        color: var(--stable, #adadad); }\n      [data-yoo-card-sticky-host]   .outer-container[data-yoo-card-sticky]   .gradient-container[data-yoo-card-sticky]   .text-container[data-yoo-card-sticky]   yoo-button[data-yoo-card-sticky] {\n        margin-top: 1.25rem; }"; }
}

class YooEntityComponent {
    constructor() {
        this.translate = window.translateService;
    }
    render() {
        if (this.item) {
            if (this.displayType === 'card-sticky') {
                let entry;
                if (this.entityType === 'feeds') {
                    let feedSticky = this.item;
                    entry = {
                        category: feedSticky.tags ? feedSticky.tags[0].toUpperCase() : '',
                        title: feedSticky.title,
                        buttonText: this.translate.get('READMORE'),
                        handler: () => { },
                        imgSrc: feedSticky.image ? feedSticky.image._downloadURL : null
                    };
                    return (h("yoo-card-sticky", { entry: entry }));
                }
            }
            else if (this.displayType === 'card-feed') {
                let entry;
                if (this.entityType === 'feeds') {
                    let feed = this.item;
                    entry = {
                        heading: feed.user && feed.user._id ? getUserDisplayName(feed.user) : feed.missiondescription ? feed.missiondescription.title : '',
                        subheadings: [pipes.timeAgo.transform(feed._ect || new Date())],
                        description: (feed.title || '') + ' ' + this.translate.polyglot(feed.description),
                        tags: feed.tags,
                        imgSrc: feed.image._downloadURL,
                        icon: feed.missiondescription && feed.missiondescription.icon && (!feed.user || !feed.user._id) ? feed.missiondescription.icon._downloadURL : null,
                        user: feed.user,
                        type: this.displayType,
                        groups: [].concat(feed.group)
                    };
                }
                else if (this.entityType === 'blog') {
                    entry = {
                        heading: this.translate.polyglot(this.item.title),
                        subheadings: [pipes.timeAgo.transform(this.item.pubDate)],
                        description: this.translate.polyglot(this.item.description),
                        icon: this.item.background,
                        imgSrc: this.item.background,
                        type: this.displayType
                    };
                }
                entry.icons = (this.icons || []).filter(a => a.isVisible(this.item)).map(a => {
                    return { icon: a.icon(this.item), handler: () => a.handler(this.item) };
                });
                entry.topActions = this.topActions ? this.topActions.filter(a => a.isVisible(this.item)).map(a => {
                    return { text: a.text(this.item), handler: () => a.handler(this.item) };
                }) : null;
                entry.bottomAction = this.bottomActions ? this.bottomActions.filter(a => a.isVisible(this.item)).map(a => {
                    return { name: a.text(this.item), handler: () => a.handler(this.item) };
                })[0] : null;
                entry.actions = this.secondaryActions ? this.secondaryActions.map(a => {
                    return { text: a.text(this.item), icon: a.icon(this.item) };
                }) : null;
                return (h("yoo-card-feed", { entry: entry }));
            }
            else if (this.displayType === 'card-list') {
                let entry;
                if (this.entityType === 'missions') {
                    let mission = this.item;
                    entry = {
                        heading: this.translate.polyglot(mission.title),
                        subheadings: [mission.address],
                        //imgSrc: mission.icon,
                        tags: mission.tags,
                        badges: [
                            mission.status === 'booked' ? { text: this.translate.get('BOOKED'), cssClass: 'small round info' } :
                                mission.status === 'finished' && mission.validated === true ? { text: this.translate.get('VALIDATED'), cssClass: 'small round gradient-success' } :
                                    mission.status === 'finished' && mission.validated === false ? { text: this.translate.get('REJECTED'), cssClass: 'small round danger' } :
                                        mission.status === 'finished' ? { text: this.translate.get('PENDING'), cssClass: 'small round warning' } :
                                            { text: this.translate.get('NEW'), cssClass: 'small round accent' }
                        ]
                    };
                }
                else if (this.entityType === 'users') {
                    let user = this.item;
                    entry = {
                        heading: getUserDisplayName(user),
                        subheadings: [this.translate.get('LASTSEEN') + ' ' + pipes.timeAgo.transform(user._lmt)],
                        users: [user]
                    };
                }
                else if (this.entityType === 'feedsComments') {
                    let comment = this.item;
                    entry = {
                        heading: getUserDisplayName(comment.user),
                        subheadings: [comment.text],
                        date: pipes.dateFormat.transform(comment.date, 'fromNow'),
                        users: [comment.user],
                        avatarSize: 'small'
                    };
                }
                else if (this.entityType === 'files' || (this.entityType === 'filesFolders' && this.item.fftype === 'file')) {
                    let file = this.item;
                    entry = {
                        heading: file._filename,
                        icon: file.icon,
                        imgSrc: file.imgSrc,
                        avatarSize: 'list-small',
                        subheadings: [pipes.fileSize.transform(file.size)]
                    };
                }
                else if (this.entityType === 'folders' || (this.entityType === 'filesFolders' && this.item.fftype === 'folder')) {
                    let f = this.item;
                    entry = {
                        heading: f.name,
                        imgSrc: f.fftype === 'folder' ? './assets/empty-states/folder.svg' : f.imgSrc,
                        icon: f.icon,
                        avatarSize: 'list-small',
                        subheadings: []
                    };
                    if (f.stats) {
                        entry.subheadings = [f.stats.map(s => {
                                return '<span>' + this.translate.get(s.title) + ': ' + pipes.decimal.transform(s.value) + '</span>';
                            }).join()];
                    }
                }
                else if (this.entityType === 'notifications') {
                    entry = {
                        heading: this.item.title,
                        subheadings: [this.translate.polyglot(this.item.body)],
                        date: this.item.scheduledDate || this.item._ect ? pipes.dateFormat.transform(this.item.scheduledDate || this.item._ect, 'fromNow') : null,
                        users: this.item.sender ? [this.item.sender] : null,
                        icon: this.item.mode === 'email' ? 'yo-mail royal' : this.item.mode === 'notification assertive' ? 'yo-notification' : 'yo-paperplane2 balanced'
                    };
                }
                else if (this.entityType === 'channel') {
                    let lastMessage = this.item.lastMessage || '';
                    if (this.item.lastMessageAlternate) {
                        lastMessage = '<b>' + lastMessage + '</b>';
                    }
                    entry = {
                        heading: getUserDisplayName(this.item.others[0]),
                        date: this.item.lastMessageDate ? pipes.dateFormat.transform(this.item.lastMessageDate, 'fromNow') : null,
                        subheadings: [lastMessage],
                        topRightBadge: '3',
                        users: [this.item.others[0]]
                    };
                }
                else if (this.entityType === 'channels') {
                    let lastMessage = this.item.lastMessage || '';
                    if (this.item.lastMessageAlternate) {
                        lastMessage = '<b>' + lastMessage + '</b>';
                    }
                    entry = {
                        heading: this.item.name,
                        date: this.item.lastMessageDate ? pipes.dateFormat.transform(this.item.lastMessageDate, 'fromNow') : null,
                        subheadings: [lastMessage],
                        users: this.item.users
                    };
                }
                else if (this.entityType === 'environnement') {
                    entry = {
                        heading: this.item.title
                    };
                }
                else {
                    entry = {};
                    let defaultTitle = (this.item.title || this.item._id || (isString(this.item) ? this.item : '')).toString();
                    if (this.item.title === false || this.item._id === false) {
                        defaultTitle = 'false';
                    }
                    let title = this.useTranslate ? this.translate.get(defaultTitle.toUpperCase()) : defaultTitle;
                    entry.heading = title;
                    if (this.item.description) {
                        entry.subheadings = [this.item.description];
                    }
                    if (this.item.background && this.item.background._downloadURL) {
                        entry.imgSrc = this.item.background._downloadURL;
                    }
                    if (this.item.icon && this.item.icon._downloadURL) {
                        entry.imgSrc = this.item.icon._downloadURL;
                    }
                    else if (isString(this.item.icon)) {
                        entry.icon = this.item.icon;
                    }
                    else if (this.entityType === 'groups') {
                        entry.iconText = this.item._id;
                    }
                    if (this.item.badge) {
                        entry.badges = [{ text: this.item.badge }];
                    }
                }
                entry.icons = (this.icons || []).filter(a => a.isVisible(this.item)).map(a => {
                    return { icon: a.icon(this.item), handler: () => a.handler(this.item) };
                });
                entry.topActions = this.topActions ? this.topActions.filter(a => a.isVisible(this.item)).map(a => {
                    return { text: a.text(this.item), handler: () => a.handler(this.item) };
                }) : null;
                entry.bottomActions = this.bottomActions ? this.bottomActions.filter(a => a.isVisible(this.item)).map(a => {
                    return { text: a.text(this.item), handler: () => a.handler(this.item) };
                }) : null;
                entry.actions = this.secondaryActions ? this.secondaryActions.map(a => {
                    return { text: a.text(this.item), icon: a.icon(this.item) };
                }) : null;
                return (h("yoo-card-list", { entry: entry, class: this.entityType })
                // (this.entityType === 'feedsComments'  ?
                //     ((this.item as IFeedComment).comments || []).map(com =>
                //         <yoo-entity sub-comment item={com} entityType={'feedsComments'} displayType={'card-list'}></yoo-entity>
                //     ) : null
                );
            }
            else {
                return (h("yoo-card", { heading: this.item.title, subheadings: this.item.subheadings, class: this.entityType }));
            }
        }
    }
    static get is() { return "yoo-entity"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "bottomActions": {
            "type": "Any",
            "attr": "bottom-actions"
        },
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
        },
        "icons": {
            "type": "Any",
            "attr": "icons"
        },
        "item": {
            "type": "Any",
            "attr": "item"
        },
        "secondaryActions": {
            "type": "Any",
            "attr": "secondary-actions"
        },
        "topActions": {
            "type": "Any",
            "attr": "top-actions"
        },
        "useTranslate": {
            "type": Boolean,
            "attr": "use-translate"
        }
    }; }
    static get style() { return "[data-yoo-entity-host]   .icon-container[data-yoo-entity] {\n  margin-right: 1rem; }\n  [data-yoo-entity-host]   .icon-container[data-yoo-entity]   .icon[data-yoo-entity] {\n    width: 3rem;\n    height: 3rem;\n    background-color: var(--dark-10, #ececec);\n    border: 1px solid var(--dark-20, #dadada);\n    border-radius: 50%; }\n\n[data-yoo-entity-host]   .content-container[data-yoo-entity] {\n  text-align: left; }\n  [data-yoo-entity-host]   .content-container[data-yoo-entity]   .title[data-yoo-entity] {\n    font-weight: bold; }\n  [data-yoo-entity-host]   .content-container[data-yoo-entity]   .subtitle[data-yoo-entity] {\n    opacity: 0.65; }\n\n.child[data-yoo-entity-host]   yoo-card-list[data-yoo-entity]     .outer-container {\n  padding-left: 2.8125rem; }"; }
}

export { YooCardComponent as YooCard, YooCardFeedComponent as YooCardFeed, YooCardListComponent as YooCardList, YooCardStickyComponent as YooCardSticky, YooEntityComponent as YooEntity };
