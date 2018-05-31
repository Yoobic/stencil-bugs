import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { IItemRanking } from '@shared/interfaces';

const MAX_NUMBER = 999999;
@Component({
    tag: 'yoo-form-ranking',
    styleUrl: 'form-ranking.scss',
    scoped: true
})
export class YooFormRankingComponent {

    @Prop({mutable: true}) values: IItemRanking[] = []; // list of values with their rank

    @Event() changed: EventEmitter<IItemRanking[]>; // emit the ordered list

    constructor() {
        this.values = this.organizeItems(this.values);
    }

    organizeItems(items: IItemRanking[]) {

        function compareItemsRanking(a: IItemRanking, b: IItemRanking): number {
            return a.rank === b.rank ? 0 : a.rank < b.rank ? -1 : 1;
        }

        function compareItemsOrder(a: IItemRanking, b: IItemRanking): number {
            return a.order === b.order ? 0 : a.order < b.order ? -1 : 1;
        }

        let rankedItems = items.filter(i => i.rank);
        rankedItems = rankedItems.sort(compareItemsRanking);
        rankedItems = rankedItems.map((i, k) => {
            return {
                value: i.value,
                rank: k + 1,
                ...i.order && {order: i.order}
            };
        });
        let nonRankedItems = items.filter(i => !i.rank).sort(compareItemsOrder);
        return [...rankedItems, ...nonRankedItems];
    }

    onItemClick(index: number) {
        let items = [...this.values];
        items[index] = { // to avoid changing the original value
            value: items[index].value,
            ...items[index].rank ? {} :  {rank: MAX_NUMBER},
            ...items[index].order && {order: items[index].order}
        };

        this.values = this.organizeItems(items);
        this.changed.emit(this.values);
    }

    renderItem(item: IItemRanking, index: number): JSX.Element {
        return (
            <div class="item-container" attr-layout="row" onClick={() => this.onItemClick(index)}>
                {item.rank ?
                    <div class="rank-indicator">
                        <span>{item.rank}</span>
                    </div>
                    : null}
                <span>{item.value}</span>
            </div>
        );
    }

    render(): JSX.Element {
        this.values = this.organizeItems(this.values);
        return (
            <div class="ranking-container" attr-layout="column">
                {this.values.map((i, k) => {
                    return this.renderItem(i, k);
                })}
            </div>
        );
    }
}