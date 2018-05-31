import { EventEmitter } from '@stencil/core';
import { ValidatorEntry, AsyncValidator, Validator } from '@shared/interfaces';
export declare class YooFormInputValidatedComponent {
    value: string;
    validators: Array<Validator<string> | ValidatorEntry>;
    asyncValidators: Array<AsyncValidator<string>>;
    changed: EventEmitter<string>;
    _host: HTMLElement;
    _validator: Validator<string>;
    _asyncValidator: AsyncValidator<string>;
    setValidator(): void;
    setAsyncValidator(): void;
    componentWillLoad(): void;
    onChange(ev: any): void;
    validate(): boolean;
    asyncValidate(): Promise<boolean>;
    render(): JSX.Element;
}
