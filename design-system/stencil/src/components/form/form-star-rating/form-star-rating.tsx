import { Component, Element, Prop, Event, EventEmitter } from '@stencil/core';
import { IFormStarRating, FormStarType, Validator, AsyncValidator, ValidatorEntry } from '@shared/interfaces';
import { setValidator, setAsyncValidator, setValueAndValidateInput } from '../../../utils/helpers/form-input-helpers';

@Component({
    tag: 'yoo-form-star-rating',
    styleUrl: 'form-star-rating.scss',
    scoped: true
})
export class YooFormStarRatingComponent implements IFormStarRating {

    @Prop({mutable: true}) value: number;
    @Prop() stars: number = 5;
    @Prop() validators: Array<Validator<number> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<number>>;
    @Prop() readonly: boolean;
    @Prop() type: FormStarType = 'star';

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @Element() host: HTMLStencilElement;

    // Reduced Validators
    _validator: Validator<string> = (x: string) => true;
    _asyncValidator: AsyncValidator<string> = async (x: string) => true;

    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
        if (this.type === 'button') {
            this.host.classList.add('button');
        }
    }

    getArray(): Array<number> {
        return new Array(this.stars).fill(0);
    }

    onStarClick(index: number): void {
        if (this.value !== index + 1) {
            this.value = index + 1;
            setValueAndValidateInput(this.value, this);
        } else if (this.value === 1 && index === 0) {
            this.value = 0;
            setValueAndValidateInput(this.value, this);
        }
    }

    renderReadonly(): JSX.Element {
        return (
            <div class="star-rating-container readonly" attr-layout="row">
                {this.getArray().map((elem, index) =>
                    <div class="star-container">
                        <i class={this.value > index ? 'yo-star-solid solid' : 'yo-star border'}></i>
                    </div>
                )}
            </div>
        );
    }

    renderEditable(): JSX.Element {
        return (
            <div class="star-rating-container" attr-layout="row">
                {this.getArray().map((elem, index) =>
                    <div class="star-container">
                        {this.type === 'star' ?
                            <i class={this.value > index ? 'yo-star-solid solid' : 'yo-star border'} onClick={() => this.onStarClick(index)}></i>
                        : this.type === 'button' ?
                            <div class={'button ' + (this.value > index ? 'solid' : 'brder')} onClick={() => this.onStarClick(index)}>
                                <span class="number">{index + 1}</span>
                            </div>
                        : null}
                    </div>
                )}
            </div>
        );
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
}
