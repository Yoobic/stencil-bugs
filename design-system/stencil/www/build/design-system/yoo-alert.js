/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as setAnimation } from './chunk-d3f1c80d.js';
import './chunk-a7525511.js';

class YooAlertComponent {
    componentDidLoad() {
        setAnimation(this.animationName, this.host, { open: true });
    }
    onActionTextClick() {
        this.alertActionSelected.emit(true);
    }
    onDismissButtonClick() {
        this.alertClosed.emit(true);
        this.closed = true;
    }
    render() {
        return (h("div", { class: this.closed ? 'container closed' : 'container' },
            h("div", { class: "link", onClick: () => this.onActionTextClick() }, this.link),
            h("div", { class: "inner-container" },
                this.icon ? h("span", { class: "icon" },
                    h("i", { class: this.icon })) : null,
                h("div", { class: "text-container" },
                    this.heading ? h("span", { class: "heading" }, this.heading) : null,
                    h("span", { class: "value" }, this.text))),
            h("div", { class: "close-container" }, this.closeable ? h("span", { class: "close", onClick: () => this.onDismissButtonClick() },
                " ",
                h("i", { class: "yo-close" })) : null)));
    }
    static get is() { return "yoo-alert"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "animationName": {
            "type": String,
            "attr": "animation-name"
        },
        "closeable": {
            "type": Boolean,
            "attr": "closeable"
        },
        "closed": {
            "state": true
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "link": {
            "type": String,
            "attr": "link"
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "alertClosed",
            "method": "alertClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "alertActionSelected",
            "method": "alertActionSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  display: block; }\n  :host.closed {\n    opacity: 0; }\n  :host .container {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    padding: 0.75rem 1rem;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    width: 100%; }\n    :host .container.closed {\n      opacity: 0; }\n    :host .container .link {\n      color: var(--light, #FFFFFF);\n      font-weight: 100;\n      text-decoration: underline;\n      cursor: pointer;\n      opacity: 0.5;\n      font-size: 0.875rem; }\n    :host .container .inner-container {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center; }\n      :host .container .inner-container .icon {\n        font-family: 'yoobicons';\n        margin-right: 0.5rem;\n        color: var(--light, #FFFFFF); }\n      :host .container .inner-container .text-container {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        color: var(--light, #FFFFFF); }\n        :host .container .inner-container .text-container .value {\n          line-height: 1rem;\n          margin-bottom: 0.25rem;\n          font-size: 0.875rem; }\n        :host .container .inner-container .text-container .heading {\n          -webkit-align-self: baseline;\n          -ms-flex-item-align: baseline;\n          align-self: baseline;\n          font-weight: bold;\n          font-size: 0.875rem; }\n    :host .container .close-container {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: end;\n      -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n      justify-content: flex-end;\n      color: var(--light, #FFFFFF); }\n      :host .container .close-container .close {\n        cursor: pointer;\n        font-family: 'yoobicons';\n        margin-left: 1rem;\n        -webkit-box-pack: end;\n        -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n        justify-content: flex-end; }\n\n:host(.round) .container {\n  border-radius: 0.5rem; }\n\n:host(.toast) .container {\n  max-width: 22.5rem;\n  -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); }\n  :host(.toast) .container .inner-container .text-container .value {\n    margin-top: 0.25rem;\n    margin-left: 0.5rem; }\n\n:host(.toast).round .container {\n  border: 0.05rem solid; }\n\n\@-webkit-keyframes scaleUp {\n  0% {\n    -webkit-transform: scale(0.8) translateY(1000px);\n            transform: scale(0.8) translateY(1000px);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1) translateY(0px);\n            transform: scale(1) translateY(0px);\n    opacity: 1; } }\n\n\@keyframes scaleUp {\n  0% {\n    -webkit-transform: scale(0.8) translateY(1000px);\n            transform: scale(0.8) translateY(1000px);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1) translateY(0px);\n            transform: scale(1) translateY(0px);\n    opacity: 1; } }\n\n:host(.stripe) .container {\n  width: 100%;\n  border-radius: 0rem;\n  border-bottom: 0.05rem solid; }\n  :host(.stripe) .container .inner-container .text-container .value {\n    margin-top: 0.25rem;\n    margin-left: 0.5rem; }\n\n:host(.embedded) .container {\n  width: 100%; }\n  :host(.embedded) .container .inner-container .text-container .value {\n    margin-top: 0.25rem;\n    margin-left: 0.5rem; }\n\n:host(.embedded).round .container {\n  border: 0.05rem solid; }\n\n:host(.centered) .container {\n  -webkit-box-pack: justify !important;\n  -webkit-justify-content: space-between !important;\n  -ms-flex-pack: justify !important;\n  justify-content: space-between !important; }\n\n:host(.accent) {\n  background: var(--accent, #1FB6FF); }\n  :host(.accent) .container {\n    background: var(--accent, #1FB6FF);\n    color: var(--accent, #1FB6FF); }\n\n:host(.success) {\n  background: var(--success, #2EDBB7); }\n  :host(.success) .container {\n    background: var(--success, #2EDBB7);\n    color: var(--success, #2EDBB7); }\n\n:host(.danger) {\n  background: var(--danger, #ff625f); }\n  :host(.danger) .container {\n    background: var(--danger, #ff625f);\n    color: var(--danger, #ff625f); }\n\n:host(.info) {\n  background: var(--info, #fc459e); }\n  :host(.info) .container {\n    background: var(--info, #fc459e);\n    color: var(--info, #fc459e); }\n\n:host(.warning) {\n  background: var(--warning, #ff6402); }\n  :host(.warning) .container {\n    background: var(--warning, #ff6402);\n    color: var(--warning, #ff6402); }\n\n:host(.accent-gradient) .container {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%));\n  color: var(--light, #FFFFFF); }\n\n:host(.danger-gradient) .container {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634));\n  color: var(--light, #FFFFFF); }\n\n:host(.success-gradient) .container {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78));\n  color: var(--light, #FFFFFF); }\n\n:host(.info-gradient) .container {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860));\n  color: var(--light, #FFFFFF); }\n\n:host(.warning-gradient) .container {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%));\n  color: var(--light, #FFFFFF); }\n\n:host(.card) .container {\n  -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);\n  border-radius: 0rem;\n  border-left: 0.3rem solid;\n  background: var(--light, #FFFFFF); }\n  :host(.card) .container .inner-container .icon {\n    margin-right: 1.5rem;\n    margin-left: 0.5rem;\n    font-size: 2.5rem; }\n  :host(.card) .container .inner-container .text-container {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    color: var(--dark, #444); }\n    :host(.card) .container .inner-container .text-container .value {\n      color: var(--dark-80, dimgray);\n      line-height: 1.3rem; }\n    :host(.card) .container .inner-container .text-container .heading {\n      margin-top: 0.5rem; }\n  :host(.card) .container .close-container {\n    -webkit-align-self: flex-start;\n    -ms-flex-item-align: start;\n    align-self: flex-start;\n    color: var(--dark, #444);\n    font-size: 0.5rem; }\n\n:host(.accent-gradient-card) .container {\n  -o-border-image: linear-gradient(to bottom, #097be5, #87bbfd);\n     border-image: -webkit-gradient(linear, left top, left bottom, from(#097be5), to(#87bbfd));\n     border-image: linear-gradient(to bottom, #097be5, #87bbfd);\n  border-image-slice: 1; }\n  :host(.accent-gradient-card) .container .inner-container .icon {\n    background-image: -webkit-linear-gradient(#097be5, #87bbfd);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent; }\n\n:host(.danger-gradient-card) .container {\n  -o-border-image: linear-gradient(to bottom, #f76c6c, #febd3c);\n     border-image: -webkit-gradient(linear, left top, left bottom, from(#f76c6c), to(#febd3c));\n     border-image: linear-gradient(to bottom, #f76c6c, #febd3c);\n  border-image-slice: 1; }\n  :host(.danger-gradient-card) .container .inner-container .icon {\n    background-image: -webkit-linear-gradient(#f76c6c, #febd3c);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent; }\n\n:host(.success-gradient-card) .container {\n  -o-border-image: linear-gradient(to bottom, #44c3aa, #87bbfd);\n     border-image: -webkit-gradient(linear, left top, left bottom, from(#44c3aa), to(#87bbfd));\n     border-image: linear-gradient(to bottom, #44c3aa, #87bbfd);\n  border-image-slice: 1; }\n  :host(.success-gradient-card) .container .inner-container .icon {\n    background-image: -webkit-linear-gradient(#44c3aa, #87bbfd);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent; }\n\n:host(.info-gradient-card) .container {\n  -o-border-image: linear-gradient(to bottom, #6f3cfe, #f564b6);\n     border-image: -webkit-gradient(linear, left top, left bottom, from(#6f3cfe), to(#f564b6));\n     border-image: linear-gradient(to bottom, #6f3cfe, #f564b6);\n  border-image-slice: 1; }\n  :host(.info-gradient-card) .container .inner-container .icon {\n    background-image: -webkit-linear-gradient(#6f3cfe, #f564b6);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent; }\n\n:host(.accent-gradient-card) .container {\n  -o-border-image: linear-gradient(to bottom, #EEC852, #f5cfb5);\n     border-image: -webkit-gradient(linear, left top, left bottom, from(#EEC852), to(#f5cfb5));\n     border-image: linear-gradient(to bottom, #EEC852, #f5cfb5);\n  border-image-slice: 1; }\n  :host(.accent-gradient-card) .container .inner-container .icon {\n    background-image: -webkit-linear-gradient(#EEC852, #f5cfb5);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent; }"; }
}

export { YooAlertComponent as YooAlert };
