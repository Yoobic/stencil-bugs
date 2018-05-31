import { Component, Prop, Watch, Element } from '@stencil/core';
import { setAnimation } from '../../../utils/anim';

@Component({
    tag: 'yoo-fab-list',
    styleUrl: 'fab-list.scss',
    scoped: true
})
export class YooFabListComponent {

    @Prop() side: string = 'top';
    @Prop() mini: boolean = false;
    @Prop() activated: boolean = false;
    @Prop() animated: boolean = false;

    @Element() host: HTMLYooFabContainerElement;

    @Watch('activated')
    activatedChanged(activated: boolean): void {
        if (this.animated) {
            this.animatedDisplay(activated);
        } else {
            this.nonAnimatedDisplay(activated);
        }
    }

    animatedDisplay(activated: boolean): void {
        const yooBtns = this.host.querySelectorAll('.fab-button');
        const btnsArray = Array.from(Array(yooBtns.length).keys());
        const timeoutAnimated = 100;
        const buttonSize = 60;
        btnsArray.forEach(i => {
            setTimeout(() => {
                if (activated) {
                    yooBtns[i].classList.add('show');
                    setAnimation('fab', yooBtns[i], {distance: (buttonSize), direction: this.side, open: true});
                } else {
                    setAnimation('fab', yooBtns[i], {distance: (buttonSize), direction: this.side, open: false});
                    setTimeout (() => {
                        yooBtns[i].classList.remove('show');
                    }, 100);
                }
                if (this.mini) {
                    yooBtns[i].classList.add('mini');
                }
            }, (this.activated ? (timeoutAnimated * i) : (timeoutAnimated * (yooBtns.length - i))));
        });
    }

    nonAnimatedDisplay(activated: boolean) {
        const yooBtns = this.host.querySelectorAll('.fab-button');
        const btnsArray = Array.from(Array(yooBtns.length).keys());
        const timeoutNotAnimated = activated ? 30 : 0;
        btnsArray.forEach(i => {
            setTimeout(() => {
                activated ? yooBtns[i].classList.add('show') : yooBtns[i].classList.remove('show');
                if (this.mini) {
                    yooBtns[i].classList.add('mini');
                }
            }, timeoutNotAnimated * i);
        });
    }

    componentWillLoad() {
        this.host.classList.add(this.side);
    }

    render(): JSX.Element {
        return (
            <slot></slot>
        );
    }
}
