import { setAnimation } from '../../../utils/anim';
export class YooAlertComponent {
    componentDidLoad() {
        setAnimation(this.animationName, this.host, { open: true });
    }
    onActionTextClick() {
        this.alertActionSelected.emit(true);
    }
    onDismissButtonClick() {
        this.alertClosed.emit(true);
        this.closed = true;
    }
    render() {
        return (h("div", { class: this.closed ? 'container closed' : 'container' },
            h("div", { class: "inner-container" },
                this.icon ? h("span", { class: "icon" },
                    h("i", { class: this.icon })) : null,
                h("div", { class: "text-container" },
                    this.heading ? h("span", { class: "heading" }, this.heading) : null,
                    h("span", { class: "value", onClick: () => this.onActionTextClick() }, this.text))),
            h("div", { class: "close-container" }, this.closeable ? h("span", { class: "close", onClick: () => this.onDismissButtonClick() },
                " ",
                h("i", { class: "yo-close2" })) : null)));
    }
    static get is() { return "yoo-alert"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "animationName": { "type": String, "attr": "animation-name" }, "closeable": { "type": Boolean, "attr": "closeable" }, "closed": { "state": true }, "heading": { "type": String, "attr": "heading" }, "host": { "elementRef": true }, "icon": { "type": String, "attr": "icon" }, "text": { "type": String, "attr": "text" } }; }
    static get events() { return [{ "name": "alertClosed", "method": "alertClosed", "bubbles": true, "cancelable": true, "composed": true }, { "name": "alertActionSelected", "method": "alertActionSelected", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-alert:**/"; }
}
