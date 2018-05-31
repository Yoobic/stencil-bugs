import { Component, Element } from '@stencil/core';

@Component({
    tag: 'yoo-chat-create',
    styleUrl: 'chat-create.scss',
    scoped: true
})
export class YooChatCreateComponent {

     @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div>ChatCreate needs a proper template</div>
        );
    }
}
