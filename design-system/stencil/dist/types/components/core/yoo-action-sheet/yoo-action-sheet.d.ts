import { EventEmitter } from '@stencil/core';
import { IActionSheetButton } from '@shared/interfaces';
export declare class YooActionSheetComponent {
    heading: string;
    buttons: IActionSheetButton[];
    actionSelected: EventEmitter<string>;
    actionSheetClosed: EventEmitter<boolean>;
    host: HTMLElement;
    closeActionSheet(): void;
    onButtonClick(heading: string, disabled: boolean): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
