import { Component, Prop, Event, EventEmitter, Element, State, Listen } from '@stencil/core';

@Component({
    tag: 'yoo-scroll-spy',
    styleUrl: 'scroll-spy.scss',
    scoped: true
})
export class YooScrollSpyComponent {

    @Prop() repeat: boolean = true;

    @Event() enterInView: EventEmitter<boolean>;
    @Event() outOfView: EventEmitter<boolean>;

    @State() isInView: boolean;
    @State() enterEmitted: boolean;
    @State() outEmitted: boolean;
    @State() parentScroll: any;

     @Element() host: HTMLStencilElement;

    @Listen('body:scroll')
    bodyScrollListener() {
        this.onScroll();
    }

    componentDidLoad() {
        let parentScroll = this.host.closest('yoo-slim-scroll');
        if (parentScroll) {
            this.parentScroll = parentScroll;
            this.parentScroll.addEventListener('scrollStart', () => this.onScroll());
            this.parentScroll.addEventListener('scrollEnd', () => this.onScroll());
        }
        this.isInView = this.isElementInViewport();
        if (this.isInView) {
            this.enterInView.emit(true);
            this.enterEmitted = true;
        }
    }

    onScroll() {
        let newIsInView: boolean = this.isElementInViewport();
        if ((!this.isInView && newIsInView) && ( this.repeat || !this.enterEmitted)) {
            this.enterInView.emit(true);
            this.enterEmitted = true;
        }
        if ((this.isInView && !newIsInView) && (this.repeat || !this.outEmitted)) {
            this.outOfView.emit(true);
            this.outEmitted = true;
        }
        this.isInView = newIsInView;
    }

    isElementInViewport(): boolean {
        let rect = this.host.getBoundingClientRect();
        if (! this.parentScroll) {
            return (rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight ) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        } else {
            let rectScroll = this.parentScroll.getBoundingClientRect();
            return (rect.top >= 0 && rect.top >= rectScroll.top &&
                rect.left >= 0 && rect.left >= rectScroll.left &&
                rect.bottom  <= rectScroll.bottom &&
                rect.right <= rectScroll.right
            );
        }
    }

    render(): JSX.Element {
        return (
            <div></div>
        );
    }
}
