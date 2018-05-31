import { Component, Element, Prop, Event, EventEmitter, State } from '@stencil/core';
import { IFormSelect, ValidatorEntry, AsyncValidator, Validator, ITranslateService } from '@shared/interfaces';
import { setValidator, setAsyncValidator, setValueAndValidateInput } from '../../../utils/helpers/form-input-helpers';
import { findIndex, isEqual } from 'lodash-es';

@Component({
    tag: 'yoo-form-button-choice',
    styleUrl: 'form-button-choice.scss',
    scoped: true
})
export class YooFormButtonChoiceComponent implements IFormSelect {

    @Prop() multiple: boolean = false;
    @Prop() values: string[] = [];
    @Prop({ mutable: true }) value: Array<string> | string;
    @Prop() required: boolean;
    @Prop() validators: Array<Validator<string[]> | ValidatorEntry> = [];
    @Prop() asyncValidators: Array<AsyncValidator<string[]>>;
    @Prop() readonly: boolean;
    @Prop() useTranslate: boolean;

    @Event() validityChanged: EventEmitter<boolean>;
    @Event() inputBlurred: EventEmitter<any>;
    @Event() inputFocused: EventEmitter<boolean>;
    @Event() inputChanged: EventEmitter<any>;

    @Element() host: HTMLStencilElement;

    @State() validity: boolean;
    @State() selection: Array<string> = [];

    private translate: ITranslateService = (window as any).translateService;

    // Reduced Validators
    _validator: Validator<string> = (x: string) => true;
    _asyncValidator: AsyncValidator<string> = async (x: string) => true;

    componentWillLoad() {
        setValidator(this.validators);
        setAsyncValidator(this.asyncValidators);
    }

    componentDidLoad() {
        if (this.value) {
            this.selection = [].concat(this.value || []);
        }
    }

    hasFewItems(): boolean {
        return this.values.length < 5;
    }

    onItemSelect(item: string) {
        let index = this.selection.indexOf(item);
        if (this.multiple) {
            if (index >= 0) {
                this.selection.splice(index, 1);
                this.selection = [...this.selection];
            } else {
                this.selection = [...this.selection, item];
            }
        } else {
            if (index >= 0) {
                this.selection = [];
            } else {
                this.selection = [item];
            }
        }
        setValueAndValidateInput(this.multiple ? this.selection : (this.selection.length > 0 ? this.selection[0] : null), this);
    }

    isSelected(item) {
        let selection = [].concat(this.selection);
        let index = findIndex(selection, (s) => isEqual(item, s));
        return index >= 0;
    }

    renderItem(item: string): JSX.Element {
        return (
            <div class={'choice-container ' + (this.isSelected(item) ? 'selected' : '')} onClick={() => this.onItemSelect(item)}>
                <span>{this.useTranslate ? this.translate.get(item.toUpperCase()) : item}</span>
            </div>
        );
    }

    renderReadonly() {
        return this.value ? [].concat(this.value).map(v => <div innerHTML={v}></div>) : null;
    }

    renderEditable(): JSX.Element {
        return (
            <div class="outer-container">
                <div class={'grid-container ' + (this.hasFewItems() ? 'few-items' : '')}>
                    {this.values.map((item) => {
                        return this.renderItem(item);
                    })}
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
}
