import { EventEmitter } from '@stencil/core';
export declare class YooAccordionComponent {
    titles: string[];
    allowMultipleSelection: boolean;
    accordionSelected: EventEmitter<number>;
    items: {
        title: string;
        selected: boolean;
    }[];
    _host: HTMLElement;
    private selectedIndex;
    private previousSelectedIndex;
    private animationRequiredAfterRender;
    titlesHandler(): void;
    private itemsReset();
    private onAccordionClick(index);
    private fadeAccordionContent(opacity, timeout, index);
    private animateTransition(index, up);
    componentWillLoad(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
