import { Component, Prop, Event, State, EventEmitter, Element, Method } from '@stencil/core';
import { ValidatorEntry, AsyncValidator, Validator, IFormRange, IRangeValue } from '@shared/interfaces';
import { setValidator, setAsyncValidator, setValueAndValidateInput } from '../../../utils/helpers/form-input-helpers';
// import { setValidator, setAsyncValidator, onInputBlurred, onInputChanged, onInputFocused, onFocus } from '../../../utils/helpers/form-input-helpers';

@Component({
    tag: 'yoo-form-range',
    styleUrl: 'form-range.scss',
    scoped: true
})
export class YooFormRangeComponent implements IFormRange {

    @Prop({ mutable: true }) value: IRangeValue;
    @Prop() validators: Array<Validator<IRangeValue> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<IRangeValue>>;
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

    // private coreConfig: ICoreConfig = (window as any).coreConfigService;

    // Reduced Validators
    _validator: Validator<string> = (x: string) => true;
    _asyncValidator: AsyncValidator<string> = async (x: string) => true;

    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
    }

    componentDidLoad() {
        this.value = {...this.value};
    }

    @Method()
    isValid() {
        return this.validity;
    }

    onInputClear(): void {
        this.iconClicked.emit('clear');
    }

    onSliderChange(ev: CustomEvent): void {
        let oldValue: IRangeValue = this.value;
        if (ev && ev.detail) {
            if (ev.detail.lowValue || ev.detail.lowValue === 0) {
                this.value.inf = ev.detail.lowValue;
            }
            if (ev.detail.highValue || ev.detail.highValue === 0) {
                this.value.sup = ev.detail.highValue;
            }
        }
        if (oldValue !== this.value) {
            setValueAndValidateInput({target: {value: this.value}}, this);
        }
        this.value = {...this.value};
    }

    onSingleSliderChange(ev: CustomEvent): void {
        let oldValue: IRangeValue = this.value;
        if (ev && ev.detail) {
            this.value.sup = ev.detail;
        }
        if (oldValue !== this.value) {
            setValueAndValidateInput(this.value, this);
        }
        this.value = {...this.value};
    }

    onInputInfChanged(ev): void {
        let oldValue: IRangeValue = this.value;
        this.value.inf = this.value.sup >= ev.target.valueAsNumber ? ev.target.valueAsNumber : this.value.sup;
        this.value.sup = this.value.sup >= ev.target.valueAsNumber ? this.value.sup : ev.target.valueAsNumber;
        if (oldValue !== this.value) {
            setValueAndValidateInput([this.value.inf, this.value.sup], this);
        }
        this.value = {...this.value};
    }

    onInputSupChanged(ev): void {
        let oldValue: IRangeValue = this.value;
        if (this.double ) {
            this.value.sup = this.value.inf <= ev.target.valueAsNumber ? ev.target.valueAsNumber : this.value.inf;
            this.value.inf = this.value.inf <= ev.target.valueAsNumber ? this.value.inf : ev.target.valueAsNumber;
        } else {
            this.value.sup = ev.target.valueAsNumber;
        }
        if (oldValue !== this.value) {
            setValueAndValidateInput([this.value.inf, this.value.sup], this);
        }
        this.value = {...this.value};
    }

    renderReadonly() {
        return (
            <div class="readonly">
                <div>
                {this.value ? this.value.inf : null}
                </div>
                <div>
                {this.value ? this.value.inf : null}
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
                            <input type="number" value={this.value && this.value.inf ? this.value.inf.toString() || null : null} onChange={(ev) => this.onInputInfChanged(ev)}/>
                        </div>,
                        <div class="separator"></div>]
                    : null}
                    <div class={'input ' + (this.double ? '' : 'single')}>
                        <input type="number" value={this.value && this.value.sup ? this.value.sup || null : null} onChange={(ev) => this.onInputSupChanged(ev)}/>
                    </div>
                </div>
                <div class="slider-container">
                    <yoo-form-slider class="gradient-success"
                        hideLabel={true}
                        hideReferences={true}
                        doubleSlider={this.double}
                        initialLowValue={this.value ? this.value.inf : 0}
                        initialValue={this.value ? this.value.sup : 0}
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
