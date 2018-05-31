export const DEFAULT_COLOR = '#ffffff';
export class YooColorPickerComponent {
    constructor() {
        this.color = DEFAULT_COLOR;
        this.hideLabel = false;
    }
    colorValidation(newValue) {
        let validation = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$'); // Regular Expression to validate hexadecimal color
        if (validation.test(newValue) && newValue.length === 7) {
            this.currentColor = newValue;
        }
        else {
            this.currentColor = DEFAULT_COLOR;
        }
    }
    onInputChange(ev) {
        this.currentColor = ev.target.value; //Use to re-render !! needed to reset input value
        this.colorValidation(ev.target.value);
        this.colorSelected.emit(this.currentColor);
    }
    componentWillLoad() {
        this.colorValidation(this.color);
    }
    render() {
        let colorSelectorStyle = { background: this.currentColor };
        return (h("div", { class: "color-picker-container", "attr-layout": "row" },
            h("div", { class: "color-selector", style: colorSelectorStyle },
                h("input", { type: "color", value: this.currentColor, onChange: (event) => this.onInputChange(event), onInput: (event) => this.onInputChange(event) })),
            this.hideLabel ? null :
                h("input", { type: "text", value: this.currentColor, onChange: (event) => this.onInputChange(event) })));
    }
    static get is() { return "yoo-color-picker"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "color": { "type": String, "attr": "color" }, "currentColor": { "state": true }, "hideLabel": { "type": Boolean, "attr": "hide-label" } }; }
    static get events() { return [{ "name": "colorSelected", "method": "colorSelected", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-color-picker:**/"; }
}
