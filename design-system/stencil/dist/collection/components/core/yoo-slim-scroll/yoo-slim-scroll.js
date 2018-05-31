import iscroll from 'iscroll';
export class YooSlimScrollComponent {
    constructor() {
        // If you want to specify a size for the slim-scroll, otherwise it will take all the available space in the parent container.
        this.height = null;
        this.width = null;
        this.showScrollbar = false;
        this.horizontal = false;
    }
    scrollStateUpdater() {
        this.horizontal = this.host.classList.contains('horizontal');
    }
    componentWillLoad() {
    }
    componentDidLoad() {
        this.scrollStateUpdater();
        this.initIScroll();
        setTimeout(() => this.refresh(), 100);
    }
    componentDidUpdate() {
        this.scrollStateUpdater();
        //setTimeout(() => this.refresh(), 200);
    }
    initIScroll() {
        let scrollElem = this.host.querySelector('.scroll-slot-container');
        this.iScroll = new iscroll(scrollElem, this.getIScrollConfig());
        this.iScroll.on('scrollStart', () => this.scrollStart.emit(true));
        this.iScroll.on('scrollEnd', () => {
            this.scrollEnd.emit(true);
            this.isAtBottom();
            this.isAtLeft();
        });
    }
    isAtLeft() {
        if (this.horizontal && this.iScroll.x === this.iScroll.maxScrollX) {
            this.atLeft.emit(true);
        }
    }
    isAtBottom() {
        if (!this.horizontal && this.iScroll.y === this.iScroll.maxScrollY) {
            this.atBottom.emit(true);
        }
    }
    getIScrollConfig() {
        let config = {
            scrollbars: 'custom',
            //bounce: false,
            mouseWheel: true,
            preventDefault: false,
            disableMouse: true,
            disablePointer: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: !this.showScrollbar,
            //momentum: false
            scrollX: this.horizontal,
            scrollY: !this.horizontal
        };
        return config;
    }
    refresh() {
        if (this.iScroll) {
            this.iScroll.refresh();
        }
    }
    disable() {
        if (this.iScroll) {
            this.iScroll.disable();
        }
    }
    enable() {
        if (this.iScroll) {
            this.iScroll.enable();
        }
    }
    scrollToTop(duration = 200) {
        if (this.iScroll) {
            this.iScroll.scrollTo(0, 0, duration);
        }
    }
    scrollToElement(el, duration = 200) {
        this.iScroll.scrollToElement(el, duration);
    }
    scrollToBottom(duration = 200) {
        this.iScroll.scrollTo(0, this.iScroll.maxScrollY, duration);
    }
    getStyleContainer() {
        return {
            height: this.height || '100%',
            width: this.width || '100%',
            'max-height': window.innerHeight + 'px' //,
            //'max-width': window.innerWidth + 'px'
        };
    }
    render() {
        return (h("div", { class: "scroll-slot-container", style: this.getStyleContainer() },
            h("slot", { name: "scroll-slot" })));
    }
    static get is() { return "yoo-slim-scroll"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "disable": { "method": true }, "enable": { "method": true }, "height": { "type": String, "attr": "height" }, "horizontal": { "state": true }, "host": { "elementRef": true }, "iScroll": { "state": true }, "refresh": { "method": true }, "scrollToBottom": { "method": true }, "scrollToElement": { "method": true }, "scrollToTop": { "method": true }, "showScrollbar": { "type": Boolean, "attr": "show-scrollbar" }, "width": { "type": String, "attr": "width" } }; }
    static get events() { return [{ "name": "scrollStart", "method": "scrollStart", "bubbles": true, "cancelable": true, "composed": true }, { "name": "scrollEnd", "method": "scrollEnd", "bubbles": true, "cancelable": true, "composed": true }, { "name": "atBottom", "method": "atBottom", "bubbles": true, "cancelable": true, "composed": true }, { "name": "atLeft", "method": "atLeft", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-slim-scroll:**/"; }
}
