import { setAnimation } from '../../../utils/anim';
export class YooModalControllerComponent {
    constructor() {
        this.element = document.createElement('yoo-modal');
        this.isGreyedOut = false;
        this.displayedAlert = 0;
    }
    childClosed() {
        this.host.classList.add('out');
        // setTimeout(() => {this.isGreyedOut = false; }, 300);
        this.closeModal(true);
    }
    childActionClosed() {
        this.host.classList.add('out');
        // setTimeout(() => {this.isGreyedOut = false; }, 300);
        this.closeModal(true);
    }
    // Event transmission
    primaryClick() {
        this.host.classList.add('out');
        this.modalCtrlPrimaryButtonClicked.emit(true); //event transmission
        //console.log('Primary Button Click on modal transmitted by modal Controller');
        this.closeModal(true);
    }
    onAlertClosed(event) {
        this.closeAlert(event.srcElement);
    }
    show() {
        this.isGreyedOut = true;
        const backDrop = this.host.querySelector('div');
        setAnimation('background_fade', backDrop, { open: true });
        this.host.querySelector('div').insertAdjacentElement('afterend', this.element);
    }
    showAlert() {
        //this.show();
        this.host.querySelector('div.alert-container').appendChild(this.element);
        //this.isGreyedOut = false;
        this.displayedAlert = Math.max(0, this.displayedAlert - 1);
    }
    closeModal(sentFromModal) {
        const modal = this.host.querySelector('yoo-modal');
        const actionSheet = this.host.querySelector('.action-sheet');
        const backDrop = this.host.querySelector('div');
        setAnimation('background_fade', backDrop, { open: false });
        if (sentFromModal === false) {
            if (modal.animationName === 'sticky_up') {
                const padding = 16;
                const modalHeight = modal.clientHeight;
                setAnimation('sticky_up', modal, { open: false, distance: (((window.innerHeight / 2) + padding) - (modalHeight / 2)), modalHeight: modalHeight });
            }
            else {
                setAnimation(actionSheet ? 'slide_down' : modal.animationName, modal, { open: false, up: false });
            }
        }
        setTimeout(() => {
            modal.remove();
            this.isGreyedOut = false;
        }, 200);
    }
    closeAlert(alert) {
        if (alert) {
            setAnimation(alert.animationName, alert, { open: false });
            setTimeout(() => {
                alert.remove();
            }, 200);
        }
    }
    closeActionSheet() {
        let actionSheet = this.host.querySelector('yoo-action-sheet');
        if (actionSheet) {
            actionSheet.remove();
        }
    }
    populateModal(modal) {
        this.element = modal;
    }
    generateModal(props) {
        let m = document.createElement('yoo-modal');
        // m = setModalProps(m, props);
        m = Object.assign(m, props);
        m.className += props.cssClass;
        this.element = m;
    }
    generateAlert(props) {
        let newAlert = document.createElement('yoo-alert');
        // newAlert = setAlertProps(newAlert, props);
        newAlert = Object.assign(newAlert, props);
        newAlert.className += props.cssClass;
        this.element = newAlert;
    }
    generateActionSheet(props) {
        let newActionSheet = document.createElement('yoo-action-sheet');
        newActionSheet = Object.assign(newActionSheet, props);
        this.element = newActionSheet;
    }
    confirm(customController = false, cssClass = 'accent') {
        const content = document.createElement('div');
        content.innerHTML = 'Please confirm the previous action';
        const confirmModalProps = {
            heading: 'Action Required',
            headingIcon: null,
            hasHeader: true,
            hasFooter: true,
            footerText: null,
            content: content,
            primaryButtonText: 'Confirm',
            secondaryButtonText: 'Cancel',
            cssClass: cssClass,
            animationName: 'fade_in_scale',
            withYooCtrl: customController
        };
        this.generateModal(confirmModalProps);
    }
    render() {
        return ([h("div", { onClick: () => this.closeModal(false), class: this.isGreyedOut ? 'placeholder' : '' }),
            h("div", { class: "alert-container" })]);
    }
    static get is() { return "yoo-modal-controller"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "closeActionSheet": { "method": true }, "closeAlert": { "method": true }, "closeModal": { "method": true }, "confirm": { "method": true }, "displayedAlert": { "state": true }, "element": { "state": true }, "generateActionSheet": { "method": true }, "generateAlert": { "method": true }, "generateModal": { "method": true }, "host": { "elementRef": true }, "isGreyedOut": { "state": true }, "populateModal": { "method": true }, "show": { "method": true }, "showAlert": { "method": true } }; }
    static get events() { return [{ "name": "modalCtrlPrimaryButtonClicked", "method": "modalCtrlPrimaryButtonClicked", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get listeners() { return [{ "name": "closed", "method": "childClosed" }, { "name": "actionSheetClosed", "method": "childActionClosed" }, { "name": "modalPrimaryButtonClicked", "method": "primaryClick" }, { "name": "alertClosed", "method": "onAlertClosed" }]; }
    static get style() { return "/**style-placeholder:yoo-modal-controller:**/"; }
}
