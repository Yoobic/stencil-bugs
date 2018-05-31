import { Component, Element } from '@stencil/core';

@Component({
    tag: 'yoo-event-create',
    styleUrl: 'event-create.scss',
    scoped: true
})
export class YooEventCreateComponent {

     @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div>EventCreate needs a proper template</div>
        );
    }
}
