import { IEntity } from '@shared/data-core';
//import { Photo } from '../photo/photo.interface';

export interface ChatMessage {
    channel: string;
    message: string;
    type?: string;
    sender_id?: string;
    sender_username?: string;
    receiver_id?: string;
    receiver_username?: string;
    isGroup?: boolean;
    groupName?: string;
    date_sent?: Date;
    options?: any;
    icon?: string;
    photo?: any;
}

export interface MessageInterface extends IEntity {
    to: Array<string>;
    // cc?: Array<string>;
    // bcc?: Array<string>;
    title: string;
    body: string;
    messageURL?: string;
    pageTitle?: string;
    //footer?: string;
    actionURL?: string;
    action?: boolean;
    thankyou?: string;
}
