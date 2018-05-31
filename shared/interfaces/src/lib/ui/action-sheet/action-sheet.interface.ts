export interface IActionSheetButton {
    text?: string;
    icon?: string;
    disabled?: boolean;
    cssClass?: string;
}

export interface IActionSheet {
    heading?: string;
    withYooCtrl?: boolean;
    buttons: IActionSheetButton[];
    cssClass?: string;
}