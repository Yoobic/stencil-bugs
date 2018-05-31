export class YooButtonGroupComponent {
    constructor() {
        this.isDropdown = false;
    }
    render() {
        return ((this.isDropdown ? h("yoo-context-menu", null,
            h("yoo-button", { slot: "trigger", icon: "yo-arrow-dropdown", text: this.dropdownTitle }),
            h("div", { class: "context-container", "attr-layout": "column" },
                h("slot", null)))
            : h("div", { class: "group-container", "attr-layout": "row" },
                h("slot", null))));
    }
    static get is() { return "yoo-button-group"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "dropdownTitle": { "type": String, "attr": "dropdown-title" }, "isDropdown": { "type": Boolean, "attr": "is-dropdown" } }; }
    static get style() { return "/**style-placeholder:yoo-button-group:**/"; }
}
