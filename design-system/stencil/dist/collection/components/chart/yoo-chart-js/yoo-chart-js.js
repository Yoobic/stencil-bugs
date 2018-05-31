import { loadScript } from '../../../utils/helpers';
export class YooChartJsComponent {
    componentDidLoad() {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.js').then(() => {
            let canvas = this.host.querySelector('canvas');
            canvas.width = this.host.querySelector('.container').clientWidth;
            canvas.height = this.host.querySelector('.container').clientHeight;
            if (window.Chart) {
                this.chart = new Chart(canvas.getContext('2d'), {
                    type: this.type,
                    data: this.data,
                    options: this.options
                });
            }
        });
    }
    render() {
        return (h("div", { class: "container" },
            h("canvas", null)));
    }
    static get is() { return "yoo-chart-js"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return { "data": { "type": "Any", "attr": "data" }, "host": { "elementRef": true }, "options": { "type": "Any", "attr": "options" }, "type": { "type": String, "attr": "type" } }; }
    static get style() { return "/**style-placeholder:yoo-chart-js:**/"; }
}
