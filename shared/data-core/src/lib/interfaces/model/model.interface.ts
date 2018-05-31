import { IFormField } from '@shared/interfaces';
import { cloneDeep } from 'lodash-es';

export class IModel {
    className: string;
    collectionName: string;
    searchableFields: Array<string>;
    fields: Array<string>;
    mappingFields: Map<number, string>;
    appareance: Map<string, any>;
    include: Array<string>;
    searchSubquery: { collectionName: string; field: string; values: string };
    feathersService?: string;
    type: any;
    isCustom?: boolean;

    private _formFields: Array<IFormField>;
    public get formFields(): Array<IFormField> {
        return cloneDeep(this._formFields);
    }
    public set formFields(f: Array<IFormField>) {
        this._formFields = f;
    }

    constructor(className) {
        this.className = className;
        this.searchableFields = new Array<string>();
        this.mappingFields = new Map<number, string>();
        this._formFields = new Array<IFormField>();
        this.appareance = new Map<string, any>();
    }
}
