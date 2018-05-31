import { Component, Prop, Event, State, EventEmitter, Element, Method } from '@stencil/core';
import { ValidatorEntry, AsyncValidator, Validator, IFormRange } from '@shared/interfaces';
import { setValidator, setValueAndValidateInput } from '../../../utils/helpers/form-input-helpers';
import { isArray } from 'lodash-es';

@Component({
    tag: 'yoo-form-range',
    styleUrl: 'form-range.scss',
    scoped: true
})
export class YooFormRangeComponent implements IFormRange {

    @Prop({ mutable: true }) value: number | Array<number>;
    @Prop() validators: Array<Validator<number | Array<number>> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<number | Array<number>>>;
    @Prop() readonly: boolean;
    @Prop() min: number;
    @Prop() max: number;
    @Prop() double: boolean; // if simple we use value.sup

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @Event() iconClicked: EventEmitter<string>;

    @State() validity: boolean;

    @Element() host: HTMLStencilElement;

    componentWillLoad() {
        setValidator(this);
    }

    @Method()
    isValid() {
        return this.validity;
    }

    onInputClear(): void {
        this.iconClicked.emit('clear');
    }

    onSliderChange(ev: CustomEvent): void {
        let oldValue = this.value;
        if (ev && ev.detail) {
            if ((ev.detail.lowValue || ev.detail.lowValue === 0) && (ev.detail.highValue || ev.detail.highValue === 0)) {
                this.value = [ev.detail.lowValue, ev.detail.highValue];
            }
        }
        if (oldValue !== this.value) {
            setValueAndValidateInput(this.value, this);
        }
    }

    onSingleSliderChange(ev: CustomEvent): void {
        let oldValue = this.value;
        if (ev && ev.detail) {
            this.value = ev.detail;
        }
        if (oldValue !== this.value) {
            setValueAndValidateInput(this.value, this);
        }
    }

    onInputInfChanged(ev): void {
        let oldValue = this.value;
        let incomingVal: number = Number(ev.detail.target.value) >= this.max ? this.max : Number(ev.detail.target.value) <= this.min ? this.min : Number(ev.detail.target.value);
        if (this.double) {
            let inf: number = this.value[1] >= incomingVal ? incomingVal : this.value[1];
            this.value = [inf, this.value[1]];
        }
        if (oldValue !== this.value) {
            setValueAndValidateInput(this.value, this);
        }
    }

    onInputSupChanged(ev): void {
        let oldValue = this.value;
        let incomingVal: number = ev.detail.target.value >= this.max ? this.max : ev.detail.target.value <= this.min ? this.min : Number(ev.detail.target.value);
        if (this.double ) {
            let sup: number = this.value[0] <= incomingVal ? incomingVal : this.value[0];
            this.value = [this.value[0], sup];
        } else {
            if (incomingVal === this.value && incomingVal === this.max) {
                this.value = this.min;
            } else if (incomingVal === this.value && incomingVal === this.min) {
                this.value = this.max;
            }

            this.value = incomingVal;
        }
        if (oldValue !== this.value) {
            setValueAndValidateInput(this.value, this);
        }
    }

    renderReadonly() {
        return (
            <div class="readonly">
                <div>
                {this.value && this.double ? this.value[0] : this.value && !this.double ? this.value : null}
                </div>
                <div>
                {this.value && this.double ? this.value[1] : null}
                </div>
            </div>
        );
    }

    renderEditable() {
        return (
            <div class="outer-container" attr-layout="column">
                <div class="inputs-container" attr-layout="row">
                    {this.double ?
                         [<div class="input">
                            <yoo-form-input value={ isArray(this.value) ? this.value[0] : this.value } onInputBlurred={(ev) => this.onInputInfChanged(ev)}></yoo-form-input>
                        </div>,
                        <div class="separator"></div>]
                    : null}
                    <div class={'input ' + (this.double ? '' : 'single')}>
                        <yoo-form-input value={isArray(this.value) ? this.value[1] : this.value } onInputBlurred={(ev) => this.onInputSupChanged(ev)}></yoo-form-input>
                    </div>
                </div>
                <div class="slider-container">
                    <yoo-form-slider class="gradient-success"
                        hideLabel={true}
                        hideReferences={true}
                        doubleSlider={this.double}
                        initialLowValue={this.value ? this.value[0] || 0 : 0}
                        initialValue={this.value ? isArray(this.value) ? this.value[1] : this.value : 0}
                        minimum={this.min ? this.min : null}
                        maximum={this.max ? this.max : null}
                        onDoubleSliderChanged={(ev) => this.onSliderChange(ev)}
                        onSingleSliderChanged={(ev) => this.onSingleSliderChange(ev)}
                        ></yoo-form-slider>
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }

}
