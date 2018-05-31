export class YooBadgeComponent {
    getShortValue() {
        if (Math.abs(this.value) <= 999) {
            return this.value.toString();
        }
        else if (Math.abs(this.value) <= 999999) {
            return Math.round(this.value / 1000) + ' K';
        }
        else if (Math.abs(this.value) <= 999999999) {
            return Math.round(this.value / 1000000) + ' M';
        }
        else {
            return Math.round(this.value / 1000000) + ' M';
        }
    }
    render() {
        return (h("div", { class: "badge-label" }, this.getShortValue()));
    }
    static get is() { return "yoo-badge"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "value": { "type": Number, "attr": "value" } }; }
    static get style() { return "/**style-placeholder:yoo-badge:**/"; }
}
