/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooCardFileComponent {
    constructor() {
        this.iconClass = '';
    }
    render() {
        return (h("div", { class: "outer-container" },
            (this.isClosable ?
                h("div", { class: "close-btn" },
                    h("i", { class: "yo-close" }))
                : null),
            (this.icon ?
                h("div", { class: "image-container" },
                    h("i", { class: this.icon + ' ' + this.iconClass }))
                : null),
            h("div", { class: "content-container" },
                h("div", { class: "top-container" },
                    (this.heading ? h("div", { class: "heading-container" }, this.heading)
                        : null),
                    (this.subheading ? h("div", { class: "subheading-container" }, this.subheading)
                        : null)))));
    }
    static get is() { return "yoo-card-file"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "iconClass": {
            "type": String,
            "attr": "icon-class"
        },
        "isClosable": {
            "type": Boolean,
            "attr": "is-closable"
        },
        "subheading": {
            "type": String,
            "attr": "subheading"
        }
    }; }
    static get style() { return "[data-yoo-card-file-host]   .close-btn[data-yoo-card-file] {\n  position: absolute;\n  top: 0;\n  right: 0; }\n\n[data-yoo-card-file-host]   .outer-container[data-yoo-card-file] {\n  position: relative;\n  width: 100%;\n  height: 3.75rem;\n  border-radius: 0.5rem;\n  background-color: var(--light, #FFFFFF);\n  -webkit-box-shadow: 0 0.3125rem 0.9375rem 0 rgba(40, 47, 54, 0.08);\n  box-shadow: 0 0.3125rem 0.9375rem 0 rgba(40, 47, 54, 0.08);\n  padding: 0.75rem 0.96875rem 0.75rem 0.9375rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between; }\n  [data-yoo-card-file-host]   .outer-container[data-yoo-card-file]   .image-container[data-yoo-card-file]   i[data-yoo-card-file] {\n    font-size: 1.1875rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    background-color: var(--light, #FFFFFF);\n    border: solid 0.03125rem #f1f1f1;\n    border-radius: 50%;\n    padding: 0.5rem; }\n  [data-yoo-card-file-host]   .outer-container[data-yoo-card-file]   .content-container[data-yoo-card-file]   .top-container[data-yoo-card-file] {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-justify-content: space-around;\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    -ms-flex-align: end;\n    align-items: flex-end; }\n    [data-yoo-card-file-host]   .outer-container[data-yoo-card-file]   .content-container[data-yoo-card-file]   .top-container[data-yoo-card-file]   .heading-container[data-yoo-card-file] {\n      margin-top: 0.15625rem;\n      font-size: 0.8125rem;\n      line-height: 1rem; }\n    [data-yoo-card-file-host]   .outer-container[data-yoo-card-file]   .content-container[data-yoo-card-file]   .top-container[data-yoo-card-file]   .subheading-container[data-yoo-card-file] {\n      font-size: 0.5625rem;\n      color: var(--stable, #adadad); }"; }
}

export { YooCardFileComponent as YooCardFile };
