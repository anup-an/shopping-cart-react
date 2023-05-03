import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getUserFromToken } from './actions/userAction';

import AppNotifications from './components/AppNotifications';
import Routers from './components/Router';
import { AppNotification } from './types/notifications/ActionTypes';

interface IProps {
    actions: Actions;
    notifications: AppNotification[];
}

interface Actions {
    getUserFromToken: () => void;
}

class App extends React.Component<IProps> {
    componentDidMount = () => {
        this.props.actions.getUserFromToken();
    };
    render() {
        return (
            <BrowserRouter>
                <div className="flex flex-col h-screen">
                    <AppNotifications />
                    <div className="w-full">
                        <Routers />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
    actions: {
        getUserFromToken: () => dispatch(getUserFromToken()),
    },
});

export default connect(null, mapDispatchToProps)(App);
