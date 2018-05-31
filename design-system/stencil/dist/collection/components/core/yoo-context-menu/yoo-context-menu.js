export class YooContextMenuComponent {
    constructor() {
        this.opened = false;
    }
    open() {
        this.opened = true;
    }
    close() {
        this.opened = false;
    }
    componentWillLoad() {
        this.setupListener();
    }
    componentDidLoad() {
        this.calculateDropdownOpenDirection();
    }
    setupListener() {
        window.addEventListener('click', () => this.toggleWindow());
        window.addEventListener('touchstart', () => this.toggleWindow());
        window.addEventListener('resize', () => this.calculateDropdownOpenDirection());
    }
    calculateDropdownOpenDirection() {
        let rect = this.host.getBoundingClientRect();
        let position = window.innerHeight - rect.bottom;
        let dropdownContent = this.host.querySelector('.dropdown-content');
        let totalDropdownHeight = (rect.bottom - rect.top) + dropdownContent.clientHeight;
        dropdownContent.setAttribute('style', `transform: translateY(${dropdownContent.clientHeight > position ? '-' + totalDropdownHeight + 'px' : '0%'});`);
    }
    toggle() {
        if (!this.opened) {
            this.contextMenuOpened.emit(true);
            setTimeout(() => {
                this.open();
            }, 50);
        }
    }
    toggleWindow() {
        if (this.opened) {
            this.close();
            this.contextMenuClosed.emit(true);
        }
    }
    onItemClick(item, index) {
        if (item && item.handler) {
            let context = this.context && this.context.toJS && item.sendImmutable !== true ? this.context.toJS() : this.context;
            item.handler(context, index);
        }
    }
    render() {
        return [
            h("span", { "aria-haspopup": "true", "aria-expanded": "false", onClick: () => this.toggle() },
                h("slot", { name: "trigger" })),
            h("div", { class: `${this.opened ? 'show' : ''} dropdown-content` },
                this.items && this.items.length > 0 ?
                    this.items.map((item, i) => h("div", { class: `${item.separator ? 'border-bottom' : ''} ${item.separatorAfter ? 'border-top' : ''} dropdown-entry`, onClick: () => this.onItemClick(item, i) }, item.itemTitle))
                    : '',
                h("slot", null))
        ];
    }
    static get is() { return "yoo-context-menu"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "close": { "method": true }, "context": { "type": "Any", "attr": "context" }, "host": { "elementRef": true }, "items": { "type": "Any", "attr": "items" }, "open": { "method": true }, "opened": { "state": true } }; }
    static get events() { return [{ "name": "contextMenuOpened", "method": "contextMenuOpened", "bubbles": true, "cancelable": true, "composed": true }, { "name": "contextMenuClosed", "method": "contextMenuClosed", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-context-menu:**/"; }
}
