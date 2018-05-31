import { Component, Element, Prop } from '@stencil/core';
import { setAnimation, animations } from '../../../utils/anim';

@Component({
    tag: 'yoo-loader',
    styleUrl: 'loader.scss',
    scoped: true
})
export class YooLoaderComponent {

    @Prop() progress: number;
    @Prop() maxValue: number;

    @Element() protected host: HTMLElement;

    render() {
        setAnimation(animations.fade, this.host, { open: true });
        return <div class="container" attr-layout="row" attr-layout-align="center center">
            <div class="value">
                <img src="assets/loader/loading_dark.svg" />
                {this.progress ? <yoo-progress-bar progress={this.progress} maxValue={this.maxValue} class="success"></yoo-progress-bar> : null}
            </div>
        </div>;
    }
}
