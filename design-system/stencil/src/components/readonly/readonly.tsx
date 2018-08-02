import { Component, Prop, Element } from '@stencil/core';


@Component({
    tag: 'yoo-readonly',
    styleUrl: 'readonly.scss',
    scoped: true
})
export class YooReadonlyComponent {

    @Prop() readonly: any;
    @Prop() isReadonly: any;

    @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return <div class="outer-container">
            readonly value : {'' + this.readonly} <br/>
            isReadonly value : {'' + this.isReadonly}
        </div>;
    }

}
