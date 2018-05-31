import { IEntity } from '../entity/entity.interface';
import { ILocation } from '../location/location.interface';
import { IUser } from '../user/user.interface';
import { IMissionDescription } from '../mission-description/mission-description.interface';

export class IMission extends IEntity {
    title: string;
    description?: IMissionDescription;
    descriptionRef?: string;
    location?: ILocation;
    locationRef?: string;
    address?: string;
    vip?: boolean;
    finishedDate?: Date;
    bookedDate?: Date;
    bookedUntil?: Date;
    status?: string;
    validated?: boolean;
    validatedBy?: string;
    owner?: IUser;
    ownerRef?: string;
    ownerDisplayName?: string;
    creator?: IUser;
    creatorRef?: string;
    creatorDisplayName?: string;
    type: string;
    priority?: number;
    skipValidation?: boolean;
    price?: number;
    duedate?: Date;
    validFrom?: Date;
    validUntil?: Date;
    versionmin?: string;
    autoRenew?: boolean;
    autoRenewOnBooking?: boolean;
    duration?: string;
    bookingDuration?: string;
    startDistance?: any;
    creationDate?: Date;
    validatedDate?: Date;
    isCalendar?: boolean;
    republishCount?: number;
    unvalidatedReason?: string;
    score?: { value: number; total?: number; isPercentage?: boolean, title?: string };
    extraScores?: { [s: string]: { value: number; total?: number; isPercentage?: boolean, title?: string } };
    scoreValue?: number;
    rating?: number;
    language?: string;
    tags?: Array<string>;
    todo?: any; //ITodo
    comments?: string;
    quizz?: boolean;
    quizzMode?: string;
    _geoloc?: [number, number];
    distance?: number;
    progress?: { value: number; takenPhotos?: number; totalPhotos?: number; };
    isService?: boolean;
    serviceGroups?: Array<string>;
    serviceData?: any;
    originalMissionId?: string;
    originalFieldName?: string | Array<string>;
    republishedWithAnswers?: boolean;
    originalId?: string;
    originalData?: any;
    originalUnvalidatedReason?: string;
    icon?: string;

    points?: number;
    badges?: Array<string>;
    preventRetry?: boolean;
    actualDuration?: number;
}

export class IMissionValidate extends IEntity {
    rating: number;
    comments: string;
}

export class IMissionReject extends IEntity {
    type?: string;

    comments: string;
    republish: boolean;
    republishWithAnswers: boolean;
}
