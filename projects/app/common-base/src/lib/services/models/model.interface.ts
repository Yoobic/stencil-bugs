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

    private _formFields: Array< any>;
    public get formFields(): Array< any> {
        return cloneDeep(this._formFields);
    }
    public set formFields(f: Array< any>) {
        this._formFields = f;
    }

    constructor(className) {
        this.className = className;
        this.searchableFields = new Array<string>();
        this.mappingFields = new Map<number, string>();
        this._formFields = new Array< any>();
        this.appareance = new Map<string, any>();
    }
}
