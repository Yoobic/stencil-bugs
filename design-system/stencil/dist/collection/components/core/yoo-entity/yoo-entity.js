export class YooEntityComponent {
    render() {
        if (this.item) {
            let imgSrc = null;
            if (this.item.background) {
                imgSrc = this.item.background._downloadURL;
            }
            else if (this.item.image) {
                imgSrc = this.item.image._downloadURL;
            }
            return (h("yoo-card", { heading: this.item.title, subheadings: [this.item.text], imgSrc: imgSrc }));
        }
    }
    static get is() { return "yoo-entity"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "displayType": { "type": String, "attr": "display-type" }, "item": { "type": "Any", "attr": "item" }, "mode": { "type": String, "attr": "mode" } }; }
    static get style() { return "/**style-placeholder:yoo-entity:**/"; }
}
