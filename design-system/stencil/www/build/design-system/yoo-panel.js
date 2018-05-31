/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooPanelComponent {
    render() {
        return (h("div", null,
            h("canvas", { class: 'outer-container' + (this.width ? '' : ' width') + (this.height ? '' : ' height'), width: this.width, height: this.height })));
    }
    static get is() { return "yoo-panel"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "height": {
            "type": Number,
            "attr": "height"
        },
        "host": {
            "elementRef": true
        },
        "width": {
            "type": Number,
            "attr": "width"
        }
    }; }
    static get style() { return ":host .outer-container {\n  background: var(--light, #FFFFFF); }\n  :host .outer-container.width {\n    width: 100%; }\n  :host .outer-container.height {\n    height: 100%; }\n\n:host(.accent) .outer-container {\n  background: var(--accent, #1FB6FF); }\n\n:host(.danger) .outer-container {\n  background: var(--danger, #ff625f); }\n\n:host(.success) .outer-container {\n  background: var(--success, #2EDBB7); }\n\n:host(.info) .outer-container {\n  background: var(--info, #fc459e); }\n\n:host(.warning) .outer-container {\n  background: var(--warning, #ff6402); }\n\n:host(.dark) .outer-container {\n  background: var(--dark, #444); }\n\n:host(.gradient-accent) .outer-container {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n:host(.gradient-danger) .outer-container {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n:host(.gradient-success) .outer-container {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }\n\n:host(.gradient-info) .outer-container {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n:host(.gradient-warning) .outer-container {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n:host(.gradient-dark) .outer-container {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }"; }
}

export { YooPanelComponent as YooPanel };
