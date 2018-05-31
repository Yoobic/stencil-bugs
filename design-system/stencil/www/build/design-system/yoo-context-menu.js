/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooContextMenuComponent {
    constructor() {
        this.opened = false;
    }
    open() {
        this.opened = true;
    }
    close() {
        this.opened = false;
    }
    componentWillLoad() {
        this.setupListener();
    }
    componentDidLoad() {
        this.calculateDropdownOpenDirection();
    }
    setupListener() {
        window.addEventListener('click', () => this.toggleWindow());
        window.addEventListener('touchstart', () => this.toggleWindow());
        window.addEventListener('resize', () => this.calculateDropdownOpenDirection());
    }
    calculateDropdownOpenDirection() {
        let rect = this.host.getBoundingClientRect();
        let position = window.innerHeight - rect.bottom;
        let dropdownContent = this.host.querySelector('.dropdown-content');
        let totalDropdownHeight = (rect.bottom - rect.top) + dropdownContent.clientHeight;
        dropdownContent.setAttribute('style', `transform: translateY(${dropdownContent.clientHeight > position ? '-' + totalDropdownHeight + 'px' : '0%'});`);
    }
    toggle() {
        if (!this.opened) {
            this.contextMenuOpened.emit(true);
            setTimeout(() => {
                this.open();
            }, 50);
        }
    }
    toggleWindow() {
        if (this.opened) {
            this.close();
            this.contextMenuClosed.emit(true);
        }
    }
    onItemClick(item, index) {
        if (item && item.handler) {
            let context = this.context && this.context.toJS && item.sendImmutable !== true ? this.context.toJS() : this.context;
            item.handler(context, index);
        }
    }
    render() {
        return [
            h("span", { "aria-haspopup": "true", "aria-expanded": "false", onClick: () => this.toggle() },
                h("slot", { name: "trigger" })),
            h("div", { class: `${this.opened ? 'show' : ''} dropdown-content` },
                this.items && this.items.length > 0 ?
                    this.items.map((item, i) => h("div", { class: `${item.separator ? 'border-bottom' : ''} ${item.separatorAfter ? 'border-top' : ''} dropdown-entry`, onClick: () => this.onItemClick(item, i) }, item.itemTitle))
                    : '',
                h("slot", null))
        ];
    }
    static get is() { return "yoo-context-menu"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "close": {
            "method": true
        },
        "context": {
            "type": "Any",
            "attr": "context"
        },
        "host": {
            "elementRef": true
        },
        "items": {
            "type": "Any",
            "attr": "items"
        },
        "open": {
            "method": true
        },
        "opened": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "contextMenuOpened",
            "method": "contextMenuOpened",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "contextMenuClosed",
            "method": "contextMenuClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  display: block; }\n\n:host([hidden]) {\n  display: none; }\n\n:host .dropdown-toggle ::slotted(*) {\n  cursor: pointer; }\n\n:host .dropdown-content {\n  color: var(--dark-40, #b4b4b4);\n  background-color: var(--light, #FFFFFF);\n  width: 240px;\n  max-width: 240px;\n  -webkit-box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  visibility: hidden;\n  /* hides sub-menu */\n  opacity: 0;\n  position: absolute;\n  -webkit-transform: translateY(-2em);\n          transform: translateY(-2em);\n  z-index: -1;\n  -webkit-transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;\n  transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;\n  max-height: 400px;\n  border-radius: 0.25rem; }\n  :host .dropdown-content .dropdown-entry {\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    width: 100%;\n    cursor: pointer; }\n    :host .dropdown-content .dropdown-entry.border-top {\n      border-top: 1px solid var(--dark-20, #dadada); }\n    :host .dropdown-content .dropdown-entry.border-bottom {\n      border-top: 1px solid var(--dark-20, #dadada); }\n    :host .dropdown-content .dropdown-entry:hover {\n      background: var(--accent-05, #f4fbff);\n      color: var(--dark, #444); }\n\n:host .dropdown-content.show {\n  visibility: visible;\n  /* shows sub-menu */\n  opacity: 1;\n  z-index: 1;\n  -webkit-transform: translateY(0%);\n          transform: translateY(0%);\n  -webkit-transition-delay: 0s, 0s, 0.3s;\n  transition-delay: 0s, 0s, 0.3s;\n  /* this removes the transition delay so the menu will be visible while the other styles transition */ }"; }
}

