export const DISPLAY_NOTIFICATION = 'DISPLAY_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';

export interface AppNotification {
    id: string;
    title: string;
    description: string;
    type: 'success' | 'failure';
}

export type displayNotificationAction = {
    type: typeof DISPLAY_NOTIFICATION;
    payload: {
        notification: AppNotification;
    };
};

export type deleteNotificationAction = {
    type: typeof DELETE_NOTIFICATION;
    payload: {
        notification: AppNotification;
    };
};

export type NotificationActionTypes = displayNotificationAction | deleteNotificationAction;
