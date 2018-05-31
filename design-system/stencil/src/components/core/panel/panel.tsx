import { Component, Prop, Element } from '@stencil/core';

@Component({
    tag: 'yoo-panel',
    styleUrl: 'panel.scss',
    scoped: true
})
export class YooPanelComponent {

    @Prop() width: number;
    @Prop() height: number;

    @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div>
                <canvas class={'outer-container' + (this.width ? '' : ' width' ) + (this.height ? '' : ' height')} width={this.width} height={this.height}></canvas>
            </div>
        );
    }
}
