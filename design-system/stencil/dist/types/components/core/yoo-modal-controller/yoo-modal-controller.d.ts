import { EventEmitter } from '@stencil/core';
import { IModalEntry, IAlertEntry, IActionSheet } from '@shared/interfaces';
export declare class YooModalControllerComponent {
    element: HTMLElement;
    isGreyedOut: boolean;
    displayedAlert: number;
    modalCtrlPrimaryButtonClicked: EventEmitter<boolean>;
    host: HTMLElement;
    childClosed(): void;
    childActionClosed(): void;
    primaryClick(): void;
    onAlertClosed(event: CustomEvent): void;
    show(): void;
    showAlert(): void;
    closeModal(sentFromModal: boolean): void;
    closeAlert(alert: any): void;
    closeActionSheet(): void;
    populateModal(modal: HTMLElement): void;
    generateModal(props: IModalEntry): void;
    generateAlert(props: IAlertEntry): void;
    generateActionSheet(props: IActionSheet): void;
    confirm(customController?: boolean, cssClass?: string): void;
    render(): JSX.Element;
}
