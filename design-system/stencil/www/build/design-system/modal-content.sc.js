/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as showModal } from './chunk-75914b41.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';

class ModalContentComponent {
    componentDidLoad() {
    }
    onCancel() {
        let ctrl = document.querySelector('ion-modal-controller');
        ctrl.dismiss(null);
    }
    render() {
        return ([
            h("ion-header", null,
                h("ion-toolbar", { color: "light" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-button", { class: "close", color: "dark", onClick: () => this.onCancel() }, "CLOSE")),
                    h("ion-title", null, "Stencil modal"),
                    h("ion-buttons", { slot: "end" },
                        h("ion-button", { color: "success" }, "Success")))),
            h("ion-content", null,
                h("div", null,
                    "This content should be visible",
                    h("yoo-button", { text: "inside stencil" }),
                    h("yoo-loader", null),
                    h("yoo-button", { text: "inside stencil2" }),
                    h("yoo-button", { text: "inside stencil3" }),
                    h("yoo-button", { text: "inside stencil4" })))
        ]);
    }
    static get is() { return "modal-content"; }
    static get encapsulation() { return "scoped"; }
    static get style() { return ""; }
}

class ModalTriggerComponent {
    componentDidLoad() {
    }
    openModal() {
        const modal = document.createElement('modal-content');
        showModal(modal).then(retVal => {
            console.log(retVal);
        });
    }
    render() {
        return (h("button", { onClick: this.openModal.bind(this) }, "Open stencil modal"));
    }
    static get is() { return "modal-trigger"; }
    static get encapsulation() { return "scoped"; }
    static get style() { return ""; }
}

export { ModalContentComponent as ModalContent, ModalTriggerComponent as ModalTrigger };
