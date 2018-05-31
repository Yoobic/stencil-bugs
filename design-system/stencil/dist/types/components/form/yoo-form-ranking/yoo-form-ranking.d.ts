import { EventEmitter } from '@stencil/core';
import { IItemRanking } from '@shared/interfaces';
export declare class YooFormRankingComponent {
    values: IItemRanking[];
    changed: EventEmitter<IItemRanking[]>;
    constructor();
    organizeItems(items: IItemRanking[]): IItemRanking[];
    onItemClick(index: number): void;
    renderItem(item: IItemRanking, index: number): JSX.Element;
    render(): JSX.Element;
}
