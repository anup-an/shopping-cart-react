import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { logInUser } from '../../actions/userAction';
import { IUser, IProduct } from '../../ActionTypes';
import { AppState } from '../../store';

interface IState {
    email: string;
    password: string;
}

interface IProps {
    actions: Actions;
    user: IUser | null;
}

interface Actions {
    logInUser: (email: string, password: string) => Promise<void>;
}

class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { email: '', password: '' };
    }
    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => ({ ...state, [event.target.name]: event.target.value }));
    };
    handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        this.props.actions.logInUser(this.state.email, this.state.password);
    };
    render(): JSX.Element {
        const { email, password } = this.state;
        const { user } = this.props;

        return (
            <div>
                {!user ?
                    <div className="flex flex-row flex items-center justify-center h-full mt-28">
                        <div className="bg-white border rounded-lg shadow-xl w-2/3 flex flex-row bg-blue-800">
                            <div className="h-96 w-1/2 text-white p-4 flex items-center justify-center flex-col">
                                <div className="text-2xl">Welcome to the E-Shop!</div>
                                <div>Please log into your account to continue.</div>
                            </div>
                            <div className="w-1/2 h-96 bg-white flex flex-col items-center justify-center space-y-12">
                                <div className="flex flex-row items-center space-x-2">
                                    <div>If you are a new user, signup here</div>
                                    <Link to="/register"
                                        className="bg-blue-400 hover:bg-blue-800 p-1 text-white border rounded shadow text-sm focus:outline-none"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                                <div className="text-2xl text-blue-800 text-left">Login</div>

                                <form onSubmit={this.handleLogin} className="flex flex-col space-y-4 w-2/3">
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
                                    >
                                        Forgot password ?
                                    </button>
                                    <button
                                        className="w-full p-2 hover:bg-blue-800 bg-blue-400 border rounded text-white"
                                        type="submit"
                                    >
                                        <div>Login</div>

                                        {/*                     <div className="animate-ping ease-in-out uration-100 bg-blue-800 w-full h-full">
                        </div>

 */}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div> : <div>
                        <Redirect to="/user" />
                        </div>
    }
                </div>
        );
    }
}

interface StateProps {
    user: IUser | null;
}

const mapStateToProps = (state: AppState): StateProps => ({
    user: state.user.user,
});

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
    actions: {
        logInUser: (email: string, password: string) => dispatch(logInUser(email,password))
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
