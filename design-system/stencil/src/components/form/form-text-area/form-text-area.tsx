import { Component, Element, Prop, Event, EventEmitter, Method, State } from '@stencil/core';
import { ValidatorEntry, AsyncValidator, Validator, IFormInputBase } from '@shared/interfaces';
import { setValidator, onInputBlurred, setValueAndValidateInput, onInputFocused } from '../../../utils/helpers/form-input-helpers';
import { debounce } from '../../../utils/helpers/helpers';

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

    componentWillLoad() {
        setValidator(this);
    }

    componentDidLoad() {
        if (this.resizable !== 'both') {
            let textArea = this.host.querySelector('textarea');
            textArea.setAttribute('style', `resize: ${this.resizable};`);
        }
    }

    // tslint:disable-next-line:member-ordering
    onInputChanged = debounce((ev: any): void => {
        let value = ev.target.value;
        setValueAndValidateInput(value, this);
    }, 500);

    @Method()
    isValid() {
        return this.validity;
    }

    @Method()
    setFocus() {
        let textArea = this.host.querySelector('textarea');
        if (textArea) {
            textArea.focus();
        }
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
        return <div class="readonly">{this.value}</div>;
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
}
