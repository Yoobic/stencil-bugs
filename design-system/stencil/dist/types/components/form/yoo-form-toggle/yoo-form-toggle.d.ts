import { EventEmitter } from '@stencil/core';
export declare class YooFormToggleComponent {
    toggled: EventEmitter<boolean>;
    isToggled: boolean;
    host: HTMLElement;
    onToggle(): void;
    render(): JSX.Element;
}
