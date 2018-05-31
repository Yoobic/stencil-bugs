import { EventEmitter } from '@stencil/core';
export declare const DEFAULT_COLOR = "#ffffff";
export declare class YooColorPickerComponent {
    color: string;
    hideLabel: boolean;
    colorSelected: EventEmitter<string>;
    currentColor: string;
    _host: HTMLElement;
    colorValidation(newValue: string): void;
    onInputChange(ev: any): void;
    componentWillLoad(): void;
    render(): JSX.Element;
}
