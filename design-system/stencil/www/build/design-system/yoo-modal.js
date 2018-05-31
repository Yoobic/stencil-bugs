/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as setAnimation } from './chunk-d3f1c80d.js';
import { i as resizeWindow } from './chunk-75914b41.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';

class YooModalComponent {
    constructor() {
        this.hasHeader = true;
    }
    componentWillLoad() {
    }
    componentDidLoad() {
        this.setContentInModal();
        this.animation(true);
        resizeWindow(() => this.resize());
    }
    componentDidUpdate() {
        this.setContentInModal();
    }
    onPrimaryButtonClick(event) {
        if (event) {
            this.primaryButtonClicked.emit(true);
            this.primaryFn();
        }
    }
    close() {
        if (this.animationProp) {
            this.animationProp.open = false;
        }
        this.closed.emit(true);
        this.animation(false);
    }
    resize() {
        let slim = this.host.querySelector('yoo-slim-scroll');
        if (slim) {
            if (slim.height === this.getSizeContainer().height) {
                slim.refresh();
            }
            else {
                slim.height = this.getSizeContainer().height;
            }
        }
    }
    onInputBarRawChange() {
        // resize the modal to adjust slim scroll if the input bar take more or less space
        setTimeout(this.resize(), 100);
    }
    animation(open, sentFromClose) {
        if (this.animationName) {
            if (this.animationName === 'sticky_up') {
                const padding = 16;
                const modalHeight = (this.host.querySelector('div.outer-container').clientHeight);
                setAnimation(this.animationName, this.host, { open: open, distance: (((window.innerHeight / 2) + padding) - (modalHeight / 2)), modalHeight: modalHeight });
            }
            else {
                setAnimation(this.animationName, this.host.querySelector('.outer-container'), (sentFromClose ? { open: open, up: true } : (this.animationProp ? this.animationProp : { open: open })));
            }
        }
    }
    setContentInModal() {
        if (this.scrollEnabled) {
            if (this.content) {
                let slim = document.createElement('yoo-slim-scroll');
                this.host.querySelector('div.modal-scroll-container').appendChild(slim);
                slim.appendChild(this.content);
            }
            this.resize();
        }
        else if (this.content) {
            this.host.querySelector('div.modal-body').appendChild(this.content);
        }
    }
    getSizeContainer() {
        let modalContainer = this.host.querySelector('.modal-scroll-container');
        let maxHeight = window.innerHeight;
        if (modalContainer) {
            let modalHeader = this.host.querySelector('.modal-header');
            if (modalHeader) {
                maxHeight -= modalHeader.clientHeight;
            }
            let modalFooter = this.host.querySelector('.modal-footer');
            if (modalFooter) {
                maxHeight -= modalFooter.clientHeight;
            }
            return { height: Math.min((modalContainer.clientHeight), maxHeight) + 'px', width: modalContainer.clientWidth + 'px' };
        }
        return { height: '', width: '' };
    }
    hostData() {
        return {
            class: {
                ['custom-controller']: this.withYooCtrl
            }
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.hasHeader ?
                h("div", { class: "modal-header", "attr-layout": "row", "attr-layout-align": "space-between" },
                    h("span", { class: "hide-icon" }),
                    h("div", { class: "inner-header" },
                        this.headingIcon ? h("span", { class: "icon" },
                            h("i", { class: this.headingIcon })) : null,
                        h("span", { class: "modal-heading" }, this.heading)),
                    h("span", { class: "close-icon", onClick: () => this.close() },
                        h("i", { class: "yo-close" })))
                : null,
            h("div", { class: "modal-body" },
                h("div", { class: "modal-scroll-container" },
                    h("yoo-slim-scroll", { enabled: this.scrollEnabled },
                        h("slot", null)))),
            this.hasFooter ?
                h("div", { class: "modal-footer", "attr-layout": "row" },
                    this.footerText ? h("div", { class: "footer-text" },
                        h("span", null, this.footerText)) : null,
                    h("div", { class: "footer-buttons", "attr-layout": "row", "attr-layout-align": "end center" },
                        this.secondaryButtonText ? h("div", { class: "secondary-button squared" },
                            h("yoo-button", { class: "dark", onClick: () => this.close(), text: this.secondaryButtonText })) : null,
                        this.primaryButtonText ? h("div", { class: "primary-button squared" },
                            h("yoo-button", { class: "accent", onClick: (event) => this.onPrimaryButtonClick(event), text: this.primaryButtonText })) : null,
                        h("slot", { name: "footer-slot" }))) : null));
    }
    static get is() { return "yoo-modal"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "animationName": {
            "type": String,
            "attr": "animation-name"
        },
        "animationProp": {
            "type": "Any",
            "attr": "animation-prop"
        },
        "close": {
            "method": true
        },
        "content": {
            "type": "Any",
            "attr": "content"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "footerText": {
            "type": String,
            "attr": "footer-text"
        },
        "hasFooter": {
            "type": Boolean,
            "attr": "has-footer"
        },
        "hasHeader": {
            "type": Boolean,
            "attr": "has-header"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "headingIcon": {
            "type": String,
            "attr": "heading-icon"
        },
        "host": {
            "elementRef": true
        },
        "primaryButtonText": {
            "type": String,
            "attr": "primary-button-text"
        },
        "primaryFn": {
            "type": "Any",
            "attr": "primary-fn"
        },
        "resize": {
            "method": true
        },
        "scrollEnabled": {
            "type": Boolean,
            "attr": "scroll-enabled"
        },
        "secondaryButtonText": {
            "type": String,
            "attr": "secondary-button-text"
        },
        "withYooCtrl": {
            "type": Boolean,
            "attr": "with-yoo-ctrl"
        }
    }; }
    static get events() { return [{
            "name": "primaryButtonClicked",
            "method": "primaryButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "closed",
            "method": "closed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "rowNumberChanged",
            "method": "onInputBarRawChange"
        }]; }
    static get style() { return ":host[padding] .outer-container .modal-body {\n  padding: 1rem; }\n\n:host .outer-container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  background: var(--light, #FFFFFF);\n  width: 100%;\n  height: 100%;\n  border-radius: 0.3125rem; }\n  :host .outer-container .modal-header {\n    padding: 1rem;\n    border-top-right-radius: 0.3125rem;\n    border-top-left-radius: 0.3125rem;\n    background-clip: padding-box;\n    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);\n    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    z-index: 1;\n    color: var(--black, #000000); }\n    :host .outer-container .modal-header .inner-header {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      padding: 0 1rem; }\n    :host .outer-container .modal-header .modal-heading {\n      font-size: 1rem;\n      font-weight: 400; }\n    :host .outer-container .modal-header .icon {\n      padding: 0.5rem; }\n    :host .outer-container .modal-header .close-icon {\n      padding-right: 0.5rem;\n      cursor: pointer; }\n    :host .outer-container .modal-header .hide-icon {\n      color: transparent; }\n  :host .outer-container .modal-body {\n    height: 100%;\n    min-height: 10.9375rem;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center; }\n    :host .outer-container .modal-body .modal-scroll-container {\n      height: 100%;\n      width: 100%; }\n    :host .outer-container .modal-body .modal-content {\n      width: 100%; }\n  :host .outer-container .modal-footer {\n    padding: 1rem;\n    -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);\n    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    z-index: 1; }\n    :host .outer-container .modal-footer .footer-buttons {\n      -webkit-box-flex: 1;\n      -webkit-flex: 1 1 33%;\n      -ms-flex: 1 1 33%;\n      flex: 1 1 33%; }\n      :host .outer-container .modal-footer .footer-buttons .primary-button,\n      :host .outer-container .modal-footer .footer-buttons .secondary-button {\n        padding-bottom: 0.5rem;\n        padding-top: 0.5rem;\n        padding-right: 0.5rem; }\n\n:host(.custom-controller) {\n  position: relative;\n  z-index: 2000; }\n  :host(.custom-controller) .outer-container {\n    height: auto; }\n\n:host(.fullscreen) {\n  position: absolute;\n  top: 0rem;\n  right: 0rem;\n  bottom: 0;\n  left: 0;\n  margin-left: 0;\n  margin-top: 0; }\n  :host(.fullscreen) .outer-container {\n    border-radius: 0rem;\n    height: 100%;\n    width: 100%; }\n    :host(.fullscreen) .outer-container .modal-header {\n      border-radius: 0rem;\n      width: 100%;\n      position: absolute; }\n    :host(.fullscreen) .outer-container .modal-body {\n      padding-top: 5.0625rem; }\n    :host(.fullscreen) .outer-container .modal-footer {\n      width: 100%;\n      position: absolute;\n      bottom: 0rem; }\n\n:host(.drawer) {\n  position: absolute;\n  top: 0rem;\n  right: 0rem;\n  bottom: 0;\n  left: 66.66%;\n  margin-left: 0;\n  margin-top: 0; }\n  :host(.drawer) .outer-container {\n    border-radius: 0rem;\n    height: 100%;\n    width: 100%; }\n    :host(.drawer) .outer-container .modal-header {\n      border-radius: 0rem;\n      width: 100%;\n      position: absolute; }\n    :host(.drawer) .outer-container .modal-body {\n      padding-top: 5.0625rem; }\n    :host(.drawer) .outer-container .modal-footer {\n      width: 100%;\n      position: absolute;\n      bottom: 0rem; }\n  :host(.drawer) .outer-container .modal-header {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: row-reverse;\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse; }\n\n:host(.menu) {\n  top: 0rem;\n  left: 0rem;\n  height: 100%;\n  width: 100%;\n  margin-left: 0;\n  margin-top: 0;\n  position: relative; }\n  :host(.menu) .outer-container {\n    border-radius: 0rem;\n    height: 100%;\n    width: 100%; }\n    :host(.menu) .outer-container .modal-header {\n      border-radius: 0rem;\n      width: 100%;\n      position: absolute; }\n    :host(.menu) .outer-container .modal-body {\n      padding-top: 5.0625rem; }\n    :host(.menu) .outer-container .modal-footer {\n      width: 100%;\n      position: absolute;\n      bottom: 0rem; }\n  :host(.menu) .outer-container .modal-header {\n    position: relative;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n  :host(.menu) .outer-container .modal-body {\n    padding-top: 0 !important; }\n\n:host(.action-sheet) {\n  bottom: 0rem;\n  left: 0rem;\n  top: auto;\n  width: 100%;\n  margin-left: 0;\n  margin-top: 0; }\n  :host(.action-sheet) .outer-container {\n    border-radius: 0rem;\n    height: 100%;\n    width: 100%; }\n    :host(.action-sheet) .outer-container .modal-header {\n      border-radius: 0rem;\n      width: 100%;\n      position: absolute; }\n    :host(.action-sheet) .outer-container .modal-body {\n      padding-top: 5.0625rem; }\n    :host(.action-sheet) .outer-container .modal-footer {\n      width: 100%;\n      position: absolute;\n      bottom: 0rem; }\n  :host(.action-sheet) .outer-container {\n    border: none;\n    background-color: transparent; }\n    :host(.action-sheet) .outer-container .modal-body {\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 100%; }\n    :host(.action-sheet) .outer-container /deep/ .modal-body > div {\n      width: 100%; }\n      :host(.action-sheet) .outer-container /deep/ .modal-body > div div[slot=\"[modal-content\"] {\n        width: 100%; }\n\n:host(.language-selector) .outer-container {\n  min-height: 420px;\n  border: 0 solid;\n  -webkit-box-shadow: 0 6px 19px 0 rgba(40, 47, 54, 0.08);\n  box-shadow: 0 6px 19px 0 rgba(40, 47, 54, 0.08);\n  width: 250px;\n  color: var(--text-color, #807f83);\n  border-radius: 0.78125rem; }\n  :host(.language-selector) .outer-container .modal-body {\n    background-color: var(--light, #FFFFFF);\n    height: 100%; }\n\n:host(.simple) .outer-container .modal-header {\n  background-color: var(--light, #FFFFFF) !important;\n  border: none; }\n  :host(.simple) .outer-container .modal-header .modal-heading {\n    font-weight: normal; }\n\n:host(.accent) .outer-container {\n  color: #807f83; }\n  :host(.accent) .outer-container .modal-header {\n    background-color: var(--accent-20, #d2f0ff);\n    color: var(--accent, #1FB6FF);\n    border-bottom-color: var(--accent, #1FB6FF); }\n\n:host(.accent):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--accent, #1FB6FF); }\n\n:host(.success) .outer-container {\n  color: #807f83; }\n  :host(.success) .outer-container .modal-header {\n    background-color: var(--success-20, #d5f8f1);\n    color: var(--success-110, #23cba8);\n    border-bottom-color: var(--success-110, #23cba8); }\n\n:host(.success):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--success-110, #23cba8); }\n\n:host(.danger) .outer-container {\n  color: #807f83; }\n  :host(.danger) .outer-container .modal-header {\n    background-color: var(--danger-20, #ffe0df);\n    color: var(--danger, #ff625f);\n    border-bottom-color: var(--danger, #ff625f); }\n\n:host(.danger):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--danger, #ff625f); }\n\n:host(.info) .outer-container {\n  color: #807f83; }\n  :host(.info) .outer-container .modal-header {\n    background-color: var(--info-20, #fedaec);\n    color: var(--info, #fc459e);\n    border-bottom-color: var(--info, #fc459e); }\n\n:host(.info):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--info, #fc459e); }\n\n:host(.warning) .outer-container {\n  color: #807f83; }\n  :host(.warning) .outer-container .modal-header {\n    background-color: var(--warning-20, #ffe0cc);\n    color: var(--warning, #ff6402);\n    border-bottom-color: var(--warning, #ff6402); }\n\n:host(.warning):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--warning, #ff6402); }\n\n:host(.dark) .outer-container {\n  color: #807f83; }\n  :host(.dark) .outer-container .modal-header {\n    background-color: var(--dark-20, #dadada);\n    color: var(--dark, #444);\n    border-bottom-color: var(--dark, #444); }\n\n:host(.dark):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--dark, #444); }"; }
}

export { YooModalComponent as YooModal };
