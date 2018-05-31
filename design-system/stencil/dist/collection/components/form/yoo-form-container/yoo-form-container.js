export class YooFormContainerComponent {
    render() {
        return [
            this.description ? h("div", { class: "description" },
                " ",
                this.description) : '',
            this.label ?
                h("div", { class: "label" },
                    this.label,
                    this.required ? h("span", { class: "label-required" }, "*") : null) : null,
            h("div", { class: "content-container" },
                h("slot", { name: "content" })),
            this.hint ? h("div", { class: "hint" }, this.hint) : ''
        ];
    }
    static get is() { return "yoo-form-container"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "description": { "type": String, "attr": "description" }, "hint": { "type": String, "attr": "hint" }, "label": { "type": String, "attr": "label" }, "required": { "type": Boolean, "attr": "required" } }; }
    static get style() { return "/**style-placeholder:yoo-form-container:**/"; }
}
