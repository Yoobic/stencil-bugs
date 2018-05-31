/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooScrollSpyComponent {
    constructor() {
        this.repeat = true;
    }
    bodyScrollListener() {
        this.onScroll();
    }
    componentDidLoad() {
        let parentScroll = this.host.closest('yoo-slim-scroll');
        if (parentScroll) {
            this.parentScroll = parentScroll;
            this.parentScroll.addEventListener('scrollStart', () => this.onScroll());
            this.parentScroll.addEventListener('scrollEnd', () => this.onScroll());
        }
        this.isInView = this.isElementInViewport();
        if (this.isInView) {
            this.enterInView.emit(true);
            this.enterEmitted = true;
        }
    }
    onScroll() {
        let newIsInView = this.isElementInViewport();
        if ((!this.isInView && newIsInView) && (this.repeat || !this.enterEmitted)) {
            this.enterInView.emit(true);
            this.enterEmitted = true;
        }
        if ((this.isInView && !newIsInView) && (this.repeat || !this.outEmitted)) {
            this.outOfView.emit(true);
            this.outEmitted = true;
        }
        this.isInView = newIsInView;
    }
    isElementInViewport() {
        let rect = this.host.getBoundingClientRect();
        if (!this.parentScroll) {
            return (rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth));
        }
        else {
            let rectScroll = this.parentScroll.getBoundingClientRect();
            return (rect.top >= 0 && rect.top >= rectScroll.top &&
                rect.left >= 0 && rect.left >= rectScroll.left &&
                rect.bottom <= rectScroll.bottom &&
                rect.right <= rectScroll.right);
        }
    }
    render() {
        return (h("div", null));
    }
    static get is() { return "yoo-scroll-spy"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "enterEmitted": { "state": true }, "host": { "elementRef": true }, "isInView": { "state": true }, "outEmitted": { "state": true }, "parentScroll": { "state": true }, "repeat": { "type": Boolean, "attr": "repeat" } }; }
    static get events() { return [{ "name": "enterInView", "method": "enterInView", "bubbles": true, "cancelable": true, "composed": true }, { "name": "outOfView", "method": "outOfView", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get listeners() { return [{ "name": "body:scroll", "method": "bodyScrollListener", "passive": true }]; }
    static get style() { return ""; }
}

export { YooScrollSpyComponent as YooScrollSpy };
