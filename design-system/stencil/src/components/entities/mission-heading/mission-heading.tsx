import { Component, Element, Prop } from '@stencil/core';
import { IMission } from '@shared/interfaces';
import { pipes } from '../../../utils/pipes';
import { services } from '../../../services';

@Component({
    tag: 'yoo-mission-heading',
    styleUrl: 'mission-heading.scss',
    scoped: true
})
export class YooMissionHeadingComponent {

    @Prop() mission: IMission;

    @Element() host: HTMLStencilElement;

    private badgeText: string;
    private badgeClass: string;
    private progressClass: string;

    private newStatus: string = 'NEW';
    private bookedStatus: string = 'BOOKED';
    private pendingStatus: string = 'PENDING';
    private finishedStatus: string = 'FINISHED';

    componentWillLoad() {
        this.badgeText = null;
        this.badgeClass = '';
        this.progressClass = undefined;

        if (this.mission != null) {
            switch (this.mission['validated']) {
                case true: {
                    this.badgeText = services.translate.get('VALIDATED');
                    this.badgeClass = 'gradient-success';
                    this.progressClass = undefined;
                    break;
                }
                case false: {
                    this.badgeText = services.translate.get('REJECTED');
                    this.badgeClass = 'danger';
                    this.progressClass = undefined;
                    break;
                }
                default: {
                    switch (this.mission['status']) {
                        case undefined: {
                            this.badgeText = this.newStatus;
                            this.badgeClass = 'gradient-success';
                            this.progressClass = 'dark';
                            break;
                        }
                        case 'booked': {
                            this.badgeText = this.bookedStatus;
                            this.badgeClass = 'info';
                            this.progressClass = 'info';
                            break;
                        }
                        case 'pending': {
                            this.badgeText = this.pendingStatus;
                            this.badgeClass = 'warning';
                            this.progressClass = 'warning';
                            break;
                        }
                        case 'finished': {
                            this.badgeText = this.finishedStatus;
                            this.badgeClass = 'dark';
                            this.progressClass = undefined;
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }

    render(): JSX.Element {
        return [
            (this.badgeText ? <yoo-badge text={services.translate.get(this.badgeText || '')} class={'round small ' + this.badgeClass}></yoo-badge> : null),
            (this.mission && this.mission.title ? <div class="mission-title">{services.translate.polyglot(this.mission.title)}</div> : null),
            (this.mission && this.mission.duedate ?
                <div class="mission-date">{services.translate.get('DUEDATE')}: {pipes.dateFormat.transform(this.mission.duedate, 'L LT')}</div>
                :
                (this.mission && this.mission.finishedDate ? <div class="mission-date">{services.translate.get('FINISHEDDATE')}: {pipes.dateFormat.transform(this.mission.finishedDate, 'L LT')}</div> :
                    (this.mission && this.mission.validatedDate ? <div class="mission-date">{services.translate.get('VALIDATEDDATE')}: {pipes.dateFormat.transform(this.mission.validatedDate, 'L LT')}</div> : null)
                )
            ),
            (this.mission && this.progressClass ? <div class="mission-progress"><yoo-progress-bar progress={(this.mission.progress ? this.mission.progress.value : 0)} class={'xsmall ' + this.progressClass}></yoo-progress-bar></div> : null)
        ];
    }
}
