/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooFormRadioComponent {
    constructor() {
        this.state = 'unchecked';
    }
    onRadioCheck() {
        if (this.state === 'unchecked') {
            this.state = 'checked';
        }
        else if (this.state === 'checked') {
            this.state = 'unchecked';
        }
        this.radioClicked.emit(this.state);
    }
    render() {
        return (h("div", { class: "container" },
            this.disabled ?
                h("div", { class: this.state === 'unchecked' ? 'icon-container empty disabled' : 'icon-container disabled', "attr-layout": "row" },
                    h("div", { class: this.state === 'unchecked' ? 'icon empty' : 'icon disabled' }))
                :
                    h("div", { class: this.state === 'unchecked' ? 'icon-container empty enabled' : 'icon-container enabled', "attr-layout": "row", onClick: () => this.onRadioCheck() },
                        h("div", { class: this.state === 'unchecked' ? 'icon empty' : 'icon' },
                            h("i", { class: "yo-check" }))),
            this.disabled ?
                h("div", { class: "text-container disabled" }, this.text) :
                h("div", { class: "text-container enabled", onClick: () => this.onRadioCheck() }, this.text)));
    }
    static get is() { return "yoo-form-radio"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "host": {
            "elementRef": true
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
            "name": "radioClicked",
            "method": "radioClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  :host .container .icon-container {\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    border-radius: 1rem;\n    width: 1rem;\n    height: 1rem;\n    border: 0.0625rem solid;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host .container .icon-container.enabled {\n      background-color: var(--light, #FFFFFF); }\n      :host .container .icon-container.enabled:hover {\n        cursor: pointer; }\n    :host .container .icon-container.disabled {\n      border-color: var(--dark-20, #dadada); }\n    :host .container .icon-container.empty.enabled {\n      border-color: var(--stable, #adadad);\n      background-color: var(--light, #FFFFFF); }\n      :host .container .icon-container.empty.enabled:hover {\n        cursor: pointer; }\n    :host .container .icon-container.empty.disabled {\n      background-color: var(--light, #FFFFFF);\n      border-color: var(--dark-20, #dadada); }\n    :host .container .icon-container .icon {\n      -webkit-transition: all 0.3s;\n      transition: all 0.3s;\n      width: 0.375rem;\n      height: 0.375rem;\n      border-radius: 0.1875rem;\n      background: var(--dark-40, #b4b4b4); }\n      :host .container .icon-container .icon.disabled {\n        background: var(--dark-20, #dadada); }\n      :host .container .icon-container .icon.empty {\n        opacity: 0; }\n  :host .container .text-container {\n    padding-left: 0.5rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    color: var(--dark, #444);\n    font-size: 1rem; }\n    :host .container .text-container.disabled {\n      color: var(--dark-20, #dadada); }\n    :host .container .text-container.enabled:hover {\n      cursor: pointer; }\n\n:host(.accent) .container .icon-container.enabled {\n  border-color: var(--accent, #1FB6FF); }\n\n:host(.accent) .container .icon-container .icon {\n  background: var(--accent, #1FB6FF); }\n\n:host(.accent) .container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.danger) .container .icon-container.enabled {\n  border-color: var(--danger, #ff625f); }\n\n:host(.danger) .container .icon-container .icon {\n  background: var(--danger, #ff625f); }\n\n:host(.danger) .container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.success) .container .icon-container.enabled {\n  border-color: var(--success, #2EDBB7); }\n\n:host(.success) .container .icon-container .icon {\n  background: var(--success, #2EDBB7); }\n\n:host(.success) .container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.info) .container .icon-container.enabled {\n  border-color: var(--info, #fc459e); }\n\n:host(.info) .container .icon-container .icon {\n  background: var(--info, #fc459e); }\n\n:host(.info) .container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.warning) .container .icon-container.enabled {\n  border-color: var(--warning, #ff6402); }\n\n:host(.warning) .container .icon-container .icon {\n  background: var(--warning, #ff6402); }\n\n:host(.warning) .container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.dark) .container .icon-container.enabled {\n  border-color: var(--dark-20, #dadada); }\n\n:host(.dark) .container .icon-container .icon {\n  background: var(--dark-20, #dadada); }\n\n:host(.dark) .container .text-container {\n  color: var(--text-color, #807f83); }\n\n:host(.stable) .container .text-container {\n  color: var(--stable, #adadad); }\n  :host(.stable) .container .text-container.disabled {\n    color: var(--dark-20, #dadada); }\n\n:host(.stable) .container .icon-container.disabled {\n  border-color: var(--dark-20, #dadada); }\n\n:host(.stable) .container .icon-container.empty.enabled {\n  border-color: var(--stable, #adadad); }\n\n:host(.stable) .container .icon-container.empty.disabled {\n  background-color: var(--light, #FFFFFF);\n  border-color: var(--dark-20, #dadada); }\n\n:host(.stable) .container .icon-container .icon {\n  width: 100%;\n  height: 100%;\n  border-radius: 40%;\n  color: var(--light, #FFFFFF); }\n  :host(.stable) .container .icon-container .icon.disabled {\n    background-color: var(--dark-20, #dadada); }"; }
}

export { YooFormRadioComponent as YooFormRadio };
