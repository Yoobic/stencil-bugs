import { EventEmitter } from '@stencil/core';
export declare class YooTabsComponent {
    titles: string[];
    selected: number;
    numberTabsDisplayed: number;
    tabChanged: EventEmitter<string>;
    tabsDisplayed: number;
    selectedTab: string;
    host: HTMLElement;
    selectedChange(newValue: number): void;
    titlesChange(newValue: string[]): void;
    private handleClickTab(title);
    componentWillLoad(): void;
    onResize(): void;
    setMaximumTabDisplayable(newValue: number): void;
    render(): JSX.Element;
}
