export class YooFormStarRatingComponent {
    constructor() {
        this.stars = 5;
        this.current = 0;
    }
    getArray() {
        return new Array(this.stars).fill(0);
    }
    onStarClick(index) {
        if (this.current !== index + 1) {
            this.current = index + 1;
            this.changed.emit(this.current);
        }
    }
    render() {
        return (h("div", { class: "star-rating-container", "attr-layout": "row" }, this.getArray().map((elem, index) => h("div", { class: "star-container" },
            h("i", { class: this.current > index ? 'yo-star-full' : 'yo-star', onClick: () => this.onStarClick(index) })))));
    }
    static get is() { return "yoo-form-star-rating"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "current": { "state": true }, "host": { "elementRef": true }, "stars": { "type": Number, "attr": "stars" } }; }
    static get events() { return [{ "name": "changed", "method": "changed", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-form-star-rating:**/"; }
}
