
export interface IVerticalMenuEntry {
    menuRows: IVerticalMenuRow[];
}

export interface IVerticalMenuRow {
    item?: IVerticalMenuItem;
    subItems?: IVerticalMenuItem[];
}

export interface IVerticalMenuItem {
    text?: string;
    imgSrc?: string;
    icon?: string;
    type?: string;
    isActive?: boolean;
    anchor?: string;
}