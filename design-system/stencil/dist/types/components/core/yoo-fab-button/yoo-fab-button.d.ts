export declare class YooFabButtonComponent {
    fabEntry: FabButtonEntry;
    text: string;
    icon: string;
    disabled: boolean;
    toggleActive: Function;
    parentHasList: boolean;
    activated: boolean;
    label: string;
    inContainer: boolean;
    inList: boolean;
    activatedState: boolean;
    host: HTMLElement;
    componentDidLoad(): void;
    getButtonClasses(): CssClassMap;
    onClick(): void;
    isActivated(): boolean;
    renderListButton(): JSX.Element;
    renderContainerButton(): JSX.Element;
    render(): JSX.Element;
}
export interface FabButtonEntry {
    icon?: string;
    text?: string;
    handler?: Function;
}
export interface CssClassMap {
    [className: string]: boolean;
}
