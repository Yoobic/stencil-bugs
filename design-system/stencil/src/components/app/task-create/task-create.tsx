import { Component, Element } from '@stencil/core';

@Component({
    tag: 'yoo-task-create',
    styleUrl: 'task-create.scss',
    scoped: true
})
export class YooTaskCreateComponent {

     @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div>TaskCreate needs a proper template</div>
        );
    }
}
