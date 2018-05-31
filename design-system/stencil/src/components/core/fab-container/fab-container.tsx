import { Component, State, Element, Prop } from '@stencil/core';

@Component({
    tag: 'yoo-fab-container',
    styleUrl: 'fab-container.scss',
    scoped: true
})
export class YooFabContainerComponent {

    @Prop() animated: boolean = false;

    @State() activated: boolean = false;

    @Element() private host: HTMLElement;

    toggleActive: Function = () => {
        this.activated = !this.activated;
    }

    render(): JSX.Element {
        // select the button that triggers the list
        const fabBtn = this.host.querySelector('yoo-fab-button');
        fabBtn.toggleActive = this.toggleActive;
        fabBtn.activated = this.activated;

        const fabLists = this.host.querySelectorAll('yoo-fab-list');
        fabBtn.parentHasList = (fabLists.length > 0);

        // Propagate the activated prop to all lists
        for (let i = 0; i < fabLists.length; i++) {
            fabLists[i].activated = this.activated;
            fabLists[i].animated = this.animated;
        }

        return (
            <slot></slot>
        );
    }
}
