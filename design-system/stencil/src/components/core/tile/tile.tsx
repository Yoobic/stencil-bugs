import { Component, Element, Prop } from '@stencil/core';

@Component({
    tag: 'yoo-tile',
    styleUrl: 'tile.scss',
    scoped: true
})
export class YooTileComponent {

    @Prop() icon: string;
    @Prop() value: string;
    @Prop() text: string;
    @Prop() textClass: string;

     @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div class="outer-container">
                {(this.icon ? <div class="tile-icon"><i class={this.icon}></i></div> : null )}
                <div class="tile-value">{this.value}</div>
                <div class={'tile-text ' + (this.textClass)}>{this.text}</div>
            </div>
        );
    }
}
