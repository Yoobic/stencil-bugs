/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooFormRadioGroupComponent {
    constructor() {
        this.values = [];
        this.multipleSelection = false;
        this.items = [];
    }
    radioReset() {
        this.items = this.items.map((item, index) => {
            return { text: item.text, checked: false };
        });
    }
    calculateRadioSelection(index) {
        if (this.multipleSelection) {
            this.items[index].checked = !this.items[index].checked;
        }
        else {
            let alreadyChecked = this.items[index].checked;
            this.radioReset();
            this.items[index].checked = !alreadyChecked;
        }
    }
    onRadioClicked(index) {
        this.calculateRadioSelection(index);
        this.selectionChanged.emit(this.items);
    }
    componentWillLoad() {
        this.items = this.values;
    }
    render() {
        return (h("div", { class: "container", "attr-layout": "column" }, this.items.map((obj, index) => h("div", { class: "inner-container" },
            h("yoo-form-radio", { text: obj.text, class: this.host.className, state: obj.checked ? 'checked' : 'unchecked', onRadioClicked: () => this.onRadioClicked(index) })))));
    }
    static get is() { return "yoo-form-radio-group"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "items": {
            "state": true
        },
        "multipleSelection": {
            "type": Boolean,
            "attr": "multiple-selection"
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get events() { return [{
            "name": "selectionChanged",
            "method": "selectionChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

export { YooFormRadioGroupComponent as YooFormRadioGroup };
