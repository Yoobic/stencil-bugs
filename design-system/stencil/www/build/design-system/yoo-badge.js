/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooBadgeComponent {
    constructor() {
        this.closed = false;
    }
    onClose() {
        this.tagClosed.emit(true);
        this.closed = true;
    }
    onLeftIconClicked() {
        this.leftIconClicked.emit(true);
    }
    onRightIconClicked() {
        this.rightIconClicked.emit(true);
    }
    render() {
        return (h("div", { class: 'outer-container' + ((this.closed) ? ' closed' : '') },
            h("div", { class: "inner-container", "attr-layout": "row" },
                this.iconLeft ? h("i", { class: 'icon-left ' + this.iconLeft, onClick: this.onLeftIconClicked.bind(this) }) : null,
                this.text ? h("span", { class: "inner-text" }, this.text) : null,
                this.iconRight ? h("i", { class: 'icon-right ' + this.iconRight, onClick: this.onRightIconClicked.bind(this) }) : null,
                this.closable ? h("i", { class: "icon-close yo-close", onClick: this.onClose.bind(this) }) : null)));
    }
    static get is() { return "yoo-badge"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "closable": {
            "type": Boolean,
            "attr": "closable"
        },
        "closed": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "iconLeft": {
            "type": String,
            "attr": "icon-left"
        },
        "iconRight": {
            "type": String,
            "attr": "icon-right"
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "tagClosed",
            "method": "tagClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "rightIconClicked",
            "method": "rightIconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "leftIconClicked",
            "method": "leftIconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  display: inline-block;\n  font-weight: 400; }\n  :host .outer-container {\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s;\n    opacity: 1;\n    border-radius: 2px;\n    display: inline-block; }\n    :host .outer-container .inner-container {\n      -webkit-box-align: center;\n      -webkit-align-items: center;\n      -ms-flex-align: center;\n      align-items: center;\n      -webkit-box-pack: center;\n      -webkit-justify-content: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      line-height: normal;\n      padding: 0.25rem 0.625rem;\n      font-size: 0.75rem; }\n      :host .outer-container .inner-container .inner-text {\n        color: var(--stable, #adadad); }\n      :host .outer-container .inner-container .icon-close {\n        padding-left: 0.375rem;\n        cursor: pointer; }\n      :host .outer-container .inner-container .icon-left {\n        padding-right: 0.375rem; }\n      :host .outer-container .inner-container .icon-right {\n        padding-left: 0.375rem; }\n    :host .outer-container.closed {\n      opacity: 0; }\n\n:host(.round) .outer-container {\n  border-radius: 2rem; }\n\n:host(.uppercase) {\n  text-transform: uppercase; }\n\n:host(.small) .outer-container .inner-container {\n  font-size: 0.5625rem; }\n\n:host(.large) .outer-container {\n  min-height: 30px; }\n  :host(.large) .outer-container .inner-container {\n    font-size: 0.9375rem; }\n    :host(.large) .outer-container .inner-container .icon-close {\n      padding-left: 0.75rem; }\n    :host(.large) .outer-container .inner-container .icon-left {\n      padding-right: 0.75rem; }\n    :host(.large) .outer-container .inner-container .icon-right {\n      padding-left: 0.75rem; }\n\n:host(.link) {\n  cursor: pointer; }\n  :host(.link) .inner-container:hover {\n    text-decoration: underline; }\n\n:host(.outline).large .outer-container .inner-container {\n  padding: 0.25rem 0.5rem; }\n\n:host(.outline) .outer-container {\n  background: var(--light, #FFFFFF) !important;\n  border: solid 1px rgba(40, 47, 54, 0.15);\n  border-radius: 5px; }\n  :host(.outline) .outer-container .inner-container {\n    padding: 0.25rem 0.25rem; }\n\n:host(.transparent) .outer-container {\n  background: rgba(255, 255, 255, 0.4);\n  color: var(--light, #FFFFFF); }\n\n:host(.notification) .outer-container {\n  border-radius: 2rem; }\n  :host(.notification) .outer-container .inner-container {\n    font-size: 0.375rem;\n    padding: 0.21875rem 0.34375rem; }\n\n:host(.notification-medium) .outer-container {\n  border-radius: 2rem; }\n  :host(.notification-medium) .outer-container .inner-container {\n    font-size: 0.6875rem;\n    padding: 0.15625rem 0.34375rem;\n    -webkit-transform: translateY(-0.0625rem);\n            transform: translateY(-0.0625rem); }\n\n:host(.accent) .outer-container {\n  background: var(--accent, #1FB6FF); }\n  :host(.accent) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.accent) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.dark) .outer-container {\n  background: var(--dark, #444); }\n  :host(.dark) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.dark) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.success) .outer-container {\n  background: var(--success, #2EDBB7); }\n  :host(.success) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.success) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.danger) .outer-container {\n  background: var(--danger, #ff625f); }\n  :host(.danger) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.danger) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.info) .outer-container {\n  background: var(--info, #fc459e); }\n  :host(.info) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.info) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.warning) .outer-container {\n  background: var(--warning, #ff6402); }\n  :host(.warning) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.warning) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.gradient-warning) .outer-container {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n  :host(.gradient-warning) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.gradient-warning) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.gradient-success) .outer-container {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n  :host(.gradient-success) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.gradient-success) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.gradient-accent) .outer-container {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n  :host(.gradient-accent) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.gradient-accent) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.gradient-info) .outer-container {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n  :host(.gradient-info) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.gradient-info) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.gradient-dark) .outer-container {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n  :host(.gradient-dark) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.gradient-dark) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.gradient-danger) .outer-container {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n  :host(.gradient-danger) .outer-container .inner-container {\n    color: var(--light, #FFFFFF); }\n    :host(.gradient-danger) .outer-container .inner-container .inner-text {\n      color: var(--light, #FFFFFF); }\n\n:host(.accent.outline) .outer-container {\n  border-color: var(--accent, #1FB6FF); }\n  :host(.accent.outline) .outer-container .inner-container {\n    color: var(--accent, #1FB6FF); }\n    :host(.accent.outline) .outer-container .inner-container .inner-text {\n      color: var(--accent, #1FB6FF); }\n\n:host(.danger.outline) .outer-container {\n  border-color: var(--danger, #ff625f); }\n  :host(.danger.outline) .outer-container .inner-container {\n    color: var(--danger, #ff625f); }\n    :host(.danger.outline) .outer-container .inner-container .inner-text {\n      color: var(--danger, #ff625f); }\n\n:host(.warning.outline) .outer-container {\n  border-color: var(--warning, #ff6402); }\n  :host(.warning.outline) .outer-container .inner-container {\n    color: var(--warning, #ff6402); }\n    :host(.warning.outline) .outer-container .inner-container .inner-text {\n      color: var(--warning, #ff6402); }\n\n:host(.success.outline) .outer-container {\n  border-color: var(--success, #2EDBB7); }\n  :host(.success.outline) .outer-container .inner-container {\n    color: var(--success, #2EDBB7); }\n    :host(.success.outline) .outer-container .inner-container .inner-text {\n      color: var(--success, #2EDBB7); }\n\n:host(.info.outline) .outer-container {\n  border-color: var(--info, #fc459e); }\n  :host(.info.outline) .outer-container .inner-container {\n    color: var(--info, #fc459e); }\n    :host(.info.outline) .outer-container .inner-container .inner-text {\n      color: var(--info, #fc459e); }\n\n:host(.dark.outline) .outer-container {\n  border-color: var(--dark, #444); }\n  :host(.dark.outline) .outer-container .inner-container {\n    color: var(--dark, #444); }\n    :host(.dark.outline) .outer-container .inner-container .inner-text {\n      color: var(--dark, #444); }\n\n:host(.gradient-warning.outline) .outer-container {\n  -o-border-image: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%));\n     border-image: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%));\n  border-image-slice: 1; }\n  :host(.gradient-warning.outline) .outer-container .inner-container {\n    color: var(--warning, #ff6402); }\n  :host(.gradient-warning.outline) .outer-container .inner-text {\n    color: var(--warning, #ff6402) !important; }\n\n:host(.gradient-success.outline) .outer-container {\n  -o-border-image: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78));\n     border-image: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78));\n  border-image-slice: 1; }\n  :host(.gradient-success.outline) .outer-container .inner-container {\n    color: var(--success, #2EDBB7); }\n  :host(.gradient-success.outline) .outer-container .inner-text {\n    color: var(--success, #2EDBB7) !important; }\n\n:host(.gradient-dark.outline) .outer-container {\n  -o-border-image: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%));\n     border-image: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%));\n  border-image-slice: 1; }\n  :host(.gradient-dark.outline) .outer-container .inner-container {\n    color: var(--dark, #444); }\n  :host(.gradient-dark.outline) .outer-container .inner-text {\n    color: var(--dark, #444) !important; }\n\n:host(.gradient-info.outline) .outer-container {\n  -o-border-image: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860));\n     border-image: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860));\n  border-image-slice: 1; }\n  :host(.gradient-info.outline) .outer-container .inner-container {\n    color: var(--info, #fc459e); }\n  :host(.gradient-info.outline) .outer-container .inner-text {\n    color: var(--info, #fc459e) !important; }\n\n:host(.gradient-accent.outline) .outer-container {\n  -o-border-image: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%));\n     border-image: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%));\n  border-image-slice: 1; }\n  :host(.gradient-accent.outline) .outer-container .inner-container {\n    color: var(--accent, #1FB6FF); }\n  :host(.gradient-accent.outline) .outer-container .inner-text {\n    color: var(--accent, #1FB6FF) !important; }\n\n:host(.gradient-danger.outline) .outer-container {\n  -o-border-image: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634));\n     border-image: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634));\n  border-image-slice: 1; }\n  :host(.gradient-danger.outline) .outer-container .inner-container {\n    color: var(--danger, #ff625f); }\n  :host(.gradient-danger.outline) .outer-container .inner-text {\n    color: var(--danger, #ff625f) !important; }"; }
}

export { YooBadgeComponent as YooBadge };
