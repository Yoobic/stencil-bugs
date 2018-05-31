/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

const DEFAULT_COLOR = '#ffffff';
class YooFormColorPickerComponent {
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
    static get is() { return "yoo-form-color-picker"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "currentColor": {
            "state": true
        },
        "hideLabel": {
            "type": Boolean,
            "attr": "hide-label"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get events() { return [{
            "name": "colorSelected",
            "method": "colorSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .color-picker-container {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 0.2rem;\n  width: 6rem; }\n  :host .color-picker-container input[type=text] {\n    -webkit-appearance: none;\n    background: transparent;\n    font-size: 0.8rem;\n    width: 4rem;\n    outline: none;\n    border-color: transparent;\n    text-align: center; }\n  :host .color-picker-container .color-selector {\n    height: 1.3rem;\n    width: 1.3rem;\n    border-radius: 50%;\n    border: 1px solid var(--dark-40, #b4b4b4); }\n    :host .color-picker-container .color-selector input[type=color] {\n      height: 1rem;\n      width: 1rem;\n      border: none;\n      outline: none;\n      -webkit-appearance: none;\n      background: transparent;\n      opacity: 0; }\n    :host .color-picker-container .color-selector input[type=color]::-webkit-color-swatch-wrapper {\n      padding: 0px;\n      -webkit-appearance: none;\n      background: transparent; }\n    :host .color-picker-container .color-selector input[type=color]::-webkit-color-swatch {\n      border-radius: 50%;\n      border: none; }\n\n:host(.large) .color-picker-container .color-selector {\n  height: 1.7rem;\n  width: 1.7rem;\n  min-width: 1.7rem;\n  min-height: 1.7rem; }\n  :host(.large) .color-picker-container .color-selector input[type=color] {\n    height: 1.5rem;\n    width: 1.5rem; }"; }
}

export { YooFormColorPickerComponent as YooFormColorPicker };
