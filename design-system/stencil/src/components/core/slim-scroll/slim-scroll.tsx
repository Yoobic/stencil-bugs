import { Component, Prop, Element, Event, EventEmitter, State, Method } from '@stencil/core';
import iscroll from 'iscroll';

@Component({
    tag: 'yoo-slim-scroll',
    styleUrl: 'slim-scroll.scss',
    scoped: true
})
export class YooSlimScrollComponent {

    // If you want to specify a size for the slim-scroll, otherwise it will take all the available space in the parent container.
    @Prop() height: string = null;
    @Prop() width: string = null;
    @Prop() showScrollbar: boolean = false;
    @Prop() enabled: boolean = true;

    @Event() scrollStart: EventEmitter<boolean>;
    @Event() scrollEnd: EventEmitter<boolean>;
    @Event() atBottom: EventEmitter<boolean>;
    @Event() atLeft: EventEmitter<boolean>;

    @State() horizontal: boolean = false;
    @State() iScroll: any;

    @Element() host: HTMLStencilElement;

    scrollStateUpdater(): void {
        this.horizontal = this.host.classList.contains('horizontal');
    }

    componentWillLoad() {
    }

    componentDidLoad(): void {
        this.scrollStateUpdater();
        this.initIScroll();
        setTimeout(() => this.refresh(), 100);
    }

    componentDidUpdate(): void {
        this.scrollStateUpdater();
        setTimeout(() => this.refresh(), 200);
    }

    componentDidUnload(): void {
        if (this.iScroll) {
            this.iScroll.destroy();
            this.iScroll = null;
        }
    }

    initIScroll(): void {
        let scrollElem: HTMLElement = this.host.querySelector('.scroll-slot-container');
        this.iScroll = new iscroll(scrollElem, this.getIScrollConfig());
        this.iScroll.on('scrollStart', () => this.scrollStart.emit(true));
        this.iScroll.on('scrollEnd', () => {
            this.scrollEnd.emit(true);
            this.isAtBottom();
            this.isAtLeft();
        });
    }

    isAtLeft(): void {
        if (this.horizontal && this.iScroll.x === this.iScroll.maxScrollX) {
            this.atLeft.emit(true);
        }
    }

    isAtBottom(): void {
        if (!this.horizontal && this.iScroll.y === this.iScroll.maxScrollY) {
            this.atBottom.emit(true);
        }
    }

    getIScrollConfig(): any {
        let config: any = {
            scrollbars: 'custom',
            //bounce: false,
            mouseWheel: true,
            preventDefault: false,
            disableMouse: true,
            disablePointer: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: !this.showScrollbar,
            //momentum: false
            scrollX: this.horizontal,
            scrollY: !this.horizontal
        };
        return config;
    }

    @Method()
    refresh(): void {
        if (this.iScroll) {
            this.iScroll.refresh();
        }
    }

    @Method()
    disable(): void {
        if (this.iScroll) {
            this.iScroll.disable();
        }
    }

    @Method()
    enable(): void {
        if (this.iScroll) {
            this.iScroll.enable();
        }
    }

    @Method()
    scrollToTop(duration: number = 200): void {
        if (this.iScroll) {
            this.iScroll.scrollTo(0, 0, duration);
        }
    }

    @Method()
    scrollToElement(el: HTMLElement, duration: number = 200): void {
        this.iScroll.scrollToElement(el, duration);
    }

    @Method()
    scrollToBottom(duration: number = 200): void {
        this.iScroll.scrollTo(0, this.iScroll.maxScrollY, duration);
    }

    getStyleContainer(): any {
        return {
            height: this.height || '100%',
            width: this.width || '100%',
            'max-height': window.innerHeight + 'px'//,
            //'max-width': window.innerWidth + 'px'
        };
    }

    render(): JSX.Element {
        return (
            this.enabled ?
                <div class="scroll-slot-container" style={this.getStyleContainer()} >
                    <div class="scroll-slot-content">
                        <slot />
                    </div>
                </div> : <slot />
        );
    }
}
