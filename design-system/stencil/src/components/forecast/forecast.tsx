import { Component, Element } from '@stencil/core';


@Component({
    tag: 'yoo-forecast',
    styleUrl: 'forecast.scss',
    scoped: true
})
export class YooForecastComponent {

    @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return <div class="outer-container">
            <yoo-temperature my-temperature={12}></yoo-temperature>
            <yoo-temperature myTemperature={12}></yoo-temperature>
        </div>;
    }

}
