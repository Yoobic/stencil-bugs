import { EventEmitter } from '@stencil/core';
export declare class YooBreadcrumbsComponent {
    ITEM_WIDTH: number;
    MAX_VISIBLE_ITEMS: number;
    items: string[];
    itemSelected: EventEmitter<string>;
    visibleItems: number;
    _host: HTMLElement;
    componentWillLoad(): void;
    setItemNumber(): void;
    selectItem(item: string): void;
    isLastItem(index: number, arr: string[]): boolean;
    renderDefaultBreadcrumbItem(item: string, index: number, arr: string[]): JSX.Element;
    renderCollapsedBreadcrumbItem(item: string): JSX.Element;
    render(): JSX.Element;
}
