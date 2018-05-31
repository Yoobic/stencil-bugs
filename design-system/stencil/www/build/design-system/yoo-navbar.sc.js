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
    static get style() { return "[padding-top][data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  padding-top: 1.75rem;\n  padding-bottom: 1rem; }\n\n[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  padding-top: 1rem;\n  line-height: normal;\n  width: 100%;\n  margin-bottom: 1rem; }\n  [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    width: 100%;\n    position: relative;\n    border-bottom: 1px solid var(--stable, #adadad); }\n    [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar]:hover {\n      cursor: pointer; }\n    [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      color: ccsvar(stable); }\n  [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    padding-right: 1rem;\n    color: var(--stable, #adadad);\n    font-weight: 400;\n    font-size: 1.0625rem; }\n    [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar]   .icon[data-yoo-navbar] {\n      padding: 0.1rem; }\n    [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--text-color, #807f83); }\n    [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.last[data-yoo-navbar] {\n      padding-right: 0; }\n    [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar]:hover {\n      cursor: pointer; }\n    [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container#dropdown[data-yoo-navbar] {\n      padding-left: 1rem;\n      padding-right: 0rem; }\n    [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar]   .notification[data-yoo-navbar] {\n      height: 0.3125rem;\n      width: 0.3125rem;\n      border-radius: 0.15625rem;\n      background-color: var(--danger, #ff625f);\n      -webkit-align-self: center;\n      -ms-flex-item-align: center;\n      align-self: center;\n      margin-right: 0.3125rem; }\n  [data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   yoo-button[data-yoo-navbar] {\n    position: absolute;\n    right: 0px;\n    top: 48px; }\n\n[data-yoo-navbar-host]   .nav-line[data-yoo-navbar] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  height: 2px;\n  border: solid 1px #ececec; }\n\n.items-center[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n.accent[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--light, #FFFFFF); }\n  .accent[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    border-color: var(--accent-20, #d2f0ff); }\n    .accent[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      color: var(--accent, #1FB6FF); }\n  .accent[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--stable, #adadad); }\n    .accent[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--accent, #1FB6FF); }\n\n.negative-accent[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--dark, #444); }\n  .negative-accent[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--accent-20, #d2f0ff); }\n    .negative-accent[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      border-color: var(--accent, #1FB6FF); }\n  .negative-accent[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    .negative-accent[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--accent, #1FB6FF); }\n\n.danger[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--light, #FFFFFF); }\n  .danger[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    border-color: var(--danger-20, #ffe0df); }\n    .danger[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      color: var(--danger, #ff625f); }\n  .danger[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--stable, #adadad); }\n    .danger[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--danger, #ff625f); }\n\n.negative-danger[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--dark, #444); }\n  .negative-danger[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--danger-20, #ffe0df); }\n    .negative-danger[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      border-color: var(--danger, #ff625f); }\n  .negative-danger[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    .negative-danger[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--danger, #ff625f); }\n\n.success[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--light, #FFFFFF); }\n  .success[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    border-color: var(--success-20, #d5f8f1); }\n    .success[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      color: var(--success, #2EDBB7); }\n  .success[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--stable, #adadad); }\n    .success[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--success, #2EDBB7); }\n\n.negative-success[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--dark, #444); }\n  .negative-success[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--success-20, #d5f8f1); }\n    .negative-success[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      border-color: var(--success, #2EDBB7); }\n  .negative-success[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    .negative-success[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--success, #2EDBB7); }\n\n.info[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--light, #FFFFFF); }\n  .info[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    border-color: var(--info-20, #fedaec); }\n    .info[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      color: var(--info, #fc459e); }\n  .info[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--stable, #adadad); }\n    .info[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--info, #fc459e); }\n\n.negative-info[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--dark, #444); }\n  .negative-info[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--info-20, #fedaec); }\n    .negative-info[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      border-color: var(--info, #fc459e); }\n  .negative-info[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    .negative-info[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--info, #fc459e); }\n\n.warning[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--light, #FFFFFF); }\n  .warning[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    border-color: var(--warning-20, #ffe0cc); }\n    .warning[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      color: var(--warning, #ff6402); }\n  .warning[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--stable, #adadad); }\n    .warning[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--warning, #ff6402); }\n\n.negative-warning[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--dark, #444); }\n  .negative-warning[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--warning-20, #ffe0cc); }\n    .negative-warning[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      border-color: var(--warning, #ff6402); }\n  .negative-warning[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    .negative-warning[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--warning, #ff6402); }\n\n.dark[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--light, #FFFFFF); }\n  .dark[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    border-color: var(--dark-20, #dadada); }\n    .dark[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      color: var(--dark, #444); }\n  .dark[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--stable, #adadad); }\n    .dark[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--dark, #444); }\n\n.negative-dark[data-yoo-navbar-host]   .outer-container[data-yoo-navbar] {\n  background-color: var(--dark, #444); }\n  .negative-dark[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown[data-yoo-navbar] {\n    background-color: var(--dark, #444);\n    color: var(--light, #FFFFFF);\n    border-color: var(--dark-20, #dadada); }\n    .negative-dark[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .dropdown.active[data-yoo-navbar] {\n      border-color: var(--dark-80, dimgray); }\n  .negative-dark[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container[data-yoo-navbar] {\n    color: var(--dark-10, #ececec);\n    border-bottom-color: var(--dark, #444); }\n    .negative-dark[data-yoo-navbar-host]   .outer-container[data-yoo-navbar]   .inner-container.active[data-yoo-navbar] {\n      color: var(--light, #FFFFFF);\n      border-bottom-color: var(--dark-80, dimgray); }"; }
}

export { YooNavbarComponent as YooNavbar };
