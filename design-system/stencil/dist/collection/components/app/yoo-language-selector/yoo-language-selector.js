export class YooLanguageSelectorComponent {
    constructor() {
        this.languages = [];
    }
    componentDidLoad() {
        let slim = this.host.querySelector('yoo-slim-scroll');
        if (slim) {
            slim.height = this.getSizeContainer().height;
            slim.width = this.getSizeContainer().width;
            setTimeout(() => slim.refresh(), 200);
        }
    }
    getSizeContainer() {
        let modalBody = document.querySelector('.modal-body');
        let modalContent = document.querySelector('.modal-content');
        if (modalBody) {
            return { height: (modalBody.clientHeight * 0.8) + 'px', width: Math.min((modalContent.clientWidth), 700) + 'px' };
        }
        return { height: '', width: '' };
    }
    onLanguageSelector(language) {
        this.languageSelected.emit(language);
        document.querySelector('yoo-modal-controller').closeModal(false);
    }
    renderList(language) {
        return (h("li", { class: (this.isMobile ? 'item' : 'menu-item'), onClick: () => this.onLanguageSelector(language.value) },
            h("span", null,
                h("i", { class: 'item-flag ' + language.icon }),
                language.title)));
    }
    render() {
        return (h("div", null,
            h("h3", { class: "heading" }, "Choose your country"),
            h("yoo-slim-scroll", null,
                h("div", { slot: "scroll-slot" },
                    h("div", { class: "lists-container" },
                        h("ul", { class: "menu" }, this.languages.map(language => {
                            return this.renderList(language);
                        })))))));
    }
    static get is() { return "yoo-language-selector"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "hasSlimScroll": { "state": true }, "host": { "elementRef": true }, "isMobile": { "type": Boolean, "attr": "is-mobile" }, "languages": { "type": "Any", "attr": "languages" } }; }
    static get events() { return [{ "name": "languageSelected", "method": "languageSelected", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-language-selector:**/"; }
}
