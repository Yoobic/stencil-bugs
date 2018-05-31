import { EventEmitter } from '@stencil/core';
export declare class YooAlertComponent {
    text: string;
    heading: string;
    icon: string;
    closeable: boolean;
    animationName: string;
    alertClosed: EventEmitter<boolean>;
    alertActionSelected: EventEmitter<boolean>;
    closed: boolean;
    host: HTMLElement;
    componentDidLoad(): void;
    onActionTextClick(): void;
    onDismissButtonClick(): void;
    render(): JSX.Element;
}
