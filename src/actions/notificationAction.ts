import { Dispatch } from 'redux';
import { AppActions } from '../types/common';
import { AppNotification, DELETE_NOTIFICATION, DISPLAY_NOTIFICATION } from '../types/notifications/ActionTypes';

export const displayNotification = (notification: AppNotification) => (dispatch: Dispatch<AppActions>) => {
    dispatch({
        type: DISPLAY_NOTIFICATION,
        payload: {
            notification,
        },
    });
};

export const deleteNotification = (notification: AppNotification) => (dispatch: Dispatch<AppActions>) => {
    dispatch({
        type: DELETE_NOTIFICATION,
        payload: {
            notification,
        },
    });
};
