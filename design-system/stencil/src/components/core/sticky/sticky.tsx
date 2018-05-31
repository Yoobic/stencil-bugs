import { Component, Element, Prop } from '@stencil/core';

@Component({
    tag: 'yoo-sticky',
    styleUrl: 'sticky.scss',
    scoped: true
})
export class YooStickyComponent {

    @Prop() top: string = null;
    @Prop() bottom: string = null;

     @Element() host: HTMLStencilElement;

    getTranslateStyle(): any {
        return {position: 'sticky', top: this.top, bottom: this.bottom};
    }

    render(): JSX.Element {
        return (
            <div class="outer-container" style={this.getTranslateStyle()}>
                <slot/>
            </div>
        );
    }
}
