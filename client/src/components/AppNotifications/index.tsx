import React from 'react';
import { connect } from 'react-redux';

import { deleteNotification, displayNotification } from '../../actions/notificationAction';
import { AppState } from '../../store';
import { AppNotification } from '../../types/notifications/ActionTypes';

interface Actions {
    displayNotification: (notification: AppNotification) => void;
    deleteNotification: (notification: AppNotification) => void;
}

interface IProps {
    notifications: AppNotification[];
    actions: Actions;
}

class AppNotifications extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    deleteNotification = (notification: AppNotification) => {
        this.props.actions.deleteNotification(notification);
    };
    render() {
        const { notifications } = this.props;
        return (
            <div className="fixed z-20 right-2 top-2 md:w-2/3 lg:w-1/2 xl:w-1/3 w-full">
                {notifications.map((notification) => (
                    <div
                        className={`${notification.type === 'success' ? 'bg-green-600' : ''} ${
                            notification.type === 'failure' ? 'bg-red-500' : ''
                        } text-white p-1 mb-2`}
                        key={notification.id}
                    >
                        <div className="w-full flex justify-end">
                            <button onClick={() => this.deleteNotification(notification)}>
                                <i className="far fa-times-circle text-white"></i>
                            </button>
                        </div>
                        <div className="pl-4 pb-4 pr-2">
                            <div className="text-xl font-bold">{notification.title}</div>
                            <div className="mt-4">{notification.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

interface StateProps {
    notifications: AppNotification[];
}

const mapStateToProps = (state: AppState): StateProps => ({
    notifications: state.notifications.notifications,
});

const mapDispatchToProps = (
    dispatch: any,
): {
    actions: Actions;
} => ({
    actions: {
        displayNotification: (notification: AppNotification) => dispatch(displayNotification(notification)),
        deleteNotification: (notification: AppNotification) => dispatch(deleteNotification(notification)),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNotifications);
