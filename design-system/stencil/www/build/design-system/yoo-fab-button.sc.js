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
    static get style() { return ".top[data-yoo-fab-button-host]   .fab-in-list.show[data-yoo-fab-button], .top   [data-yoo-fab-button-host]   .fab-in-list.show[data-yoo-fab-button] {\n  margin: 8px 0; }\n\n.bottom[data-yoo-fab-button-host]   .fab-in-list.show[data-yoo-fab-button], .bottom   [data-yoo-fab-button-host]   .fab-in-list.show[data-yoo-fab-button] {\n  margin: 8px 0; }\n\n.left[data-yoo-fab-button-host]   .fab-in-list.show[data-yoo-fab-button], .left   [data-yoo-fab-button-host]   .fab-in-list.show[data-yoo-fab-button] {\n  margin: 0 8px; }\n\n.right[data-yoo-fab-button-host]   .fab-in-list.show[data-yoo-fab-button], .right   [data-yoo-fab-button-host]   .fab-in-list.show[data-yoo-fab-button] {\n  margin: 0 8px; }\n\n[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button] {\n  color: var(--light, #FFFFFF);\n  border-radius: 50%; }\n  [data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n\n[data-yoo-fab-button-host]   .fab-in-list[data-yoo-fab-button] {\n  position: relative;\n  width: 2.625rem;\n  height: 2.625rem;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(0);\n          transform: scale(0); }\n  [data-yoo-fab-button-host]   .fab-in-list[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button] {\n    position: absolute;\n    right: 3.4275rem;\n    bottom: 0.625rem; }\n  [data-yoo-fab-button-host]   .fab-in-list.show[data-yoo-fab-button] {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  [data-yoo-fab-button-host]   .fab-in-list.mini[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n    width: 2.1875rem;\n    height: 2.1875rem;\n    padding: 0.375rem 0rem; }\n\n.large[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  padding: 5px; }\n\n.top-right[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button] {\n  top: 5px;\n  right: 5px; }\n\n.top-left[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button] {\n  top: 5px;\n  left: 5px; }\n\n.bottom-right[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button] {\n  bottom: 5px;\n  right: 5px; }\n\n.bottom-left[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button] {\n  bottom: 5px;\n  left: 5px; }\n\n.accent[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--accent, #1FB6FF); }\n  .accent[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.accent[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--accent, #1FB6FF); }\n  .accent[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.dark[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  background-color: var(--dark, #444);\n  color: var(--dark, #444);\n  border: 1px solid var(--dark-110, #3d3d3d); }\n\n.success[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--success, #2EDBB7); }\n  .success[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.success[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--success, #2EDBB7); }\n  .success[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.success[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  border: 1px solid var(--success-110, #23cba8); }\n\n.danger[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--danger, #ff625f); }\n  .danger[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.danger[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--danger, #ff625f); }\n  .danger[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.danger[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  border: 1px solid var(--danger-110, #ff403c); }\n\n.info[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--info, #fc459e); }\n  .info[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.info[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--info, #fc459e); }\n  .info[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.info[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  border: 1px solid var(--info-110, #c7367c); }\n\n.warning[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--warning, #ff6402); }\n  .warning[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.warning[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--warning, #ff6402); }\n  .warning[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.warning[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  border: 1px solid var(--warning-110, #e75a00); }\n\n.gradient-accent[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n  .gradient-accent[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.gradient-accent[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n  .gradient-accent[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.gradient-accent[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  border: 1px solid var(--accent-110, #02adff); }\n\n.gradient-dark[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n  .gradient-dark[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.gradient-dark[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n  .gradient-dark[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.gradient-dark[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  border: 1px solid var(--dark-110, #3d3d3d); }\n\n.gradient-success[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n  .gradient-success[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.gradient-success[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n  .gradient-success[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.gradient-success[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  border: 1px solid var(--success-110, #23cba8); }\n\n.gradient-info[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n  .gradient-info[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.gradient-info[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n  .gradient-info[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.gradient-info[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  border: 1px solid var(--info-110, #c7367c); }\n\n.gradient-danger[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n  .gradient-danger[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.gradient-danger[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n  .gradient-danger[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.gradient-danger[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  border: 1px solid var(--danger-110, #ff403c); }\n\n.gradient-warning[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n  .gradient-warning[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-button[data-yoo-fab-button]    .container .value {\n    color: var(--light, #FFFFFF); }\n\n.gradient-warning[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n  .gradient-warning[data-yoo-fab-button-host]   .fab-button[data-yoo-fab-button]   yoo-badge[data-yoo-fab-button]    .outer-container .inner-container .inner-text {\n    color: var(--light, #FFFFFF); }\n\n.gradient-warning[data-yoo-fab-button-host]   yoo-button[data-yoo-fab-button]    .container {\n  border: 1px solid var(--warning-110, #e75a00); }"; }
}

export { YooFabButtonComponent as YooFabButton };
