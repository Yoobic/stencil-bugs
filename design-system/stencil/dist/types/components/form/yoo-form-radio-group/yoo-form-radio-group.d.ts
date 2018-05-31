import { EventEmitter } from '@stencil/core';
import { IRadioGroupEntry } from '@shared/interfaces';
export declare class YooFormRadioGroupComponent {
    values: IRadioGroupEntry[];
    multipleSelection: boolean;
    selectionChanged: EventEmitter<Array<IRadioGroupEntry>>;
    items: IRadioGroupEntry[];
    host: HTMLElement;
    private radioReset();
    private calculateRadioSelection(index);
    onRadioClicked(index: number): void;
    componentWillLoad(): void;
    render(): JSX.Element;
}
