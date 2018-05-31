import { Component, Prop, Element } from '@stencil/core';
import highcharts from 'highcharts';

@Component({
    tag: 'yoo-chart',
    styleUrl: 'chart.scss',
    scoped: true
})
export class YooChartComponent {

    @Prop() options: any;

    @Element() protected host: HTMLElement;

    componentDidLoad() {
        let host: any = this.host.firstElementChild;
        highcharts.chart(host, this.options);
    }

    render(): JSX.Element {
        return (
            <div class="container"></div>
        );
    }
}
