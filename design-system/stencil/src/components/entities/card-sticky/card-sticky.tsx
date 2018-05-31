import { Component, Element, Prop, State } from '@stencil/core';
import { ICardStickyEntry } from '@shared/interfaces';
import { getBackImageStyle, cloudinary } from '../../../utils/helpers';

@Component({
    tag: 'yoo-card-sticky',
    styleUrl: 'card-sticky.scss',
    scoped: true
})
export class YooCardStickyComponent {

    @Prop() entry: ICardStickyEntry;

     @Element() host: HTMLStencilElement;

    @State() imageWidth: number = 335;
    @State() imageHeight: number = 260;

    render(): JSX.Element {
        return (
            <div class="outer-container image" attr-layout="row"
                style={this.entry && this.entry.imgSrc ? getBackImageStyle(cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight)) : null}>
                <div class="gradient-container">
                    <div class="text-container" attr-layout="column">
                        {this.entry && this.entry.category ?
                            <div class="category">
                                <span>{this.entry.category}</span>
                            </div>
                        : null}
                        {this.entry && this.entry.title ?
                            <div class="title">
                                <span>{this.entry.title}</span>
                            </div>
                        : null}
                        {this.entry && this.entry.buttonText ?
                            <yoo-button class="gradient-success small" text={this.entry.buttonText} onClick={() => this.entry.handler ? this.entry.handler() : {}}></yoo-button>
                        : null }
                    </div>
                </div>
            </div>
        );
    }
}
