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
    static get style() { return ":host .details {\n  border-top: 1px solid var(--border-color, );\n  border-bottom: 1px solid var(--border-color, );\n  background: var(--light, #FFFFFF);\n  font-size: var(--font-medium, );\n  display: table;\n  width: 100%;\n  font-size: var(--font-medium, );\n  margin-bottom: 0.5rem; }\n  :host .details .details-title {\n    font-weight: 500;\n    padding: 0.5rem;\n    margin-bottom: 0.25rem;\n    border-bottom: 1px solid var(--border-color, );\n    text-align: center;\n    text-transform: uppercase; }\n  :host .details .description {\n    color: var(--text-header, );\n    padding: 0.5rem;\n    line-height: var(--font-xlarge, ); }\n    :host .details .description.tags {\n      margin-bottom: -5px; }\n      :host .details .description.tags > span {\n        background: var(--stable, #adadad);\n        color: var(--text-header, );\n        font-weight: 400;\n        padding: 3px 0.5rem;\n        font-size: var(--font-xsmall, );\n        border-radius: 25px;\n        margin-right: 0.25rem;\n        border: 1px solid var(--border-color, );\n        font-weight: 400;\n        white-space: normal;\n        display: inline-block;\n        max-width: 100%;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        margin-bottom: 5px;\n        padding: 3px 8px; }\n        :host .details .description.tags > span i {\n          padding-right: 0.25rem; }\n\n:host .p-type-columns .p-column:not(:last-child) {\n  border-right: 1px solid var(--border-color, ); }\n\n:host .p-type-columns .p-column .title {\n  font-size: var(--font-small, );\n  font-weight: 400;\n  text-align: center;\n  line-height: 11px;\n  padding: 0 0.5rem; }\n\n:host .p-type-columns .p-column .number {\n  font-weight: 500;\n  font-size: var(--font-large, );\n  margin-top: 0.25rem; }\n\n:host .p-type-columns .p-column .circle {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  margin-top: 5px; }\n\n:host .p-type-rows .p-row,\n:host .p-type-grid .p-row {\n  padding: 0.25rem 0; }\n  :host .p-type-rows .p-row:first-child,\n  :host .p-type-grid .p-row:first-child {\n    padding-top: 0; }\n  :host .p-type-rows .p-row:last-child,\n  :host .p-type-grid .p-row:last-child {\n    padding-bottom: 0; }\n  :host .p-type-rows .p-row:not(:last-child),\n  :host .p-type-grid .p-row:not(:last-child) {\n    border-bottom: 1px solid var(--border-color, ); }\n  :host .p-type-rows .p-row .title,\n  :host .p-type-grid .p-row .title {\n    font-size: var(--font-small, );\n    font-weight: 400;\n    width: 150px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  :host .p-type-rows .p-row .number,\n  :host .p-type-grid .p-row .number {\n    font-weight: 400; }\n  :host .p-type-rows .p-row .circle,\n  :host .p-type-grid .p-row .circle {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    text-align: center;\n    margin-top: 0.25rem; }\n  :host .p-type-rows .p-row .delta,\n  :host .p-type-grid .p-row .delta {\n    text-align: right;\n    padding-right: 0.5rem; }\n\n:host .p-type-grid .p-row > div {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: var(--font-small, );\n  font-weight: 400; }\n\n:host .p-type-grid .p-row > div:not(:last-child) {\n  padding-right: 0.25rem; }\n\n:host .p-type-grid .p-row.header > div {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-weight: 500;\n  text-transform: uppercase;\n  font-size: var(--font-xsmall, ); }\n\n:host .p-type-grid .p-row .break-lines {\n  white-space: normal; }\n\n:host .p-type-chart chart-high {\n  height: 300px; }"; }
}

export { YooPropertyCardComponent as YooPropertyCard };
