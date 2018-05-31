import { Component, Element, Prop, Method, State, EventEmitter, Event } from '@stencil/core';
import { YooSlimScrollComponent } from '../../core/slim-scroll/slim-scroll';
import { IMission, IMissionDescription, ILocation, IUser, ITranslateService } from '@shared/interfaces';
import { resizeWindow } from '../../../utils/helpers';
import { pipes } from '../../../utils/pipes';

@Component({
    tag: 'yoo-mission-detail',
    styleUrl: 'mission-detail.scss',
    scoped: true
})
export class YooMissionDetailComponent {

    @Prop() mission: IMission;
    @Prop() slidesNumber: number;
    @Prop() photosNumber: number;
    @Prop() questionsNumber: number;

     @Element() host: HTMLStencilElement;
    @Event() book: EventEmitter<string>;

    @State() scrollHeight: string;

    private badgeText: string;
    private badgeClass: string;
    private progressClass: string;
    private translate: ITranslateService = (window as any).translateService;

    private newStatus: string = 'NEW';
    private bookedStatus: string = 'BOOKED';
    private pendingStatus: string = 'PENDING';

    @Method()
    resize() {
        let slim: YooSlimScrollComponent = this.host.querySelector('yoo-slim-scroll') as any;
        if (slim) {
            this.scrollHeight = this.getSizeContainer().height;
        }
    }

