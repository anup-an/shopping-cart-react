import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUser } from '../../actions/userAction';
import { IUser } from '../../ActionTypes';
import { AppState } from '../../store';

interface IProps {
    user: IUser;
    actions: Actions;
}
interface Actions {
    logOutUser: () => Promise<void>;
}

class Footer extends React.Component<IProps> {
    handleLogOut = () => {
        const { user } = this.props;
        this.props.actions.logOutUser();
    }
    render() {
        const { user } = this.props;
        return (
            <div className="bg-blue-800 p-2 text-sm text-white flex flex-row justify-between items-center">
                <div className="flex flex-row justify-between items-center gap-x-10">
                    {user._id == "" ?
                        <Link to="/login" className="border border-blue-800 flex flex-row items-center focus:border-white p-2">
                            <p>Login</p>
                            <svg
                                className="text-white w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                            </svg>
                        </Link> :
                        <p className="hidden lg:block text text-sm">Welcome {user.firstName}!!</p>
                    }
                    {user._id == "" ?
                        <Link to="/register" className="flex flex-row items-center border border-blue-800 focus:border-white p-2">
                            <p>Register</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="feather feather-file-text"
                            >
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                            </svg>
                        </Link> :
                        <button
                            onClick={this.handleLogOut}
                            type="button"
                            className="flex flex-row items-center border border-blue-800 focus:border-white p-2"
                        >
                            <p>Logout</p>
                            <svg
                                className="w-6 h-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    }

                </div>

            </div>
        )
    }
}

interface StateProps {
    user: IUser;
}
const mapStateToProps = (state: AppState): StateProps => ({
    user: state.user.user,
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: {
        logOutUser: () => dispatch(logOutUser()),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
