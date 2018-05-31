/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooButtonGroupComponent {
    constructor() {
        this.isDropdown = false;
    }
    render() {
        return ((this.isDropdown ? h("yoo-context-menu", null,
            h("yoo-button", { slot: "trigger", icon: "yo-arrow-dropdown", text: this.dropdownTitle }),
            h("div", { class: "context-container", "attr-layout": "column" },
                h("slot", null)))
            : h("div", { class: "group-container", "attr-layout": "row" },
                h("slot", null))));
    }
    static get is() { return "yoo-button-group"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "dropdownTitle": {
            "type": String,
            "attr": "dropdown-title"
        },
        "host": {
            "elementRef": true
        },
        "isDropdown": {
            "type": Boolean,
            "attr": "is-dropdown"
        }
    }; }
    static get style() { return ":host .group-container /deep/:nth-child(n) .container {\n  border-radius: 0px;\n  border-right: 1px solid var(--dark-40, #b4b4b4);\n  border-left: 1px solid var(--dark-40, #b4b4b4);\n  border-left: 0px solid var(--dark-40, #b4b4b4); }\n\n:host .group-container /deep/:first-child .container {\n  border-bottom-left-radius: 5px;\n  border-top-left-radius: 5px;\n  background-clip: padding-box;\n  border-left: 1px solid var(--dark-40, #b4b4b4);\n  border-right: 1px solid var(--dark-40, #b4b4b4);\n  border-left: 1px solid var(--dark-40, #b4b4b4); }\n\n:host .group-container /deep/:last-child .container {\n  border-bottom-right-radius: 5px;\n  border-top-right-radius: 5px;\n  background-clip: padding-box;\n  border-right: 1px solid var(--dark-40, #b4b4b4);\n  border-left: 1px solid var(--dark-40, #b4b4b4);\n  border-left: 0px solid var(--dark-40, #b4b4b4); }\n\n:host .group-container /deep/.container {\n  border-top: 1px solid var(--dark-40, #b4b4b4);\n  border-left: 1px solid var(--dark-40, #b4b4b4);\n  border-bottom: 1px solid var(--dark-40, #b4b4b4);\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  :host .group-container /deep/.container:hover {\n    -webkit-box-shadow: none;\n    box-shadow: none;\n    -webkit-transform: none;\n            transform: none; }\n\n:host yoo-context-menu /deep/yoo-button span {\n  float: right;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem; }\n\n:host .context-container {\n  padding-left: 10px;\n  padding-top: 5px;\n  padding-bottom: 5px; }\n  :host .context-container yoo-button {\n    width: inherit; }\n\n:host(.vertical) .group-container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: 100%; }\n  :host(.vertical) .group-container /deep/:nth-child(n) .container {\n    border-radius: 0px;\n    border-bottom: 1px solid var(--dark-40, #b4b4b4); }\n  :host(.vertical) .group-container /deep/:first-child .container {\n    border-top: 1px solid var(--dark-40, #b4b4b4);\n    border-left: 1px solid var(--dark-40, #b4b4b4);\n    border-bottom: 1px solid var(--dark-40, #b4b4b4);\n    border-top-right-radius: 5px;\n    border-top-left-radius: 5px;\n    background-clip: padding-box; }\n  :host(.vertical) .group-container /deep/:last-child .container {\n    border-bottom: 1px solid var(--dark-40, #b4b4b4);\n    border-bottom-right-radius: 5px;\n    border-bottom-left-radius: 5px;\n    background-clip: padding-box; }\n  :host(.vertical) .group-container /deep/.container {\n    border-right: 1px solid var(--dark-40, #b4b4b4);\n    border-left: 1px solid var(--dark-40, #b4b4b4);\n    border-left: 1px solid var(--dark-40, #b4b4b4);\n    border-top: none;\n    border-bottom: none; }\n\n:host(.justified) .group-container {\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between; }\n  :host(.justified) .group-container /deep/.container {\n    border: 1px solid var(--dark-40, #b4b4b4);\n    border-radius: 5px; }"; }
}

export { YooButtonGroupComponent as YooButtonGroup };
