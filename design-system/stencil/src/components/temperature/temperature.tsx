import { Component, Prop, Element } from '@stencil/core';


@Component({
    tag: 'yoo-temperature',
    styleUrl: 'temperature.scss',
    scoped: true
})
export class YooTemperatureComponent {

    @Prop() myTemperature: number;

    @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return <div class="outer-container">
            temperature value : {'' + this.myTemperature} <br />
        </div>;
    }

}
