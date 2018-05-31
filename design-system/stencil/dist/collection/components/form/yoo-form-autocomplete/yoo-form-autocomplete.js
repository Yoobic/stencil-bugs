export class YooFormAutocompleteComponent {
    render() {
        return (h("div", null, "YooFormAutocomplete needs a proper template"));
    }
    static get is() { return "yoo-form-autocomplete"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true } }; }
    static get style() { return "/**style-placeholder:yoo-form-autocomplete:**/"; }
}
