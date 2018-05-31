import { IChartData, IChartOptions } from '@shared/interfaces';
export declare class YooChartJsComponent {
    type: string;
    data: IChartData;
    options: IChartOptions;
    protected host: HTMLElement;
    protected chart: any;
    componentDidLoad(): void;
    render(): JSX.Element;
}
