export class YooToolbarComponent {
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
    static get properties() { return { "_host": { "elementRef": true }, "actions": { "type": "Any", "attr": "actions" }, "activeAction": { "state": true }, "showActive": { "type": Boolean, "attr": "show-active" } }; }
    static get style() { return "/**style-placeholder:yoo-toolbar:**/"; }
}
