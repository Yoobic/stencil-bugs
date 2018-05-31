import { Component, Element, Prop, Event, EventEmitter, Method, State } from '@stencil/core';
import { ValidatorEntry, AsyncValidator, Validator, IFormInputBase } from '@shared/interfaces';
import { setValidator, setAsyncValidator, onInputBlurred, setValueAndValidateInput, onInputFocused } from '../../../utils/helpers/form-input-helpers';

@Component({
    tag: 'yoo-form-text-area',
    styleUrl: 'form-text-area.scss',
    scoped: true
})
export class YooFormTextAreaComponent implements IFormInputBase<string | number> {

    @Prop({ mutable: true }) value: string;
    @Prop() validators: Array<Validator<string> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<string>>;
    @Prop() placeholder: string;
    @Prop() readonly: boolean;
    @Prop() resizable: 'both' | 'vertical' | 'horizontal' | 'none' = 'both';

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @State() validity: boolean;

    @Element() host: HTMLStencilElement;

    // Reduced Validators
    _validator: Validator<string> = (x: string) => true;
    _asyncValidator: AsyncValidator<string> = async (x: string) => true;

    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
    }

    componentDidLoad() {
        if (this.resizable !== 'both') {
            let textArea = this.host.querySelector('textarea');
            textArea.setAttribute('style', `resize: ${this.resizable};`);
        }
    }

    onInputChanged(ev: any): void {
        let value = ev.target.value;
        setValueAndValidateInput(value, this);
    }

    @Method()
    isValid() {
        return this.validity;
    }

    renderEditable(): JSX.Element {
        return (
            <textarea value={this.value}
                placeholder={this.placeholder}
                readonly={this.readonly}
                onBlur={ev => onInputBlurred(ev, this, 'textarea')}
                onInput={ev => this.onInputChanged(ev)}
                onFocus={ev => onInputFocused(ev, this, 'textarea')}
            />
        );
    }

    renderReadonly() {
        return <div innerHTML={this.value}></div>;
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
}
