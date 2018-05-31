import { Component, Element, Prop, Method, Event, EventEmitter } from '@stencil/core';
import { IWalkthroughEntry, IWalkthroughSlideEvent } from '@shared/interfaces';

@Component({
    tag: 'yoo-walkthrough',
    styleUrl: 'walkthrough.scss',
    scoped: true
})
export class YooWalkthroughComponent {

    @Prop() config: Array<IWalkthroughEntry>;

     @Element() host: HTMLStencilElement;

    @Event() slideChanged: EventEmitter<IWalkthroughSlideEvent>;

    private ionSlides: HTMLIonSlidesElement;

    componentDidLoad() {
        this.ionSlides = this.host.querySelector('ion-slides');
    }

    @Method()
    update() {
        if (this.ionSlides) {
            this.ionSlides.update();
        }
    }

    @Method()
    slideNext() {
        if (this.ionSlides) {
            this.ionSlides.slideNext();
        }
    }

    @Method()
    isEnd() {
        if (this.ionSlides) {
            return this.ionSlides.isEnd();
        }
        return false;
    }

    @Method()
    lockSwipes(shouldLock: boolean) {
        if (this.ionSlides) {
            this.ionSlides.lockSwipes(shouldLock);
        }
    }

    onIonSlideDidChange(ev: CustomEvent) {
        let index = ev.detail.activeIndex;
        let slide = this.config[index];
        this.slideChanged.emit({ event: ev.detail, slide });
    }

    render(): JSX.Element {
        let config = this.config || [];
        return (
            <ion-slides onIonSlideDidChange={ev => this.onIonSlideDidChange(ev)}>
                {
                    config.map(s =>
                        <ion-slide>
                            <div class="slide-content" attr-layout="column" attr-layout-align="center center">
                                <div>
                                    <div class="image-container">
                                        <img src={s.imageUrl} />
                                    </div>
                                    <div class="text-container">
                                        <div class="slide-title" innerHTML={s.title}></div>
                                        <div class="slide-subtitle" innerHTML={s.subtitle}></div>
                                    </div>
                                </div>
                            </div>
                        </ion-slide>
                    )
                }
            </ion-slides>
        );
    }
}
