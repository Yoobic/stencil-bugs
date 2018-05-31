export interface NotificationEvent {
    type: string;
    notification?: any;
    action?: { type?: any; actionId?: string };
}
