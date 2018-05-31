import { Component, Prop, Event, EventEmitter, State, Watch, Element } from '@stencil/core';
import { isNumber } from 'lodash-es';

const inlineClass: string = 'inline';

@Component({
    tag: 'yoo-form-slider',
    styleUrl: 'form-slider.scss',
    scoped: true
})
export class YooFormSliderComponent {

    @Prop() initialValue: number;
    @Prop() initialLowValue: number;
    @Prop() minimum: number;
    @Prop() maximum: number;
    @Prop() disabled: boolean = false;
    @Prop() hideLabel: boolean = false;
    @Prop() hideReferences: boolean = false;
    @Prop() doubleSlider: boolean = false;
    @Prop() triangleColor: string = 'light';

    @Event() singleSliderChanged: EventEmitter<number>;
    @Event() doubleSliderChanged: EventEmitter<{ lowValue: number, highValue: number }>;

    @State() value: number;
    @State() secondValue: number;

    @Element() host: HTMLStencilElement;

    componentWillLoad() {
        this.value = this.initialValue;
        this.secondValue = this.initialLowValue || this.minimum;
        if (!isNumber(this.minimum)) {
            this.minimum = 0;
        }
        if (!isNumber(this.maximum)) {
            this.maximum = 100;
        }
    }

    componentDidLoad() {
        if (this.doubleSlider) {
            this.setDoubleProgressStyle();
        }
    }

    componentWillUpdate() {
        if (this.doubleSlider) {
            this.setDoubleProgressStyle();
        }
    }

    @Watch('initialValue')
    initialValueChanged(newValue: number): void {
        if (newValue > this.maximum || newValue < this.minimum) {
            this.value = this.minimum;
        } else {
            this.value = this.initialValue;
        }
    }

    @Watch('initialLowValue')
    initialLowValueChanged(newValue: number): void {
        if (newValue > this.maximum || newValue < this.minimum) {
            this.initialLowValue = this.minimum;
        } else {
            this.secondValue = this.initialLowValue;
        }
    }

    private getProgress() {
        return 100 * (this.value - this.minimum) / (this.maximum - this.minimum);
    }

    onChange(event): void {
        if (event.target.value > this.maximum || event.target.value < this.minimum) {
            this.value = this.minimum;
        } else {
            this.value = event.target.value;
        }
        this.handleEvent();
    }

    onChangeSecond(event): void {
        if (event.target.value > this.maximum || event.target.value < this.minimum) {
            this.secondValue = this.minimum;
        } else {
            this.secondValue = event.target.value;
        }
        this.handleEvent();
    }

    handleEvent(): void {
        if (this.doubleSlider) {
            let lowValue = Math.min(this.value, this.secondValue);
            let highValue = Math.max(this.value, this.secondValue);
            this.doubleSliderChanged.emit({ lowValue: lowValue, highValue: highValue });
        } else {
            this.singleSliderChanged.emit(this.value);
        }
    }

    setDoubleProgressStyle(): void {

        let width = 100 * Math.abs(this.value - this.secondValue) / (this.maximum - this.minimum);
        let translate = 0;
        if (width !== 0) {
            translate = 100 * (Math.min(this.value, this.secondValue) - this.minimum) / width;
        }

        let style = { width: width + '%', transform: 'translateX(' + translate + '%)' };
        style.toString();
        let bar = this.host.querySelector('div.progress-container');
        if (bar) {
            bar.setAttribute('style', 'width: ' + width + '%; ' + 'transform: translateX(' + translate + '%)');
        }
        // reverse label if inline double
        if (this.host.className.indexOf(inlineClass) !== -1) {
            let sliderContainer = this.host.querySelector('div.slider-container');
            if (sliderContainer) {
                sliderContainer.setAttribute('style', 'flex-direction: row');
            }
        }
    }

    render(): JSX.Element {
        return (
            <div class="wrapper">
                {this.host.classList.contains('triangle') ? <yoo-progress-bar class={this.host.className} hide-progress={true} triangle-background-color={this.triangleColor}></yoo-progress-bar> : null}
                <div class={'outer-container' + ((this.disabled) ? ' disabled' : '')} attr-layout="flex">
                    {!this.hideReferences ?
                        <label>
                            {this.minimum}
                        </label>
                        : null}
                    <div class="slider-container" attr-layout="column">
                        <div class={'label-value' + ((this.hideLabel) ? ' label-hidden' : '')} >
                            {this.disabled ?
                                <input type="number" value={this.value}
                                    onChange={(event) => this.onChange(event)} disabled>
                                </input>
                                :
                                (this.doubleSlider ?
                                    [<input type="number" value={this.secondValue}
                                        onChange={(event) => this.onChangeSecond(event)}>
                                    </input>,
                                    (this.host.className.indexOf(inlineClass) === -1 ?
                                        <input type="number" value={this.value}
                                            onChange={(event) => this.onChange(event)}>
                                        </input>
                                        : null)]
                                    :
                                    <input type="number" value={this.value}
                                        onChange={(event) => this.onChange(event)}>
                                    </input>)
                            }
                        </div>
                        <div class="range-container" attr-layout="row">
                            {this.disabled ?
                                <input class="swiper-no-swiping" type="range" min={this.minimum} max={this.maximum} value={this.value}
                                    onInput={(event) => this.onChange(event)} disabled>
                                </input>
                                :
                                [<input class="swiper-no-swiping" type="range" min={this.minimum} max={this.maximum} value={this.value}
                                    onInput={(event) => this.onChange(event)}>
                                </input>,
                                (this.doubleSlider ?
                                    <input class="second-slider swiper-no-swiping" type="range" min={this.minimum} max={this.maximum} value={this.secondValue}
                                        onInput={(event) => this.onChangeSecond(event)}>
                                    </input>
                                    : null)]
                            }
                            {this.host.classList.contains('triangle') ? null : (this.doubleSlider ?
                                <yoo-progress-bar class={this.host.className} hide-progress={true}></yoo-progress-bar>
                                :
                                <yoo-progress-bar class={this.host.className} progress={this.getProgress()} hide-progress={true}></yoo-progress-bar>)
                            }
                        </div>
                        {this.doubleSlider && this.host.className.indexOf(inlineClass) !== -1 ?
                            <div class={'label-value' + ((this.hideLabel) ? ' label-hidden' : '')} >
                                {this.disabled ?
                                    <input type="number" value={this.value}
                                        onChange={(event) => this.onChange(event)} disabled>
                                    </input>
                                    :
                                    <input type="number" value={this.value}
                                        onChange={(event) => this.onChange(event)}>
                                    </input>
                                }
                            </div>
                            : null}
                    </div>
                    {!this.hideReferences ?
                        <label>
                            {this.maximum}
                        </label>
                        : null}
                </div>
            </div>
        );
    }
}
