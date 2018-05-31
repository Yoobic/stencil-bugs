import { IUser } from '../../entities/user/user.interface';
import { IBadgeEntry } from '../badge/badge.interface';
import { IActionSheetButton } from '../action-sheet/action-sheet.interface';

export interface ICardListEntry {
    heading?: string;
    subheadings?: string[];
    imgSrc?: string;
    icon?: string;
    iconText?: string;
    avatarSize?: string;
    topLeftBadge?: string;
    topRightBadge?: string;
    bottomLeftBadge?: string;
    bottomRightBadge?: string;
    date?: string;
    badges?: IBadgeEntry[];
    users?: Array<IUser>;
    tags?: Array<string>;
    icons?: Array<{ icon: string, value?: string, handler?: () => void }>;
    actions?: Array<IActionSheetButton>;
    topActions?: Array<{ text: string, handler?: () => void }>;
    bottomActions?: Array<{ text: string, handler?: () => void }>;
}