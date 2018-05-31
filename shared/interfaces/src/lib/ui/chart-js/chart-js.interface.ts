export interface IChartData {
    labels: string[];
    datasets: any[];
    // datasets: {
    //     label?: string;
    //     data?: number[];
    //     backgroundColor?: string[];
    //     borderColor?: string[];
    //     borderWidth?: number;
    //     fill?: boolean;
    // }[]
}

export interface IChartOptions {
    scales?: any;
    title?: any;
    xAxes?: any;
    yAxes?: any;
}