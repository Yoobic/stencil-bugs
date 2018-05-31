/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { b as getBackImageStyle, c as cloudinary, h as getUserDisplayName, i as resizeWindow } from './chunk-75914b41.js';
import { a as pipes } from './chunk-7a5da8d2.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';
import './chunk-b8bd1aac.js';
import './chunk-e9552ef3.js';

class YooChatComponent {
    constructor() {
        this.messages = []; // suppose that messages are ordered to most recent to the older one
        this.loaded = false;
    }
    scrollToBottom() {
        let slim = this.host.querySelector('yoo-slim-scroll');
        if (slim) {
            if (this.loaded) {
                slim.scrollToBottom();
            }
            else {
                setTimeout(() => this.scrollToBottom(), 200);
            }
        }
    }
    scrollToTop() {
        let slim = this.host.querySelector('yoo-slim-scroll');
        if (slim) {
            if (this.loaded) {
                slim.scrollToTop();
            }
            else {
                setTimeout(() => this.scrollToTop(), 200);
            }
        }
    }
    resize(windowEvent = false) {
        let slim = this.host.querySelector('yoo-slim-scroll');
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
        let body = this.host.parentElement.parentElement.querySelector('.modal-body');
        if (body) {
            maxHeight = Math.min(maxHeight, body.clientHeight);
        }
        else {
            maxHeight = this.decreaseMaxHeight(maxHeight, 'ion-header', document);
            maxHeight = this.decreaseMaxHeight(maxHeight, 'ion-footer', document);
        }
        maxHeight = this.decreaseMaxHeight(maxHeight, '.load-more', this.host);
        maxHeight = this.decreaseMaxHeight(maxHeight, '.input-container', this.host);
        return { height: maxHeight + 'px' };
    }
    decreaseMaxHeight(maxHeight, name, html) {
        let comp = html.querySelector(name);
        if (comp) {
            maxHeight -= comp.clientHeight;
        }
        return maxHeight;
    }
    getLastMessage(index) {
        if (index === (this.messages.length - 1)) {
            return true;
        }
        else if (this.messages[index].author !== this.messages[index + 1].author) {
            return true;
        }
        else {
            return false;
        }
    }
    onSendText(ev) {
        ev.stopPropagation();
        this.sendText.emit(ev.detail);
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "chat-header" },
                h("span", null, this.heading)),
            this.displayLoadMore ?
                h("div", { class: "load-more", onClick: () => this.loadMoreClicked.emit(true), "attr-layout": "row" },
                    h("span", null, 'Load More'))
                : null,
            h("div", { class: "scroll-container" },
                h("yoo-slim-scroll", { height: this.scrollHeight },
                    h("div", { class: "messages-container", "attr-layout": "column" }, (this.messages.map((m, index) => h("div", { class: 'message ' + ((m.isAlternate) ? 'user-message' : 'other-message'), "attr-layout": "column" },
                        h("div", { class: 'message-content' + (this.getLastMessage(index) ? ' last' : ''), "attr-layout": "column" },
                            m.img ?
                                (h("div", { class: "image-container" },
                                    h("div", { class: "image", style: getBackImageStyle(cloudinary(m.img)) }),
                                    " ",
                                    h("br", null)))
                                : null,
                            h("span", null, m.content)),
                        this.getLastMessage(index) ? [
                            h("div", { class: "speech-mark" }),
                            h("div", { class: "speech-mark-negative" })
                        ] : null,
                        (m.author || m.time) && this.getLastMessage(index) ?
                            h("div", { class: "info-container" },
                                h("yoo-avatar", { class: "xsmall", user: m.author }),
                                h("span", null,
                                    getUserDisplayName(m.author),
                                    " - ",
                                    pipes.timeAgo.transform(m.time)))
                            : null)))))),
            h("div", { class: "input-container" },
                h("yoo-input-bar", { onSendText: (ev) => this.onSendText(ev) }))));
    }
    static get is() { return "yoo-chat"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "displayLoadMore": {
            "type": Boolean,
            "attr": "display-load-more"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "loaded": {
            "state": true
        },
        "messages": {
            "type": "Any",
            "attr": "messages"
        },
        "resize": {
            "method": true
        },
        "scrollHeight": {
            "state": true
        },
        "scrollToBottom": {
            "method": true
        },
        "scrollToTop": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "loadMoreClicked",
            "method": "loadMoreClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "sendText",
            "method": "sendText",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  height: 100%; }\n  :host .outer-container {\n    height: 100%;\n    background-color: var(--light, #FFFFFF); }\n    :host .outer-container .chat-header {\n      text-align: center; }\n    :host .outer-container .load-more {\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      background: var(--dark-10, #ececec);\n      color: var(--text-color, #807f83); }\n    :host .outer-container .scroll-container {\n      height: 100%; }\n    :host .outer-container .messages-container {\n      padding-right: 1rem;\n      padding-left: 1rem;\n      margin-top: 0.2rem;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: reverse;\n      -webkit-flex-direction: \"column-reverse\";\n      -ms-flex-direction: \"column-reverse\";\n      flex-direction: \"column-reverse\"; }\n      :host .outer-container .messages-container .message {\n        margin: 0.2rem;\n        max-width: 60%;\n        position: relative; }\n        :host .outer-container .messages-container .message .speech-mark {\n          position: absolute;\n          z-index: 0;\n          bottom: 1.625rem;\n          height: 20px;\n          width: 20px;\n          background: var(--success, #2EDBB7); }\n        :host .outer-container .messages-container .message .speech-mark-negative {\n          position: absolute;\n          z-index: 1;\n          bottom: 1.625rem;\n          width: 10px;\n          height: 20px;\n          background: var(--light, #FFFFFF); }\n        :host .outer-container .messages-container .message .message-content {\n          padding: 0.5rem 1rem;\n          border-radius: 1.25rem; }\n          :host .outer-container .messages-container .message .message-content .image-container {\n            padding-top: 0.5rem; }\n            :host .outer-container .messages-container .message .message-content .image-container .image {\n              min-height: 200px;\n              min-height: 100px;\n              width: 100%;\n              height: 100%;\n              background: var(--light, #FFFFFF); }\n        :host .outer-container .messages-container .message .info-container {\n          margin: 0.2rem;\n          color: var(--text-color, #807f83);\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-align: center;\n          -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center;\n          font-size: 0.7rem;\n          white-space: nowrap; }\n          :host .outer-container .messages-container .message .info-container yoo-avatar {\n            margin-right: 0.3rem; }\n        :host .outer-container .messages-container .message.user-message {\n          margin-left: auto; }\n          :host .outer-container .messages-container .message.user-message .speech-mark {\n            border-bottom-left-radius: 15px;\n            right: -7px; }\n          :host .outer-container .messages-container .message.user-message .speech-mark-negative {\n            border-bottom-left-radius: 10px;\n            right: -10px; }\n          :host .outer-container .messages-container .message.user-message .message-content {\n            background: var(--success, #2EDBB7);\n            color: var(--light, #FFFFFF); }\n          :host .outer-container .messages-container .message.user-message .info-container {\n            margin-left: auto; }\n        :host .outer-container .messages-container .message.other-message {\n          margin-right: auto; }\n          :host .outer-container .messages-container .message.other-message .speech-mark {\n            left: -7px;\n            border-bottom-right-radius: 15px;\n            background: var(--dark-10, #ececec); }\n          :host .outer-container .messages-container .message.other-message .speech-mark-negative {\n            left: -10px;\n            border-bottom-right-radius: 10px; }\n          :host .outer-container .messages-container .message.other-message .message-content {\n            background: var(--dark-10, #ececec); }\n    :host .outer-container .input-container {\n      position: fixed;\n      bottom: 0;\n      width: 100%;\n      background: white;\n      -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);\n      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);\n      padding-bottom: env(safe-area-inset-bottom); }"; }
}

class YooInputBarComponent {
    constructor() {
        this.icon = 'yo-camera-solid';
        this.iconAction = 'yo-gallery';
        this.actionText = 'Post';
        this.value = '';
        this.placeholder = 'Add comment';
        this.topIndication = null;
        this.replyToUser = null;
        this.rows = 1;
        this.charPerLine = 60;
        this.translate = window.translateService;
    }
    updateState() {
        let previousRows = this.rows;
        this.hasTextInside = this.value && this.value !== '' ? true : false;
        if (this.value && this.value.length) {
            this.rows = Math.ceil(this.value.length / this.charPerLine);
            this.rows += (this.value.split(/\r\n|\r|\n/).length - 1) || 0;
            this.rows = Math.min(this.rows, 5);
        }
        else {
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
    focusInputField() {
        let textArea = this.host.querySelector('textarea');
        textArea.focus();
    }
    onActionClick() {
        this.hasTextInside = this.value && this.value !== '' ? true : false;
        if (this.hasTextInside) {
            this.sendText.emit(this.value);
            this.value = null;
        }
        else {
            this.browseLibrary.emit(true);
        }
    }
    onInput(ev) {
        this.value = ev.target.value;
        this.updateState();
    }
    render() {
        return (h("div", { class: "outer-container", "attr-layout": "column" },
            this.topIndication || this.replyToUser ?
                h("div", { class: "indications-container" },
                    h("span", null, this.topIndication ?
                        this.topIndication
                        : this.replyToUser ?
                            h("span", null,
                                this.translate.get('REPLY_TO') + ' ',
                                h("span", { class: "user-indication" }, getUserDisplayName(this.replyToUser)))
                            : null))
                : null,
            h("div", { class: "input-container", "attr-layout": "row" },
                h("div", { class: "icon-container" },
                    h("div", { class: "capture-icon", "attr-layout": "row", onClick: () => this.iconClicked.emit(true) },
                        h("i", { class: this.icon }))),
                h("div", { class: "input-zone" },
                    h("textarea", { value: this.value, rows: this.rows, placeholder: this.placeholder, onInput: (ev) => this.onInput(ev) }),
                    h("div", { class: "input-action", onClick: () => this.onActionClick() },
                        h("div", null,
                            h("span", null, this.hasTextInside ? this.actionText : h("i", { class: this.iconAction }))))))));
    }
    static get is() { return "yoo-input-bar"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "actionText": {
            "type": String,
            "attr": "action-text"
        },
        "charPerLine": {
            "state": true
        },
        "focusInputField": {
            "method": true
        },
        "hasTextInside": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "iconAction": {
            "type": String,
            "attr": "icon-action"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "replyToUser": {
            "type": "Any",
            "attr": "reply-to-user"
        },
        "rows": {
            "state": true
        },
        "topIndication": {
            "type": String,
            "attr": "top-indication"
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "sendText",
            "method": "sendText",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "iconClicked",
            "method": "iconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "browseLibrary",
            "method": "browseLibrary",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "rowNumberChanged",
            "method": "rowNumberChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  -webkit-box-align: end;\n  -webkit-align-items: flex-end;\n  -ms-flex-align: end;\n  align-items: flex-end;\n  background: var(--light, #FFFFFF);\n  position: relative; }\n  :host .outer-container .indications-container {\n    background: var(--stable-light, #f1f1f1);\n    color: var(--text-color, #807f83);\n    font-size: 0.5rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    width: 100%;\n    padding-left: 0.9375rem; }\n    :host .outer-container .indications-container .user-indication {\n      color: var(--dark, #444); }\n  :host .outer-container .input-container {\n    width: 100%;\n    padding: 0.5625rem 0.9375rem 1rem 0.9375rem; }\n    :host .outer-container .input-container .icon-container {\n      margin-right: 0.5rem;\n      -webkit-align-self: flex-end;\n      -ms-flex-item-align: end;\n      align-self: flex-end; }\n      :host .outer-container .input-container .icon-container .capture-icon {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        border-radius: 50%;\n        border: 1px solid var(--success, #2EDBB7);\n        height: 2rem;\n        width: 2rem;\n        color: var(--success, #2EDBB7); }\n    :host .outer-container .input-container .input-zone {\n      padding: 0.4375rem 0.75rem 0.5625rem 0.8125rem;\n      min-height: 2rem;\n      position: relative;\n      border: 1px solid var(--stable, #adadad);\n      border-radius: 1.03125rem;\n      width: 100%;\n      font-size: 0.8125rem; }\n      :host .outer-container .input-container .input-zone textarea {\n        width: 100%;\n        line-height: 1rem;\n        border: none;\n        resize: none;\n        display: block;\n        -webkit-box-sizing: border-box;\n        box-sizing: border-box;\n        -webkit-appearance: none;\n        outline: none !important; }\n      :host .outer-container .input-container .input-zone .input-action {\n        position: absolute;\n        bottom: 0.2rem;\n        right: 0.8125rem;\n        color: var(--success, #2EDBB7); }\n        :host .outer-container .input-container .input-zone .input-action div span {\n          display: inline-block;\n          margin-bottom: 0.25rem; }\n        :host .outer-container .input-container .input-zone .input-action i {\n          font-size: 1rem; }"; }
}

export { YooChatComponent as YooChat, YooInputBarComponent as YooInputBar };
