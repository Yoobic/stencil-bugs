import { IActionSheetButton } from '../action-sheet/action-sheet.interface';

export interface ICardCellEntry {
    imgSrc?: string;
    icon?: string;
    text?: string;
    actions?: Array<IActionSheetButton>;
}