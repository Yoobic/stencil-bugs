import tippy from 'tippy.js';
export class YooTooltipComponent {
    constructor() {
        this.tippy = null;
    }
    onOptionsChange() {
        this.loadTippy();
    }
    onTextChange() {
        this.loadTippy();
    }
    componentWillLoad() {
        this.loadTippy();
    }
    loadTippy() {
        // Title is not an option in the API; set it directly as an attribute
        this.host.setAttribute('title', this.text);
        let tippyOptions = Object.assign({}, this.options, { theme: 'light', placement: this.placement, arrow: true, arrowType: 'round', createPopperInstanceOnInit: false });
        if (this.tippy) {
            this.tippy.destroyAll();
        }
        // Moved tooltip to always be on the host element
        this.tippy = tippy(this.host, tippyOptions);
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "yoo-tooltip"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "host": { "elementRef": true }, "options": { "type": "Any", "attr": "options", "watchCallbacks": ["onOptionsChange"] }, "placement": { "type": String, "attr": "placement" }, "text": { "type": String, "attr": "text", "watchCallbacks": ["onTextChange"] } }; }
    static get style() { return "/**style-placeholder:yoo-tooltip:**/"; }
}
