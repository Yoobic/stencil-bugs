export interface IContextMenuEntry {
    itemTitle?: string;
    icon?: string;
    class?: string;
    active?: boolean;
    separator?: boolean;
    separatorAfter?: boolean;
    hidden?: boolean;
    isHidden?: Function;
    visible?: boolean;
    handler?: Function;
    items?: Array<IContextMenuEntry>;
    sendImmutable?: boolean;
}
