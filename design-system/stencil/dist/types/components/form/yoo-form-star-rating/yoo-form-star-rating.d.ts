import { EventEmitter } from '@stencil/core';
export declare class YooFormStarRatingComponent {
    stars: number;
    current: number;
    changed: EventEmitter<number>;
    host: HTMLElement;
    getArray(): Array<number>;
    onStarClick(index: number): void;
    render(): JSX.Element;
}
