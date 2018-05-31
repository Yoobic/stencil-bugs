/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { i as resizeWindow } from './chunk-75914b41.js';
import { a as pipes } from './chunk-7a5da8d2.js';
import './chunk-a7525511.js';
import './chunk-cdfb4b5d.js';
import './chunk-b8bd1aac.js';
import './chunk-e9552ef3.js';

class YooMissionDetailComponent {
    constructor() {
        this.translate = window.translateService;
        this.newStatus = 'NEW';
        this.bookedStatus = 'BOOKED';
        this.pendingStatus = 'PENDING';
    }
    resize() {
        let slim = this.host.querySelector('yoo-slim-scroll');
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
        }
        else {
            maxHeight = this.decreaseMaxHeight(maxHeight, 'ion-header', document);
            maxHeight = this.decreaseMaxHeight(maxHeight, 'ion-footer', document);
        }
        maxHeight = this.decreaseMaxHeight(maxHeight, '.mission-footer', this.host);
        return { height: maxHeight + 'px' };
    }
    decreaseMaxHeight(maxHeight, name, html) {
        let comp = html.querySelector(name);
        if (comp) {
            maxHeight -= comp.clientHeight;
        }
        return maxHeight;
    }
    onBook(action) {
        this.book.emit(action);
    }
    renderButtonFooter() {
        return (h("div", { class: "mission-footer" },
            (this.badgeText === this.newStatus) ? h("yoo-button", { onClick: () => this.onBook('start'), text: this.translate.get('START'), class: "large gradient-success" }) : null,
            (this.badgeText === this.bookedStatus) ? h("yoo-button", { onClick: () => this.onBook('unbook'), text: this.translate.get('UNBOOK'), class: "mission-button-leave" }) : null,
            (this.badgeText === this.bookedStatus) ? h("yoo-button", { onClick: () => this.onBook('start'), text: this.translate.get('CONTINUE'), class: "gradient-success" }) : null));
    }
    render() {
        let description = {}, location = {}, creator = {};
        if (this.mission) {
            description = this.mission.description;
            location = this.mission.location;
            creator = this.mission.creator;
        }
        return (this.mission ?
            h("div", { class: "mission-detail" },
                h("yoo-slim-scroll", { height: this.scrollHeight },
                    h("div", { class: "mission-content" },
                        (this.badgeText ? h("yoo-badge", { text: this.translate.get(this.badgeText || ''), class: 'round small ' + this.badgeClass }) : null),
                        (this.mission.title ? h("div", { class: "mission-title" }, this.translate.polyglot(this.mission.title)) : null),
                        (this.mission.duedate ?
                            h("div", { class: "mission-date" },
                                this.translate.get('DUEDATE'),
                                ": ",
                                pipes.dateFormat.transform(this.mission.duedate, 'L LT'))
                            :
                                (this.mission.validatedDate ? h("div", { class: "mission-date" },
                                    this.translate.get('VALIDATEDDATE'),
                                    ": ",
                                    this.mission.validatedDate) : null)),
                        (this.progressClass ? h("div", { class: "mission-progress" },
                            h("yoo-progress-bar", { progress: (this.mission.progress ? this.mission.progress.value : 0), class: 'xsmall ' + this.progressClass })) : null),
                        h("ul", { class: "mission-menu" },
                            (this.mission.priority ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-priority" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('PRIORITY')),
                                        h("div", { class: "mission-menu-content" },
                                            "P",
                                            this.mission.priority)))
                                : null),
                            (description.text ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-description" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('MISSIONDESCRIPTION')),
                                        h("div", { class: "mission-menu-content" }, description.text)))
                                : null),
                            ((this.slidesNumber || this.photosNumber || this.questionsNumber) ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-attachment" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('QUESTIONS')),
                                        h("div", { class: "mission-menu-content" },
                                            (this.slidesNumber ?
                                                h("span", null,
                                                    h("i", { class: "yo-pages" }),
                                                    " ",
                                                    this.slidesNumber,
                                                    " ",
                                                    this.translate.get('PAGES')) : null),
                                            (this.photosNumber ?
                                                h("span", null,
                                                    h("i", { class: "yo-gallery" }),
                                                    " ",
                                                    this.photosNumber,
                                                    " ",
                                                    this.translate.get('PHOTOS')) : null),
                                            (this.questionsNumber ?
                                                h("span", null,
                                                    h("i", { class: "yo-questions" }),
                                                    " ",
                                                    this.questionsNumber,
                                                    " ",
                                                    this.translate.get('QUESTIONS')) : null))))
                                : null),
                            ((location.contactname || location.contactphone || this.mission.address) ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-contact" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('CONTACT')),
                                        h("div", { class: "mission-menu-content" },
                                            (location ? h("div", { class: "mission-menu-content-contact" }, location.contactname) : null),
                                            (this.mission.address ? h("div", { class: "mission-menu-content-contact" }, this.mission.address) : null),
                                            (location ? h("div", { class: "mission-menu-content-contact" }, location.contactphone) : null))))
                                : null),
                            (this.mission.comments ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-note" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('NOTES')),
                                        h("div", { class: "mission-menu-content" }, this.mission.comments)))
                                : null),
                            (location.info ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-info" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('INFO')),
                                        h("div", { class: "mission-menu-content" }, location.info)))
                                : null),
                            (this.mission.originalUnvalidatedReason ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-comment" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('COMMENTS')),
                                        h("div", { class: "mission-menu-content" }, this.mission.originalUnvalidatedReason)))
                                : null),
                            (this.mission.price ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-plus" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('PRICE')),
                                        h("div", { class: "mission-menu-content" }, this.mission.price)))
                                : null),
                            (creator && (creator.email || creator.firstName || creator.lastName) ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-plus" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('REQUESTOR')),
                                        ((creator.firstName || creator.lastName) ? h("div", { class: "mission-menu-content" },
                                            creator.firstName,
                                            " ",
                                            creator.lastName) : null),
                                        (creator.email ? h("div", { class: "mission-menu-content" }, creator.email) : null)))
                                : null),
                            ((this.mission.duration) ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-plus" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('MISSIONDURATION')),
                                        h("div", { class: "mission-menu-content" },
                                            this.mission.duration,
                                            " min")))
                                : null),
                            ((this.mission._ect) ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-plus" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('CREATIONDATE')),
                                        h("div", { class: "mission-menu-content" }, pipes.dateFormat.transform(this.mission._ect, 'L LT'))))
                                : null),
                            ((this.mission.validFrom || this.mission.validUntil) ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-plus" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('VISIBILITY')),
                                        h("div", { class: "mission-menu-content" },
                                            pipes.dateFormat.transform(this.mission.validFrom, 'L LT'),
                                            " - ",
                                            pipes.dateFormat.transform(this.mission.validUntil, 'L LT'))))
                                : null),
                            (this.mission.bookedUntil ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-plus" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('CALENDAR')),
                                        h("div", { class: "mission-menu-content" }, pipes.dateFormat.transform(this.mission.bookedUntil, 'L LT'))))
                                : null),
                            (this.mission.serviceData ?
                                h("li", { class: "mission-menu-item" },
                                    h("div", { class: "mission-menu-left" },
                                        h("span", { class: "mission-menu-icon" },
                                            h("i", { class: "yo-plus" })),
                                        h("div", { class: "border" })),
                                    h("div", { class: "mission-menu-right" },
                                        h("div", { class: "mission-menu-title" }, this.translate.get('DETAILS')),
                                        h("div", { class: "mission-menu-content" }, this.mission.serviceData)))
                                : null)))),
                ((this.badgeText === this.newStatus || this.badgeText === this.bookedStatus) ? this.renderButtonFooter() : null))
            : null);
    }
    static get is() { return "yoo-mission-detail"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "mission": {
            "type": "Any",
            "attr": "mission"
        },
        "photosNumber": {
            "type": Number,
            "attr": "photos-number"
        },
        "questionsNumber": {
            "type": Number,
            "attr": "questions-number"
        },
        "resize": {
            "method": true
        },
        "scrollHeight": {
            "state": true
        },
        "slidesNumber": {
            "type": Number,
            "attr": "slides-number"
        }
    }; }
    static get events() { return [{
            "name": "book",
            "method": "book",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  height: 100%;\n  font-size: 0.9375rem;\n  font-weight: 400; }\n  :host .mission-detail {\n    height: 100%; }\n    :host .mission-detail .mission-content {\n      padding: 1rem; }\n      :host .mission-detail .mission-content .mission-title {\n        font-weight: 600;\n        font-size: 1.6875rem;\n        line-height: 2.0625rem;\n        margin-top: 0.3125rem;\n        margin-bottom: 0.3125rem; }\n      :host .mission-detail .mission-content .mission-date {\n        line-height: 1.125rem;\n        font-weight: 300;\n        color: #807f83; }\n      :host .mission-detail .mission-content .mission-progress {\n        margin-top: 0.3125rem; }\n      :host .mission-detail .mission-content .mission-menu {\n        list-style: none;\n        padding: 0;\n        margin-top: 1.875rem; }\n        :host .mission-detail .mission-content .mission-menu .mission-menu-item {\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-orient: horizontal;\n          -webkit-box-direction: normal;\n          -webkit-flex-direction: row;\n          -ms-flex-direction: row;\n          flex-direction: row; }\n          :host .mission-detail .mission-content .mission-menu .mission-menu-item .mission-menu-left {\n            display: -webkit-box;\n            display: -webkit-flex;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-orient: vertical;\n            -webkit-box-direction: normal;\n            -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n            flex-direction: column;\n            -webkit-box-align: center;\n            -webkit-align-items: center;\n            -ms-flex-align: center;\n            align-items: center; }\n            :host .mission-detail .mission-content .mission-menu .mission-menu-item .mission-menu-left .mission-menu-icon {\n              height: 1.875rem;\n              width: 1.875rem; }\n              :host .mission-detail .mission-content .mission-menu .mission-menu-item .mission-menu-left .mission-menu-icon i {\n                font-size: 1.0625rem;\n                display: -webkit-box;\n                display: -webkit-flex;\n                display: -ms-flexbox;\n                display: flex;\n                -webkit-box-pack: center;\n                -webkit-justify-content: center;\n                -ms-flex-pack: center;\n                justify-content: center;\n                background-color: var(--light, #FFFFFF);\n                border: solid 0.03125rem #d0d0d0;\n                border-radius: 50%;\n                padding: 0.34375rem; }\n            :host .mission-detail .mission-content .mission-menu .mission-menu-item .mission-menu-left .border {\n              width: 1px;\n              height: 100%;\n              border: solid 0.03125rem #d0d0d0; }\n          :host .mission-detail .mission-content .mission-menu .mission-menu-item .mission-menu-right {\n            margin-left: 0.625rem; }\n            :host .mission-detail .mission-content .mission-menu .mission-menu-item .mission-menu-right .mission-menu-title {\n              font-weight: 600;\n              line-height: 1.125rem;\n              margin-top: 0.375rem;\n              margin-bottom: 0.375rem; }\n            :host .mission-detail .mission-content .mission-menu .mission-menu-item .mission-menu-right .mission-menu-content {\n              margin-top: 0.25rem;\n              margin-bottom: 1.25rem; }\n              :host .mission-detail .mission-content .mission-menu .mission-menu-item .mission-menu-right .mission-menu-content span {\n                margin-right: 1.25rem; }\n              :host .mission-detail .mission-content .mission-menu .mission-menu-item .mission-menu-right .mission-menu-content .mission-menu-content-contact {\n                margin-bottom: 0.625rem; }\n        :host .mission-detail .mission-content .mission-menu .mission-menu-item:last-child .mission-menu-left .border {\n          display: none; }\n    :host .mission-detail .mission-footer {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n      -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n      justify-content: space-around;\n      padding-top: 1.25rem;\n      padding-bottom: 1.4rem;\n      -webkit-box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);\n      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3); }"; }
}

export { YooMissionDetailComponent as YooMissionDetail };
