export class YooFormButtonChoiceComponent {
    constructor() {
        this.multiple = false;
        this.choices = [];
        this.selected = [];
    }
    selectedUpdater() {
        let defaultSelected = this.choices.map(() => false);
        if (this.selected.length !== this.choices.length) {
            this.selected = defaultSelected;
        }
        else if (!this.multiple && this.selected.filter(val => val).length > 1) {
            this.selected = defaultSelected;
        }
    }
    componentWillLoad() {
        this.selectedUpdater();
    }
    hasFewItems() {
        return this.choices.length < 5;
    }
    clickChoice(index) {
        if (this.multiple) {
            this.selected = this.selected.map((value, index1) => index === index1 ? !value : value);
        }
        else {
            this.selected = this.selected.map((value, index1) => index === index1 ? !value : false);
        }
        this.changed.emit(this.choices.filter((choice, index1) => this.selected[index1]));
    }
    renderItem(choice, index, selected) {
        return (h("div", { class: 'choice-container ' + (selected ? 'selected' : ''), onClick: () => this.clickChoice(index) },
            h("span", null, choice)));
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: 'grid-container ' + (this.hasFewItems() ? 'few-items' : '') }, this.choices.map((choice, index) => {
                return this.renderItem(choice, index, this.selected[index]);
            }))));
    }
    static get is() { return "yoo-form-button-choice"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "choices": { "type": "Any", "attr": "choices", "watchCallbacks": ["selectedUpdater"] }, "multiple": { "type": Boolean, "attr": "multiple" }, "selected": { "type": "Any", "attr": "selected", "mutable": true, "watchCallbacks": ["selectedUpdater"] } }; }
    static get events() { return [{ "name": "changed", "method": "changed", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-form-button-choice:**/"; }
}
