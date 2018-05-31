import { Component, Element, Prop } from '@stencil/core';
import { services } from '../../../services';

@Component({
    tag: 'yoo-mission-contents',
    styleUrl: 'mission-contents.scss',
    scoped: true
})
export class YooMissionContentsComponent {

    @Prop() slidesNumber: number;
    @Prop() photosNumber: number;
    @Prop() questionsNumber: number;

    @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return ((this.slidesNumber || this.photosNumber || this.questionsNumber) ?
                <li class="mission-menu-item">
                    <div class="mission-menu-left">
                        <span class="mission-menu-icon"><i class="yo-attachment"></i></span>
                        <div class="border"></div>
                    </div>
                    <div class="mission-menu-right">
                        <div class="mission-menu-title">{services.translate.get('QUESTIONS')}</div>
                        <div class="mission-menu-content">
                            {(this.slidesNumber ?
                                <span>
                                    <i class="yo-pages"></i> {this.slidesNumber} {services.translate.get('PAGES')}
                                </span> : null)}
                            {(this.photosNumber ?
                                <span>
                                    <i class="yo-gallery"></i> {this.photosNumber} {services.translate.get('PHOTOS')}
                                </span> : null)}
                            {(this.questionsNumber ?
                                <span>
                                    <i class="yo-questions"></i> {this.questionsNumber} {services.translate.get('QUESTIONS')}
                                </span> : null)}
                        </div>
                    </div>
                </li>
                : null
        );
    }
}
