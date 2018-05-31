import signature_pad from 'signature_pad';
export declare class YooSignaturePadComponent {
    protected host: HTMLElement;
    protected signaturePad: signature_pad;
    componentDidLoad(): void;
    canvasSetup(): void;
    onClear(): void;
    render(): JSX.Element[];
}
