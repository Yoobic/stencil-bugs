import { setAnimation } from '../../../utils/anim';
export class YooModalComponent {
    constructor() {
        this.primaryButtonText = 'Confirm';
        this.secondaryButtonText = 'Cancel';
        this.hasHeader = true;
        this.hasFooter = false;
        this.withYooCtrl = false;
    }
    onPrimaryButtonClick(event) {
        if (event) {
            this.primaryButtonClicked.emit(true);
            this.primaryFn();
        }
    }
    close() {
        if (this.animationProp) {
            this.animationProp.open = false;
        }
        this.closed.emit(true);
        this.animation(false);
    }
    componentDidLoad() {
        if (this.content) {
            this.host.querySelector('div.modal-body').appendChild(this.content);
        }
        this.animation(true);
    }
    animation(open, sentFromClose) {
        if (this.animationName) {
            if (this.animationName === 'sticky_up') {
                const padding = 16;
                const modalHeight = (this.host.querySelector('div.outer-container').clientHeight);
                setAnimation(this.animationName, this.host, { open: open, distance: (((window.innerHeight / 2) + padding) - (modalHeight / 2)), modalHeight: modalHeight });
            }
            else {
                setAnimation(this.animationName, this.host.querySelector('.outer-container'), (sentFromClose ? { open: open, up: true } : (this.animationProp ? this.animationProp : { open: open })));
            }
        }
    }
    componentDidUpdate() {
        if (this.content) {
            this.host.querySelector('div.modal-body').appendChild(this.content);
        }
    }
    hostData() {
        return {
            class: {
                ['custom-controller']: this.withYooCtrl
            }
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.hasHeader ?
                h("div", { class: "modal-header", "attr-layout": "row", "attr-layout-align": "space-between" },
                    h("div", { class: "inner-header" },
                        this.headingIcon ? h("span", { class: "icon" },
                            h("i", { class: this.headingIcon })) : null,
                        h("span", { class: "modal-heading" }, this.heading)),
                    h("span", { class: "close-icon", onClick: () => this.close() },
                        h("i", { class: "yo-close" })))
                : null,
            h("div", { class: "modal-body", "attr-layout": "row" },
                h("slot", { name: "modal-content" })),
            this.hasFooter ?
                h("div", { class: "modal-footer", "attr-layout": "row" },
                    this.footerText ? h("div", { class: "footer-text" },
                        h("span", null, this.footerText)) : null,
                    h("div", { class: "footer-buttons", "attr-layout": "row", "attr-layout-align": "end center" },
                        h("div", { class: "secondary-button" },
                            h("yoo-button", { class: "dark", onClick: () => this.close(), text: this.secondaryButtonText })),
                        h("div", { class: "primary-button" },
                            h("yoo-button", { class: "accent", onClick: (event) => this.onPrimaryButtonClick(event), text: this.primaryButtonText }))))
                : null));
    }
    static get is() { return "yoo-modal"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "animationName": { "type": String, "attr": "animation-name" }, "animationProp": { "type": "Any", "attr": "animation-prop" }, "close": { "method": true }, "content": { "type": "Any", "attr": "content" }, "cssClass": { "type": String, "attr": "css-class" }, "footerText": { "type": String, "attr": "footer-text" }, "hasFooter": { "type": Boolean, "attr": "has-footer" }, "hasHeader": { "type": Boolean, "attr": "has-header" }, "heading": { "type": String, "attr": "heading" }, "headingIcon": { "type": String, "attr": "heading-icon" }, "host": { "elementRef": true }, "primaryButtonText": { "type": String, "attr": "primary-button-text" }, "primaryFn": { "type": "Any", "attr": "primary-fn" }, "secondaryButtonText": { "type": String, "attr": "secondary-button-text" }, "withYooCtrl": { "type": Boolean, "attr": "with-yoo-ctrl" } }; }
    static get events() { return [{ "name": "primaryButtonClicked", "method": "primaryButtonClicked", "bubbles": true, "cancelable": true, "composed": true }, { "name": "closed", "method": "closed", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-modal:**/"; }
}
