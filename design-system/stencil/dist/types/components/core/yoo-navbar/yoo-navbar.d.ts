import { EventEmitter } from '@stencil/core';
export declare class YooNavbarComponent {
    titles: string[];
    selectedTitle: string;
    titleClicked: EventEmitter<string>;
    numberOfVisibleTitles: number;
    showDropdown: boolean;
    host: HTMLElement;
    private elementWidth;
    private elementWidthArray;
    private totalElementWidthArray;
    private elementDropdownWidthArray;
    private totalWidth;
    private activeTitleInDropDown;
    private dropdownWidth;
    titleSelected(title: string): void;
    componentDidLoad(): void;
    calculateTotalElementWidth(): void;
    calculateElementsWithDropDownWidth(): void;
    resizePage(): void;
    activeDropdownTitle(): void;
    calculateDropdownWidth(): void;
    render(): JSX.Element;
}
