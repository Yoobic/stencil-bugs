import { Component, Element, Prop } from '@stencil/core';
//import { setAnimation, animations } from '../../../utils/anim';

@Component({
    tag: 'yoo-empty-state',
    styleUrl: 'empty-state.scss',
    scoped: true
})
export class YooEmptyStateComponent {

    @Prop() type: string;

     @Element() host: HTMLStencilElement;

    componentDidLoad() {
        //setAnimation(animations.shake, this.host, { duration: 1000 });
    }

    getIconSrc() {
        return './assets/empty-states/' + (this.type || 'empty') + '.svg';
    }

    render() {
        return (
            <div class="container">
                <img src={this.getIconSrc()} />
            </div>
        );
    }
}
