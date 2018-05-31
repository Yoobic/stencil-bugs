import { setAnimation, animations } from '../../../utils/anim';
export class YooTransitionComponent {
    constructor() {
        this.type = 'fade';
    }
    componentWillLoad() {
        this.host.className = this.host.className + ' ' + this.type;
    }
    componentDidLoad() {
        this.host.querySelectorAll('div')[3].setAttribute('style', 'display: flex;');
    }
    onMouseEnter() {
        if (this.type === 'scale-up') {
            setAnimation(animations.transitionScale, this.host.querySelector('.slot-container'), { open: true });
        }
        else {
            this.animationHandler(10, true, false, 'flex');
        }
    }
    onMouseLeave() {
        if (this.type === 'scale-up') {
            setAnimation(animations.transitionScale, this.host.querySelector('.slot-container'), { open: false });
        }
        else {
            this.animationHandler(200, false, true, 'none');
        }
    }
    animationHandler(timeout, openFade, closeBottom, displayString) {
        let halfHeight = this.host.querySelector('.container').clientHeight / 2;
        let overlay = this.host.querySelector('.overlay');
        let subOverlay = this.host.querySelector('.sub-overlay');
        switch (this.type) {
            case 'bottom':
                setAnimation(animations.slideVertical, overlay, { up: true, distance: halfHeight, open: !closeBottom, duration: 200 });
                break;
            case 'fade':
                setAnimation(animations.fade, overlay, { open: openFade, duration: 200, opacityValue: 0.7 });
                break;
            case 'icon':
                setAnimation(animations.fade, overlay, { open: openFade, duration: 200, opacityValue: 1 });
                break;
            case 'image':
                setAnimation(animations.fade, overlay, { open: openFade, duration: 200, opacityValue: 1 });
                break;
            case 'heading':
                setAnimation(animations.slideVertical, overlay, { up: false, distance: halfHeight, open: !closeBottom, duration: 200 });
                if (subOverlay) {
                    setAnimation(animations.slideVertical, subOverlay, { up: true, distance: halfHeight, open: !closeBottom, duration: 200 });
                }
                break;
        }
        setTimeout(() => {
            overlay.setAttribute('style', `display: ${displayString};`);
            if (subOverlay) {
                subOverlay.setAttribute('style', `display: ${displayString};`);
            }
        }, timeout);
    }
    render() {
        return (h("div", { class: "container", onMouseEnter: () => this.onMouseEnter(), onMouseLeave: () => this.onMouseLeave() },
            h("div", { class: "overlay" }, this.image ? h("img", { src: this.image, alt: "Image" }) : (this.icon ? h("div", null,
                h("i", { class: this.icon })) : this.heading)),
            this.subHeading ? h("div", { class: "sub-overlay" }, this.subHeading) : null,
            h("div", { class: "slot-container" },
                h("slot", { name: "transition-content" }))));
    }
    static get is() { return "yoo-transition"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "heading": { "type": String, "attr": "heading" }, "host": { "elementRef": true }, "icon": { "type": String, "attr": "icon" }, "image": { "type": String, "attr": "image" }, "subHeading": { "type": String, "attr": "sub-heading" }, "type": { "type": String, "attr": "type" } }; }
    static get style() { return "/**style-placeholder:yoo-transition:**/"; }
}
