import { Component, Element } from '@stencil/core';

@Component({
    tag: 'yoo-service-create',
    styleUrl: 'service-create.scss',
    scoped: true
})
export class YooServiceCreateComponent {

     @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div>ServiceCreate needs a proper template</div>
        );
    }
}
