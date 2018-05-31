import { Component, Method, Element, Prop, EventEmitter, Event, Listen } from '@stencil/core';
import { setAnimation } from '../../../utils/anim';
import { IAnimationProp } from '@shared/interfaces';
import { YooSlimScrollComponent } from '../../core/slim-scroll/slim-scroll';
import { resizeWindow } from '../../../utils/helpers';
@Component({
    tag: 'yoo-modal',
    styleUrl: 'modal.scss',
    scoped: true
})
export class YooModalComponent {

    @Prop() heading: string;
    @Prop() headingIcon: string;
    @Prop() content: HTMLElement;
    @Prop() primaryButtonText: string;
    @Prop() secondaryButtonText: string;
    @Prop() hasHeader: boolean = true;
    @Prop() hasFooter: boolean;
    @Prop() footerText: string;
    @Prop() cssClass: string;
    @Prop() animationName: string;
    @Prop() animationProp: IAnimationProp;
    @Prop() primaryFn: Function;
    @Prop() withYooCtrl: boolean;
    @Prop() scrollEnabled: boolean;

    @Event() primaryButtonClicked: EventEmitter<boolean>;
    @Event() closed: EventEmitter<boolean>;

    @Element() host: HTMLStencilElement;

    componentDidLoad() {
        this.setContentInModal();
        this.animation(true);
        resizeWindow(() => this.resize());
    }

    componentDidUpdate() {
        this.setContentInModal();
    }

    onPrimaryButtonClick(event): void {
        if (event) {
            this.primaryButtonClicked.emit(true);
            this.primaryFn();
        }
    }

    @Method()
    close(): void {
        if (this.animationProp) { this.animationProp.open = false; }
        this.closed.emit(true);
        this.animation(false);
    }

    @Method()
    resize() {
        let slim: YooSlimScrollComponent = this.host.querySelector('yoo-slim-scroll') as any;
        if (slim) {
            if (slim.height === this.getSizeContainer().height) {
                slim.refresh();
            } else {
                slim.height = this.getSizeContainer().height;
            }
        }
    }

    @Listen('rowNumberChanged')
    onInputBarRawChange() {
        // resize the modal to adjust slim scroll if the input bar take more or less space
        setTimeout(this.resize(), 100);
    }

    animation(open: boolean, sentFromClose?: boolean) {
        if (this.animationName) {
            if (this.animationName === 'sticky_up') {
                const padding = 16;
                const modalHeight = (this.host.querySelector('div.outer-container').clientHeight);
                setAnimation(this.animationName, this.host, { open: open, distance: (((window.innerHeight / 2) + padding) - (modalHeight / 2)), modalHeight: modalHeight });
            } else {
                setAnimation(this.animationName, this.host.querySelector('.outer-container') as HTMLElement, (sentFromClose ? { open: open, up: true } : (this.animationProp ? this.animationProp : { open: open })));
            }
        }
    }

    setContentInModal() {
        if (this.scrollEnabled) {
            if (this.content) {
                let slim = document.createElement('yoo-slim-scroll');
                this.host.querySelector('div.modal-scroll-container').appendChild(slim);
                slim.appendChild(this.content);
            }
            this.resize();
        } else if (this.content) {
            this.host.querySelector('div.modal-body').appendChild(this.content);
        }
    }

    getSizeContainer() {
        let modalContainer: HTMLElement = this.host.querySelector('.modal-scroll-container');
        let maxHeight = window.innerHeight;
        if (modalContainer) {
            let modalHeader: HTMLElement = this.host.querySelector('.modal-header');
            if (modalHeader) {
                maxHeight -= modalHeader.clientHeight;
            }
            let modalFooter: HTMLElement = this.host.querySelector('.modal-footer');
            if (modalFooter) {
                maxHeight -= modalFooter.clientHeight;
            }
            return { height: Math.min((modalContainer.clientHeight), maxHeight) + 'px', width: modalContainer.clientWidth + 'px' };
        }
        return { height: '', width: '' };
    }

    hostData() {
        return {
            class: {
                ['custom-controller']: this.withYooCtrl
            }
        };
    }

    render(): JSX.Element {
        return (
            <div class="outer-container">
                {this.hasHeader ?
                    <div class="modal-header" attr-layout="row" attr-layout-align="space-between">
                        <span class="hide-icon" ></span>
                        <div class="inner-header">
                            {this.headingIcon ? <span class="icon"><i class={this.headingIcon}></i></span> : null}
                            <span class="modal-heading">{this.heading}</span>
                        </div>
                        <span class="close-icon" onClick={() => this.close()} ><i class="yo-close"></i></span>
                    </div>
                    : null}
                <div class="modal-body">
                    <div class="modal-scroll-container">
                        <yoo-slim-scroll enabled={this.scrollEnabled}>
                            <slot />
                        </yoo-slim-scroll>
                    </div>
                </div>
                {this.hasFooter ?
                    <div class="modal-footer" attr-layout="row">
                        {this.footerText ? <div class="footer-text"><span>{this.footerText}</span></div> : null}
                        <div class="footer-buttons" attr-layout="row" attr-layout-align="end center">
                            {this.secondaryButtonText ? <div class="secondary-button squared"><yoo-button class="dark" onClick={() => this.close()} text={this.secondaryButtonText}></yoo-button></div> : null}
                            {this.primaryButtonText ? <div class="primary-button squared"><yoo-button class="accent" onClick={(event: UIEvent) => this.onPrimaryButtonClick(event)} text={this.primaryButtonText}></yoo-button></div> : null}
                            <slot name="footer-slot" />
                        </div>
                    </div> : null}
            </div>
        );
    }
}
