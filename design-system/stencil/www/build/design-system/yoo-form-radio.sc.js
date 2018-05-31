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
    static get style() { return "[data-yoo-form-radio-host]   .container[data-yoo-form-radio] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio] {\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    border-radius: 1rem;\n    width: 1rem;\n    height: 1rem;\n    border: 0.0625rem solid;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center; }\n    [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.enabled[data-yoo-form-radio] {\n      background-color: var(--light, #FFFFFF); }\n      [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.enabled[data-yoo-form-radio]:hover {\n        cursor: pointer; }\n    [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.disabled[data-yoo-form-radio] {\n      border-color: var(--dark-20, #dadada); }\n    [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.empty.enabled[data-yoo-form-radio] {\n      border-color: var(--stable, #adadad);\n      background-color: var(--light, #FFFFFF); }\n      [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.empty.enabled[data-yoo-form-radio]:hover {\n        cursor: pointer; }\n    [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.empty.disabled[data-yoo-form-radio] {\n      background-color: var(--light, #FFFFFF);\n      border-color: var(--dark-20, #dadada); }\n    [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon[data-yoo-form-radio] {\n      -webkit-transition: all 0.3s;\n      transition: all 0.3s;\n      width: 0.375rem;\n      height: 0.375rem;\n      border-radius: 0.1875rem;\n      background: var(--dark-40, #b4b4b4); }\n      [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon.disabled[data-yoo-form-radio] {\n        background: var(--dark-20, #dadada); }\n      [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon.empty[data-yoo-form-radio] {\n        opacity: 0; }\n  [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container[data-yoo-form-radio] {\n    padding-left: 0.5rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    color: var(--dark, #444);\n    font-size: 1rem; }\n    [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container.disabled[data-yoo-form-radio] {\n      color: var(--dark-20, #dadada); }\n    [data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container.enabled[data-yoo-form-radio]:hover {\n      cursor: pointer; }\n\n.accent[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.enabled[data-yoo-form-radio] {\n  border-color: var(--accent, #1FB6FF); }\n\n.accent[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon[data-yoo-form-radio] {\n  background: var(--accent, #1FB6FF); }\n\n.accent[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container[data-yoo-form-radio] {\n  color: var(--text-color, #807f83); }\n\n.danger[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.enabled[data-yoo-form-radio] {\n  border-color: var(--danger, #ff625f); }\n\n.danger[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon[data-yoo-form-radio] {\n  background: var(--danger, #ff625f); }\n\n.danger[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container[data-yoo-form-radio] {\n  color: var(--text-color, #807f83); }\n\n.success[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.enabled[data-yoo-form-radio] {\n  border-color: var(--success, #2EDBB7); }\n\n.success[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon[data-yoo-form-radio] {\n  background: var(--success, #2EDBB7); }\n\n.success[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container[data-yoo-form-radio] {\n  color: var(--text-color, #807f83); }\n\n.info[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.enabled[data-yoo-form-radio] {\n  border-color: var(--info, #fc459e); }\n\n.info[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon[data-yoo-form-radio] {\n  background: var(--info, #fc459e); }\n\n.info[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container[data-yoo-form-radio] {\n  color: var(--text-color, #807f83); }\n\n.warning[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.enabled[data-yoo-form-radio] {\n  border-color: var(--warning, #ff6402); }\n\n.warning[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon[data-yoo-form-radio] {\n  background: var(--warning, #ff6402); }\n\n.warning[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container[data-yoo-form-radio] {\n  color: var(--text-color, #807f83); }\n\n.dark[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.enabled[data-yoo-form-radio] {\n  border-color: var(--dark-20, #dadada); }\n\n.dark[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon[data-yoo-form-radio] {\n  background: var(--dark-20, #dadada); }\n\n.dark[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container[data-yoo-form-radio] {\n  color: var(--text-color, #807f83); }\n\n.stable[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container[data-yoo-form-radio] {\n  color: var(--stable, #adadad); }\n  .stable[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .text-container.disabled[data-yoo-form-radio] {\n    color: var(--dark-20, #dadada); }\n\n.stable[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.disabled[data-yoo-form-radio] {\n  border-color: var(--dark-20, #dadada); }\n\n.stable[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.empty.enabled[data-yoo-form-radio] {\n  border-color: var(--stable, #adadad); }\n\n.stable[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container.empty.disabled[data-yoo-form-radio] {\n  background-color: var(--light, #FFFFFF);\n  border-color: var(--dark-20, #dadada); }\n\n.stable[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon[data-yoo-form-radio] {\n  width: 100%;\n  height: 100%;\n  border-radius: 40%;\n  color: var(--light, #FFFFFF); }\n  .stable[data-yoo-form-radio-host]   .container[data-yoo-form-radio]   .icon-container[data-yoo-form-radio]   .icon.disabled[data-yoo-form-radio] {\n    background-color: var(--dark-20, #dadada); }"; }
}

export { YooFormRadioComponent as YooFormRadio };
