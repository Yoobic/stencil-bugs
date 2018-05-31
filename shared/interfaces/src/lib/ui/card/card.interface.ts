import {  IActionSheetButton } from '../action-sheet/action-sheet.interface';
import { IBadgeEntry } from '../badge/badge.interface';
import { IUser } from '../../entities/user/user.interface';

export type CardType = 'card-feed' | 'card-list' | 'card-default' | 'card-sticky';

export interface ICardEntry {
    heading?: string;
    subheadings?: string[];
    imgSrc?: string;
    topLeftBadge?: string;
    topRightBadge?: string;
    bottomLeftBadge?: string;
    bottomRightBadge?: string;
    type: CardType;
    icon?: string;
    tags?: string[];
    icons?: Array<{icon: string, value?: string, handler?: () => void}>;
    badges?: Array<IBadgeEntry>;
    description?: string;
    actions?: IActionSheetButton[];
    topLeftIcon?: string;
    topRightIcon?: string;
    bottomLeftIcon?: string;
    bottomRightIcon?: string;
    animationName?: string;
    sharedIn?: string;
    groups?: Array<string>;
    bottomAction?: { name: string, handler?: () => void };
    user?: IUser;
    topActions?: Array<{text: string, handler?: () => void}>;
}
