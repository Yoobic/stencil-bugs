import highcharts from 'highcharts';
export class YooChartComponent {
    componentDidLoad() {
        let host = this.host.firstElementChild;
        highcharts.chart(host, this.options);
    }
    render() {
        return (h("div", { class: "container" }));
    }
    static get is() { return "yoo-chart"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "host": { "elementRef": true }, "options": { "type": "Any", "attr": "options" } }; }
    static get style() { return "/**style-placeholder:yoo-chart:**/"; }
}
