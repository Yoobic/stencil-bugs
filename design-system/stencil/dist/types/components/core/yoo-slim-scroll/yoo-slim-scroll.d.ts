import { EventEmitter } from '@stencil/core';
export declare class YooSlimScrollComponent {
    height: string;
    width: string;
    showScrollbar: boolean;
    scrollStart: EventEmitter<boolean>;
    scrollEnd: EventEmitter<boolean>;
    atBottom: EventEmitter<boolean>;
    atLeft: EventEmitter<boolean>;
    horizontal: boolean;
    iScroll: any;
    host: HTMLElement;
    scrollStateUpdater(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    initIScroll(): void;
    isAtLeft(): void;
    isAtBottom(): void;
    getIScrollConfig(): any;
    refresh(): void;
    disable(): void;
    enable(): void;
    scrollToTop(duration?: number): void;
    scrollToElement(el: HTMLElement, duration?: number): void;
    scrollToBottom(duration?: number): void;
    getStyleContainer(): any;
    render(): JSX.Element;
}
