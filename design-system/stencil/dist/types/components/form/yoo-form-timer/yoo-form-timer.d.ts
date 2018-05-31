import { EventEmitter } from '@stencil/core';
export declare class YooFormTimerComponent {
    timeCalculated: EventEmitter<string>;
    calculatedTime: any;
    smallWindowSize: boolean;
    host: HTMLElement;
    startHour: any;
    startMinute: any;
    endTime: any;
    componentDidLoad(): void;
    timeChanged(event: any, position: string): void;
    formatTime(time: string): string;
    calculateTotalTime(): string;
    resizeComponent(): void;
    render(): JSX.Element;
}
