import { EventEmitter } from '@stencil/core';
import { IVerticalMenuEntry, IVerticalMenuRow, IVerticalMenuItem } from '@shared/interfaces';
export declare class YooVerticalMenuComponent {
    entry: IVerticalMenuEntry;
    fixed: boolean;
    heading: string;
    itemClicked: EventEmitter<IVerticalMenuItem>;
    menuClosed: EventEmitter<boolean>;
    activeRow: boolean[];
    host: HTMLElement;
    onModalClosed(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    getInnerHeight(): string;
    onItemClick(item: IVerticalMenuItem, index?: number): void;
    setItemActive(menuItem: IVerticalMenuItem): void;
    renderItem(item: IVerticalMenuItem, hasSubItem: boolean, index?: number): JSX.Element;
    renderRow(row: IVerticalMenuRow, index: any): JSX.Element;
    render(): JSX.Element;
}
