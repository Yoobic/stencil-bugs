import { Component, Prop, Element } from '@stencil/core';
import { loadScript } from '../../../utils/helpers';
import { IChartData, IChartOptions } from '@shared/interfaces';
declare var Chart;

@Component({
    tag: 'yoo-chart-js',
    styleUrl: 'chart-js.scss',
    scoped: true
})
export class YooChartJsComponent {

    @Prop() type: string;
    @Prop() data: IChartData;
    @Prop() options: IChartOptions;

    @Element() protected host: HTMLElement;
    protected chart: any;

    componentDidLoad() {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.js').then(() => {
            let canvas = this.host.querySelector('canvas');
            canvas.width = this.host.querySelector('.container').clientWidth;
            canvas.height = this.host.querySelector('.container').clientHeight;
            if ((window as any).Chart) {
                this.chart = new Chart(canvas.getContext('2d'), {
                    type: this.type,
                    data: this.data,
                    options: this.options
                });
            }
        });
    }

    render(): JSX.Element {
        return (
            <div class="container">
                <canvas></canvas>
            </div>
        );
    }
}
