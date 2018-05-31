import { getBackImageStyle, cloudinary } from '../../../utils/helpers';
export class YooAvatarComponent {
    render() {
        return (h("div", { class: "avatar" },
            this.topRightIcon ? h("span", { class: "top-right" },
                h("i", { class: this.topRightIcon })) : null,
            this.topLeftIcon ? h("span", { class: "top-left" },
                h("i", { class: this.topLeftIcon })) : null,
            h("div", { class: "image", style: getBackImageStyle(cloudinary(this.imgSrc)) }),
            this.bottomRightIcon ? h("span", { class: "bottom-right" },
                h("i", { class: this.bottomRightIcon })) : null,
            this.bottomLeftIcon ? h("span", { class: "bottom-left" },
                h("i", { class: this.bottomLeftIcon })) : null));
    }
    static get is() { return "yoo-avatar"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "_host": { "elementRef": true }, "bottomLeftIcon": { "type": String, "attr": "bottom-left-icon" }, "bottomRightIcon": { "type": String, "attr": "bottom-right-icon" }, "imgSrc": { "type": String, "attr": "img-src" }, "topLeftIcon": { "type": String, "attr": "top-left-icon" }, "topRightIcon": { "type": String, "attr": "top-right-icon" } }; }
    static get style() { return "/**style-placeholder:yoo-avatar:**/"; }
}
