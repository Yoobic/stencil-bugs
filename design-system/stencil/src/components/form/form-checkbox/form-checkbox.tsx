import { Component, Prop, Event, EventEmitter, Method, Element } from '@stencil/core';
import { setValidator, setValueAndValidateInput } from '../../../utils/helpers/form-input-helpers';
import { IFormCheckbox, FormDisplayType, Validator, AsyncValidator, ValidatorEntry } from '@shared/interfaces';

@Component({
    tag: 'yoo-form-checkbox',
    styleUrl: 'form-checkbox.scss',
    scoped: true
})
export class YooFormCheckboxComponent implements IFormCheckbox {

    @Prop({ mutable: true }) value: boolean;
    @Prop() validators: Array<Validator<boolean> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<boolean>>;
    @Prop() readonly: boolean;
    @Prop() type: FormDisplayType = 'normal';

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;


    @Element() host: HTMLStencilElement;

    @Method()
    onCheckboxClick() {
        this.value = !this.value;
        setValueAndValidateInput(this.value, this);
    }

    componentWillLoad() {
        setValidator(this);
        if (this.type === 'line') {
            this.host.classList.add('line');
        }
    }

    renderReadonly(): JSX.Element {
        return (
            <div class="readonly" attr-layout="row">
                {this.value === true ? <i class="yo-check"></i> : (this.value === false ? <i class="yo-cross-danger danger"></i> : <i class="yo-circle"></i>)}
            </div>
        );
    }

    renderEditable(): JSX.Element {
        return (
            <div class="container" onClick={() => this.onCheckboxClick()}>
                    {this.value === true ? <i class="yo-check-solid"></i> : this.value === false ? <i class="yo-circle"></i> : <i class="yo-circle undefined"></i>}
            </div>
        );
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
}