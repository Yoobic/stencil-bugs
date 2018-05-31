/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooWalkthroughComponent {
    componentDidLoad() {
        this.ionSlides = this.host.querySelector('ion-slides');
    }
    update() {
        if (this.ionSlides) {
            this.ionSlides.update();
        }
    }
    slideNext() {
        if (this.ionSlides) {
            this.ionSlides.slideNext();
        }
    }
    isEnd() {
        if (this.ionSlides) {
            return this.ionSlides.isEnd();
        }
        return false;
    }
    lockSwipes(shouldLock) {
        if (this.ionSlides) {
            this.ionSlides.lockSwipes(shouldLock);
        }
    }
    onIonSlideDidChange(ev) {
        let index = ev.detail.activeIndex;
        let slide = this.config[index];
        this.slideChanged.emit({ event: ev.detail, slide });
    }
    render() {
        let config = this.config || [];
        return (h("ion-slides", { onIonSlideDidChange: ev => this.onIonSlideDidChange(ev) }, config.map(s => h("ion-slide", null,
            h("div", { class: "slide-content", "attr-layout": "column", "attr-layout-align": "center center" },
                h("div", null,
                    h("div", { class: "image-container" },
                        h("img", { src: s.imageUrl })),
                    h("div", { class: "text-container" },
                        h("div", { class: "slide-title", innerHTML: s.title }),
                        h("div", { class: "slide-subtitle", innerHTML: s.subtitle }))))))));
    }
    static get is() { return "yoo-walkthrough"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "host": {
            "elementRef": true
        },
        "isEnd": {
            "method": true
        },
        "lockSwipes": {
            "method": true
        },
        "slideNext": {
            "method": true
        },
        "update": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "slideChanged",
            "method": "slideChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  background-color: var(--light, #FFFFFF);\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n  :host ion-slides {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n  :host .slide-zoom {\n    height: 100%; }\n  :host .swiper-slide {\n    display: block; }\n  :host /deep/ .swiper-container {\n    height: 100%; }\n  :host .slide-content {\n    padding: 1rem;\n    height: 100%; }\n    :host .slide-content img {\n      max-height: 200px;\n      margin-bottom: 1rem; }\n    :host .slide-content .slide-title {\n      margin-top: 2.8rem;\n      font-size: 1.25rem;\n      font-weight: 600;\n      margin-bottom: 1rem;\n      color: var(--black, #000000); }\n    :host .slide-content .slide-subtitle {\n      color: var(--text-color, #807f83); }\n  :host /deep/ .swiper-pagination-bullet-active {\n    background-color: var(--success, #2EDBB7) !important; }"; }
}

export { YooWalkthroughComponent as YooWalkthrough };
