import { EventEmitter } from '@stencil/core';
export declare class YooRadioComponent {
    text: string;
    state: string;
    disabled: boolean;
    radioClicked: EventEmitter;
    _host: HTMLElement;
    onRadioCheck(): void;
    render(): JSX.Element;
}
