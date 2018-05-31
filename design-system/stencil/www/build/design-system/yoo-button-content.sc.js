/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooButtonContentComponent {
    constructor() {
        this.disabled = false;
    }
    click() {
        if (!this.disabled) {
            this.buttonClicked.emit(true);
        }
    }
    renderButtonContent() {
        return (h("div", { class: "value" },
            this.text,
            this.icon ? h("span", { class: "icon" },
                h("i", { class: this.icon })) : null,
            h("slot", null)));
    }
    render() {
        return (h("ion-content", null,
            h("button", { class: 'container ' + (this.disabled ? 'disabled' : ''), disabled: this.disabled, onClick: () => this.click() }, this.renderButtonContent())));
    }
    static get is() { return "yoo-button-content"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "isLoading": {
            "type": Boolean,
            "attr": "is-loading"
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "buttonClicked",
            "method": "buttonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-button-content-host]   .container[data-yoo-button-content] {\n  font-family: 'Lato';\n  -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);\n  padding: 0;\n  border: none;\n  display: block;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  border-radius: 26px;\n  min-height: 52px;\n  min-width: 160px;\n  cursor: pointer;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  background-color: #ffffff;\n  white-space: nowrap; }\n  [data-yoo-button-content-host]   .container.loading[data-yoo-button-content] {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    min-width: 40px;\n    width: 40px;\n    min-height: 24px; }\n    [data-yoo-button-content-host]   .container.loading[data-yoo-button-content]   .value[data-yoo-button-content] {\n      padding: 5px 0px; }\n      [data-yoo-button-content-host]   .container.loading[data-yoo-button-content]   .value[data-yoo-button-content]   img[data-yoo-button-content] {\n        width: 24px;\n        height: 24px; }\n  [data-yoo-button-content-host]   .container[data-yoo-button-content]:hover {\n    opacity: 0.6; }\n  [data-yoo-button-content-host]   .container[data-yoo-button-content]:active, [data-yoo-button-content-host]   .container[data-yoo-button-content]:focus {\n    outline: 0 !important; }\n  [data-yoo-button-content-host]   .container.disabled[data-yoo-button-content] {\n    pointer-events: none;\n    opacity: 0.4; }\n  [data-yoo-button-content-host]   .container[data-yoo-button-content]   .icon[data-yoo-button-content] {\n    font-size: 1rem;\n    padding-left: 0.5rem; }\n  [data-yoo-button-content-host]   .container[data-yoo-button-content]   .value[data-yoo-button-content] {\n    font-size: 1.0625rem;\n    font-weight: 300;\n    font-style: normal;\n    line-height: normal;\n    letter-spacing: normal;\n    text-align: center;\n    color: #adadad; }"; }
}

export { YooButtonContentComponent as YooButtonContent };
