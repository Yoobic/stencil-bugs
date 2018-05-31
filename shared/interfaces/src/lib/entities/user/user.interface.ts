import { IEntity } from '../entity/entity.interface';
import { ILocation } from '../location/location.interface';
export class IUser extends IEntity {
    _geoloc?: Array<number>;
    _messaging?: { pushTokens: Array<{ platform: string; token: string }> };
    pendingBadges?: { feeds?: number, available?: { missions?: number, polls?: number, services?: number, todos?: number }, communicate?: number };
    oneSignalId?: Array<string>;
    oneSignalAppIds?: { [appName: string]: Array<string> };
    _tenantRef?: string;
    paypalEmail?: string;
    radius?: any;
    sendFinishedEmail?: boolean;
    disableEmailNotifications?: boolean;
    disablePushNotifications?: boolean;
    disableSmsNotifications?: boolean;
    disableTracking?: boolean;
    deletePhotos?: boolean;
    allowPhotoEdit?: boolean;
    disablePhotoOrientationAutoFix?: boolean;
    viewlist?: boolean;
    timezone?: string;
    goToBasket?: boolean;
    orderServicesByDate?: boolean;
    showScrollbars?: boolean;
    invited?: boolean;
    darkTheme?: boolean;
    useBigFonts?: boolean;
    useBeta?: boolean;
    photoMaxWidth?: number;

    imageData?: string;
    firstName?: string;
    lastName?: string;
    username: string;
    email?: string;
    password?: string;
    isTeam?: boolean;
    tags?: Array<string>;
    role?: string;
    telephone?: string;
    company?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: any;
    location?: ILocation;
    locationRef?: string;
    _aclGroupsR?: any;
    lastSeen?: any;
    version?: any;
    mobileVersion?: any;
    platform?: any;
    language?: string;
    device?: string;
    uuid?: string;
    target?: string;
}

export class IUserSettings extends IEntity {
    useBeta: boolean;

    viewlist: boolean;
    darkTheme: boolean;
    useBigFonts: boolean;
    showScrollbars: boolean;
    disableEmailNotifications: boolean;
    disablePushNotifications: boolean;
    disableSmsNotifications: boolean;
    sendFinishedEmail: boolean;
    deletePhotos: boolean;
    allowPhotoEdit: boolean;
    disablePhotoOrientationAutoFix: boolean;
    photoMaxWidth?: number;
    orderServicesByDate: boolean;
    goToBasket: boolean;
    radius: any;
    timezone: any;
}

export class ISimpleUser extends IEntity {
    imageData: string;
    username: string;
    email: string;
    password: string;
}