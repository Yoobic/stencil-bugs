/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooFabButtonComponent {
    constructor() {
        this.fabEntry = {};
        this.disabled = false;
        this.parentHasList = false;
        this.activated = false;
        // Toggle buttons in a list
        this.inContainer = false;
        this.inList = false;
        this.activatedState = false;
    }
    componentDidLoad() {
        const parentNode = this.host.parentElement;
        const parentTag = parentNode ? parentNode.nodeName : null;
        this.inContainer = (parentTag === 'YOO-FAB-CONTAINER');
        this.inList = (parentTag === 'YOO-FAB-LIST');
    }
    getButtonClasses() {
        return {
            'fab-button': true,
            'fab-in-list': this.inList
        };
    }
    onClick() {
        if (this.inContainer && this.parentHasList) {
            this.toggleActive();
            this.activatedState = !this.activatedState;
        }
        else {
            if (this.fabEntry.handler && !this.disabled) {
                this.fabEntry.handler();
            }
        }
    }
    isActivated() {
        return (this.activatedState && this.inContainer);
    }
    renderListButton() {
        return (h("div", { class: "list-button-container" },
            this.label ? h("yoo-badge", { text: this.label }) : '',
            h("yoo-button", { class: "fab icon-only", disabled: this.disabled, icon: this.fabEntry.icon ? this.fabEntry.icon : (this.icon ? this.icon : ''), text: this.fabEntry.text ? this.fabEntry.text : (this.text ? this.text : '') })));
    }
    renderContainerButton() {
        return (h("yoo-button", { class: "fab icon-only", disabled: this.disabled, icon: (this.isActivated() ? 'yo-close2' : (this.fabEntry.icon ? this.fabEntry.icon : (this.icon ? this.icon : ''))), text: (this.isActivated() ? '' : this.fabEntry.text ? this.fabEntry.text : this.text ? this.text : '') }));
    }
    render() {
        const fabClasses = Object.assign({}, this.getButtonClasses());
        return (h("div", { class: fabClasses, onClick: this.onClick.bind(this) }, this.inList ? this.renderListButton() : this.renderContainerButton()));
    }
    static get is() { return "yoo-fab-button"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "activated": {
            "type": Boolean,
            "attr": "activated"
        },
        "activatedState": {
            "state": true
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "fabEntry": {
            "type": "Any",
            "attr": "fab-entry"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "inContainer": {
            "state": true
        },
        "inList": {
            "state": true
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "parentHasList": {
            "type": Boolean,
            "attr": "parent-has-list"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "toggleActive": {
            "type": "Any",
            "attr": "toggle-active"
        }
    }; }
    static get style() { return ":host-context(.top) .fab-in-list.show {\n  margin: 8px 0; }\n\n:host-context(.bottom) .fab-in-list.show {\n  margin: 8px 0; }\n\n:host-context(.left) .fab-in-list.show {\n  margin: 0 8px; }\n\n:host-context(.right) .fab-in-list.show {\n  margin: 0 8px; }\n\n:host .fab-button {\n  color: var(--light, #FFFFFF);\n  border-radius: 50%; }\n  :host .fab-button yoo-button /deep/.container {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n\n:host .fab-in-list {\n  position: relative;\n  width: 2.625rem;\n  height: 2.625rem;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(0);\n          transform: scale(0); }\n  :host .fab-in-list yoo-badge {\n    position: absolute;\n    right: 3.4275rem;\n    bottom: 0.625rem; }\n  :host .fab-in-list.show {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  :host .fab-in-list.mini yoo-button /deep/.container {\n    width: 2.1875rem;\n    height: 2.1875rem;\n    padding: 0.375rem 0rem; }\n\n:host(.large) .fab-button yoo-button /deep/.container {\n  padding: 5px; }\n\n:host(.top-right) .fab-button {\n  top: 5px;\n  right: 5px; }\n\n:host(.top-left) .fab-button {\n  top: 5px;\n  left: 5px; }\n\n:host(.bottom-right) .fab-button {\n  bottom: 5px;\n  right: 5px; }\n\n:host(.bottom-left) .fab-button {\n  bottom: 5px;\n  left: 5px; }\n\n:host(.accent) .fab-button yoo-button /deep/.container {\n  background: var(--accent, #1FB6FF); }\n  :host(.accent) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.accent) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--accent, #1FB6FF); }\n  :host(.accent) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.dark) yoo-button /deep/.container {\n  background-color: var(--dark, #444);\n  color: var(--dark, #444);\n  border: 1px solid var(--dark-110, #3d3d3d); }\n\n:host(.success) .fab-button yoo-button /deep/.container {\n  background: var(--success, #2EDBB7); }\n  :host(.success) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.success) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--success, #2EDBB7); }\n  :host(.success) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.success) yoo-button /deep/.container {\n  border: 1px solid var(--success-110, #23cba8); }\n\n:host(.danger) .fab-button yoo-button /deep/.container {\n  background: var(--danger, #ff625f); }\n  :host(.danger) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.danger) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--danger, #ff625f); }\n  :host(.danger) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.danger) yoo-button /deep/.container {\n  border: 1px solid var(--danger-110, #ff403c); }\n\n:host(.info) .fab-button yoo-button /deep/.container {\n  background: var(--info, #fc459e); }\n  :host(.info) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.info) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--info, #fc459e); }\n  :host(.info) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.info) yoo-button /deep/.container {\n  border: 1px solid var(--info-110, #c7367c); }\n\n:host(.warning) .fab-button yoo-button /deep/.container {\n  background: var(--warning, #ff6402); }\n  :host(.warning) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.warning) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--warning, #ff6402); }\n  :host(.warning) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.warning) yoo-button /deep/.container {\n  border: 1px solid var(--warning-110, #e75a00); }\n\n:host(.gradient-accent) .fab-button yoo-button /deep/.container {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n  :host(.gradient-accent) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-accent) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n  :host(.gradient-accent) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-accent) yoo-button /deep/.container {\n  border: 1px solid var(--accent-110, #02adff); }\n\n:host(.gradient-dark) .fab-button yoo-button /deep/.container {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n  :host(.gradient-dark) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-dark) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n  :host(.gradient-dark) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-dark) yoo-button /deep/.container {\n  border: 1px solid var(--dark-110, #3d3d3d); }\n\n:host(.gradient-success) .fab-button yoo-button /deep/.container {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n  :host(.gradient-success) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-success) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n  :host(.gradient-success) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-success) yoo-button /deep/.container {\n  border: 1px solid var(--success-110, #23cba8); }\n\n:host(.gradient-info) .fab-button yoo-button /deep/.container {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n  :host(.gradient-info) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-info) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n  :host(.gradient-info) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-info) yoo-button /deep/.container {\n  border: 1px solid var(--info-110, #c7367c); }\n\n:host(.gradient-danger) .fab-button yoo-button /deep/.container {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n  :host(.gradient-danger) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-danger) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n  :host(.gradient-danger) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-danger) yoo-button /deep/.container {\n  border: 1px solid var(--danger-110, #ff403c); }\n\n:host(.gradient-warning) .fab-button yoo-button /deep/.container {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n  :host(.gradient-warning) .fab-button yoo-button /deep/.container .value {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-warning) .fab-button yoo-badge /deep/.outer-container {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n  :host(.gradient-warning) .fab-button yoo-badge /deep/.outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n:host(.gradient-warning) yoo-button /deep/.container {\n  border: 1px solid var(--warning-110, #e75a00); }"; }
}

export { YooFabButtonComponent as YooFabButton };
