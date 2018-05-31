/// <reference path="../../../../../../types/jsx/index.d.ts" />

import { ValidatorEntry, Validator, AsyncValidator } from '../../validators/validators.interface';
import { IGridSearch } from '../../ui/grid/grid.interface';

export interface IEventEmitter<T = any> {
    emit: (data?: T) => void;
}

export interface IFormInputContainer {
    label?: string;
    description?: string;
    hint?: string;
    required?: boolean;
}

export interface IFormInputBase<T> {
    value: T;
    readonly?: boolean;
    required?: boolean;
    validity?: boolean;
    validators?: Array<Validator<T> | ValidatorEntry>;
    asyncValidators?: Array<AsyncValidator<T>>;
    validityChanged: IEventEmitter<boolean>;
    inputBlurred: IEventEmitter<any>;
    inputFocused: IEventEmitter<boolean>;
    inputChanged: IEventEmitter<T>;
    iconClicked?: IEventEmitter<string>;
    isLabelAboveVisible?: boolean;
    host?: HTMLElement;
    borderColor?: string;

    _validator: Validator<string>;
    _asyncValidator: AsyncValidator<string>;

    renderReadonly: () => JSX.Element;
    renderEditable: () => JSX.Element;
    render: () => JSX.Element;
}
export interface IFormDatetime extends IFormInputBase<any> {
    type: string;
    minDate?: Date;
    maxDate?: Date;
}

export interface IFormCheckbox extends IFormInputBase<boolean> {

}

export interface IFormToggle extends IFormInputBase<boolean> {
    type?: FormToogleType;
    text?: string;
}

export type FormToogleType = 'line' | 'normal';

export interface IFormRange extends IFormInputBase<IRangeValue> {
    min: number;
    max: number;
}

export interface IRangeValue {
    inf: number;
    sup: number;
}

export interface IFormStarRating extends IFormInputBase<number> {
    type: FormStarType;
}

export type FormStarType = 'star' | 'button';

export interface IFormSelect extends IFormInputBase<Array<string> | string> {
    multiple: boolean;
}

export interface IFormAutocomplete<T> extends IFormInputBase<Array<T>> {
    multiple: boolean;
    collectionName?: string;
    values?: Array<T>;
    fetchData: IEventEmitter<IGridSearch>;
    useTranslate?: boolean;
}
