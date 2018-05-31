/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as setAnimation } from './chunk-d3f1c80d.js';
import './chunk-a7525511.js';

class YooActionSheetComponent {
    constructor() {
        this.buttons = [];
    }
    closeActionSheet() {
        setAnimation('slide_down', this.host.querySelector('div'), { open: false, up: false });
        this.actionSheetClosed.emit(true);
    }
    onButtonClick(heading, disabled) {
        if (!disabled) {
            this.actionSelected.emit(heading);
            this.closeActionSheet();
        }
    }
    componentDidLoad() {
        setAnimation('slide_down', this.host.querySelector('div'), { open: true });
    }
    render() {
        return (h("yoo-modal", { "has-header": "false", class: "action-sheet", onClosed: () => this.closeActionSheet() },
            h("div", { "attr-layout": "column" },
                h("div", { class: "outer-container" },
                    h("div", { class: "top-container", "attr-layout": "column" },
                        h("div", { class: "heading-container" }, this.heading),
                        this.buttons.map((button) => h("div", { class: "inner-container", onClick: () => this.onButtonClick(button.text, button.disabled) },
                            button.text,
                            button.icon ? (h("i", { class: button.icon })) : null))),
                    h("div", { class: "bottom-container" },
                        h("div", { class: "cancel-container", onClick: () => this.closeActionSheet() }, "Cancel"))))));
    }
    static get is() { return "yoo-action-sheet"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "buttons": {
            "type": "Any",
            "attr": "buttons"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get events() { return [{
            "name": "actionSelected",
            "method": "actionSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "actionSheetClosed",
            "method": "actionSheetClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host() {\n  width: 100%; }\n  :host() .outer-container {\n    font-size: 0.85rem;\n    width: 100%;\n    padding: 0.75rem; }\n    :host() .outer-container .top-container {\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      background-color: var(--light, #FFFFFF);\n      border-radius: 0.8125rem;\n      width: 100%; }\n      :host() .outer-container .top-container .heading-container {\n        color: var(--stable, #adadad);\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        height: 3.125rem;\n        padding: 0 1rem;\n        height: 2.875rem;\n        font-size: 0.9rem;\n        font-weight: 400; }\n      :host() .outer-container .top-container .inner-container {\n        height: 3.625rem;\n        font-size: 1.25rem;\n        border-top: 1px solid var(--stable-10, rgba(173, 173, 173, 0.1));\n        color: var(--dark, #444);\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        height: 3.125rem;\n        padding: 0 1rem;\n        font-weight: 400; }\n    :host() .outer-container .bottom-container {\n      background-color: transparent;\n      padding-top: 0.5rem;\n      width: 100%; }\n      :host() .outer-container .bottom-container .cancel-container {\n        font-size: 1.25rem;\n        background-color: var(--light, #FFFFFF);\n        height: 3.5625rem;\n        border-radius: 0.8125rem;\n        font-weight: 400;\n        color: var(--danger, #ff625f);\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        height: 3.125rem;\n        padding: 0 1rem; }\n\n:host(.accent) .outer-container .top-container .heading-container {\n  color: var(--accent, #1FB6FF); }\n\n:host(.success) .outer-container .top-container .heading-container {\n  color: var(--success, #2EDBB7); }\n\n:host(.danger) .outer-container .top-container .heading-container {\n  color: var(--danger, #ff625f); }\n\n:host(.info) .outer-container .top-container .heading-container {\n  color: var(--info, #fc459e); }\n\n:host(.warning) .outer-container .top-container .heading-container {\n  color: var(--warning, #ff6402); }\n\n:host(.dark) .outer-container .top-container .heading-container {\n  color: var(--dark, #444); }\n\n:host(.stable) .outer-container .top-container .heading-container {\n  color: var(--stable, #adadad); }"; }
}

class YooLanguageSelectorComponent {
    constructor() {
        this.loaded = false;
    }
    componentDidLoad() {
        setAnimation('fade', this.host, { open: true });
        setTimeout(() => {
            this.loaded = true;
        }, 500);
    }
    onLanguageSelector(language) {
        this.languageSelected.emit(language);
        document.querySelector('yoo-modal-controller').closeModal(false);
    }
    renderList(language) {
        return (h("div", { class: "item", "attr-layout": "column" },
            h("div", { class: 'icon ' + (this.currentLanguage === language.value ? 'current' : ''), onClick: () => this.onLanguageSelector(language.value) },
                h("i", { class: language.icon + ' icon-class' }),
                this.currentLanguage.toLowerCase() === language.value ? [
                    h("div", { class: "overlay" }),
                    h("div", { class: "check" },
                        h("i", { class: "yo-check" }))
                ]
                    : null),
            h("div", { class: "item-title" }, language.title)));
    }
    render() {
        return (h("yoo-modal", { "has-header": "false", class: "language-selector" },
            h("div", { class: "heading" }, "Language"),
            this.loaded ?
                h("div", { class: "lists-container", "attr-layout": "row" }, this.languages.map((language) => this.renderList(language))) :
                h("div", { class: "load-contaienr", "attr-layout": "row", "attr-layout-align": "center center" },
                    h("yoo-loader", { class: "large" }))));
    }
    static get is() { return "yoo-language-selector"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "currentLanguage": {
            "type": String,
            "attr": "current-language"
        },
        "host": {
            "elementRef": true
        },
        "languages": {
            "type": "Any",
            "attr": "languages"
        },
        "loaded": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "languageSelected",
            "method": "languageSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  opacity: 0; }\n  :host .heading {\n    padding-top: 1.5625rem;\n    padding-left: 1.5625rem;\n    padding-bottom: 1.0625rem;\n    line-height: normal;\n    text-transform: uppercase; }\n  :host .load-container {\n    width: 100%;\n    height: 100%; }\n  :host .lists-container {\n    padding: 0 1.5625rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -webkit-flex-wrap: wrap;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n    :host .lists-container .item {\n      width: 2rem;\n      height: 3rem;\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n      -ms-flex-align: center;\n      align-items: center;\n      margin-right: 0.75rem;\n      margin-bottom: 0.75rem;\n      -webkit-box-pack: justify;\n      -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n      justify-content: space-between; }\n      :host .lists-container .item .icon {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        position: relative;\n        border-radius: 1rem;\n        height: 2rem;\n        width: 2rem;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        overflow: hidden;\n        font-size: 2rem; }\n        :host .lists-container .item .icon .icon-class {\n          position: absolute; }\n      :host .lists-container .item .overlay {\n        position: absolute;\n        width: 2rem;\n        height: 2rem;\n        top: 0%;\n        background-color: var(--text-color, #807f83);\n        opacity: 0.6;\n        border-radius: 1rem; }\n      :host .lists-container .item .check {\n        position: absolute;\n        top: 0.5rem;\n        left: 0.5rem;\n        background-color: var(--light, #FFFFFF);\n        width: 1rem;\n        height: 1rem;\n        border-radius: 0.5rem;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        font-size: 0.75rem; }\n    :host .lists-container .item-title {\n      font-size: 0.5625rem; }"; }
}

class YooModalControllerComponent {
    constructor() {
        this.greyContent = true;
        this.element = document.createElement('yoo-modal');
        this.isGreyedOut = false;
        this.displayedAlert = 0;
    }
    childClosed() {
        this.host.classList.add('out');
        // setTimeout(() => {this.isGreyedOut = false; }, 300);
        this.closeModal(true);
    }
    childActionClosed() {
        this.host.classList.add('out');
        // setTimeout(() => {this.isGreyedOut = false; }, 300);
        this.closeModal(true);
    }
    // Event transmission
    primaryClick() {
        this.host.classList.add('out');
        this.modalCtrlPrimaryButtonClicked.emit(true); //event transmission
        //console.log('Primary Button Click on modal transmitted by modal Controller');
        this.closeModal(true);
    }
    onAlertClosed(event) {
        this.closeAlert(event.srcElement);
    }
    show() {
        this.isGreyedOut = true;
        this.host.setAttribute('style', 'z-index: 2000 !important;');
        const backDrop = this.host.querySelector('div');
        setAnimation('background_fade', backDrop, { open: true });
        this.host.querySelector('div').insertAdjacentElement('afterend', this.element);
    }
    showActionSheet() {
        this.isGreyedOut = true;
        this.host.setAttribute('style', 'z-index: 2000 !important; align-items: flex-end;');
        const backDrop = this.host.querySelector('div');
        setAnimation('background_fade', backDrop, { open: true });
        this.host.querySelector('div').insertAdjacentElement('afterend', this.element);
    }
    showAlert() {
        //this.show();
        this.host.querySelector('div.alert-container').appendChild(this.element);
        //this.isGreyedOut = false;
        this.displayedAlert = Math.max(0, this.displayedAlert - 1);
    }
    closeModal(sentFromModal) {
        const modal = this.host.querySelector('yoo-modal');
        const actionSheet = this.host.querySelector('yoo-action-sheet');
        const languageSelector = this.host.querySelector('yoo-language-selector');
        const backDrop = this.host.querySelector('div');
        setAnimation('background_fade', backDrop, { open: false });
        if (sentFromModal === false) {
            if (modal.animationName === 'sticky_up') {
                const padding = 16;
                const modalHeight = modal.clientHeight;
                setAnimation('sticky_up', modal, { open: false, distance: (((window.innerHeight / 2) + padding) - (modalHeight / 2)), modalHeight: modalHeight });
            }
            else {
                setAnimation(actionSheet ? 'slide_down' : (languageSelector ? 'fade' : modal.animationName), actionSheet ? actionSheet : (languageSelector ? languageSelector : modal), { open: false, up: false });
            }
        }
        setTimeout(() => {
            this.host.setAttribute('style', 'z-index: -1 !important;');
            modal.remove();
            if (actionSheet) {
                actionSheet.remove();
            }
            if (languageSelector) {
                languageSelector.remove();
            }
            this.isGreyedOut = false;
        }, 200);
    }
    closeAlert(alert) {
        if (alert) {
            setAnimation(alert.animationName, alert, { open: false });
            setTimeout(() => {
                alert.remove();
            }, 200);
        }
    }
    closeActionSheet() {
        let actionSheet = this.host.querySelector('yoo-action-sheet');
        if (actionSheet) {
            actionSheet.remove();
        }
    }
    populateModal(modal) {
        this.element = modal;
    }
    generateModal(props) {
        let m = document.createElement('yoo-modal');
        // m = setModalProps(m, props);
        m = Object.assign(m, props);
        m.className += props.cssClass;
        this.element = m;
    }
    generateAlert(props) {
        let newAlert = document.createElement('yoo-alert');
        // newAlert = setAlertProps(newAlert, props);
        newAlert = Object.assign(newAlert, props);
        newAlert.className += props.cssClass;
        this.element = newAlert;
    }
    generateActionSheet(props) {
        let newActionSheet = document.createElement('yoo-action-sheet');
        newActionSheet = Object.assign(newActionSheet, props);
        newActionSheet.className += props.cssClass;
        this.element = newActionSheet;
    }
    generateLanguageSelector(props) {
        let newLanguageSelector = document.createElement('yoo-language-selector');
        newLanguageSelector = Object.assign(newLanguageSelector, props);
        this.element = newLanguageSelector;
    }
    confirm(customController = false, cssClass = 'accent') {
        const content = document.createElement('div');
        content.innerHTML = 'Please confirm the previous action';
        const confirmModalProps = {
            heading: 'Action Required',
            headingIcon: null,
            hasHeader: true,
            hasFooter: true,
            footerText: null,
            content: content,
            primaryButtonText: 'Confirm',
            secondaryButtonText: 'Cancel',
            cssClass: cssClass,
            animationName: 'fade_in_scale',
            withYooCtrl: customController
        };
        this.generateModal(confirmModalProps);
    }
    render() {
        return ([h("div", { onClick: () => this.closeModal(false), class: this.greyContent ? (this.isGreyedOut ? 'placeholder' : '') : 'transparent' }),
            h("div", { class: "alert-container" })]);
    }
    static get is() { return "yoo-modal-controller"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "closeActionSheet": {
            "method": true
        },
        "closeAlert": {
            "method": true
        },
        "closeModal": {
            "method": true
        },
        "confirm": {
            "method": true
        },
        "displayedAlert": {
            "state": true
        },
        "element": {
            "state": true
        },
        "generateActionSheet": {
            "method": true
        },
        "generateAlert": {
            "method": true
        },
        "generateLanguageSelector": {
            "method": true
        },
        "generateModal": {
            "method": true
        },
        "greyContent": {
            "type": Boolean,
            "attr": "grey-content"
        },
        "host": {
            "elementRef": true
        },
        "isGreyedOut": {
            "state": true
        },
        "populateModal": {
            "method": true
        },
        "show": {
            "method": true
        },
        "showActionSheet": {
            "method": true
        },
        "showAlert": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "modalCtrlPrimaryButtonClicked",
            "method": "modalCtrlPrimaryButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "closed",
            "method": "childClosed"
        }, {
            "name": "actionSheetClosed",
            "method": "childActionClosed"
        }, {
            "name": "modalPrimaryButtonClicked",
            "method": "primaryClick"
        }, {
            "name": "alertClosed",
            "method": "onAlertClosed"
        }]; }
    static get style() { return ":host {\n  position: absolute;\n  z-index: -1;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  height: 100%;\n  width: 100%;\n  top: 0%;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  :host .placeholder {\n    z-index: -1;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(58, 67, 97, 0.5); }\n  :host .transparent {\n    height: 100%;\n    width: 100%; }\n  :host .alert-container {\n    position: fixed;\n    bottom: 20px;\n    right: 20px; }"; }
}

export { YooActionSheetComponent as YooActionSheet, YooLanguageSelectorComponent as YooLanguageSelector, YooModalControllerComponent as YooModalController };
