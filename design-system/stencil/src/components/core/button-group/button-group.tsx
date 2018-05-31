import { Component, Prop, Element } from '@stencil/core';

@Component({
    tag: 'yoo-button-group',
    styleUrl: 'button-group.scss',
    scoped: true
})
export class YooButtonGroupComponent {

    @Prop() isDropdown: boolean = false;
    @Prop() dropdownTitle: string;

    @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            (this.isDropdown ? <yoo-context-menu>
                <yoo-button slot="trigger" icon="yo-arrow-dropdown" text={this.dropdownTitle}></yoo-button>
                <div class="context-container" attr-layout="column">
                    <slot/>
                </div>
            </yoo-context-menu>
            : <div class="group-container" attr-layout="row">
                <slot/>
            </div>)
        );
    }
}
