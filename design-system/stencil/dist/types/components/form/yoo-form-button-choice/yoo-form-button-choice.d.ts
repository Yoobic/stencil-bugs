import { EventEmitter } from '@stencil/core';
export declare class YooFormButtonChoiceComponent {
    multiple: boolean;
    choices: string[];
    selected: boolean[];
    changed: EventEmitter<string[]>;
    _host: HTMLElement;
    selectedUpdater(): void;
    componentWillLoad(): void;
    hasFewItems(): boolean;
    clickChoice(index: number): void;
    renderItem(choice: string, index: number, selected: boolean): JSX.Element;
    render(): JSX.Element;
}
