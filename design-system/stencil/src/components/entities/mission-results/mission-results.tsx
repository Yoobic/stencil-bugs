import { Component, Element, Prop } from '@stencil/core';
import { IMission, IUser } from '@shared/interfaces';
import { services } from '../../../services';
import { keys } from 'lodash-es';

@Component({
    tag: 'yoo-mission-results',
    styleUrl: 'mission-results.scss',
    scoped: true
})
export class YooMissionResultsComponent {
    @Prop() mission: IMission;
    @Prop() slidesNumber: number;
    @Prop() photosNumber: number;
    @Prop() questionsNumber: number;

    @Element() host: HTMLStencilElement;

    renderExtraScore(extraScores): JSX.Element {
        if (!extraScores) {
            return null;
        }
        return (<div>
            {keys(extraScores).map((key) => {
                let s = extraScores[key];
                return s ?
                    <div class="mission-menu-content-scoring">
                        {services.translate.polyglot(s.title)} : {s.value} {s.isPercentage ? '%' : ''}
                    </div>
                    : null;
            })}
        </div>);
    }

    render(): JSX.Element {
        let owner = {} as IUser;
        if (this.mission) {
            owner = this.mission.owner as IUser;
        }
        return (this.mission ?
            <div class="mission-results">
                <div class="mission-content">
                    <yoo-mission-heading mission={this.mission}></yoo-mission-heading>
                    <ul class="mission-menu">
                        {(this.mission.ownerDisplayName ?
                            <li class="mission-menu-item">
                                <div class="mission-menu-left">
                                    <span class="mission-menu-icon"><i class="yo-user"></i></span>
                                    <div class="border"></div>
                                </div>
                                <div class="mission-menu-right">
                                    <div class="mission-menu-title">{services.translate.get('AUTHOR')}</div>
                                    {/* <div class="mission-menu-title">{services.translate.get('ASSIGNTO')}</div> */}
                                    <div class="mission-menu-content mission-menu-author success">
                                        {(owner && owner.imageData ? <yoo-avatar class="xsmall" img-src={owner.imageData}></yoo-avatar> : null)}
                                        {this.mission.ownerDisplayName}</div>
                                </div>
                            </li>
                            : null)}
                        {this.mission.address ?
                            <li class="mission-menu-item">
                                <div class="mission-menu-left">
                                    <span class="mission-menu-icon"><i class="yo-pin"></i></span>
                                    <div class="border"></div>
                                </div>
                                <div class="mission-menu-right">
                                    <div class="mission-menu-title">{services.translate.get('STORE')}</div>
                                    <div class="mission-menu-content success">{this.mission.address}</div>
                                </div>
                            </li>
                            : null}
                        {(this.mission.score && (this.mission.score.value >= 0 || this.mission.score.value < 0)) ?
                            <li class="mission-menu-item">
                                <div class="mission-menu-left">
                                    <span class="mission-menu-icon"><i class="yo-star"></i></span>
                                    <div class="border"></div>
                                </div>
                                <div class="mission-menu-right">
                                    <div class="mission-menu-title">{services.translate.get('SCORE')}</div>
                                    <div class="mission-menu-content">
                                        <div class="mission-menu-content-scoring">
                                            {services.translate.polyglot(this.mission.score.title || 'SCORE')}:  {this.mission.score.value} {this.mission.score.isPercentage ? '%' : ''} {!this.mission.score.isPercentage && this.mission.score.total > 0 ? '/ ' + this.mission.score.total : ''}
                                        </div>
                                        {(this.mission.extraScores ? this.renderExtraScore(this.mission.extraScores) : null)}
                                    </div>
                                </div>
                            </li>
                            : null}
                        {((this.slidesNumber || this.photosNumber || this.questionsNumber) ?
                            <yoo-mission-contents slidesNumber={this.slidesNumber} photosNumber={this.photosNumber} questionsNumber={this.questionsNumber}></yoo-mission-contents> : null)}
                    </ul>
                </div>
            </div >
            : null);
    }
}
