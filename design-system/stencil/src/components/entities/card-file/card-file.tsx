import { Component, Element, Prop } from '@stencil/core';
import { getBackImageStyle, cloudinary } from '../../../utils/helpers';

@Component({
    tag: 'yoo-card-file',
    styleUrl: 'card-file.scss',
    scoped: true
})
export class YooCardFileComponent {

    @Prop() imgSrc: string;
    @Prop() icon: string;
    @Prop() iconClass: string = '';
    @Prop() heading: string;
    @Prop() subheading: string;
    @Prop() isClosable: boolean;

    @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div class="outer-container">
                {(this.isClosable ?
                    <div class="close-btn">
                        <i class="yo-close"></i>
                    </div>
                    : null)}
                {this.imgSrc ?
                    <div class="image-container" style={getBackImageStyle(cloudinary(this.imgSrc, 100, 100))}></div>
                    : (this.icon ?
                        <div class="image-container">
                            <i class={this.icon + ' ' + this.iconClass}></i>
                        </div>
                        : null)}
                <div class="content-container">
                    <div class="top-container">
                        {(this.heading ? <div class="heading-container">
                            {this.heading}
                        </div>
                            : null)}
                        {(this.subheading ? <div class="subheading-container">
                            {this.subheading}
                        </div>
                            : null)}
                    </div>
                </div>
            </div>
        );
    }
}
