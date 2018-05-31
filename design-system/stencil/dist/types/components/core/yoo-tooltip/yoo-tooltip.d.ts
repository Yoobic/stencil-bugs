export declare class YooTooltipComponent {
    placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end';
    options: any;
    text: string;
    protected host: HTMLElement;
    protected tippy: any;
    onOptionsChange(): void;
    onTextChange(): void;
    componentWillLoad(): void;
    loadTippy(): void;
    render(): JSX.Element;
}
