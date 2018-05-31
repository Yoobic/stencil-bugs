import { Component, Element, Prop, State } from '@stencil/core';
import { getBackImageStyle, cloudinary } from '../../../utils/helpers'; //intersectionObserve, resizeObserve, debounce
import { ICardCellEntry } from '@shared/interfaces';

@Component({
    tag: 'yoo-card-cell',
    styleUrl: 'card-cell.scss',
    scoped: true
})
export class YooCardCellComponent {

    @Prop() entry: ICardCellEntry;

    @Element() host: HTMLStencilElement;

    @State() imageWidth: number = 80;
    @State() imageHeight: number = 80;

    render(): JSX.Element {
        return (
            <div class="outer-container" attr-layout="column">
                <div class="image-container">
                    {this.entry ?
                        this.entry.icon ?
                            <div class="icon-container">
                                <i class={this.entry.icon}></i>
                            </div>
                        : this.entry.imgSrc ?
                            <div class="image" style={getBackImageStyle(cloudinary(this.entry.imgSrc, this.imageWidth, this.imageHeight))}/>
                        : null
                    : null}
                </div>
                <div class="text-container">
                    <span class="text">{this.entry && this.entry.text ? this.entry.text : ''}</span>
                </div>
                <div class="action-container">
                    <div class="icon-action"><i class="yo-more"></i></div>
                </div>
            </div>
        );
    }
}