    componentWillLoad() {
        this.badgeText = null;
        this.badgeClass = '';
        this.progressClass = undefined;

        if (this.mission != null) {
            switch (this.mission['validated']) {
                case true: {
                    this.badgeText = this.translate.get('VALIDATED');
                    this.badgeClass = 'gradient-success';
                    this.progressClass = undefined;
                    break;
                }
                case false: {
                    this.badgeText = this.translate.get('REJECTED');
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
                        case 'finished': {
                            this.badgeText = this.pendingStatus;
                            this.badgeClass = 'warning';
                            this.progressClass = 'warning';
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }

    componentDidLoad() {
        resizeWindow(() => this.resize());
        this.resize();
    }

    getSizeContainer() {
        let maxHeight = window.innerHeight;
        let body = this.host.parentElement.parentElement.querySelector('.modal-body');
        if (body) {
            maxHeight = Math.min(maxHeight, body.clientHeight);
        } else {
            maxHeight = this.decreaseMaxHeight(maxHeight, 'ion-header', document);
            maxHeight = this.decreaseMaxHeight(maxHeight, 'ion-footer', document);
        }
        maxHeight = this.decreaseMaxHeight(maxHeight, '.mission-footer', this.host);
        return { height: maxHeight + 'px' };
    }

    decreaseMaxHeight(maxHeight: number, name: string, html) {
        let comp: HTMLElement = html.querySelector(name);
        if (comp) {
            maxHeight -= comp.clientHeight;
        }
        return maxHeight;
    }

    onBook(action: string) {
        this.book.emit(action);
    }

    renderButtonFooter(): JSX.Element {
        return (
            <div class="mission-footer">
                {(this.badgeText === this.newStatus) ? <yoo-button onClick={() => this.onBook('start')} text={this.translate.get('START')} class="large gradient-success"></yoo-button> : null}
                {(this.badgeText === this.bookedStatus) ? <yoo-button onClick={() => this.onBook('unbook')} text={this.translate.get('UNBOOK')} class="mission-button-leave"></yoo-button> : null}
                {(this.badgeText === this.bookedStatus) ? <yoo-button onClick={() => this.onBook('start')} text={this.translate.get('CONTINUE')} class="gradient-success"></yoo-button> : null}
            </div>
        );
    }

    render(): JSX.Element {
        let description = {} as IMissionDescription, location = {} as ILocation, creator = {} as IUser;
        if (this.mission) {
            description = this.mission.description as IMissionDescription;
            location = this.mission.location as ILocation;
            creator = this.mission.creator as IUser;
        }
        return (this.mission ?
            <div class="mission-detail">
                <yoo-slim-scroll height={this.scrollHeight}>
                    <div class="mission-content">
                        {(this.badgeText ? <yoo-badge text={this.translate.get(this.badgeText || '')} class={'round small ' + this.badgeClass}></yoo-badge> : null)}
                        {(this.mission.title ? <div class="mission-title">{this.translate.polyglot(this.mission.title)}</div> : null)}
                        {(this.mission.duedate ?
                            <div class="mission-date">{this.translate.get('DUEDATE')}: {pipes.dateFormat.transform(this.mission.duedate, 'L LT')}</div>
                            :
                            (this.mission.validatedDate ? <div class="mission-date">{this.translate.get('VALIDATEDDATE')}: {this.mission.validatedDate}</div> : null)
                        )}
                        {(this.progressClass ? <div class="mission-progress"><yoo-progress-bar progress={(this.mission.progress ? this.mission.progress.value : 0)} class={'xsmall ' + this.progressClass}></yoo-progress-bar></div> : null)}
                        <ul class="mission-menu">
                            {(this.mission.priority ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-priority"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('PRIORITY')}</div>
                                        <div class="mission-menu-content">P{this.mission.priority}</div>
                                    </div>
                                </li>
                                : null)}
                            {(description.text ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-description"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('MISSIONDESCRIPTION')}</div>
                                        <div class="mission-menu-content">{description.text}</div>
                                    </div>
                                </li>
                                : null)}
                            {((this.slidesNumber || this.photosNumber || this.questionsNumber) ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-attachment"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('QUESTIONS')}</div>
                                        <div class="mission-menu-content">
                                            {(this.slidesNumber ?
                                                <span>
                                                    <i class="yo-pages"></i> {this.slidesNumber} {this.translate.get('PAGES')}
                                                </span> : null)}
                                            {(this.photosNumber ?
                                                <span>
                                                    <i class="yo-gallery"></i> {this.photosNumber} {this.translate.get('PHOTOS')}
                                                </span> : null)}
                                            {(this.questionsNumber ?
                                                <span>
                                                    <i class="yo-questions"></i> {this.questionsNumber} {this.translate.get('QUESTIONS')}
                                                </span> : null)}
                                        </div>
                                    </div>
                                </li>
                                : null)}
                            {((location.contactname || location.contactphone || this.mission.address) ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-contact"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('CONTACT')}</div>
                                        <div class="mission-menu-content">
                                            {(location ? <div class="mission-menu-content-contact">{location.contactname}</div> : null)}
                                            {(this.mission.address ? <div class="mission-menu-content-contact">{this.mission.address}</div> : null)}
                                            {(location ? <div class="mission-menu-content-contact">{location.contactphone}</div> : null)}
                                        </div>
                                    </div>
                                </li>
                                : null)}
                            {(this.mission.comments ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-note"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('NOTES')}</div>
                                        <div class="mission-menu-content">{this.mission.comments}</div>
                                    </div>
                                </li>
                                : null)}
                            {(location.info ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-info"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('INFO')}</div>
                                        <div class="mission-menu-content">{location.info}</div>
                                    </div>
                                </li>
                                : null)}
                            {(this.mission.originalUnvalidatedReason ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-comment"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('COMMENTS')}</div>
                                        <div class="mission-menu-content">{this.mission.originalUnvalidatedReason}</div>
                                    </div>
                                </li>
                                : null)}
                            {(this.mission.price ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-plus"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('PRICE')}</div>
                                        <div class="mission-menu-content">{this.mission.price}</div>
                                    </div>
                                </li>
                                : null)}
                            {(creator && (creator.email || creator.firstName || creator.lastName) ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-plus"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('REQUESTOR')}</div>
                                        {((creator.firstName || creator.lastName) ? <div class="mission-menu-content">{creator.firstName} {creator.lastName}</div> : null)}
                                        {(creator.email ? <div class="mission-menu-content">{creator.email}</div> : null)}
                                    </div>
                                </li>
                                : null)}
                            {((this.mission.duration) ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-plus"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('MISSIONDURATION')}</div>
                                        <div class="mission-menu-content">{this.mission.duration} min</div>
                                    </div>
                                </li>
                                : null)}
                            {((this.mission._ect) ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-plus"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('CREATIONDATE')}</div>
                                        <div class="mission-menu-content">{pipes.dateFormat.transform(this.mission._ect, 'L LT')}</div>
                                    </div>
                                </li>
                                : null)}
                            {((this.mission.validFrom || this.mission.validUntil) ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-plus"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('VISIBILITY')}</div>
                                        <div class="mission-menu-content">{pipes.dateFormat.transform(this.mission.validFrom, 'L LT')} - {pipes.dateFormat.transform(this.mission.validUntil, 'L LT')}</div>
                                    </div>
                                </li>
                                : null)}
                            {(this.mission.bookedUntil ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-plus"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('CALENDAR')}</div>
                                        <div class="mission-menu-content">{pipes.dateFormat.transform(this.mission.bookedUntil, 'L LT')}</div>
                                    </div>
                                </li>
                                : null)}
                            {(this.mission.serviceData ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-plus"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{this.translate.get('DETAILS')}</div>
                                        <div class="mission-menu-content">{this.mission.serviceData}</div>
                                    </div>
                                </li>
                                : null)}
                        </ul>
                    </div>
                </yoo-slim-scroll>
                {((this.badgeText === this.newStatus || this.badgeText === this.bookedStatus) ? this.renderButtonFooter() : null)}
            </div>
            : null
        );
    }
}
