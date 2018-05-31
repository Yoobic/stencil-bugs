import { Component, Element, State, Method, Listen, Event, EventEmitter, Prop } from '@stencil/core';
import { IModalEntry, IAlertEntry, IActionSheet, ILanguageSelector } from '@shared/interfaces';
import { setAnimation } from '../../../utils/anim';

@Component({
    tag: 'yoo-modal-controller',
    styleUrl: 'modal-controller.scss',
    scoped: true
})
export class YooModalControllerComponent {

    @Prop() greyContent: boolean = true;

    @State() element: HTMLElement = document.createElement('yoo-modal');
    @State() isGreyedOut: boolean = false;
    @State() displayedAlert: number = 0;

    @Event() modalCtrlPrimaryButtonClicked: EventEmitter<boolean>;

     @Element() host: HTMLStencilElement;

    @Listen('closed')
    childClosed() {
        this.host.classList.add('out');
        // setTimeout(() => {this.isGreyedOut = false; }, 300);
        this.closeModal(true);
    }

    @Listen('actionSheetClosed')
    childActionClosed() {
        this.host.classList.add('out');
        // setTimeout(() => {this.isGreyedOut = false; }, 300);
        this.closeModal(true);
    }

    // Event transmission
    @Listen('modalPrimaryButtonClicked')
    primaryClick() {
        this.host.classList.add('out');
        this.modalCtrlPrimaryButtonClicked.emit(true); //event transmission
        //console.log('Primary Button Click on modal transmitted by modal Controller');
        this.closeModal(true);
    }

    @Listen('alertClosed')
    onAlertClosed(event: CustomEvent) {
        this.closeAlert(event.srcElement);
    }

    @Method()
    show() {
        this.isGreyedOut = true;
        this.host.setAttribute('style', 'z-index: 2000 !important;');
        const backDrop = this.host.querySelector('div');
        setAnimation('background_fade', backDrop, {open: true});
        this.host.querySelector('div').insertAdjacentElement('afterend', this.element);
    }

    @Method()
    showActionSheet() {
        this.isGreyedOut = true;
        this.host.setAttribute('style', 'z-index: 2000 !important; align-items: flex-end;');
        const backDrop = this.host.querySelector('div');
        setAnimation('background_fade', backDrop, {open: true});
        this.host.querySelector('div').insertAdjacentElement('afterend', this.element);
    }

    @Method()
    showAlert() {
        //this.show();
        this.host.querySelector('div.alert-container').appendChild(this.element);
        //this.isGreyedOut = false;
        this.displayedAlert = Math.max(0, this.displayedAlert - 1);
    }

    @Method()
    closeModal(sentFromModal: boolean) {
        const modal = this.host.querySelector('yoo-modal');
        const actionSheet = this.host.querySelector('yoo-action-sheet');
        const languageSelector = this.host.querySelector('yoo-language-selector');
        const backDrop = this.host.querySelector('div');
        setAnimation('background_fade', backDrop, {open: false});
        if (sentFromModal === false) {
            if (modal.animationName === 'sticky_up') {
                const padding = 16;
                const modalHeight = modal.clientHeight;
                setAnimation('sticky_up', modal, {open: false, distance: (((window.innerHeight / 2) + padding) - (modalHeight / 2)), modalHeight: modalHeight});
            } else {
                setAnimation(actionSheet ? 'slide_down' : (languageSelector ? 'fade' : modal.animationName), actionSheet ? actionSheet : (languageSelector ? languageSelector : modal), {open: false, up: false});
            }
        }
        setTimeout(() => {
            this.host.setAttribute('style', 'z-index: -1 !important;');
            modal.remove();
            if (actionSheet) { actionSheet.remove(); }
            if (languageSelector) { languageSelector.remove(); }
            this.isGreyedOut = false;
        }, 200);
    }

    @Method()
    closeAlert(alert) {
        if (alert) {
            setAnimation(alert.animationName, alert, {open: false});
            setTimeout(() => {
                alert.remove();
            }, 200);
        }
    }

    @Method()
    closeActionSheet() {
        let actionSheet = this.host.querySelector('yoo-action-sheet');
        if (actionSheet) {
            actionSheet.remove();
        }
    }

    @Method()
    populateModal(modal: HTMLElement) {
        this.element = modal;
    }

    @Method()
    generateModal(props: IModalEntry) {
        let m = document.createElement('yoo-modal');
        // m = setModalProps(m, props);
        m = Object.assign(m, props);
        m.className += props.cssClass;
        this.element = m;
    }

    @Method()
    generateAlert(props: IAlertEntry) {
        let newAlert = document.createElement('yoo-alert');
        // newAlert = setAlertProps(newAlert, props);
        newAlert = Object.assign(newAlert, props);
        newAlert.className += props.cssClass;
        this.element = newAlert;
    }

    @Method()
    generateActionSheet(props: IActionSheet) {
        let newActionSheet = document.createElement('yoo-action-sheet');
        newActionSheet = Object.assign(newActionSheet, props);
        newActionSheet.className += props.cssClass;
        this.element = newActionSheet;
    }

    @Method()
    generateLanguageSelector(props: ILanguageSelector) {
        let newLanguageSelector = document.createElement('yoo-language-selector');
        newLanguageSelector = Object.assign(newLanguageSelector, props);
        this.element = newLanguageSelector;
    }

    @Method()
    confirm(customController: boolean = false, cssClass = 'accent') {
        const content: HTMLElement = document.createElement('div');
        content.innerHTML = 'Please confirm the previous action';
        const confirmModalProps: IModalEntry = {
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

    render(): JSX.Element {
        return (
            [<div onClick={() => this.closeModal(false)} class={this.greyContent ? (this.isGreyedOut ? 'placeholder' : '') : 'transparent'}>
            </div>,
            <div class="alert-container">
            </div>]
        );

    }
}
