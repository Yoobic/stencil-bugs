import { setAnimation } from '../../../utils/anim';
export class YooActionSheetComponent {
    constructor() {
        this.buttons = [];
    }
    closeActionSheet() {
        setAnimation('slide_down', this.host.querySelector('div'), { open: false });
        this.actionSheetClosed.emit(true);
    }
    onButtonClick(heading, disabled) {
        if (!disabled) {
            this.actionSelected.emit(heading);
            let modal = this.host.querySelector('yoo-modal');
            modal.remove();
            this.actionSheetClosed.emit(true);
        }
    }
    componentDidLoad() {
        setAnimation('slide_down', this.host.querySelector('div'), { open: true });
    }
    render() {
        return (h("yoo-modal", { heading: this.heading, class: "action-sheet", onClosed: () => this.closeActionSheet() },
            h("div", { slot: "modal-content", "attr-layout": "column" },
                h("div", { class: "outer-container", "attr-layout": "column" }, this.buttons.map((button) => h("div", { class: "inner-container" },
                    h("yoo-button", { text: button.text, icon: button.icon ? button.icon : null, class: (button.cssClass ? button.cssClass : null) + ' block', disabled: button.disabled ? button.disabled : null, onClick: () => this.onButtonClick(button.text, button.disabled) })))))));
    }
    static get is() { return "yoo-action-sheet"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "buttons": { "type": "Any", "attr": "buttons" }, "heading": { "type": String, "attr": "heading" }, "host": { "elementRef": true } }; }
    static get events() { return [{ "name": "actionSelected", "method": "actionSelected", "bubbles": true, "cancelable": true, "composed": true }, { "name": "actionSheetClosed", "method": "actionSheetClosed", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-action-sheet:**/"; }
}
