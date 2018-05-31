export class YooPanelComponent {
    render() {
        return (h("div", null,
            h("canvas", { class: 'outer-container' + (this.width ? '' : ' width') + (this.height ? '' : ' height'), width: this.width, height: this.height })));
    }
    static get is() { return "yoo-panel"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "height": { "type": Number, "attr": "height" }, "width": { "type": Number, "attr": "width" } }; }
    static get style() { return "/**style-placeholder:yoo-panel:**/"; }
}
