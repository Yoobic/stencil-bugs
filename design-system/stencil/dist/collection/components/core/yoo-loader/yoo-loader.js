import { setAnimation, animations } from '../../../utils/anim';
export class YooLoaderComponent {
    render() {
        setAnimation(animations.fade, this.host, { open: true });
        return (h("div", { class: "container", "attr-layout": "row", "attr-layout-align": "center center" },
            h("div", { class: "value" },
                h("img", { src: "assets/loader/loading_dark.svg" }))));
    }
    static get is() { return "yoo-loader"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "host": { "elementRef": true } }; }
    static get style() { return "/**style-placeholder:yoo-loader:**/"; }
}
