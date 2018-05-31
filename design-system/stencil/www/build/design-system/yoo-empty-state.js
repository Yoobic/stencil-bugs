/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

//import { setAnimation, animations } from '../../../utils/anim';
class YooEmptyStateComponent {
    componentDidLoad() {
        //setAnimation(animations.shake, this.host, { duration: 1000 });
    }
    getIconSrc() {
        return './assets/empty-states/' + (this.type || 'empty') + '.svg';
    }
    render() {
        return (h("div", { class: "container" },
            h("img", { src: this.getIconSrc() })));
    }
    static get is() { return "yoo-empty-state"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get style() { return ":host {\n  display: block;\n  width: 100%; }\n\n.container {\n  margin: auto;\n  text-align: center;\n  padding: 1rem; }\n  .container img {\n    max-height: 200px;\n    width: 100%; }"; }
}

export { YooEmptyStateComponent as YooEmptyState };
