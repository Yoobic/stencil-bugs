import { EventEmitter } from '@stencil/core';
export declare class YooFormSliderComponent {
    initialValue: number;
    minimum: number;
    maximum: number;
    disabled: boolean;
    hideLabel: boolean;
    hideReferences: boolean;
    doubleSlider: boolean;
    singleSliderChanged: EventEmitter<number>;
    doubleSliderChanged: EventEmitter<{
        lowValue: number;
        highValue: number;
    }>;
    value: number;
    secondValue: number;
    host: HTMLElement;
    watchHandler(newValue: number): void;
    private getProgress();
    onChange(event: any): void;
    onChangeSecond(event: any): void;
    handleEvent(): void;
    setDoubleProgressStyle(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    render(): JSX.Element;
}
