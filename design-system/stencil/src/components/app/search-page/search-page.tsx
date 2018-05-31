import { Component, Element } from '@stencil/core';

@Component({
    tag: 'yoo-search-page',
    styleUrl: 'search-page.scss',
    scoped: true
})
export class YooSearchPageComponent {

     @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div>SearchPage needs a proper template</div>
        );
    }
}
