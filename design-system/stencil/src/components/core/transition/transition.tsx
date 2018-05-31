import { Component, Element, Prop } from '@stencil/core';
import { setAnimation, animations } from '../../../utils/anim';

@Component({
    tag: 'yoo-transition',
    styleUrl: 'transition.scss',
    scoped: true
})
export class YooTransitionComponent {

    @Prop() type: 'fade' | 'bottom' | 'icon' | 'image' | 'heading' | 'scale-up' = 'fade';
    @Prop() heading: string;
    @Prop() icon: string;
    @Prop() image: string;
    @Prop() subHeading: string;

     @Element() host: HTMLStencilElement;

    componentWillLoad() {
        this.host.className = this.host.className + ' ' + this.type;
    }

    componentDidLoad() {
        this.host.querySelectorAll('div')[3].setAttribute('style', 'display: flex;');
    }

    onMouseEnter() {
        if (this.type === 'scale-up') {
            setAnimation(animations.transitionScale, this.host.querySelector('.slot-container'), {open: true});
        } else {
            this.animationHandler(10, true, false, 'flex');
        }
    }

    onMouseLeave() {
        if (this.type === 'scale-up') {
            setAnimation(animations.transitionScale, this.host.querySelector('.slot-container'), {open: false});
        } else {
            this.animationHandler(200, false, true, 'none');
        }
    }

    animationHandler(timeout: number, openFade: boolean, closeBottom: boolean, displayString: string) {
        let halfHeight = this.host.querySelector('.container').clientHeight / 2;
        let overlay = this.host.querySelector('.overlay');
        let subOverlay = this.host.querySelector('.sub-overlay');
        switch (this.type) {
            case 'bottom':
                setAnimation(animations.slideVertical, overlay, {up: true, distance: halfHeight, open: !closeBottom, duration: 200});
                break;
            case 'fade':
                setAnimation(animations.fade, overlay, {open: openFade, duration: 200, opacityValue: 0.7});
                break;
            case 'icon':
                setAnimation(animations.fade, overlay, {open: openFade, duration: 200, opacityValue: 1});
                break;
            case 'image':
                setAnimation(animations.fade, overlay, {open: openFade, duration: 200, opacityValue: 1});
                break;
            case 'heading':
                setAnimation(animations.slideVertical, overlay, {up: false, distance: halfHeight, open: !closeBottom, duration: 200});
                if (subOverlay) {
                    setAnimation(animations.slideVertical, subOverlay, {up: true, distance: halfHeight, open: !closeBottom, duration: 200});
                }
                break;
        }
        setTimeout(() => {
            overlay.setAttribute('style', `display: ${displayString};`);
            if (subOverlay) {subOverlay.setAttribute('style', `display: ${displayString};`); }
        }, timeout);
    }


    render(): JSX.Element {
        return (
            <div class="container" onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()}>
                <div class="overlay">
                    {this.image ? <img src={this.image} alt="Image"/> : (this.icon ? <div><i class={this.icon}></i></div> : this.heading)}
                </div>
                {this.subHeading ? <div class="sub-overlay">{this.subHeading}</div> : null}
                <div class="slot-container">
                    <slot/>
                </div>
            </div>
        );
    }
}
