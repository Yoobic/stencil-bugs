/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { d as getElementDimensions } from './chunk-75914b41.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';

class YooNavbarComponent {
    constructor() {
        this.tabs = [];
        this.withLine = false;
        this.animationOnLoadTime = 50;
        this.showDropdown = false;
        this.totalElementWidthArray = [];
        this.translate = window.translateService;
        this.elementWidthArray = [];
    }
    get cumulativeHeadingsWidth() {
        let elementWidth = 0;
        let elementArray = [];
        this.tabs.map((tab, i) => [
            elementWidth = elementWidth + this.host.querySelector('.tab' + i).scrollWidth,
            elementArray.push(elementWidth)
        ]);
        return elementArray;
    }
    get individualHeadingsWidth() {
        let elementWidth = 0;
        let elementArray = [];
        this.tabs.map((tab, i) => [
            elementWidth = this.host.querySelector('.tab' + i).scrollWidth,
            elementArray.push(elementWidth)
        ]);
        return elementArray;
    }
    get dropDownWidth() {
        if (this.activeTitleInDropDown) {
            return this.elementWidthArray[this.selectedTabIndex] + 20;
        }
        else {
            return 40; //pixel width of dropdown
        }
    }
    get numberOfVisibileItems() {
        let width = getElementDimensions(this.host).width;
        let visibileItems = this.tabs.length;
        let firstValue = false;
        this.tabs.map((_title, index) => {
            if ((width - this.dropDownWidth) < this.totalElementWidthArray[index] && !firstValue) {
                if (index === 0) {
                    visibileItems = 1;
                }
                else {
                    visibileItems = index;
                }
                firstValue = true;
            }
        });
        return visibileItems;
    }
    onSelectTab(tab, index) {
        let isToRight = (index > this.selectedTabIndex);
        this.selectedTab = tab;
        this.selectedTabIndex = index;
        this.tabSelectedIsToRight.emit(isToRight);
        setTimeout(() => {
            this.tabSelected.emit(tab);
        }, 50);
        this.resizePage();
    }
    componentWillLoad() {
        if (!this.selectedTab) {
            this.selectedTab = this.tabs[0];
            this.selectedTabIndex = 0;
        }
        this.numberOfVisibileItemsState = this.tabs.length;
    }
    componentDidLoad() {
        this.totalElementWidthArray = this.cumulativeHeadingsWidth;
        this.elementWidthArray = this.individualHeadingsWidth;
        this.resizePage();
        setTimeout(() => {
            this.resizePage();
        }, this.animationOnLoadTime);
        window.addEventListener('resize', () => this.resizePage());
    }
    resizePage() {
        this.numberOfVisibileItemsState = this.numberOfVisibileItems;
        this.showDropdown = (this.numberOfVisibileItemsState < this.tabs.length);
    }
    activeDropdownTitle() {
        this.activeTitleInDropDown = true;
        this.tabs.slice(0, this.numberOfVisibileItemsState).map((tab) => this.selectedTab === tab ? this.activeTitleInDropDown = false : null);
    }
    actionBtnClicked() {
        this.actionButtonClicked.emit(true);
    }
    render() {
        return ([
            h("div", { class: "outer-container", "attr-layout": "row" },
                this.tabs.slice(0, this.numberOfVisibileItemsState).map((tab, i, arr) => h("div", { class: 'inner-container' + (this.selectedTab === tab ? ' active' : '') + ' tab' + i + (i === arr.length - 1 ? ' last' : ''), onClick: () => this.onSelectTab(tab, i), "attr-layout": "row" },
                    tab.hasNotification ? h("div", { class: "notification" }) : null,
                    tab.title)),
                this.showDropdown ? [
                    h("yoo-context-menu", null,
                        this.activeDropdownTitle(),
                        h("div", { class: 'inner-container' + (this.activeTitleInDropDown ? ' active' : ''), slot: "trigger", "attr-layout": "row", id: "dropdown" },
                            this.activeTitleInDropDown ? this.selectedTab.title : (this.translate ? this.translate.get('PREVIOUS') : 'Previous'),
                            " ",
                            h("span", { class: "icon" },
                                h("i", { class: "yo-arrow-dropdown" }))),
                        this.tabs.slice(this.numberOfVisibileItemsState, this.tabs.length).map((tab, i) => h("div", { class: 'dropdown' + (this.selectedTab === tab ? ' active' : '') + ' tab' + i, onClick: () => this.onSelectTab(tab, i) }, tab.title)))
                ]
                    : null,
                this.actionBtnText ? h("yoo-button", { class: 'medium ' + this.host.className, text: this.actionBtnText, onButtonClicked: () => this.actionBtnClicked() }) : ''),
            this.withLine ? h("div", { "attr-layout": "row", class: "nav-line" }) : ''
        ]);
    }
    static get is() { return "yoo-navbar"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "actionBtnText": {
            "type": String,
            "attr": "action-btn-text"
        },
        "animationOnLoadTime": {
            "type": Number,
            "attr": "animation-on-load-time"
        },
        "host": {
            "elementRef": true
        },
        "numberOfVisibileItemsState": {
            "state": true
        },
        "selectedTab": {
            "type": "Any",
            "attr": "selected-tab",
            "mutable": true
        },
        "showDropdown": {
            "state": true
        },
        "tabs": {
            "type": "Any",
            "attr": "tabs"
        },
        "withLine": {
            "type": Boolean,
            "attr": "with-line"
        }
    }; }
    static get events() { return [{
            "name": "tabSelected",
            "method": "tabSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "tabSelectedIsToRight",
            "method": "tabSelectedIsToRight",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "actionButtonClicked",
            "method": "actionButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host[padding-top] .outer-container {\n  padding-top: 1.75rem;\n  padding-bottom: 1rem; }\n\n:host .outer-container {\n  padding-top: 1rem;\n  line-height: normal;\n  width: 100%;\n  margin-bottom: 1rem; }\n  :host .outer-container .dropdown {\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    width: 100%;\n    position: relative;\n    border-bottom: 1px solid var(--stable, #adadad); }\n    :host .outer-container .dropdown:hover {\n      cursor: pointer; }\n    :host .outer-container .dropdown.active {\n      color: ccsvar(stable); }\n  :host .outer-container .inner-container {\n    padding-right: 1rem;\n    color: var(--stable, #adadad);\n    font-weight: 400;\n    font-size: 1.0625rem; }\n    :host .outer-container .inner-container .icon {\n      padding: 0.1rem; }\n    :host .outer-container .inner-container.active {\n      color: var(--text-color, #807f83); }\n    :host .outer-container .inner-container.last {\n      padding-right: 0; }\n    :host .outer-container .inner-container:hover {\n      cursor: pointer; }\n    :host .outer-container .inner-container#dropdown {\n      padding-left: 1rem;\n      padding-right: 0rem; }\n    :host .outer-container .inner-container .notification {\n      height: 0.3125rem;\n      width: 0.3125rem;\n      border-radius: 0.15625rem;\n      background-color: var(--danger, #ff625f);\n      -webkit-align-self: center;\n      -ms-flex-item-align: center;\n      align-self: center;\n      margin-right: 0.3125rem; }\n  :host .outer-container yoo-button {\n    position: absolute;\n    right: 0px;\n    top: 48px; }\n\n:host .nav-line {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  height: 2px;\n  border: solid 1px #ececec; }\n\n:host(.items-center) .outer-container {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n:host(.accent) .outer-container {\n  background-color: var(--light, #FFFFFF); }\n  :host(.accent) .outer-container .dropdown {\n    border-color: var(--accent-20, #d2f0ff); }\n    :host(.accent) .outer-container .dropdown.active {\n      color: var(--accent, #1FB6FF); }\n  :host(.accent) .outer-container .inner-container {\n    color: var(--stable, #adadad); }\n    :host(.accent) .outer-container .inner-container.active {\n      color: var(--accent, #1FB6FF); }\n\n:host(.negative-accent) .outer-container {\n  background-color: var(--dark, #444); }\n  :host(.negative-accent) .outer-container .dropdown {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--accent-20, #d2f0ff); }\n    :host(.negative-accent) .outer-container .dropdown.active {\n      border-color: var(--accent, #1FB6FF); }\n  :host(.negative-accent) .outer-container .inner-container {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    :host(.negative-accent) .outer-container .inner-container.active {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--accent, #1FB6FF); }\n\n:host(.danger) .outer-container {\n  background-color: var(--light, #FFFFFF); }\n  :host(.danger) .outer-container .dropdown {\n    border-color: var(--danger-20, #ffe0df); }\n    :host(.danger) .outer-container .dropdown.active {\n      color: var(--danger, #ff625f); }\n  :host(.danger) .outer-container .inner-container {\n    color: var(--stable, #adadad); }\n    :host(.danger) .outer-container .inner-container.active {\n      color: var(--danger, #ff625f); }\n\n:host(.negative-danger) .outer-container {\n  background-color: var(--dark, #444); }\n  :host(.negative-danger) .outer-container .dropdown {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--danger-20, #ffe0df); }\n    :host(.negative-danger) .outer-container .dropdown.active {\n      border-color: var(--danger, #ff625f); }\n  :host(.negative-danger) .outer-container .inner-container {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    :host(.negative-danger) .outer-container .inner-container.active {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--danger, #ff625f); }\n\n:host(.success) .outer-container {\n  background-color: var(--light, #FFFFFF); }\n  :host(.success) .outer-container .dropdown {\n    border-color: var(--success-20, #d5f8f1); }\n    :host(.success) .outer-container .dropdown.active {\n      color: var(--success, #2EDBB7); }\n  :host(.success) .outer-container .inner-container {\n    color: var(--stable, #adadad); }\n    :host(.success) .outer-container .inner-container.active {\n      color: var(--success, #2EDBB7); }\n\n:host(.negative-success) .outer-container {\n  background-color: var(--dark, #444); }\n  :host(.negative-success) .outer-container .dropdown {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--success-20, #d5f8f1); }\n    :host(.negative-success) .outer-container .dropdown.active {\n      border-color: var(--success, #2EDBB7); }\n  :host(.negative-success) .outer-container .inner-container {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    :host(.negative-success) .outer-container .inner-container.active {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--success, #2EDBB7); }\n\n:host(.info) .outer-container {\n  background-color: var(--light, #FFFFFF); }\n  :host(.info) .outer-container .dropdown {\n    border-color: var(--info-20, #fedaec); }\n    :host(.info) .outer-container .dropdown.active {\n      color: var(--info, #fc459e); }\n  :host(.info) .outer-container .inner-container {\n    color: var(--stable, #adadad); }\n    :host(.info) .outer-container .inner-container.active {\n      color: var(--info, #fc459e); }\n\n:host(.negative-info) .outer-container {\n  background-color: var(--dark, #444); }\n  :host(.negative-info) .outer-container .dropdown {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--info-20, #fedaec); }\n    :host(.negative-info) .outer-container .dropdown.active {\n      border-color: var(--info, #fc459e); }\n  :host(.negative-info) .outer-container .inner-container {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    :host(.negative-info) .outer-container .inner-container.active {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--info, #fc459e); }\n\n:host(.warning) .outer-container {\n  background-color: var(--light, #FFFFFF); }\n  :host(.warning) .outer-container .dropdown {\n    border-color: var(--warning-20, #ffe0cc); }\n    :host(.warning) .outer-container .dropdown.active {\n      color: var(--warning, #ff6402); }\n  :host(.warning) .outer-container .inner-container {\n    color: var(--stable, #adadad); }\n    :host(.warning) .outer-container .inner-container.active {\n      color: var(--warning, #ff6402); }\n\n:host(.negative-warning) .outer-container {\n  background-color: var(--dark, #444); }\n  :host(.negative-warning) .outer-container .dropdown {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--warning-20, #ffe0cc); }\n    :host(.negative-warning) .outer-container .dropdown.active {\n      border-color: var(--warning, #ff6402); }\n  :host(.negative-warning) .outer-container .inner-container {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    :host(.negative-warning) .outer-container .inner-container.active {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--warning, #ff6402); }\n\n:host(.dark) .outer-container {\n  background-color: var(--light, #FFFFFF); }\n  :host(.dark) .outer-container .dropdown {\n    border-color: var(--dark-20, #dadada); }\n    :host(.dark) .outer-container .dropdown.active {\n      color: var(--dark, #444); }\n  :host(.dark) .outer-container .inner-container {\n    color: var(--stable, #adadad); }\n    :host(.dark) .outer-container .inner-container.active {\n      color: var(--dark, #444); }\n\n:host(.negative-dark) .outer-container {\n  background-color: var(--dark, #444); }\n  :host(.negative-dark) .outer-container .dropdown {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--dark-20, #dadada); }\n    :host(.negative-dark) .outer-container .dropdown.active {\n      border-color: var(--dark-80, dimgray); }\n  :host(.negative-dark) .outer-container .inner-container {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    :host(.negative-dark) .outer-container .inner-container.active {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--dark-80, dimgray); }"; }
}

export { YooNavbarComponent as YooNavbar };
