export interface IAcl {
    creator: string;
    groups: { r: Array<string>; w: Array<string> };
}

export class IEntity {
    _id?: string;
    _acl?: IAcl;
    _lmt?: string;
    _ect?: string;
    isChild?: boolean;
    parentRef?: string; // id of the parent if child
}

export interface IProperty {
    title?: string;
    type?: string;
    values: Array<any>;
}

export interface IProperties extends Array<IProperty> { }

export type EntityType = 'missions' | 'channel' | 'channels' | 'environnement' | 'feeds' | 'feedsComments' | 'blog' | 'users' | 'notifications' | 'files' | 'folders' | 'filesFolders' | 'groups';

export interface IEntityAction {
    isVisible?: (item: IEntity) => boolean;
    handler?: (item: IEntity) => void;
    icon?: (item: IEntity) => string;
    text?: (item: IEntity) => string;
    cssClass?: (item: IEntity) => string;
}
