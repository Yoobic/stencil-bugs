export interface IAcl {
    creator: string;
    groups: { r: Array<string>; w: Array<string> };
    //users: { r: Array<string>; w: Array<string> };
}

export interface IEntity {
    _id?: string | number | boolean;
    _acl?: IAcl;
    _lmt?: string;
    _ect?: string;
}

export interface IProperty {
    title?: string;
    type?: string;
    values: Array<any>;
}

export interface IProperties extends Array<IProperty> { }

export class Entity implements IEntity {
    public _id?: string | number | boolean;
    public _acl?: IAcl;
    public _lmt?: string;
    public _ect?: string;

    public properties?: IProperties;

    constructor(source?: any) {
        if (typeof source === 'string' || typeof source === 'number' || typeof source === 'boolean' || typeof source === 'undefined') {
            this._id = source;
        }
    }
}
