import { Component, Prop, Watch, Element, Event, EventEmitter, Method } from '@stencil/core';
import { getReducedValidator, getReducedAsyncValidator } from '../../../utils/validators';
import { ValidatorEntry, AsyncValidator, Validator } from '@shared/interfaces';

// TEST COMPONENT
@Component({
    tag: 'yoo-form-input-validated',
    styleUrl: 'form-input-validated.scss',
    scoped: true
})
export class YooFormInputValidatedComponent {

    @Prop({ mutable: true }) value: string;

    @Prop() validators: Array<Validator<string> | ValidatorEntry> = [];

    @Prop() asyncValidators: Array<AsyncValidator<string>>;

    @Event() changed: EventEmitter<string>;

    @Element() host: HTMLStencilElement;

    // Reduced Validators
    _validator: Validator<string> = (x: string) => true;
    _asyncValidator: AsyncValidator<string> = async (x: string) => true;

    @Watch('validators')
    setValidator() {
        this._validator = getReducedValidator<string>(this.validators);
    }

    @Watch('asyncValidators')
    setAsyncValidator() {
        this._asyncValidator = getReducedAsyncValidator<string>(this.asyncValidators);
    }

    componentWillLoad() {
        this.setValidator();
        this.setAsyncValidator();
    }

    onChange(ev: Event) {
        this.value = (ev.target as any).value;
        this.validate();
        this.changed.emit(this.value);
    }

    @Method()
    validate(): boolean {
        if (this._validator(this.value)) {
            this.host.setAttribute('valid', 'true');
        } else {
            this.host.setAttribute('valid', 'false');
        }
        return this._validator(this.value);
    }

    @Method()
    async asyncValidate(): Promise<boolean> {
        let validation: boolean = await this._asyncValidator(this.value);
        return validation;
    }

    render(): JSX.Element {
        return (
            <div>
                <input type="text" value={this.value} onChange={(ev) => this.onChange(ev)} onInput={(ev) => this.onChange(ev)} />
            </div>
        );
    }

}
