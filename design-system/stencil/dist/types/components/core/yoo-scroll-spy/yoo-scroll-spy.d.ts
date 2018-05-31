import { EventEmitter } from '@stencil/core';
export declare class YooScrollSpyComponent {
    repeat: boolean;
    enterInView: EventEmitter<boolean>;
    outOfView: EventEmitter<boolean>;
    isInView: boolean;
    enterEmitted: boolean;
    outEmitted: boolean;
    parentScroll: any;
    host: HTMLElement;
    bodyScrollListener(): void;
    componentDidLoad(): void;
    onScroll(): void;
    isElementInViewport(): boolean;
    render(): JSX.Element;
}
