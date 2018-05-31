import tinymce from 'tinymce';
export class YooTextEditorComponent {
    constructor() {
        YooTextEditorComponent.componentCounter += 1;
        this.componentId = 'mytexteditor_' + YooTextEditorComponent.componentCounter;
    }
    componentDidLoad() {
        tinymce.init({
            selector: '#' + this.componentId,
            inline: true,
            theme: 'modern',
            theme_url: 'assets/tinymce/modern/theme.min.js',
            skin: 'light',
            skin_url: 'assets/tinymce/light',
            menubar: false,
            statusbar: false,
            toolbar_items_size: 'small'
        });
    }
    render() {
        return (h("div", { class: "container", id: this.componentId }));
    }
    static get is() { return "yoo-text-editor"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "host": { "elementRef": true } }; }
    static get style() { return "/**style-placeholder:yoo-text-editor:**/"; }
}
YooTextEditorComponent.componentCounter = 0;
