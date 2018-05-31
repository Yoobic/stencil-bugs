import { EventEmitter } from '@stencil/core';
export declare class YooTagComponent {
    text: string;
    closable: boolean;
    icon: string;
    tagClosed: EventEmitter<boolean>;
    closed: boolean;
    _host: HTMLElement;
    onClose(): void;
    render(): JSX.Element;
}
