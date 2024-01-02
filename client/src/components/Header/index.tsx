import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IProduct, IUser } from '../../ActionTypes';
import { searchProducts } from '../../actions/productAction';
import { logOutUser } from '../../actions/userAction';
import { AppState } from '../../store';
import { SearchState } from '../../types/common';

type Actions = {
    logOutUser: () => Promise<void>;
};

interface IProps extends RouteComponentProps {
    actions: Actions;
    user: IUser;
    focus: string;
}

type IState = {
    isOpen: boolean;
};

class Header extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { isOpen: false };
    }
    openModal = () => {
        this.setState((state) => ({ ...state, isOpen: true }));
    };

    closeModal = () => {
        this.setState((state) => ({ ...state, isOpen: false }));
    };

    handleLogOut = () => {
        const { user } = this.props;
        this.props.actions.logOutUser();
        this.props.history.push('/');
    };
    render() {
        const { user, focus } = this.props;
        return (
            <div className={`flex flex-row bg-blue-800 text-white text-xl justify-between p-4 items-center`}>
                <Link
                    to="/"
                    className={`block border hover:border-white lg:hidden p-2 ${
                        focus === 'home' ? 'border-white' : 'border-blue-800'
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                </Link>
                <Link
                    to="/"
                    className={`hidden lg:block border lg:hover:border-white ${
                        focus === 'home' ? 'lg:border-white' : 'border-blue-800'
                    } p-2`}
                >
                    Home
                </Link>
                <div className="flex flex-row justify-between items-center gap-x-10">
                    {!user._id ? (
                        <Link
                            to="/login"
                            className={`hidden lg:block border lg:hover:border-white ${
                                focus === 'login' ? 'lg:border-white' : 'lg:border-blue-800'
                            } focus:outline-none p-2`}
                        >
                            Login
                        </Link>
                    ) : (
                        <div className="flex flex-row items-center space-x-4">
                            <p className="hidden lg:block text text-sm">Welcome {user.firstName}!</p>
                            <button
                                type="button"
                                onClick={() =>
                                    this.props.history.push({
                                        pathname: '/user/profile',
                                        state: user,
                                    })
                                }
                                className={`hidden lg:block lg:hover:border-white border ${
                                    focus === 'profile' ? 'lg:border-white' : 'lg:border-blue-800'
                                } focus:outline-none p-2`}
                            >
                                My account
                            </button>
                        </div>
                    )}
                    {!user._id ? (
                        <Link
                            to="/register"
                            className={`hidden lg:block lg:hover:border-white border ${
                                focus === 'register' ? 'lg:border-white' : 'lg:border-blue-800'
                            } p-2`}
                        >
                            Register
                        </Link>
                    ) : (
                        <button
                            onClick={this.handleLogOut}
                            type="button"
                            className="hidden lg:block lg:hover:border-white border border-blue-800 p-2"
                        >
                            Logout
                        </button>
                    )}
                    <Link
                        to="/cart"
                        className={`border hover:border-white ${
                            focus === 'cart' ? 'border-white' : 'border-blue-800'
                        } p-2`}
                    >
                        <svg
                            className="focus:outline-none h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        );
    }
}

interface StateProps {
    user: IUser;
}

const mapStateToProps = (state: AppState): StateProps => ({
    user: state.user.user,
});

const mapDispatchToProps = (dispatch: any): { actions: Actions } => ({
    actions: {
        logOutUser: () => dispatch(logOutUser()),
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
