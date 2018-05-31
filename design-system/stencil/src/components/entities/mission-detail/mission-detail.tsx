import { Component, Element, Prop, Method, State, EventEmitter, Event } from '@stencil/core';
import { YooSlimScrollComponent } from '../../core/slim-scroll/slim-scroll';
import { IMission, IMissionDescription, ILocation, IUser } from '@shared/interfaces';
import { resizeWindow, decreaseMaxHeight, getSizeModal } from '../../../utils/helpers';
import { pipes } from '../../../utils/pipes';
import { services } from '../../../services';

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

    @Event() book: EventEmitter<string>;

    @Element() host: HTMLStencilElement;

    @State() scrollHeight: string;

    @Method()
    resize() {
        let slim: YooSlimScrollComponent = this.host.querySelector('yoo-slim-scroll') as any;
        if (slim) {
            this.scrollHeight = this.getSizeContainer().height;
        }
    }

    componentWillLoad() {

    }

    componentDidLoad() {
        resizeWindow(() => this.resize());
        setTimeout(() => this.resize(), 300);
    }

    getSizeContainer() {
        let maxHeight = window.innerHeight;
        maxHeight = getSizeModal(this.host, maxHeight);
        maxHeight = decreaseMaxHeight(maxHeight, '.mission-footer', this.host);
        return { height: maxHeight + 'px' };
    }

    onBook(action: string, ev: MouseEvent) {
        ev.stopPropagation();
        this.book.emit(action);
    }

    renderButtonFooter(): JSX.Element {
        return (
            <div class="mission-footer">
                {(!this.mission.status) ? <yoo-button onClick={(ev) => this.onBook('start', ev)} text={services.translate.get('START')} class="large gradient-success"></yoo-button> : null}
                {(this.mission.status === 'booked') ? <yoo-button onClick={(ev) => this.onBook('unbook', ev)} text={services.translate.get('UNBOOK')} class="mission-button-leave"></yoo-button> : null}
                {(this.mission.status === 'booked') ? <yoo-button onClick={(ev) => this.onBook('start', ev)} text={services.translate.get('CONTINUE')} class="gradient-success"></yoo-button> : null}
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
                        <yoo-mission-heading mission={this.mission}></yoo-mission-heading>
                        <ul class="mission-menu">
                            {(this.mission.priority ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-priority"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{services.translate.get('PRIORITY')}</div>
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
                                        <div class="mission-menu-title">{services.translate.get('MISSIONDESCRIPTION')}</div>
                                        <div class="mission-menu-content">{description.text}</div>
                                    </div>
                                </li>
                                : null)}
                            <yoo-mission-contents slidesNumber={this.slidesNumber} photosNumber={this.photosNumber} questionsNumber={this.questionsNumber}></yoo-mission-contents>
                            {((location.contactname || location.contactphone || this.mission.address) ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-contact"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{services.translate.get('CONTACT')}</div>
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
                                        <div class="mission-menu-title">{services.translate.get('NOTES')}</div>
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
                                        <div class="mission-menu-title">{services.translate.get('INFO')}</div>
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
                                        <div class="mission-menu-title">{services.translate.get('COMMENTS')}</div>
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
                                        <div class="mission-menu-title">{services.translate.get('PRICE')}</div>
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
                                        <div class="mission-menu-title">{services.translate.get('REQUESTOR')}</div>
                                        {((creator.firstName || creator.lastName) ?
                                            <div class="mission-menu-content mission-menu-requestor">
                                                {(creator.imageData ? <yoo-avatar class="xsmall" img-src={creator.imageData}></yoo-avatar> : null)}
                                                {creator.firstName} {creator.lastName}
                                            </div>
                                            : null)}
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
                                        <div class="mission-menu-title">{services.translate.get('MISSIONDURATION')}</div>
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
                                        <div class="mission-menu-title">{services.translate.get('CREATIONDATE')}</div>
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
                                        <div class="mission-menu-title">{services.translate.get('VISIBILITY')}</div>
                                        <div class="mission-menu-content">{pipes.dateFormat.transform(this.mission.validFrom, 'L LT')} - {pipes.dateFormat.transform(this.mission.validUntil, 'L LT')}</div>
                                    </div>
                                </li>
                                : null)}
                            {/* {(this.mission.bookedUntil ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-plus"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{services.translate.get('CALENDAR')}</div>
                                        <div class="mission-menu-content">{pipes.dateFormat.transform(this.mission.bookedUntil, 'L LT')}</div>
                                    </div>
                                </li>
                                : null)} */}
                            {(this.mission.serviceData ?
                                <li class="mission-menu-item">
                                    <div class="mission-menu-left">
                                        <span class="mission-menu-icon"><i class="yo-plus"></i></span>
                                        <div class="border"></div>
                                    </div>
                                    <div class="mission-menu-right">
                                        <div class="mission-menu-title">{services.translate.get('DETAILS')}</div>
                                        <div class="mission-menu-content">{this.mission.serviceData}</div>
                                    </div>
                                </li>
                                : null)}
                        </ul>
                    </div>
                </yoo-slim-scroll>
                {((this.mission.status !== 'finished') ? this.renderButtonFooter() : null)}
            </div>
            : null
        );
    }
}
