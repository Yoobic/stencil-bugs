const MAX_NUMBER = 999999;
export class YooFormRankingComponent {
    constructor() {
        this.values = []; // list of values with their rank
        this.values = this.organizeItems(this.values);
    }
    organizeItems(items) {
        function compareItemsRanking(a, b) {
            return a.rank === b.rank ? 0 : a.rank < b.rank ? -1 : 1;
        }
        function compareItemsOrder(a, b) {
            return a.order === b.order ? 0 : a.order < b.order ? -1 : 1;
        }
        let rankedItems = items.filter(i => i.rank);
        rankedItems = rankedItems.sort(compareItemsRanking);
        rankedItems = rankedItems.map((i, k) => {
            return Object.assign({ value: i.value, rank: k + 1 }, i.order && { order: i.order });
        });
        let nonRankedItems = items.filter(i => !i.rank).sort(compareItemsOrder);
        return [...rankedItems, ...nonRankedItems];
    }
    onItemClick(index) {
        let items = [...this.values];
        items[index] = Object.assign({ value: items[index].value }, items[index].rank ? {} : { rank: MAX_NUMBER }, items[index].order && { order: items[index].order });
        this.values = this.organizeItems(items);
        this.changed.emit(this.values);
    }
    renderItem(item, index) {
        return (h("div", { class: "item-container", "attr-layout": "row", onClick: () => this.onItemClick(index) },
            item.rank ?
                h("div", { class: "rank-indicator" },
                    h("span", null, item.rank))
                : null,
            h("span", null, item.value)));
    }
    render() {
        this.values = this.organizeItems(this.values);
        return (h("div", { class: "ranking-container", "attr-layout": "column" }, this.values.map((i, k) => {
            return this.renderItem(i, k);
        })));
    }
    static get is() { return "yoo-form-ranking"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "values": { "type": "Any", "attr": "values", "mutable": true } }; }
    static get events() { return [{ "name": "changed", "method": "changed", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:yoo-form-ranking:**/"; }
}
