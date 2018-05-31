import { Component, Prop, Element } from '@stencil/core';

@Component({
    tag: 'yoo-device',
    styleUrl: 'device.scss',
    scoped: true
})
export class YooDeviceComponent {

    @Prop() hideBar: boolean = false;
    @Prop() heading: string;

     @Element() host: HTMLStencilElement;

    componentDidLoad() {
        let slimScroll = this.host.querySelector('yoo-slim-scroll');
        if (slimScroll) {
            setTimeout(() => slimScroll.refresh(), 300);
        }
    }

    render(): JSX.Element {
        return (
            <div class="device">
                <div class="content" >
                    <div attr-layout="column" class="column">
                        <yoo-slim-scroll>
                                <div>
                                    {!this.hideBar ?
                                    <div class="top-bar">
                                        <div attr-layout="row">
                                            <i class="yo-menu"></i>
                                            <span></span>
                                            <span class="heading">{this.heading}</span>
                                            <span></span>
                                            <i class="yo-settings"></i>
                                        </div>
                                    </div>
                                    : null }
                                    <slot/>
                                </div>
                        </yoo-slim-scroll>
                    </div>
                </div>
            </div>
        );
    }
}
