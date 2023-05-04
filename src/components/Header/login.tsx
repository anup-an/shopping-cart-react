import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { uuid } from 'uuidv4';

import { ICart, IUser } from '../../ActionTypes';
import { logInUser } from '../../actions/userAction';
import { AppState } from '../../store';
import { guestUser } from '../../reducers/userReducers';
import { LogInActionPayload } from '../../types/user/ActionTypes';
import { AppNotification } from '../../types/notifications/ActionTypes';
import { displayNotification } from '../../actions/notificationAction';

interface IState {
    email: string;
    password: string;
}

interface IProps extends RouteComponentProps {
    actions: Actions;
    user: IUser;
    cartItems: ICart[];
}

interface Actions {
    logInUser: (payload: LogInActionPayload) => Promise<string>;
    displayNotification: (notification: AppNotification) => Promise<void>;
}

class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    static defaultProps = {
        user: guestUser,
        cartItems: [],
    };

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => ({ ...state, [event.target.name]: event.target.value }));
    };

    handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const payload: LogInActionPayload = {
            email: this.state.email,
            password: this.state.password,
            cartItems: this.props.cartItems,
        };
        await this.props.actions.logInUser(payload);
        if (this.props.user._id) {
            const redirectPath = (this.props.location.state as any)?.redirectPath;
            this.props.history.push(redirectPath || '/');
            this.props.actions.displayNotification({
                id: uuid(),
                title: 'Login successful',
                description: 'You have successfully logged into your account.',
                type: 'success',
            });
        }
    };
    render(): JSX.Element {
        const { user, history } = this.props;

        return (
            <div className="w-full h-full flex items-center pt-14">
                {!user?._id ? (
                    <div className="flex flex-row flex items-center justify-center w-full">
                        <div className="bg-white border rounded-lg shadow-xl w-full lg:w-2/3 flex flex-row items-center lg:bg-blue-800 ">
                            <div className="hidden lg:block w-1/2 text-white p-4 flex items-center justify-center text-center flex-col">
                                <div className="text-xl">Welcome to the E-Shop!</div>
                                <div>Please log into your account to continue.</div>
                            </div>
                            <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center space-y-12 p-4">
                                <div className="flex flex-row items-center space-x-2">
                                    <div>If you are a new user, signup here</div>
                                    <Link
                                        to="/register"
                                        className="bg-blue-400 hover:bg-blue-800 p-1 text-white border rounded shadow text-sm focus:outline-none"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                                <div className="text-2xl text-blue-800 text-left">Login</div>

                                <form onSubmit={this.handleLogin} className="flex flex-col space-y-4 w-full">
                                    <div>
                                        <label
                                            className="flex flex-row w-full border-b items-end justify-between"
                                            htmlFor="email"
                                        >
                                            <input
                                                className="focus:outline-none text-sm"
                                                id="email"
                                                name="email"
                                                placeholder="Type your e-mail"
                                                required
                                                onChange={this.handleInput}
                                            />
                                            <svg
                                                className="h-5 w-5 text-blue-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="flex flex-row w-full border-b items-end justify-between"
                                        >
                                            <input
                                                className="w-full focus:outline-none text-sm"
                                                id="password"
                                                name="password"
                                                placeholder="Type your password"
                                                required
                                                onChange={this.handleInput}
                                                type="password"
                                            />
                                            <svg
                                                className="h-6 w-6 text-blue-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                />
                                            </svg>
                                        </label>
                                    </div>

                                    <button
                                        type="button"
                                        className="text-sm text-right text-blue-400 focus:outline-none hover:text-blue-800"
                                        onClick={() => history.push('/forgot-password')}
                                    >
                                        Forgot password ?
                                    </button>
                                    <button
                                        className="w-full p-2 hover:bg-blue-800 bg-blue-400 border rounded text-white"
                                        type="submit"
                                    >
                                        <div>Login</div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Redirect to="/" />
                    </div>
                )}
            </div>
        );
    }
}

interface StateProps {
    user: IUser;
    cartItems: ICart[];
}

const mapStateToProps = (state: AppState): StateProps => ({
    user: state.user.user,
    cartItems: state.cartProducts.cartItems,
});

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
    actions: {
        logInUser: (payload: LogInActionPayload) => dispatch(logInUser(payload)),
        displayNotification: (notification: AppNotification) => dispatch(displayNotification(notification)),
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
