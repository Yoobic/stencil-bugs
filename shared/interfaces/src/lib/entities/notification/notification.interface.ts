
import {  IAcl } from '../entity/entity.interface';

export class INotification  {
    _id?: string;
    _acl?: IAcl;
    _lmt?: string;
    _ect?: string;
    mode: 'email' | 'notification' | 'allnotification';
    title: string;
    body: string;
    scheduledDate?: Date;
    apps?: Array<string>;
    senderGroupsHaveAccess?: boolean;
    data?: { entityType: string; entityId: string } | any;
    pendingBadgePath?: string;
    notificationOptions?: any;
    group?: Array<string>;
    userQuery?: any;
    actionText?: string;
    actionURL?: string;
    action?: boolean;
    sender?: any;
    senderRef?: string;
}
