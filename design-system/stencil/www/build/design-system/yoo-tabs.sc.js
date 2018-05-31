/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooTabsComponent {
    constructor() {
        this.titles = [];
        this.selected = 0;
        this.numberTabsDisplayed = 4;
    }
    selectedChange(newValue) {
        if (newValue < this.titles.length && newValue >= 0) {
            this.selectedTab = this.titles[newValue];
        }
    }
    titlesChange(newValue) {
        if (this.selected < this.titles.length) {
            this.selectedTab = this.titles[this.selected];
        }
    }
    handleClickTab(title) {
        this.selectedTab = title;
        this.tabChanged.emit(title);
    }
    componentWillLoad() {
        if (this.selected < this.titles.length) {
            this.selectedTab = this.titles[this.selected];
        }
        this.setMaximumTabDisplayable(this.numberTabsDisplayed);
        window.addEventListener('resize', () => this.onResize());
    }
    onResize() {
        this.setMaximumTabDisplayable(this.numberTabsDisplayed);
    }
    setMaximumTabDisplayable(newValue) {
        const maxWidthTitle = 100;
        const maxHeightTitle = 70;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let displayableTabs;
        if (this.host.classList.contains('vertical')) {
            displayableTabs = Math.floor((height / maxHeightTitle)) - 1;
        }
        else {
            displayableTabs = Math.floor((width / maxWidthTitle)) - 1;
        }
        if (newValue < displayableTabs) {
            this.tabsDisplayed = newValue;
        }
        else {
            this.tabsDisplayed = displayableTabs;
        }
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "tab-selector" },
                this.titles.slice(0, this.tabsDisplayed).map((title) => h("div", { class: 'tab-title' + ((this.selectedTab === title) ? ' active-title' : ''), onClick: () => this.handleClickTab(title) }, title)),
                this.tabsDisplayed < this.titles.length ?
                    h("div", { class: "tab-title" },
                        h("yoo-context-menu", null,
                            h("div", { slot: "trigger", class: "tab-title-other" },
                                "Other ",
                                h("span", { class: this.host.className.indexOf('vertical') !== -1 ? 'yo-right' : 'yo-arrow-dropdown' })),
                            this.titles.slice(this.tabsDisplayed).map((title, index) => h("div", { class: 'other-title dropdown-entry' + ((index) ? ' border-bottom' : ''), onClick: () => this.handleClickTab(title), "data-yoo-context-menu": true }, title))))
                    : null),
            h("div", { class: "tab-content" }, this.titles.map((title) => h("div", { class: this.selectedTab === title ? 'selected-tab' : 'undisplayed-tab' },
                h("slot", { name: title }))))));
    }
    static get is() { return "yoo-tabs"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "numberTabsDisplayed": {
            "type": Number,
            "attr": "number-tabs-displayed",
            "watchCallbacks": ["setMaximumTabDisplayable"]
        },
        "selected": {
            "type": Number,
            "attr": "selected",
            "watchCallbacks": ["selectedChange"]
        },
        "selectedTab": {
            "state": true
        },
        "tabsDisplayed": {
            "state": true
        },
        "titles": {
            "type": "Any",
            "attr": "titles",
            "watchCallbacks": ["titlesChange"]
        }
    }; }
    static get events() { return [{
            "name": "tabChanged",
            "method": "tabChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-tabs-host]   .outer-container[data-yoo-tabs] {\n  background: var(--light, #FFFFFF);\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  color: var(--stable, #adadad); }\n  [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs] {\n    width: 100%;\n    border-color: var(--dark-10, #ececec);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-bottom-width: 0.1rem; }\n    [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs] {\n      display: inline-block;\n      padding: 1rem;\n      -webkit-transform: translateY(1px);\n              transform: translateY(1px); }\n    [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:hover {\n      cursor: pointer;\n      color: var(--success, #2EDBB7);\n      border-color: var(--success, #2EDBB7);\n      border-style: solid;\n      border-top-width: 0rem;\n      border-right-width: 0rem;\n      border-left-width: 0rem;\n      border-bottom-width: 0rem;\n      border-bottom-width: 0.1rem; }\n    [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:focus {\n      border-color: var(--success, #2EDBB7);\n      border-style: solid;\n      border-top-width: 0.1rem;\n      border-right-width: 0.1rem;\n      border-left-width: 0.1rem;\n      border-bottom-width: 0.1rem;\n      border-radius: 0.2rem;\n      outline-width: 0rem; }\n    [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title.active-title[data-yoo-tabs] {\n      color: var(--success, #2EDBB7);\n      border-color: var(--success, #2EDBB7);\n      border-style: solid;\n      border-top-width: 0rem;\n      border-right-width: 0rem;\n      border-left-width: 0rem;\n      border-bottom-width: 0rem;\n      border-bottom-width: 0.1rem; }\n    [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   yoo-context-menu[data-yoo-tabs] {\n      display: inline-block; }\n      [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   yoo-context-menu[data-yoo-tabs]    .tab-title-other {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center; }\n        [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   yoo-context-menu[data-yoo-tabs]    .tab-title-other .yo-arrow-dropdown {\n          padding-left: 0.2rem; }\n        [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   yoo-context-menu[data-yoo-tabs]    .tab-title-other:hover {\n          color: var(--success, #2EDBB7); }\n  [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-content[data-yoo-tabs] {\n    padding: 1rem; }\n    [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-content[data-yoo-tabs]   .undisplayed-tab[data-yoo-tabs] {\n      display: none; }\n    [data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-content[data-yoo-tabs]   .selected-tab[data-yoo-tabs] {\n      width: 100%;\n      display: block; }\n\n.vertical.accent[data-yoo-tabs-host]   .outer-container[data-yoo-tabs] {\n  color: var(--stable, #adadad); }\n  .vertical.accent[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:hover {\n    color: var(--accent, #1FB6FF);\n    border-color: var(--accent, #1FB6FF);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-right-width: 0.1rem; }\n  .vertical.accent[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:focus {\n    border-color: var(--accent, #1FB6FF);\n    border-style: solid;\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-radius: 0.2rem;\n    outline-width: 0rem; }\n  .vertical.accent[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title.active-title[data-yoo-tabs] {\n    color: var(--accent, #1FB6FF);\n    border-color: var(--accent, #1FB6FF);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-right-width: 0.1rem; }\n  .vertical.accent[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   yoo-context-menu[data-yoo-tabs]    .tab-title-other:hover {\n    color: var(--accent, #1FB6FF); }\n\n.vertical.danger[data-yoo-tabs-host]   .outer-container[data-yoo-tabs] {\n  color: var(--stable, #adadad); }\n  .vertical.danger[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:hover {\n    color: var(--danger, #ff625f);\n    border-color: var(--danger, #ff625f);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-right-width: 0.1rem; }\n  .vertical.danger[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:focus {\n    border-color: var(--danger, #ff625f);\n    border-style: solid;\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-radius: 0.2rem;\n    outline-width: 0rem; }\n  .vertical.danger[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title.active-title[data-yoo-tabs] {\n    color: var(--danger, #ff625f);\n    border-color: var(--danger, #ff625f);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-right-width: 0.1rem; }\n  .vertical.danger[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   yoo-context-menu[data-yoo-tabs]    .tab-title-other:hover {\n    color: var(--danger, #ff625f); }\n\n.vertical.info[data-yoo-tabs-host]   .outer-container[data-yoo-tabs] {\n  color: var(--stable, #adadad); }\n  .vertical.info[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:hover {\n    color: var(--info, #fc459e);\n    border-color: var(--info, #fc459e);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-right-width: 0.1rem; }\n  .vertical.info[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:focus {\n    border-color: var(--info, #fc459e);\n    border-style: solid;\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-radius: 0.2rem;\n    outline-width: 0rem; }\n  .vertical.info[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title.active-title[data-yoo-tabs] {\n    color: var(--info, #fc459e);\n    border-color: var(--info, #fc459e);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-right-width: 0.1rem; }\n  .vertical.info[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   yoo-context-menu[data-yoo-tabs]    .tab-title-other:hover {\n    color: var(--info, #fc459e); }\n\n.vertical[data-yoo-tabs-host]   .outer-container[data-yoo-tabs] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n  .vertical[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs] {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    width: unset;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    border-color: var(--dark-10, #ececec);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-right-width: 0.1rem; }\n    .vertical[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs] {\n      display: inline;\n      padding: 1rem;\n      -webkit-transform: translateX(2px) !important;\n              transform: translateX(2px) !important; }\n    .vertical[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:hover {\n      color: var(--success, #2EDBB7);\n      border-color: var(--success, #2EDBB7);\n      border-style: solid;\n      border-top-width: 0rem;\n      border-right-width: 0rem;\n      border-left-width: 0rem;\n      border-bottom-width: 0rem;\n      border-right-width: 0.1rem; }\n    .vertical[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title.active-title[data-yoo-tabs] {\n      color: var(--success, #2EDBB7);\n      border-color: var(--success, #2EDBB7);\n      border-style: solid;\n      border-top-width: 0rem;\n      border-right-width: 0rem;\n      border-left-width: 0rem;\n      border-bottom-width: 0rem;\n      border-right-width: 0.1rem; }\n    .vertical[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]    yoo-context-menu .dropdown-content {\n      -webkit-transform: translateY(-100%) translateX(5.5rem);\n              transform: translateY(-100%) translateX(5.5rem); }\n    .vertical[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]    yoo-context-menu .tab-title-other .yo-right {\n      padding-left: 0.2rem; }\n    .vertical[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]    yoo-context-menu .tab-title-other:hover {\n      border-bottom-width: 0rem; }\n\n.accent[data-yoo-tabs-host]   .outer-container[data-yoo-tabs] {\n  color: var(--stable, #adadad); }\n  .accent[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:hover {\n    color: var(--accent, #1FB6FF);\n    border-color: var(--accent, #1FB6FF);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-bottom-width: 0.1rem; }\n  .accent[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:focus {\n    border-color: var(--accent, #1FB6FF);\n    border-style: solid;\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-radius: 0.2rem;\n    outline-width: 0rem; }\n  .accent[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title.active-title[data-yoo-tabs] {\n    color: var(--accent, #1FB6FF);\n    border-color: var(--accent, #1FB6FF);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-bottom-width: 0.1rem; }\n  .accent[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   yoo-context-menu[data-yoo-tabs]    .tab-title-other:hover {\n    color: var(--accent, #1FB6FF); }\n\n.danger[data-yoo-tabs-host]   .outer-container[data-yoo-tabs] {\n  color: var(--stable, #adadad); }\n  .danger[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:hover {\n    color: var(--danger, #ff625f);\n    border-color: var(--danger, #ff625f);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-bottom-width: 0.1rem; }\n  .danger[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:focus {\n    border-color: var(--danger, #ff625f);\n    border-style: solid;\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-radius: 0.2rem;\n    outline-width: 0rem; }\n  .danger[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title.active-title[data-yoo-tabs] {\n    color: var(--danger, #ff625f);\n    border-color: var(--danger, #ff625f);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-bottom-width: 0.1rem; }\n  .danger[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   yoo-context-menu[data-yoo-tabs]    .tab-title-other:hover {\n    color: var(--danger, #ff625f); }\n\n.info[data-yoo-tabs-host]   .outer-container[data-yoo-tabs] {\n  color: var(--stable, #adadad); }\n  .info[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:hover {\n    color: var(--info, #fc459e);\n    border-color: var(--info, #fc459e);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-bottom-width: 0.1rem; }\n  .info[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title[data-yoo-tabs]:focus {\n    border-color: var(--info, #fc459e);\n    border-style: solid;\n    border-top-width: 0.1rem;\n    border-right-width: 0.1rem;\n    border-left-width: 0.1rem;\n    border-bottom-width: 0.1rem;\n    border-radius: 0.2rem;\n    outline-width: 0rem; }\n  .info[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   .tab-title.active-title[data-yoo-tabs] {\n    color: var(--info, #fc459e);\n    border-color: var(--info, #fc459e);\n    border-style: solid;\n    border-top-width: 0rem;\n    border-right-width: 0rem;\n    border-left-width: 0rem;\n    border-bottom-width: 0rem;\n    border-bottom-width: 0.1rem; }\n  .info[data-yoo-tabs-host]   .outer-container[data-yoo-tabs]   .tab-selector[data-yoo-tabs]   yoo-context-menu[data-yoo-tabs]    .tab-title-other:hover {\n    color: var(--info, #fc459e); }"; }
}

export { YooTabsComponent as YooTabs };
