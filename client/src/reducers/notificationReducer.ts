import {
    AppNotification,
    DELETE_NOTIFICATION,
    DISPLAY_NOTIFICATION,
    NotificationActionTypes,
} from '../types/notifications/ActionTypes';

type INotificationActionStates = {
    notifications: AppNotification[];
};

const notificationDefaultState: INotificationActionStates = {
    notifications: [],
};

const notificationReducer = (
    state = notificationDefaultState,
    action: NotificationActionTypes,
): INotificationActionStates => {
    switch (action.type) {
        case DISPLAY_NOTIFICATION:
            return { ...state, notifications: [action.payload.notification, ...state.notifications] };
        case DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications].filter(
                    (notification) => action.payload.notification.id !== notification.id,
                ),
            };
        default:
            return state;
    }
};

export default notificationReducer;
