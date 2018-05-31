import { getBackImageStyle, cloudinary, resizeObserve, debounce } from '../../../utils/helpers'; //intersectionObserve
const MAX_AVATAR_DISPLAY = 4;
export class YooCardComponent {
    constructor() {
        this.imgSrc = '../../assets/empty-states/empty.svg';
        this.avatarImgs = [];
        this.isActivable = false;
        this.isUserCard = false;
        this.avatarShape = 'rectangle';
        this.hasMenu = false;
        this.type = 'standard';
        this.isActive = false;
        this.imageWidth = 340;
        this.imageHeight = 160;
    }
    //private intersectionObserver: IntersectionObserver;
    componentWillLoad() {
        if (this.type === 'list') {
            this.host.classList.add('list-mode');
        }
        this.horizontal = this.host.classList.contains('horizontal') || this.host.classList.contains('list-mode');
    }
    componentDidLoad() {
        let image = this.host.querySelector('.image');
        this.resizeObserver = resizeObserve(image, (target, width, height, left, top, entry) => {
            debounce(this.onImageResize.bind(this), 1000)(target, width, height, left, top, entry);
        });
        //let container = this.host.querySelector('.outer-container');
        // this.intersectionObserver = intersectionObserve(this.host, (entries, observer) => {
        //     entries.forEach(entry => {
        //         if (entry.intersectionRatio > 0) {
        //             //entry.target.classList.add('in-view');
        //            this.animationName ? setAnimation(this.animationName, [container], {open: true}) : setAnimation(animations.slideInStaggered, [container]);
        //         } else {
        //             //entry.target.classList.add('in-view');
        //             this.animationName ? setAnimation(this.animationName, [container], {open: false}) : setAnimation(animations.fade, [container], {open: false});
        //         }
        //     });
        // }, {
        //     rootMargin: '30px',
        //     threshold: [0, 0.25, 0.75, 1]
        // });
        // this.intersectionObserver.observe(this.host);
    }
    componentDidUnload() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        // if (this.intersectionObserver) {
        //     this.intersectionObserver.disconnect();
        // }
    }
    onCheckboxToggled(event) {
        event.detail === 'checked' ? this.isActive = true : this.isActive = false;
        this.active.emit(this.isActive);
    }
    onActionButtonClick() {
        this.onActionPress.emit(true);
    }
    renderAvatarShape() {
        if (this.avatarShape === 'rectangle') {
            return (h("div", { class: "image", style: getBackImageStyle(cloudinary(this.imgSrc, this.imageWidth, this.imageHeight)) }));
        }
        else if (this.avatarShape === 'circle') {
            return (h("yoo-avatar", { class: "large", "img-src": this.imgSrc }));
        }
    }
    onImageResize(target, width, height, left, top, entry) {
        this.imageWidth = width;
        this.imageHeight = height;
    }
    renderImageContainerContent() {
        return ([this.topLeftBadge ? (h("div", { class: 'top-left' + (this.isActivable ? ' active' : '') },
                h("yoo-tag", { text: this.topLeftBadge, class: this.host.className }))) : null,
            this.topRightBadge ? (h("div", { class: "top-right" },
                h("yoo-tag", { text: this.topRightBadge, class: this.host.className }))) : null,
            this.bottomLeftBadge ? (h("div", { class: "bottom-left" },
                h("yoo-tag", { text: this.bottomLeftBadge, class: this.host.className }))) : null,
            this.bottomRightBadge ? (h("div", { class: "bottom-right" },
                h("yoo-tag", { text: this.bottomRightBadge, class: this.host.className }))) : null,
            this.renderAvatarShape(),
            this.isActivable ?
                h("yoo-checkbox", { class: this.host.className, onCheckboxToggled: (event) => this.onCheckboxToggled(event) })
                : null]);
    }
    renderHeadingContainerContent() {
        return ([h("div", { class: "heading-container", "attr-layout": "row" },
                this.heading ? h("span", { class: "card-heading" }, this.heading) : null,
                this.date ? h("span", { class: "date-card" }, this.date) : null,
                this.hasMenu ?
                    h("yoo-context-menu", null,
                        h("div", { slot: "trigger" },
                            h("span", { class: "menu-icon" },
                                h("i", { class: "yo-more-v" }))),
                        h("div", { class: "context-container" },
                            h("slot", { name: "menu-slot" })))
                    : null),
            (this.subheadings ? this.subheadings.map((item) => h("div", { class: "subheading-container", innerHTML: item })) : null),
            (this.tags ?
                h("div", { class: "tags-container" }, this.tags.map((item) => h("yoo-tag", { class: "round outline dark", icon: item.icon, text: item.text, closable: item.closable })))
                : null)
        ]);
    }
    renderBottomContent() {
        return ([h("div", { class: "avatar-container", "attr-layout": "row" }, this.avatarImgs.map((avatarSrc, index) => {
                if (index < MAX_AVATAR_DISPLAY) {
                    return (h("yoo-avatar", { class: "medium", "img-src": avatarSrc }));
                }
            })),
            this.actionButtonTitle ?
                h("div", { class: "action-button-container", "attr-layout": "row" },
                    h("yoo-button", { text: this.actionButtonTitle, class: this.host.className, onClick: () => this.onActionButtonClick() })) : null]);
    }
    render() {
        return (this.horizontal ? (h("div", { class: 'outer-container ' + ((this.isActive) ? 'active' : ''), "attr-layout": "row" },
            h("div", { class: "image-container", "attr-layout": "row" }, this.renderImageContainerContent()),
            h("div", { class: "status-container" }),
            h("div", { class: 'content-container ' + (this.heading === undefined && this.subheadings === undefined ? 'center' : ''), "attr-layout": "column" },
                h("div", { class: "top-container" }, this.renderHeadingContainerContent()),
                h("div", { class: "slot-container", "attr-layout": "row" },
                    h("slot", { name: "content-slot" }),
                    h("div", { class: "inner-container", "attr-layout": "column" }, this.renderBottomContent()))))) :
            (h("div", { class: 'outer-container' + ((this.isActive) ? ' active' : '') },
                h("div", { class: "image-container", "attr-layout": "columns" }, this.renderImageContainerContent()),
                h("div", { class: "status-container" }),
                h("div", { class: "content-container" },
                    this.renderHeadingContainerContent(),
                    h("div", { class: "slot-container", "attr-layout": "row" },
                        h("slot", { name: "content-slot" })),
                    this.renderBottomContent()))));
    }
    static get is() { return "yoo-card"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "actionButtonTitle": { "type": String, "attr": "action-button-title" }, "animationName": { "type": String, "attr": "animation-name" }, "avatarImgs": { "type": "Any", "attr": "avatar-imgs" }, "avatarShape": { "type": String, "attr": "avatar-shape" }, "bottomLeftBadge": { "type": String, "attr": "bottom-left-badge" }, "bottomRightBadge": { "type": String, "attr": "bottom-right-badge" }, "date": { "type": String, "attr": "date" }, "hasMenu": { "type": Boolean, "attr": "has-menu" }, "heading": { "type": String, "attr": "heading" }, "horizontal": { "state": true }, "host": { "elementRef": true }, "imageHeight": { "state": true }, "imageWidth": { "state": true }, "imgSrc": { "type": String, "attr": "img-src" }, "isActivable": { "type": Boolean, "attr": "is-activable" }, "isActive": { "state": true }, "isUserCard": { "type": Boolean, "attr": "is-user-card" }, "subheadings": { "type": "Any", "attr": "subheadings" }, "tags": { "type": "Any", "attr": "tags" }, "topLeftBadge": { "type": String, "attr": "top-left-badge" }, "topRightBadge": { "type": String, "attr": "top-right-badge" }, "type": { "type": String, "attr": "type" } }; }
    static get events() { return [{ "name": "active", "method": "active", "bubbles": true, "cancelable": true, "composed": true }, { "name": "onActionPress", "method": "onActionPress", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-card:**/"; }
}
