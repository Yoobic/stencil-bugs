/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooToolbarComponent {
    constructor() {
        this.showActive = false;
        this.colors = ['accent', 'danger', 'success', 'info', 'warning', 'dark-60'];
    }
    onClick(action) {
        if (action && action.handler) {
            action.handler();
            if (this.showActive) {
                this.activeAction = action;
            }
        }
    }
    getColor(i) {
        return this.colors[i % this.colors.length];
    }
    render() {
        return this.actions ? (h("div", { class: "container", "attr-layout": "row", "attr-layout-align": "space-around center" },
            h("div", { class: "actions", "attr-layout": "row", "attr-layout-align": "space-between" }, this.actions.map((a, i) => h("div", { onClick: this.onClick.bind(this, a), class: 'action ' + (this.activeAction === a ? 'active' : '') },
                h("div", { class: "circle-container" },
                    h("div", { class: 'circle-border border-' + this.getColor(i) }),
                    h("div", { class: 'circle ' + this.getColor(i) },
                        h("i", { class: a.icon }))),
                h("div", { class: "label" }, a.title)))))) :
            (h("div", { class: "container", "attr-layout": "row", "attr-layout-align": "space-around center" },
                h("slot", null)));
    }
    static get is() { return "yoo-toolbar"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "actions": {
            "type": "Any",
            "attr": "actions"
        },
        "activeAction": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "showActive": {
            "type": Boolean,
            "attr": "show-active"
        }
    }; }
    static get style() { return ":host {\n  display: block; }\n  :host .container {\n    width: 100%;\n    padding: 0.75rem 1rem; }\n    :host .container /deep/ > *:not(:last-child) {\n      margin-right: 1rem; }\n    :host .container .actions {\n      color: var(--light, #FFFFFF);\n      width: 100%;\n      height: 80px; }\n      :host .container .actions .action {\n        text-align: center;\n        cursor: pointer; }\n        :host .container .actions .action .circle-container {\n          position: relative;\n          height: 50px;\n          width: 46px;\n          margin: auto; }\n          :host .container .actions .action .circle-container .circle {\n            color: var(--stable, #adadad);\n            position: absolute;\n            top: 3px;\n            left: 3px;\n            width: 40px;\n            height: 40px;\n            border-radius: 50%;\n            line-height: 40px;\n            margin: auto;\n            margin-bottom: 5px;\n            border-width: 1px;\n            font-size: 1rem; }\n            :host .container .actions .action .circle-container .circle.accent {\n              background: var(--accent, #1FB6FF); }\n            :host .container .actions .action .circle-container .circle.danger {\n              background: var(--danger, #ff625f); }\n            :host .container .actions .action .circle-container .circle.success {\n              background: var(--success, #2EDBB7); }\n            :host .container .actions .action .circle-container .circle.info {\n              background: var(--info, #fc459e); }\n            :host .container .actions .action .circle-container .circle.warning {\n              background: var(--warning, #ff6402); }\n            :host .container .actions .action .circle-container .circle.dark-60 {\n              background: var(--dark-60, #8f8f8f); }\n          :host .container .actions .action .circle-container:hover .circle-border {\n            display: none; }\n          :host .container .actions .action .circle-container .circle-border {\n            position: absolute;\n            border-radius: 50%;\n            border-width: 1px;\n            border-style: solid;\n            top: 0;\n            width: 46px;\n            height: 46px; }\n            :host .container .actions .action .circle-container .circle-border.border-accent {\n              border-color: var(--accent, #1FB6FF); }\n            :host .container .actions .action .circle-container .circle-border.border-danger {\n              border-color: var(--danger, #ff625f); }\n            :host .container .actions .action .circle-container .circle-border.border-success {\n              border-color: var(--success, #2EDBB7); }\n            :host .container .actions .action .circle-container .circle-border.border-info {\n              border-color: var(--info, #fc459e); }\n            :host .container .actions .action .circle-container .circle-border.border-warning {\n              border-color: var(--warning, #ff6402); }\n            :host .container .actions .action .circle-container .circle-border.border-dark-60 {\n              border-color: var(--dark-60, #8f8f8f); }\n        :host .container .actions .action .label {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          padding: 2px 10px;\n          color: var(--dark-60, #8f8f8f);\n          font-size: 0.8125rem; }\n        :host .container .actions .action.active .circle-container .circle {\n          background: var(--success, #2EDBB7);\n          color: var(--light, #FFFFFF); }\n\n:host(.accent) .container {\n  background: var(--accent-10, #e9f8ff);\n  border-bottom: 1px solid var(--accent, #1FB6FF); }\n\n:host(.top) .container {\n  border-bottom: 1px solid var(--dark-20, #dadada); }\n\n:host(.bottom) .container {\n  border-top: 1px solid var(--dark-20, #dadada); }"; }
}

export { YooToolbarComponent as YooToolbar };