class YooFormCheckboxComponent {
    constructor() {
        this.state = 'unchecked';
    }
    onCheckboxClick() {
        this.getNextState();
        this.checkboxToggled.emit(this.state);
    }
    getNextState() {
        const TRANSITIONS = {
            checked: 'unchecked',
            indeterminate: 'checked',
            unchecked: this.isIndeterminate ? 'indeterminate' : 'checked'
        };
        this.state = TRANSITIONS[this.state];
    }
    render() {
        return (h("div", { class: "container" },
            this.disabled ?
                h("div", { class: this.state === 'unchecked' ? 'icon-container empty disabled' : 'icon-container disabled', "attr-layout": "row" },
                    h("span", { class: this.state === 'unchecked' ? 'icon empty' : 'icon disabled' },
                        h("i", { class: this.state === 'indeterminate' ? 'yo-minus' : 'yo-check-solid' })))
                :
                    h("div", { class: this.state === 'unchecked' ? 'icon-container empty enabled' : 'icon-container enabled', "attr-layout": "row", onClick: () => this.onCheckboxClick() },
                        h("span", { class: this.state === 'unchecked' ? 'icon empty' : 'icon' },
                            h("i", { class: this.state === 'indeterminate' ? 'yo-minus' : 'yo-check-solid' }))),
            this.disabled ?
                h("div", { class: "text-container disabled" }, this.text) :
                h("div", { class: "text-container enabled", onClick: () => this.onCheckboxClick() }, this.text)));
    }
    static get is() { return "yoo-form-checkbox"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "host": {
            "elementRef": true
        },
        "isIndeterminate": {
            "type": Boolean,
            "attr": "is-indeterminate"
        },
        "onCheckboxClick": {
            "method": true
        },
        "state": {
            "type": String,
            "attr": "state",
            "mutable": true
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "checkboxToggled",
            "method": "checkboxToggled",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .container {\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center; }\n  :host .container .icon-container {\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    border-radius: 5px;\n    min-width: 1.25rem;\n    height: 1.25rem;\n    border: 0.1rem solid;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host .container .icon-container.enabled {\n      background-color: var(--dark-40, #b4b4b4);\n      border-color: var(--dark-40, #b4b4b4); }\n      :host .container .icon-container.enabled:hover {\n        cursor: pointer; }\n    :host .container .icon-container.disabled {\n      background-color: var(--dark-20, #dadada);\n      border-color: var(--dark-20, #dadada); }\n    :host .container .icon-container.empty {\n      background-color: var(--light, #FFFFFF); }\n      :host .container .icon-container.empty.enabled {\n        background-color: var(--light, #FFFFFF); }\n        :host .container .icon-container.empty.enabled:hover {\n          cursor: pointer; }\n      :host .container .icon-container.empty.disabled {\n        background-color: var(--dark-20, #dadada);\n        border-color: var(--dark-20, #dadada); }\n    :host .container .icon-container .icon {\n      color: var(--light, #FFFFFF);\n      -webkit-transition: all 0.3s;\n      transition: all 0.3s;\n      font-size: 0.875rem;\n      padding-top: 0.125rem; }\n      :host .container .icon-container .icon.disabled {\n        color: var(--dark-80, dimgray); }\n      :host .container .icon-container .icon.empty {\n        opacity: 0; }\n  :host .container .text-container {\n    padding-left: 0.5rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    color: var(--dark, #444); }\n    :host .container .text-container.disabled {\n      color: var(--dark-20, #dadada); }\n    :host .container .text-container.enabled:hover {\n      cursor: pointer; }\n\n:host(.round) .container .icon-container {\n  border-radius: 50%; }\n\n:host(.large) .container .icon-container {\n  width: 2rem;\n  height: 2rem; }\n  :host(.large) .container .icon-container .icon {\n    font-size: 1rem;\n    padding-top: 0rem; }\n\n:host(.accent) .container .icon-container.enabled {\n  background-color: var(--accent, #1FB6FF);\n  border-color: var(--accent, #1FB6FF); }\n\n:host(.danger) .container .icon-container.enabled {\n  background-color: var(--danger, #ff625f);\n  border-color: var(--danger, #ff625f); }\n\n:host(.success) .container .icon-container.enabled {\n  background-color: var(--success, #2EDBB7);\n  border-color: var(--success, #2EDBB7); }\n\n:host(.info) .container .icon-container.enabled {\n  background-color: var(--info, #fc459e);\n  border-color: var(--info, #fc459e); }\n\n:host(.warning) .container .icon-container.enabled {\n  background-color: var(--warning, #ff6402);\n  border-color: var(--warning, #ff6402); }"; }
}

export { YooContextMenuComponent as YooContextMenu, YooFormCheckboxComponent as YooFormCheckbox };
