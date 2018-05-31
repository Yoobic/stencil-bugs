import { setAnimation, animations } from '../../../utils/anim';
export class YooEmptyStateComponent {
    componentDidLoad() {
        setAnimation(animations.shake, this.host, { duration: 1000 });
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
    static get properties() { return { "host": { "elementRef": true }, "type": { "type": String, "attr": "type" } }; }
    static get style() { return "/**style-placeholder:yoo-empty-state:**/"; }
}
