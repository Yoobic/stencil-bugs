/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

const MAX_NUMBER = 999999;
class YooFormRankingComponent {
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
    static get properties() { return {
        "values": {
            "type": "Any",
            "attr": "values",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "changed",
            "method": "changed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking] {\n  border: 1px solid var(--dark-40, #b4b4b4);\n  border-bottom: 0px; }\n  [data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking] {\n    border-bottom: 1px solid var(--dark-40, #b4b4b4);\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    padding: 0.3rem 0.5rem;\n    color: var(--dark, #444); }\n    [data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n      margin-right: 0.5rem;\n      border-radius: 50%;\n      background: var(--success, #2EDBB7);\n      color: var(--light, #FFFFFF);\n      height: 1.3rem;\n      width: 1.3rem;\n      text-align: center;\n      font-size: 0.9rem; }\n\n.accent[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--accent, #1FB6FF); }\n\n.danger[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--danger, #ff625f); }\n\n.info[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--info, #fc459e); }\n\n.dark[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--dark, #444); }\n\n.success[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--success, #2EDBB7); }\n\n.warning[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--warning, #ff6402); }\n\n.gradient-accent[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--gradient-accent, linear-gradient(90deg, #1C76FC 0%, #D6E7FF 160.99%)); }\n\n.gradient-danger[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--gradient-danger, linear-gradient(264deg, #ff625f, #c73634)); }\n\n.gradient-info[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--gradient-info, linear-gradient(264deg, #fc459e, #9c2860)); }\n\n.gradient-dark[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--gradient-dark, linear-gradient(90deg, #3A3569 0%, #4334A3 102.47%)); }\n\n.gradient-warning[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--gradient-warning, linear-gradient(90deg, #F2C83A 0%, #FFE385 160.99%)); }\n\n.gradient-success[data-yoo-form-ranking-host]   .ranking-container[data-yoo-form-ranking]   .item-container[data-yoo-form-ranking]   .rank-indicator[data-yoo-form-ranking] {\n  background: var(--gradient-success, linear-gradient(309deg, #15daba, #13deb4 20%, #0de8a2 49%, #04f884 82%, #00ff78)); }"; }
}

export { YooFormRankingComponent as YooFormRanking };
