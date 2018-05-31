import { EventEmitter } from '@stencil/core';
export declare class YooButtonComponent {
    text: string;
    disabled: boolean;
    isLoading: boolean;
    icon: string;
    buttonClicked: EventEmitter<boolean>;
    host: HTMLElement;
    click(): void;
    renderLoadingContainer(): JSX.Element;
    renderButtonContent(): JSX.Element;
    render(): JSX.Element;
}
