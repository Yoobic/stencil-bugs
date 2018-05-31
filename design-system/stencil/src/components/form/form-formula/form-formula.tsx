import { Component, Element, Event, EventEmitter, State, Prop, Method } from '@stencil/core';
import { ValidatorEntry, AsyncValidator, Validator, IFormFormula } from '@shared/interfaces';

import { setValidator } from '../../../utils/helpers/form-input-helpers';

@Component({
    tag: 'yoo-form-formula',
    styleUrl: 'form-formula.scss',
    scoped: true
})
export class YooFormFormulaComponent implements IFormFormula {

    @Prop({ mutable: true }) value: number;
    @Prop() validators: Array<Validator<number> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<number>>;
    @Prop() placeholder: string;
    @Prop() required: boolean;
    @Prop() readonly: boolean;
    @Prop() type: string;

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @State() validity: boolean;

    @Element() host: HTMLStencilElement;

    componentWillLoad() {
        setValidator(this);
    }

    @Method()
    isValid() {
        return this.validity;
    }

    renderReadonly() {
        return <div class="readonly">{this.value}</div>;
    }

    renderEditable() {
        return <div>{this.value}</div>;
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
}
