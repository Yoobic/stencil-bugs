import { EventEmitter } from '@stencil/core';
export declare class YooCheckboxComponent {
    text: string;
    state: string;
    disabled: boolean;
    isIndeterminate: boolean;
    checkboxToggled: EventEmitter<string>;
    _host: HTMLElement;
    onCheckboxClick(): void;
    getNextState(): void;
    render(): JSX.Element;
}
