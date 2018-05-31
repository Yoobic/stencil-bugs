export declare class YooFabListComponent {
    side: string;
    mini: boolean;
    activated: boolean;
    animated: boolean;
    host: HTMLYooFabContainerElement;
    activatedChanged(activated: boolean): void;
    animatedDisplay(activated: boolean): void;
    nonAnimatedDisplay(activated: boolean): void;
    componentWillLoad(): void;
    render(): JSX.Element;
}
