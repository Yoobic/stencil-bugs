export declare class YooTransitionComponent {
    type: 'fade' | 'bottom' | 'icon' | 'image' | 'heading' | 'scale-up';
    heading: string;
    icon: string;
    image: string;
    subHeading: string;
    host: HTMLElement;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    animationHandler(timeout: number, openFade: boolean, closeBottom: boolean, displayString: string): void;
    render(): JSX.Element;
}
