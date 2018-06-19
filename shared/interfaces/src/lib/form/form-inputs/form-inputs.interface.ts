/// <reference path="../../../../../../types/jsx/index.d.ts" />

import { ValidatorEntry, Validator, AsyncValidator } from '../../validators/validators.interface';
import { IGridSearch } from '../../ui/grid/grid.interface';
import { IFormField } from '../../entities/form-field/form-field.interface';
import { IAlgorithm } from '../../entities/algorithm/algorithm.interface';

export interface IEventEmitter<T = any> {
    emit: (data?: T) => void;
}

export interface IFormInputContainer {
    field?: IFormField;
    readonly?: boolean;
    commented: IEventEmitter<string>;
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

    _validator?: Validator<T>;
    _asyncValidator?: AsyncValidator<T>;

    renderReadonly: () => any; //JSX.Element;
    renderEditable: () => any; //JSX.Element;
    render: () => any; //JSX.Element;
}
export interface IFormDatetime extends IFormInputBase<any> {
    type: string;
    minDate?: Date;
    maxDate?: Date;
}

export interface IFormCheckbox extends IFormInputBase<boolean> {
    type?: FormDisplayType;
}

export interface IFormToggle extends IFormInputBase<boolean> {
    type?: FormDisplayType;
}

export type FormDisplayType = 'line' | 'normal';

export interface IFormRange extends IFormInputBase<number | Array<number>> {
    min: number;
    max: number;
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

export interface IFormPhoto extends IFormInputBase<Array<string> | string> {
    type: string;
    multiple: boolean;
    min: number;
    max: number;
    maxWidth: number;
    duration: number;
    saveGeoloc: boolean;
    allowLibrary: boolean;
    allowAnnotate: boolean;
    isImageRecognition: boolean;
    isBackgroundProcess: boolean;
    algorithm?: IAlgorithm;
}

export interface IFormDocument {
    document: any;
    type: any;
}
export interface IFormFormula extends IFormInputBase<number> {

}
