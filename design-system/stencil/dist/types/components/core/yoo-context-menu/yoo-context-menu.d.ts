import { EventEmitter } from '@stencil/core';
import { IContextMenuEntry } from '@shared/interfaces';
export declare class YooContextMenuComponent {
    items: Array<IContextMenuEntry>;
    context: any;
    contextMenuOpened: EventEmitter<boolean>;
    contextMenuClosed: EventEmitter<boolean>;
    opened: boolean;
    host: HTMLElement;
    open(): void;
    close(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    setupListener(): void;
    calculateDropdownOpenDirection(): void;
    toggle(): void;
    toggleWindow(): void;
    onItemClick(item: IContextMenuEntry, index: number): void;
    render(): JSX.Element;
}
