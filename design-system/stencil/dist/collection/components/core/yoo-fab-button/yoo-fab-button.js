export class YooFabButtonComponent {
    constructor() {
        this.fabEntry = {};
        this.disabled = false;
        this.parentHasList = false;
        this.activated = false;
        // Toggle buttons in a list
        this.inContainer = false;
        this.inList = false;
        this.activatedState = false;
    }
    componentDidLoad() {
        const parentNode = this.host.parentElement;
        const parentTag = parentNode ? parentNode.nodeName : null;
        this.inContainer = (parentTag === 'YOO-FAB-CONTAINER');
        this.inList = (parentTag === 'YOO-FAB-LIST');
    }
    getButtonClasses() {
        return {
            'fab-button': true,
            'fab-in-list': this.inList
        };
    }
    onClick() {
        if (this.inContainer && this.parentHasList) {
            this.toggleActive();
            this.activatedState = !this.activatedState;
        }
        else {
            if (this.fabEntry.handler && !this.disabled) {
                this.fabEntry.handler();
            }
        }
    }
    isActivated() {
        return (this.activatedState && this.inContainer);
    }
    renderListButton() {
        return (h("div", { class: "list-button-container" },
            this.label ? h("yoo-tag", { text: this.label }) : '',
            h("yoo-button", { class: "round icon-only", disabled: this.disabled, icon: this.fabEntry.icon ? this.fabEntry.icon : (this.icon ? this.icon : ''), text: this.fabEntry.text ? this.fabEntry.text : (this.text ? this.text : '') })));
    }
    renderContainerButton() {
        return (h("yoo-button", { class: "round icon-only", disabled: this.disabled, icon: (this.isActivated() ? 'yo-close2' : (this.fabEntry.icon ? this.fabEntry.icon : (this.icon ? this.icon : ''))), text: (this.isActivated() ? '' : this.fabEntry.text ? this.fabEntry.text : this.text ? this.text : '') }));
    }
    render() {
        const fabClasses = Object.assign({}, this.getButtonClasses());
        return (h("div", { class: fabClasses, onClick: this.onClick.bind(this) }, this.inList ? this.renderListButton() : this.renderContainerButton()));
    }
    static get is() { return "yoo-fab-button"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "activated": { "type": Boolean, "attr": "activated" }, "activatedState": { "state": true }, "disabled": { "type": Boolean, "attr": "disabled" }, "fabEntry": { "type": "Any", "attr": "fab-entry" }, "host": { "elementRef": true }, "icon": { "type": String, "attr": "icon" }, "inContainer": { "state": true }, "inList": { "state": true }, "label": { "type": String, "attr": "label" }, "parentHasList": { "type": Boolean, "attr": "parent-has-list" }, "text": { "type": String, "attr": "text" }, "toggleActive": { "type": "Any", "attr": "toggle-active" } }; }
    static get style() { return "/**style-placeholder:yoo-fab-button:**/"; }
}
