/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooPropertyCardComponent {
    constructor() {
        this.translate = window.translateService;
    }
    componentDidLoad() {
        // let defaultConfig = {
        //     chart: {
        //         style: { fontFamily: 'Visby' },
        //         backgroundColor: null,
        //         height: '300px'
        //     },
        //     credits: { enabled: false },
        //     exporting: { enabled: false },
        //     tooltip: { followTouchMove: false }
        // };
        // if (this.properties) {
        //     this.properties.forEach(p => {
        //         if (p.type === 'chart') {
        //             // p.config = merge(cloneDeep(p.config), defaultConfig);
        //         }
        //     });
        // }
        this.translate = window.translateService;
        this.isInit = true;
    }
    isString(value) {
        return typeof value === 'string';
    }
    onChartMoving($event) {
    }
    isVisible(p) {
        if (!p.group && !p.role) {
            return true;
        }
        let authorized = true;
        if (p.group) ;
        if (p.role) ;
        return authorized;
    }
    renderColumns(p) {
        return h("div", null, p.values.map((value) => h("div", { class: "p-column" },
            h("div", { class: "number" },
                (value.value ? h("span", null, value.value) : null),
                (value.isPercent ? h("span", null, "%") : null)),
            (value.title ?
                h("div", { class: "title" },
                    h("span", null, (this.translate ? this.translate.get(value.title) : value.title)))
                : null),
            h("div", { class: 'circle bg-' + value.color }))));
    }
    renderGrid(p) {
        return h("div", null,
            h("div", { class: "p-row header" }, p.headers.map((value) => (value.title ? h("span", { class: (value.truncate ? 'break-lines' : null) }, (this.translate ? this.translate.get(value.title) : value.title)) : null))),
            p.values.map((r) => h("div", { class: 'p-row ' + r.color }, r.values.map((value) => (value ? h("span", { class: (value.truncate ? 'break-lines' : null) },
                " ",
                (this.isString(value) ? value : (this.translate ? this.translate.get(value.title) : value.title)),
                " ") : null)))));
    }
    renderRows(p) {
        return h("div", null, p.values.map((value) => h("div", { class: "p-row" },
            (value.title ?
                h("div", { class: "title" },
                    h("span", null, (this.translate ? this.translate.get(value.title) : value.title)))
                : null),
            (value.value ?
                h("div", { class: "number" },
                    h("span", null, value.value))
                : null),
            (value.delta ?
                h("div", { class: "delta" },
                    h("span", null, value.delta))
                : null),
            (value.color ?
                h("div", { class: 'circle bg-' + value.color })
                : null))));
    }
    renderChart(p) {
        return h("div", null);
        // return <chart-high config={p.config} hide-title={true} (moving)="onChartMoving($event)"></chart-high>;
    }
    renderHtml(p) {
        return h("div", null, p.value);
    }
    renderProperty(p) {
        return (this.isVisible(p) ?
            h("div", { class: "details" },
                (p.title ? h("div", { class: "details-title" }, (this.translate ? this.translate.get(p.title) : p.title)) : null),
                (p.type ?
                    h("div", { class: 'description p-type-' + p.type },
                        (p.type === 'columns' ? this.renderColumns(p) : null),
                        (p.type === 'grid' ? this.renderGrid(p) : null),
                        (p.type === 'rows' ? this.renderRows(p) : null),
                        (p.type === 'chart' ? this.renderChart(p) : null),
                        (p.type === 'html' ? this.renderHtml(p) : null))
                    : null))
            : null);
    }
    render() {
        return ((this.isInit && this.properties) ?
            h("div", null, this.properties.map((property) => this.renderProperty(property)))
            : null);
    }
    static get is() { return "yoo-property-card"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "isInit": {
            "state": true
        },
        "properties": {
            "type": "Any",
            "attr": "properties"
        }
    }; }
    static get style() { return "[data-yoo-property-card-host]   .details[data-yoo-property-card] {\n  border-top: 1px solid var(--border-color, );\n  border-bottom: 1px solid var(--border-color, );\n  background: var(--light, #FFFFFF);\n  font-size: var(--font-medium, );\n  display: table;\n  width: 100%;\n  font-size: var(--font-medium, );\n  margin-bottom: 0.5rem; }\n  [data-yoo-property-card-host]   .details[data-yoo-property-card]   .details-title[data-yoo-property-card] {\n    font-weight: 500;\n    padding: 0.5rem;\n    margin-bottom: 0.25rem;\n    border-bottom: 1px solid var(--border-color, );\n    text-align: center;\n    text-transform: uppercase; }\n  [data-yoo-property-card-host]   .details[data-yoo-property-card]   .description[data-yoo-property-card] {\n    color: var(--text-header, );\n    padding: 0.5rem;\n    line-height: var(--font-xlarge, ); }\n    [data-yoo-property-card-host]   .details[data-yoo-property-card]   .description.tags[data-yoo-property-card] {\n      margin-bottom: -5px; }\n      [data-yoo-property-card-host]   .details[data-yoo-property-card]   .description.tags[data-yoo-property-card]    > span[data-yoo-property-card] {\n        background: var(--stable, #adadad);\n        color: var(--text-header, );\n        font-weight: 400;\n        padding: 3px 0.5rem;\n        font-size: var(--font-xsmall, );\n        border-radius: 25px;\n        margin-right: 0.25rem;\n        border: 1px solid var(--border-color, );\n        font-weight: 400;\n        white-space: normal;\n        display: inline-block;\n        max-width: 100%;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        margin-bottom: 5px;\n        padding: 3px 8px; }\n        [data-yoo-property-card-host]   .details[data-yoo-property-card]   .description.tags[data-yoo-property-card]    > span[data-yoo-property-card]   i[data-yoo-property-card] {\n          padding-right: 0.25rem; }\n\n[data-yoo-property-card-host]   .p-type-columns[data-yoo-property-card]   .p-column[data-yoo-property-card]:not(:last-child) {\n  border-right: 1px solid var(--border-color, ); }\n\n[data-yoo-property-card-host]   .p-type-columns[data-yoo-property-card]   .p-column[data-yoo-property-card]   .title[data-yoo-property-card] {\n  font-size: var(--font-small, );\n  font-weight: 400;\n  text-align: center;\n  line-height: 11px;\n  padding: 0 0.5rem; }\n\n[data-yoo-property-card-host]   .p-type-columns[data-yoo-property-card]   .p-column[data-yoo-property-card]   .number[data-yoo-property-card] {\n  font-weight: 500;\n  font-size: var(--font-large, );\n  margin-top: 0.25rem; }\n\n[data-yoo-property-card-host]   .p-type-columns[data-yoo-property-card]   .p-column[data-yoo-property-card]   .circle[data-yoo-property-card] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  margin-top: 5px; }\n\n[data-yoo-property-card-host]   .p-type-rows[data-yoo-property-card]   .p-row[data-yoo-property-card], [data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card] {\n  padding: 0.25rem 0; }\n  [data-yoo-property-card-host]   .p-type-rows[data-yoo-property-card]   .p-row[data-yoo-property-card]:first-child, [data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card]:first-child {\n    padding-top: 0; }\n  [data-yoo-property-card-host]   .p-type-rows[data-yoo-property-card]   .p-row[data-yoo-property-card]:last-child, [data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card]:last-child {\n    padding-bottom: 0; }\n  [data-yoo-property-card-host]   .p-type-rows[data-yoo-property-card]   .p-row[data-yoo-property-card]:not(:last-child), [data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card]:not(:last-child) {\n    border-bottom: 1px solid var(--border-color, ); }\n  [data-yoo-property-card-host]   .p-type-rows[data-yoo-property-card]   .p-row[data-yoo-property-card]   .title[data-yoo-property-card], [data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card]   .title[data-yoo-property-card] {\n    font-size: var(--font-small, );\n    font-weight: 400;\n    width: 150px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  [data-yoo-property-card-host]   .p-type-rows[data-yoo-property-card]   .p-row[data-yoo-property-card]   .number[data-yoo-property-card], [data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card]   .number[data-yoo-property-card] {\n    font-weight: 400; }\n  [data-yoo-property-card-host]   .p-type-rows[data-yoo-property-card]   .p-row[data-yoo-property-card]   .circle[data-yoo-property-card], [data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card]   .circle[data-yoo-property-card] {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    text-align: center;\n    margin-top: 0.25rem; }\n  [data-yoo-property-card-host]   .p-type-rows[data-yoo-property-card]   .p-row[data-yoo-property-card]   .delta[data-yoo-property-card], [data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card]   .delta[data-yoo-property-card] {\n    text-align: right;\n    padding-right: 0.5rem; }\n\n[data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card]    > div[data-yoo-property-card] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: var(--font-small, );\n  font-weight: 400; }\n\n[data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card]    > div[data-yoo-property-card]:not(:last-child) {\n  padding-right: 0.25rem; }\n\n[data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row.header[data-yoo-property-card]    > div[data-yoo-property-card] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-weight: 500;\n  text-transform: uppercase;\n  font-size: var(--font-xsmall, ); }\n\n[data-yoo-property-card-host]   .p-type-grid[data-yoo-property-card]   .p-row[data-yoo-property-card]   .break-lines[data-yoo-property-card] {\n  white-space: normal; }\n\n[data-yoo-property-card-host]   .p-type-chart[data-yoo-property-card]   chart-high[data-yoo-property-card] {\n  height: 300px; }"; }
}

export { YooPropertyCardComponent as YooPropertyCard };
