import { Component, Element } from '@stencil/core';
import tinymce from 'tinymce';

@Component({
    tag: 'yoo-form-text-editor',
    styleUrl: 'form-text-editor.scss',
    scoped: true
})
export class YooFormTextEditorComponent {

    protected static componentCounter: number = 0;

    @Element() protected host: HTMLElement;

    private componentId: string;

    constructor() {
        YooFormTextEditorComponent.componentCounter += 1;
        this.componentId = 'mytexteditor_' + YooFormTextEditorComponent.componentCounter;
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
        return (
            <div class="container" id={this.componentId}></div>
        );
    }
}
