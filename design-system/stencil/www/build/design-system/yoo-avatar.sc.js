/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { b as getBackImageStyle, c as cloudinary } from './chunk-75914b41.js';
import { a as pipes } from './chunk-7a5da8d2.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';
import './chunk-b8bd1aac.js';
import './chunk-e9552ef3.js';

class YooAvatarComponent {
    render() {
        return (h("div", { class: "avatar" },
            this.topRightIcon ? h("span", { class: "top-right", onClick: () => this.topRightClicked.emit(true) },
                h("i", { class: this.topRightIcon })) : null,
            this.topLeftIcon ? h("span", { class: "top-left", onClick: () => this.topLeftClicked.emit(true) },
                h("i", { class: this.topLeftIcon })) : null,
            this.imgSrc ?
                h("div", { class: "image", style: getBackImageStyle(cloudinary(this.imgSrc, 100, 100)) })
                : this.icon || this.iconText ?
                    h("div", { class: "image icon-container" }, this.icon ? h("i", { class: this.icon }) : h("span", null,
                        " ",
                        this.iconText.substr(0, 2)))
                    : this.user && this.user.imageData ?
                        h("div", { class: "image", style: getBackImageStyle(cloudinary(this.user.imageData, 100, 100)) })
                        :
                            h("div", { class: "image initial-container" },
                                h("span", { class: "user-initial" }, pipes.userInitial.transform(this.user))),
            this.bottomRightIcon ? h("span", { class: "bottom-right", onClick: () => this.bottomRightClicked.emit(true) },
                h("i", { class: this.bottomRightIcon })) : null,
            this.bottomLeftIcon ? h("span", { class: "bottom-left", onClick: () => this.bottomLeftClicked.emit(true) },
                h("i", { class: this.bottomLeftIcon })) : null));
    }
    static get is() { return "yoo-avatar"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "bottomLeftIcon": {
            "type": String,
            "attr": "bottom-left-icon"
        },
        "bottomRightIcon": {
            "type": String,
            "attr": "bottom-right-icon"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "iconText": {
            "type": String,
            "attr": "icon-text"
        },
        "imgSrc": {
            "type": String,
            "attr": "img-src"
        },
        "topLeftIcon": {
            "type": String,
            "attr": "top-left-icon"
        },
        "topRightIcon": {
            "type": String,
            "attr": "top-right-icon"
        },
        "user": {
            "type": "Any",
            "attr": "user"
        }
    }; }
    static get events() { return [{
            "name": "topRightClicked",
            "method": "topRightClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "topLeftClicked",
            "method": "topLeftClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "bottomRightClicked",
            "method": "bottomRightClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "bottomLeftClicked",
            "method": "bottomLeftClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-avatar-host]   .avatar[data-yoo-avatar] {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex; }\n  [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar], [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n    z-index: 1;\n    position: absolute;\n    background-color: var(--light, #FFFFFF);\n    border: 1px solid var(--dark-10, #ececec);\n    border-radius: 50%;\n    padding: 0.2em 0.45em; }\n  [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n    font-size: 0.5rem;\n    height: auto;\n    width: auto; }\n  [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n    top: 0rem;\n    right: 0rem; }\n  [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n    top: 0rem;\n    left: 0rem; }\n  [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n    bottom: 0rem;\n    right: 0rem; }\n  [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n    bottom: 0rem;\n    left: 0rem; }\n  [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar] {\n    position: absolute;\n    top: 48%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    color: var(--success, #2EDBB7); }\n  [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n    background: var(--light, #FFFFFF);\n    border-radius: 50%;\n    height: 2.5rem;\n    width: 2.5rem;\n    color: var(--light, #FFFFFF); }\n    [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image.initial-container[data-yoo-avatar], [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image.icon-container[data-yoo-avatar] {\n      border: 1px solid var(--dark-10, #ececec); }\n    [data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image.icon-container[data-yoo-avatar] {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n      -ms-flex-align: center;\n      align-items: center;\n      color: var(--success, #2EDBB7); }\n\n.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  border-radius: 10%; }\n\n.xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  height: 1.375rem;\n  width: 1.375rem; }\n\n.xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  font-size: 0.5rem; }\n\n.xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.1875rem;\n  height: auto;\n  width: auto; }\n\n.xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.xsmall[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.xsmall.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .xsmall.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .xsmall.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .xsmall.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.1875rem;\n  height: auto;\n  width: auto; }\n\n.xsmall.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.xsmall.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.xsmall.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.xsmall.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  height: 2.25rem;\n  width: 2.25rem; }\n\n.small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  font-size: 1rem; }\n\n.small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.3125rem;\n  height: auto;\n  width: auto; }\n\n.small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.3125rem;\n  height: auto;\n  width: auto; }\n\n.small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  height: 1.875rem;\n  width: 1.875rem; }\n\n.list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  font-size: 0.8rem; }\n\n.list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.list-small[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.list-small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .list-small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .list-small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .list-small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.list-small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.list-small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.list-small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.list-small.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  height: 2.8125rem;\n  width: 2.8125rem; }\n\n.xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  font-size: 1.375rem; }\n\n.xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.xmedium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.xmedium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .xmedium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .xmedium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .xmedium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.xmedium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.xmedium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.xmedium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.xmedium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  height: 3.125rem;\n  width: 3.125rem; }\n\n.medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  font-size: 1.375rem; }\n\n.medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.medium[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.medium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .medium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .medium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .medium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.5rem;\n  height: auto;\n  width: auto; }\n\n.medium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.medium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.medium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.medium.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  height: 4.375rem;\n  width: 4.375rem; }\n\n.large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  font-size: 2rem; }\n\n.large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.64rem;\n  height: 1.4375rem;\n  width: 1.4375rem; }\n\n.large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.large[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.large.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .large.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .large.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .large.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: 0.64rem;\n  height: 1.4375rem;\n  width: 1.4375rem; }\n\n.large.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.large.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.large.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.large.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  height: 5.625rem;\n  width: 5.625rem; }\n\n.xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  font-size: 3rem; }\n\n.xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: var(--font-size, 16px);\n  height: auto;\n  width: auto; }\n\n.xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.xlarge[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.xlarge.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar], .xlarge.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar], .xlarge.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar], .xlarge.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  font-size: var(--font-size, 16px);\n  height: auto;\n  width: auto; }\n\n.xlarge.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  top: -4%;\n  right: -4%; }\n\n.xlarge.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  top: -4%;\n  left: -4%; }\n\n.xlarge.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  bottom: -4%;\n  right: -4%; }\n\n.xlarge.squared[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  bottom: -4%;\n  left: -4%; }\n\n.profile[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  height: 25px;\n  width: 25px; }\n\n.profile[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar] {\n  font-size: 0.7rem; }\n\n.large-border[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   span[data-yoo-avatar]:not(.user-initial) {\n  border: 2px solid var(--light, #FFFFFF) !important; }\n\n.accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--accent, #1FB6FF);\n  color: var(--light, #FFFFFF); }\n\n.accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--accent, #1FB6FF);\n  color: var(--light, #FFFFFF); }\n\n.accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--accent, #1FB6FF); }\n\n.accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--accent, #1FB6FF); }\n\n.accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--accent, #1FB6FF); }\n\n.accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--dark-40, #b4b4b4);\n  color: var(--light, #FFFFFF); }\n\n.dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--dark-40, #b4b4b4);\n  color: var(--light, #FFFFFF); }\n\n.dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--dark-40, #b4b4b4); }\n\n.dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--dark-40, #b4b4b4); }\n\n.dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--dark-40, #b4b4b4); }\n\n.dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--success, #2EDBB7);\n  color: var(--light, #FFFFFF); }\n\n.success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--success, #2EDBB7);\n  color: var(--light, #FFFFFF); }\n\n.success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--success, #2EDBB7); }\n\n.success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--success, #2EDBB7); }\n\n.success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--success, #2EDBB7); }\n\n.success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n.danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n.danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--danger, #ff625f); }\n\n.danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--danger, #ff625f); }\n\n.danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--danger, #ff625f); }\n\n.danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--warning, #ff6402);\n  color: var(--light, #FFFFFF); }\n\n.warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--warning, #ff6402);\n  color: var(--light, #FFFFFF); }\n\n.warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--warning, #ff6402); }\n\n.warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--warning, #ff6402); }\n\n.warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--warning, #ff6402); }\n\n.warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--info, #fc459e);\n  color: var(--light, #FFFFFF); }\n\n.info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--info, #fc459e);\n  color: var(--light, #FFFFFF); }\n\n.info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--info, #fc459e); }\n\n.info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--info, #fc459e); }\n\n.info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--info, #fc459e); }\n\n.info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.gradient-accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n.gradient-accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n.gradient-accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n.gradient-accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .gradient-accent[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.gradient-info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860));\n  color: var(--light, #FFFFFF); }\n\n.gradient-info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860));\n  color: var(--light, #FFFFFF); }\n\n.gradient-info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n.gradient-info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n.gradient-info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n.gradient-info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .gradient-info[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.gradient-dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n.gradient-dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n.gradient-dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n.gradient-dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .gradient-dark[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.gradient-danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634));\n  color: var(--light, #FFFFFF); }\n\n.gradient-danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634));\n  color: var(--light, #FFFFFF); }\n\n.gradient-danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n.gradient-danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n.gradient-danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n.gradient-danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .gradient-danger[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.gradient-warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%));\n  color: var(--light, #FFFFFF); }\n\n.gradient-warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n.gradient-warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n.gradient-warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n.gradient-warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .gradient-warning[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }\n\n.gradient-success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar] {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78));\n  color: var(--light, #FFFFFF); }\n\n.gradient-success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-right[data-yoo-avatar] {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78));\n  color: var(--light, #FFFFFF); }\n\n.gradient-success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .top-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n.gradient-success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-right[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n.gradient-success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .bottom-left[data-yoo-avatar] {\n  color: var(--light, #FFFFFF);\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n.gradient-success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .user-initial[data-yoo-avatar], .gradient-success[data-yoo-avatar-host]   .avatar[data-yoo-avatar]   .image[data-yoo-avatar]   .icon-container[data-yoo-avatar] {\n  color: var(--dark, #444); }"; }
}

export { YooAvatarComponent as YooAvatar };
