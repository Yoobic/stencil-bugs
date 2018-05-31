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
    static get style() { return "[data-yoo-toolbar-host] {\n  display: block; }\n  [data-yoo-toolbar-host]   .container[data-yoo-toolbar] {\n    width: 100%;\n    padding: 0.75rem 1rem; }\n    [data-yoo-toolbar-host]   .container[data-yoo-toolbar]     > *:not(:last-child) {\n      margin-right: 1rem; }\n    [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar] {\n      color: var(--light, #FFFFFF);\n      width: 100%;\n      height: 80px; }\n      [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar] {\n        text-align: center;\n        cursor: pointer; }\n        [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar] {\n          position: relative;\n          height: 50px;\n          width: 46px;\n          margin: auto; }\n          [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle[data-yoo-toolbar] {\n            color: var(--stable, #adadad);\n            position: absolute;\n            top: 3px;\n            left: 3px;\n            width: 40px;\n            height: 40px;\n            border-radius: 50%;\n            line-height: 40px;\n            margin: auto;\n            margin-bottom: 5px;\n            border-width: 1px;\n            font-size: 1rem; }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle.accent[data-yoo-toolbar] {\n              background: var(--accent, #1FB6FF); }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle.danger[data-yoo-toolbar] {\n              background: var(--danger, #ff625f); }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle.success[data-yoo-toolbar] {\n              background: var(--success, #2EDBB7); }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle.info[data-yoo-toolbar] {\n              background: var(--info, #fc459e); }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle.warning[data-yoo-toolbar] {\n              background: var(--warning, #ff6402); }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle.dark-60[data-yoo-toolbar] {\n              background: var(--dark-60, #8f8f8f); }\n          [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]:hover   .circle-border[data-yoo-toolbar] {\n            display: none; }\n          [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle-border[data-yoo-toolbar] {\n            position: absolute;\n            border-radius: 50%;\n            border-width: 1px;\n            border-style: solid;\n            top: 0;\n            width: 46px;\n            height: 46px; }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle-border.border-accent[data-yoo-toolbar] {\n              border-color: var(--accent, #1FB6FF); }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle-border.border-danger[data-yoo-toolbar] {\n              border-color: var(--danger, #ff625f); }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle-border.border-success[data-yoo-toolbar] {\n              border-color: var(--success, #2EDBB7); }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle-border.border-info[data-yoo-toolbar] {\n              border-color: var(--info, #fc459e); }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle-border.border-warning[data-yoo-toolbar] {\n              border-color: var(--warning, #ff6402); }\n            [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle-border.border-dark-60[data-yoo-toolbar] {\n              border-color: var(--dark-60, #8f8f8f); }\n        [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action[data-yoo-toolbar]   .label[data-yoo-toolbar] {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          padding: 2px 10px;\n          color: var(--dark-60, #8f8f8f);\n          font-size: 0.8125rem; }\n        [data-yoo-toolbar-host]   .container[data-yoo-toolbar]   .actions[data-yoo-toolbar]   .action.active[data-yoo-toolbar]   .circle-container[data-yoo-toolbar]   .circle[data-yoo-toolbar] {\n          background: var(--success, #2EDBB7);\n          color: var(--light, #FFFFFF); }\n\n.accent[data-yoo-toolbar-host]   .container[data-yoo-toolbar] {\n  background: var(--accent-10, #e9f8ff);\n  border-bottom: 1px solid var(--accent, #1FB6FF); }\n\n.top[data-yoo-toolbar-host]   .container[data-yoo-toolbar] {\n  border-bottom: 1px solid var(--dark-20, #dadada); }\n\n.bottom[data-yoo-toolbar-host]   .container[data-yoo-toolbar] {\n  border-top: 1px solid var(--dark-20, #dadada); }"; }
}

export { YooToolbarComponent as YooToolbar };
